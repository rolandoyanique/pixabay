import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino='';
  suscripcion:Subscription;
  listImagenes:any[]=[];
  loading:boolean=false;
  imagenesPorPagina = 30;
  paginaActual=1;
  calcularTotalPaginas=0;
  constructor(private _imagenService:ImagenService) { 
    this.suscripcion=this._imagenService.getTerminoBusqueda().subscribe(data=>{
      this.termino=data;
      this.paginaActual=1;
      this.obtenerImagenes();
    })
  }

  ngOnInit(): void {
  }
  obtenerImagenes(){
    this.loading=true;
    this._imagenService.getImagenes(this.termino,this.imagenesPorPagina,this.paginaActual).subscribe(data=>{
      if(data.hits.length===0){
        this._imagenService.setError('Obs... no hay resultados');
        return;
      }
      this.calcularTotalPaginas=Math.round(data.totalHits / this.imagenesPorPagina);
      setTimeout(()=>{
        this.loading=false;
        this.listImagenes=data.hits;
      },2000);
      
    })
  }
  paginaAnterior(){
    this.paginaActual--;
    this.listImagenes=[];
    this.obtenerImagenes();
  }
  paginaSiguiente(){
    this.paginaActual++;
    this.listImagenes=[];
    this.obtenerImagenes();
  }
  paginaAnteriorClass(){
    return this.paginaActual!=1;
  }
  paginaSiguenteClass(){
    return this.paginaActual<this.calcularTotalPaginas;
  }
}
