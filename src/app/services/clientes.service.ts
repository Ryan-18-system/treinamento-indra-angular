import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  endpoint = 'clientes/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  buscarClientePorId(id:string){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`)
  }

  editarCliente(id: number,cliente:ICliente){
    return this.http.put<ICliente>(`${this.api}/${this.endpoint}/${id}`,cliente)
  }
  cadastrarCliente(newCliente:ICliente):Observable<ICliente>{
    return this.http.post<ICliente>(`${this.api}/${this.endpoint}`,newCliente)
  }

  excluirClientePorId(id:number):Observable<object>{
    return this.http.delete(`${this.api}/${this.endpoint}${id}`)
  }
}
