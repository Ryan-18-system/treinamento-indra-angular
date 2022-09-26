import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IConta} from "../interfaces/conta";
import {ISaqueDeposito} from "../interfaces/saque-deposito";
import {ITransferencia} from "../interfaces/transferencia";

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  endpoint = 'contas/';
  api = environment.api
  constructor(private http: HttpClient) { }

  listarTodasAsContas():Observable<IConta[]>{
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}`)
  }
  cadastrarConta(conta:IConta):Observable<IConta>{
    return this.http.post<IConta>(`${this.api}/${this.endpoint}`,conta)
  }
  listarContaPorId(cpf:string):Observable<IConta[]>{
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}buscarContasDoCliente/${cpf}`)
  }
  excluirContaPorId(id:number):Observable<object>{
    return this.http.delete<object>(`${this.api}/${this.endpoint}${id}`)
  }
  sacar(saque:ISaqueDeposito):Observable<ISaqueDeposito>{
    return  this.http.put<ISaqueDeposito>(`${this.api}/${this.endpoint}sacar`,saque)
  }
  deposito(deposito:ISaqueDeposito):Observable<ISaqueDeposito>{
    return  this.http.put<ISaqueDeposito>(`${this.api}/${this.endpoint}deposito`,deposito)
  }
  transferir(transferir:ITransferencia):Observable<ITransferencia>{
    return  this.http.put<ITransferencia>(`${this.api}/${this.endpoint}transferencia`,transferir)
  }
}
