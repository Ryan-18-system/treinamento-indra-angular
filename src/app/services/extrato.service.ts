import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IExtrato} from "../interfaces/Extrato";

@Injectable({
  providedIn: 'root'
})
export class ExtratoServiceService {

  endpoint = 'extratos/buscarExtratos/';
  api = environment.api;

  constructor(private http: HttpClient) {
  }

  listarTodosOsExtratos(numeroConta: string, agencia: string): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}${numeroConta}/${agencia}`)
  }

  listarPorIntervaloDeData(numeroConta: string, agencia: string, dataInicio: string, dataFinal: string): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}${agencia}/${numeroConta}/${dataInicio}/${dataFinal}`)
  }

  listarPorDataEspecifica(numeroConta: string, agencia: string, data: string): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}/${agencia}/${numeroConta}/${data}`)
  }
}
