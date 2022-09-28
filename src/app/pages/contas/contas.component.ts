import {Component, OnInit} from '@angular/core';
import {ContasService} from "../../services/contas.service";
import {IConta} from "../../interfaces/conta";
import {ActivatedRoute, Router} from "@angular/router";
import {MensagemAlertService} from "../../services/mensagem-alert.service";


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {
  contas: IConta[] = [];
  listagemPorCpf: boolean = false;

  constructor(private contaService: ContasService, private cpfUrl: ActivatedRoute,
              private mensagemService: MensagemAlertService,
              private roteador: Router) {
    if (this.cpfUrl.snapshot.paramMap.has('cpf')) {
      this.listagemPorCpf = true;
      const cpfUrl = this.cpfUrl.snapshot.paramMap.get('cpf')
      this.listarContasPorCpf(cpfUrl || "")
    } else {
      this.listarTodasAsContas()
    }
  }

  ngOnInit(): void {
  }

  listarTodasAsContas() {
    this.contaService.listarTodasAsContas().subscribe({
      next: (contas) => this.contas = contas,
      error: err => this.mensagemService.mensagemDeError(err.message)
    })
  }

  excluirContaPorId(id: number) {
    this.contaService.excluirContaPorId(id).subscribe({
      next: () => {
        this.mensagemService.mensagemDeSucesso("Conta excluída com sucesso")
        this.listarTodasAsContas()
      },
      error: err => this.mensagemService.mensagemDeError("Não foi possível excluir essa conta")
    })
  }

  private listarContasPorCpf(cpf: string) {
    this.contaService.listarContaPorId(cpf).subscribe({
      next: contas => {
        this.contas = contas
      },
      error: err => {
        this.mensagemService.mensagemDeInfo("Este cliente não possui contas")
        this.roteador.navigate(['/clientes'])
      }

    })
  }

}
