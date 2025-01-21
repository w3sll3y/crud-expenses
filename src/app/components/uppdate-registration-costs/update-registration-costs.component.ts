import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { CostsService } from '../../services/costs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-costs',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './update-registration-costs.component.html',
  styleUrls: ['./update-registration-costs.component.css'],
})
export class UpdateRegistrationCostsComponent implements AfterViewInit {
  apiService = inject(CostsService);
  router = inject(Router);

  despesas: any[] = [];
  despesa = {
    cod_desp: null as number | null,
    Unidade: '',
    desc_desp: '',
    tp_desp: null as number | null,
    valor_unit: null as number | null,
    id: null as number | null,
  };

  ngAfterViewInit() {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation?.extras?.state) {
      this.despesa = navigation.extras.state['despesa'];
      console.log('Despesa recebida no Update:', this.despesa);
    }
  }

  updateDespesa() {
    if (this.despesa.cod_desp && this.despesa.desc_desp) {
      this.despesa.tp_desp = Number(this.despesa.tp_desp);
      this.despesa.valor_unit = parseFloat(this.despesa.valor_unit?.toString() || '0');

      if (this.despesa.id) {
        this.apiService.updateDespesa(this.despesa).subscribe(
          (response) => {
            alert('Atualização feita com sucesso!');
            this.router.navigate(['/'])
          },
          (error) => {
            console.error('Erro ao salvar despesa:', error);
          }
        );
      }
    }
  }

  resetForm() {
    this.despesa = {
      cod_desp: null,
      Unidade: '',
      desc_desp: '',
      tp_desp: null,
      valor_unit: null,
      id: null,
    };
  }
}
