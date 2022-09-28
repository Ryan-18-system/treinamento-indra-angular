import {Component, OnInit} from '@angular/core';
import {ClientesService} from "../../../services/clientes.service";
import {ContasService} from "../../../services/contas.service";
import {IConta} from "../../../interfaces/conta";
import {ICliente} from "../../../interfaces/cliente";
import {ActivatedRoute, Router} from "@angular/router";
import {MensagemAlertService} from "../../../services/mensagem-alert.service";

@Component({
  selector: 'app-cadastrar-conta',
  templateUrl: './cadastrar-conta.component.html',
  styleUrls: ['./cadastrar-conta.component.css']
})
export class CadastrarContaComponent implements OnInit {
  idCliente: string | null = '';

  verificaId: boolean;

  agencia: string = '';

  numeroConta: string = '';

  cliente: ICliente = {
    cpf: "",
    email: "",
    nome: "",
    observacoes: "",
    ativo: true,
  }

  newContaUser: IConta = {
    agencia: "",
    cliente: undefined,
    numero: "",
    saldo: 0,
  };


  constructor(private clienteService: ClientesService,
              private contaService: ContasService,
              private rotaAtual: ActivatedRoute,
              private routeador: Router,
              private mensagemService: MensagemAlertService) {
    this.verificaId = this.rotaAtual.snapshot.paramMap.has('id')
    if (this.verificaId) {
      this.idCliente = this.rotaAtual.snapshot.paramMap.get('id')
      this.buscarClientePorId()
    } else {
      this.mensagemService.mensagemDeAlerta("ID INVÁLIDO")
    }

  }

  ngOnInit(): void {
    this.gerarAgencia();
    this.gerarNumeroConta();
  }

  buscarClientePorId() {
    this.clienteService.buscarClientePorId(this.idCliente || "").subscribe({
      next: cliente => {
        this.cliente = cliente
        this.newContaUser.cliente = this.cliente
      },
      error: err => this.mensagemService.mensagemDeError("Error ao buscar cliente por id")
    })
  }

  private gerarNumeroConta() {
    for (let i = 0; i <= 4; i++) {
      if (i === 4) {
        this.numeroConta += "-" + Math.floor(Math.random() * 10)
      } else {
        this.numeroConta += Math.floor(Math.random() * 10)
      }

    }
    this.newContaUser.numero = this.numeroConta
  }

  private gerarAgencia() {
    for (let i = 0; i < 4; i++) {
      this.agencia += Math.floor(Math.random() * 10)
    }
    this.newContaUser.agencia = this.agencia
  }

  cadastrarConta(saldo: string) {
    if (saldo === "") {
      this.newContaUser.saldo = 0
    }
    this.newContaUser.saldo = parseFloat(saldo)
    this.contaService.cadastrarConta(this.newContaUser).subscribe({
      next: () => {
        this.mensagemService.mensagemDeSucesso("Conta Cadastrada com sucesso")
        this.routeador.navigate(['/contas'])
      },
      error: err => this.mensagemService.mensagemDeError("Error ao cadastrar conta")
    })
  }
}



