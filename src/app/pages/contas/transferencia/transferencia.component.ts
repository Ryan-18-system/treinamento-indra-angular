import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MensagemAlertService} from "../../../services/mensagem-alert.service";
import {ContasService} from "../../../services/contas.service";
import {IConta} from "../../../interfaces/conta";
import {ITransferencia} from "../../../interfaces/transferencia";

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  arrayContas: IConta[] = [];
  mapContas: Map<string, string> = new Map<string, string>()
  agencia: string | null = '';
  numeroConta: string | null = '';
  numeroContaDestino: string | undefined = '';
  agenciaDestino: string | undefined = '';

  constructor(private rotaAtual: ActivatedRoute,
              private mensagemService: MensagemAlertService,
              private routeador: Router,
              private contaService: ContasService
  ) {
    this.listarContas()
  }

  ngOnInit(): void {
    this.numeroConta = this.rotaAtual.snapshot.paramMap.get('numero')
    this.agencia = this.rotaAtual.snapshot.paramMap.get('agencia')
  }

  private listarContas() {
    this.contaService.listarTodasAsContas().subscribe({
      next: contas => {
        this.arrayContas = contas
        this.arrayContas.forEach(conta => {
          this.mapContas.set(conta.agencia, conta.numero)
        })
      },
      error: err => this.mensagemService.mensagemDeError(err.message)
    })

  }

  procurarNumeroContaDestino(agencia: string) {
    this.agenciaDestino = agencia
    this.numeroContaDestino = this.mapContas.get(agencia)
  }

  transferirValor(agenciaOrigem: string, numeroContaOrigem: string, valor: string) {
    const valorFormat = valor ? parseFloat(valor) : 0;
    if (valorFormat <= 0) {
      this.mensagemService.mensagemDeAlerta("Digite um valor válido")
      return
    }
    const newTransferencia: ITransferencia = {
      agenciaDestino: this.agenciaDestino,
      agenciaOrigem: agenciaOrigem,
      numeroContaDestino: this.numeroContaDestino,
      numeroContaOrigem: numeroContaOrigem,
      valor: valorFormat,
    }
    this.contaService.transferir(newTransferencia).subscribe({
      next: () => this.mensagemService.mensagemDeSucesso(`Transferência de R$${newTransferencia.valor} realizada com sucesso`),
      error: err => this.mensagemService.mensagemDeError("Saldo da Conta insuficiente")
    })

  }

}
