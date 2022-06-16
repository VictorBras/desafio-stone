import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  getCepAddress(cep: string): Observable<string> {
    const url = `https://viacep.com.br/ws/${cep}/json`;

    return this.httpService.get(url).pipe(
      map((response) => response.data),
      map(({ logradouro, bairro, localidade, uf }: ViaCepResponse) => {
        const address = `${logradouro} - ${bairro}. CEP: ${cep}. ${localidade} - ${uf}`;

        return address;
      }),
    );
  }
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
