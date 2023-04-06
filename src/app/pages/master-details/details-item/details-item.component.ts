import { UtilsService } from 'src/app/services/utils.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ControlInput } from 'src/app/core/classes/Control.class';

setDefaultOptions({ locale: ptBR });

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss'],
})
export class DetailsItemComponent {
  form: { [id: string]: ControlInput } = {
    name: new ControlInput({
      label: 'Nome',
      config: {
        name: 'name',
        hint: 'Nome do usuário',
        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    cpf: new ControlInput({
      label: 'CPF',
      config: {
        name: 'cpf',
        required: true,
        maxlength: 14,
        customValidators: { cpfValidator: true },
        mask: true,
        maskConfig: {
          mask: '000.000.000-00',
          dropSpecialCharacters: true,
          validation: true,
        },
        errors: {
          required: 'Campo obrigatório',
          maxlength: 'Máximo de 100 caracteres',
          mask: 'CPF imcompleto',
          invalidCpf: 'CPF inválido',
        },
      },
    }),
    simpleDate: new ControlInput({
      label: 'Data simples',
      config: {
        name: 'simpleDate',
        type: 'text',
        hint: 'DD/MM/AAAA',

        required: true,

        dateConfig: {
          minDate: new Date(2020, 0, 1),
        },

        errors: {
          required: 'Campo obrigatório',
          minlength: 'Mínimo de 3 caracteres',
        },
      },
    }),

    url: new ControlInput({
      label: 'Url',
      config: {
        name: 'url',

        required: true,
        maxlength: 100,
        minlength: 10,
        customValidators: {
          urlValidator: true,
        },
        errors: {
          required: 'Campo obrigatório',
          minlength: 'Mínimo de 10 caracteres',
          maxlength: 'Máximo de 100 caracteres',
          invalidUrl: 'Url inválida',
        },
      },
    }),

    select: new ControlInput({
      label: 'Select',
      selectOptions: [
        { name: 'Opção 1', value: '1' },
        { name: 'Opção 2', value: '2' },
        { name: 'Opção 3', value: '3' },
      ],
      config: {
        name: 'select',

        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
  };

  @ViewChild('reactiveForm') formRef!: NgForm;
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}

  getErrorText(control: ControlInput) {
    return this.utilsService.getErrorText(this.formRef, control);
  }

  maskFilled(control: ControlInput) {
    console.log('maskFilled');
  }

  dateEvents(name: string, event: any) {
    console.log('dateEvents', name, event);
  }

  onSubmit() {
    console.log('onSubmit', this.formRef);
  }
}