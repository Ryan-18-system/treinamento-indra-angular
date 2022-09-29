import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MensagemAlertService} from "../../../services/mensagem-alert.service";
import {ContasService} from "../../../services/contas.service";
import {ISaqueDeposito} from "../../../interfaces/saque-deposito";

@Component({
  selector: 'app-operacao',
  templateUrl: './operacao.component.html',
  styleUrls: ['./operacao.component.css']
})
export class OperacaoComponent implements OnInit {
  titulo: string = '';
  valorFormat: number = 0;
  verificaOperacao: boolean = true;
  agencia: string | null = '';
  numeroConta: string | null = '';
  operacao: string | null = '';
  newOperacao: ISaqueDeposito = {
    numeroConta: '',
    agencia: '',
    transferencia: false,
    valor: 0
  }

  constructor(private rotaAtual: ActivatedRoute,
              private mensagemService: MensagemAlertService,
              private routeador: Router,
              private contaService: ContasService
  ) {
  }

  ngOnInit(): void {
    this.numeroConta = this.rotaAtual.snapshot.paramMap.get('numero')
    this.agencia = this.rotaAtual.snapshot.paramMap.get('agencia')
    this.operacao = this.rotaAtual.snapshot.paramMap.get('tipoOperacacao')

    if (this.operacao === "saque") {
      this.titulo = "Saque"
      this.verificaOperacao = false
    } else {
      this.titulo = "Depósito"
    }
  }

  realizarSaque(agencia: string, numeroConta: string, valor: string) {
    if (!this.verificaValor(valor)) {
      this.valorFormat = parseFloat(valor);
      this.newOperacao.agencia = agencia;
      this.newOperacao.numeroConta = numeroConta
      if (this.valorFormat <= 0) {
        this.mensagemService.mensagemDeAlerta("Digite um valor válido")
        return
      }
      this.newOperacao.valor = this.valorFormat;
      this.contaService.sacar(this.newOperacao).subscribe({
        next: () => this.mensagemService.mensagemDeSucesso(`Saque de ${valor} realizado com sucesso`),
        error: err => this.mensagemService.mensagemDeError(err.message)
      })
    }
  }

  realizarDeposito(agencia: string, numeroConta: string, valor: string) {
    if (!this.verificaValor(valor)) {
      this.valorFormat = parseFloat(valor);
      this.newOperacao.agencia = agencia;
      this.newOperacao.numeroConta = numeroConta
      if (this.valorFormat <= 0) {
        this.mensagemService.mensagemDeAlerta("Digite um valor maior que 0")
        return
      }
      this.newOperacao.valor = this.valorFormat;
      this.contaService.deposito(this.newOperacao).subscribe({
        next: () => this.mensagemService.mensagemDeSucesso(`Depósito de ${valor} realizado com sucesso`),
        error: err => this.mensagemService.mensagemDeError(err.message)
      })
    }
  }

  private verificaValor(valor: string) {
    if (valor == "") {
      this.mensagemService.mensagemDeAlerta("Digite um valor válido")
      return true
    }
    return false
  }
}
