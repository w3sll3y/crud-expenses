import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private apiUrl = 'http://179.125.208.125:8080/api/esp/v3/despesapadrao';

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Basic c3VwZXI6aW5vdmE=' });
    return this.http.get('http://179.125.208.125:8080/api/btb/v1/companies', { headers });
  }

  getDespesas(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3VwZXI6aW5vdmE=',
    });
    return this.http.get(`${this.apiUrl}?page=${page}`, { headers });
  }

  addDespesa(despesa: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3VwZXI6aW5vdmE='
    });
    return this.http.post(this.apiUrl, despesa, { headers });
  }

  updateDespesa(despesa: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3VwZXI6aW5vdmE='
    });
    return this.http.put(`${this.apiUrl}/${despesa.id}`, despesa, { headers });
  }

  deleteDespesa(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3VwZXI6aW5vdmE='
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
