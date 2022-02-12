import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interface/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api="http://localhost:3000";

  constructor(
    private http:HttpClient 
    ) { }

    getAllCategoria(){
      const path = `${this.api}/categorias/`;
      return this.http.get<Categoria[]>(path);
    }
    createCategoria(categoria : Categoria){
      const path = `${this.api}/categorias/`;
      return this.http.post<Categoria>(path, categoria);
    }
    updateCategoria(categoria : Categoria){
      const path = `${this.api}/categorias/${categoria.Id}`;
      return this.http.put<Categoria>(path, categoria);
    }
    deleteCategoria(Id : number ){
      const path = `${this.api}/categorias/${Id}`;
      return this.http.delete<Categoria>(path);
    }
}