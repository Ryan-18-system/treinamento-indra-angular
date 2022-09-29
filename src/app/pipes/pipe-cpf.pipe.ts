import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pipeCpf'
})
export class PipeCpfPipe implements PipeTransform {

  transform(value: string | undefined, ocultarAlgunsValores: boolean = false): string {
    let valorFormatado = value + '';
    valorFormatado = valorFormatado
      .padStart(11, '0')
      .substring(0, 11)
      .replace(/[^0-9]/, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4')

    if (ocultarAlgunsValores) {
      valorFormatado =
        '***.' + valorFormatado.substr(4, 7) + '-**';
    }
    return valorFormatado
  }

}

//Caso o tamanho do valor seja menor que 11, completaremos com zeros à esquerda.
//Caso o tamanho da string seja maior que 11, vamos pegar apenas até a décima primeira posição.
//Vamos retirar do valor qualquer coisa que não seja um número.
// Então se chegar algo como 111-22233344 o resultado será 11122233344
// Vamor extraír 3 grupos de 3 dígitos e depois 1 grupo de 2 dígitos para formatar o CPF conforme o seguinte:
// (3 dígitos).(3 dígitos).(3 dígitos)-(2 dígitos):
