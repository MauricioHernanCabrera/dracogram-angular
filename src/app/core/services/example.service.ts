import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Example } from './../../models/example.model';
// import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamplesService {
  constructor(private http: HttpClient) {}

  // getAll() {
  //   return this.http.get<Example[]>(`${environment.url_api}/examples/`);
  // }

  // getOne(id: string) {
  //   return this.http.get<Example>(`${environment.url_api}/examples/${id}`);
  // }

  // createOne(example: Example) {
  //   return this.http.post(`${environment.url_api}/examples/`, example);
  // }

  // updateOne(id: string, example: Partial<Example>) {
  //   return this.http.put(`${environment.url_api}/examples/${id}`, example);
  // }

  // deleteOne(id: string) {
  //   return this.http.delete(`${environment.url_api}/examples/${id}`);
  // }
}
