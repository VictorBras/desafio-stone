import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { CepService } from './cep/cep.service';
import { DistancesService } from './distances/distances.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [DistancesService, CepService],
  exports: [DistancesService, CepService],
})
export class SharedModule {}
