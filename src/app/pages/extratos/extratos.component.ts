import {Component, OnInit} from '@angular/core';
import {ExtratoServiceService} from "../../services/extrato.service";
import {ActivatedRoute} from "@angular/router";
import {IExtrato} from "../../interfaces/Extrato";
import {MensagemAlertService} from "../../services/mensagem-alert.service";


@Component({
  selector: 'app-extratos',
  templateUrl: './extratos.component.html',
  styleUrls: ['./extratos.component.css']
})
export class ExtratosComponent implements OnInit {
  agencia: string | null = '';
  numeroConta: string | null = '';
  arrayExtratos: IExtrato[] = [];

  constructor(private extratoService: ExtratoServiceService, private rotaAtual: ActivatedRoute, private mensagemService: MensagemAlertService) {

  }

  ngOnInit(): void {
    this.numeroConta = this.rotaAtual.snapshot.paramMap.get('numero')
    this.agencia = this.rotaAtual.snapshot.paramMap.get('agencia')

  }

  listarTodosOsExtratos() {
    this.extratoService.listarTodosOsExtratos(this.numeroConta || '', this.agencia || '').subscribe({
      next: extratos => {
        this.arrayExtratos = extratos
      },
      error: err => this.mensagemService.mensagemDeError(err.message)
    })
  }


  listarPorIntervalo(data: string, data2: string) {
    const newData = data.replace(/[^0-9]/g, "")
    const newData2 = data2.replace(/[^0-9]/g, "")
    const dataFormata1 = newData.substring(6, 8) + "-" + newData.substring(4, 6) + "-" + newData.substring(0, 4)
    const dataFormatada2 = newData2.substring(6, 8) + "-" + newData2.substring(4, 6) + "-" + newData2.substring(0, 4)
    this.extratoService.listarPorIntervaloDeData(this.numeroConta||"",this.agencia||"",dataFormata1,dataFormatada2).subscribe({
      next: extratoPorData => {
        this.arrayExtratos = extratoPorData
      },
      error: () => this.mensagemService.mensagemDeInfo("Você não possui extratos nessas datas")
    })

  }

}
