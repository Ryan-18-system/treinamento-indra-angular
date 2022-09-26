import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import {ContasService} from "../../services/contas.service";
import {IConta} from "../../interfaces/conta";
import {Router} from "@angular/router";
import {MensagemAlertService} from "../../services/mensagem-alert.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService, private router: Router, private mensagemService: MensagemAlertService) { }
  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.buscarTodosClientes();
  }

  buscarTodosClientes() {
    this.clienteService.listarTodosClientes().subscribe({
      next: clientes => this.clientes = clientes,
      error: err => this.mensagemService.mensagemDeError(err.message)
    });
  }
  excluirCliente(id:number, cpf:string){
      this.clienteService.excluirClientePorId(id).subscribe({
        next: () => this.mensagemService.mensagemDeSucesso("Cliente excluído com sucesso"),
        error: err => {
          this.mensagemService.mensagemDeError("Não foi possível excluir o cliente, ele possui contas ativas")
          this.router.navigate(['/contas',cpf])
        }
      })
  }



}
