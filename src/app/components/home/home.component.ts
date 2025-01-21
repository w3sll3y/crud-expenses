import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoTableAction } from '@po-ui/ng-components';
import { CostsService } from '../../services/costs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  apiService = inject(CostsService);
  router = inject(Router);

  currentPage = 1;
  hasNext = true;

  public actions: Array<PoTableAction> = [];
  despesas: any[] = [];

  ngOnInit() {
    this.loadDespesas(this.currentPage);
    this.actions = this.getActions();
  }

  loadDespesas(page: number) {
    this.apiService.getDespesas(page).subscribe(
      (response) => {
        this.despesas = response.items;
        this.hasNext = response.hasNext;
      },
      (error) => {
        console.error('Erro ao carregar despesas:', error);
        if (error.status === 0) {
          console.error('Verifique se o servidor está ativo.');
        } else {
          console.error('Detalhes do erro:', error);
        }
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1) {
      this.currentPage = page;
      this.loadDespesas(page);
    }
  }

  getActions(): Array<PoTableAction> {
    return [
      { label: "Alterar", icon: "po-icon-change", action: this.navigateToUpdate.bind(this) },
      { label: "Excluir", icon: "po-icon-delete", action: this.deleteDespesa.bind(this), type: "danger" }
    ]
  }

  editDespesa(despesa: any) {
    this.despesas = { ...despesa };
  }

  navigateToUpdate(despesa: any) {
    this.router.navigate(['/update'], { state: { despesa } });
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
}
