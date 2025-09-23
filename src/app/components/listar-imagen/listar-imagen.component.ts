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
  constructor(private _imagenService:ImagenService) { 
    this.suscripcion=this._imagenService.getTerminoBusqueda().subscribe(data=>{
      this.termino=data;
      this.obtenerImagenes();
    })
  }

  ngOnInit(): void {
  }
  obtenerImagenes(){
    this.loading=true;
    this._imagenService.getImagenes(this.termino).subscribe(data=>{
      if(data.hits.length===0){
        this._imagenService.setError('Obs... no hay resultados');
        return;
      }
      setTimeout(()=>{
        this.loading=false;
        this.listImagenes=data.hits;
      },2000);
      
      console.log(this.listImagenes);
    })
  }
}
