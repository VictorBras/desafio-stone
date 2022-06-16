import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { CepService } from 'src/shared/cep/cep.service';
import { DistancesService } from 'src/shared/distances/distances.service';

import { LogisticOperator } from './classes/LogisticOperator';
import { LogisticOperatorOne } from './classes/LogisticOperatorOne';
import { LogisticOperatorTwo } from './classes/LogisticOperatorTwo';
import { CreateRoutingDto, PackageDimensions } from './dto/create-routing.dto';
import { Routing, Solution } from './interfaces/routing.interface';

@Injectable()
export class RoutingService {
  private readonly routingCollection = firestore().collection('routing');

  constructor(
    private readonly distancesService: DistancesService,
    private readonly cepService: CepService,
  ) {}

  async create(createRoutingDto: CreateRoutingDto): Promise<Routing> {
    const [deliveryAddress, collectionAddress] = await forkJoin([
      this.cepService.getCepAddress(createRoutingDto.destinationCep),
      this.cepService.getCepAddress(createRoutingDto.originCep),
    ]).toPromise();

    const distance = await this.distancesService.calculateDistance(
      deliveryAddress,
      collectionAddress,
    );

    const routingSolution = this.getSolutions(
      distance,
      createRoutingDto.packageDimensions,
    );

    await this.saveRoutingSolution(routingSolution);

    return routingSolution;
  }

  private async saveRoutingSolution(routingSolution: Routing) {
    const doc = await this.routingCollection.add(routingSolution);

    routingSolution.id = doc.id;

    await doc.update({ id: routingSolution.id });
  }

  async findOne(id: string) {
    const document = await this.routingCollection.doc(id).get();
    const documentData = document.data();

    if (!documentData) {
      throw new HttpException(
        'Documento não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return documentData;
  }

  private getSolutions(
    distance: number,
    packageDimensions: PackageDimensions,
  ): Routing {
    const solutions = this.getLogisticOperatorSolutions(
      distance,
      packageDimensions,
    );
    const cheapestOperator = this.getCheapestSolution(solutions);
    const fastestOperator = this.getFastestSolution(solutions);

    return {
      solutions,
      fastestOperator,
      cheapestOperator,
    } as Routing;
  }

  private getCheapestSolution(solutions: Solution[]): number {
    solutions = solutions.slice();

    solutions.sort((a, b) => a.price - b.price);

    return solutions[0].logisticOperator;
  }

  private getFastestSolution(solutions: Solution[]): number {
    solutions = solutions.slice();

    solutions.sort((a, b) =>
      moment(a.deliveryTime).isSameOrAfter(moment(b.deliveryTime), 'day')
        ? 1
        : -1,
    );

    return solutions[0].logisticOperator;
  }

  private getLogisticOperatorSolutions(
    distance: number,
    packageDimensions: PackageDimensions,
  ): Solution[] {
    return this.logisticOperators.map((logisticOperator) =>
      logisticOperator.getSolution(distance, packageDimensions),
    );
  }

  private get logisticOperators(): LogisticOperator[] {
    return [new LogisticOperatorOne(), new LogisticOperatorTwo()];
  }
}
