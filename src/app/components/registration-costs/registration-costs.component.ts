import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { CostsService } from '../../services/costs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-costs',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './registration-costs.component.html',
  styleUrls: ['./registration-costs.component.css'],
})
export class RegistrationCostsComponent {
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

  saveDespesa() {
    if (this.despesa.cod_desp && this.despesa.desc_desp) {
      this.despesa.tp_desp = Number(this.despesa.tp_desp);
      this.despesa.valor_unit = parseFloat(this.despesa.valor_unit?.toString() || '0');

      if (this.despesa.id) {
        this.apiService.updateDespesa(this.despesa).subscribe(
          (response) => {
            const index = this.despesas.findIndex((d) => d.id === this.despesa.id);
            if (index !== -1) {
              this.despesas[index] = { ...this.despesa };
            }
            alert('Cadastro feito com sucesso!');
            this.router.navigate(['/'])
          },
          (error) => {
            console.error('Erro ao salvar despesa:', error);
          }
        );
      } else {
        this.apiService.addDespesa(this.despesa).subscribe(
          (response) => {
            alert('Cadastro feito com sucesso!');
            this.router.navigate(['/'])
          },
          (error) => {
            console.error('Erro ao salvar despesa:', error);
          }
        );
      }
    }
  }


  editDespesa(despesa: any) {
    this.despesa = { ...despesa };
  }

  deleteDespesa(despesa: any) {
    this.apiService.deleteDespesa(despesa.cod_desp).subscribe(
      (response) => {
        this.despesas = this.despesas.filter((item) => item !== despesa);
      },
      (error) => {
        console.error('Erro ao excluir despesa:', error);
      }
    );
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
