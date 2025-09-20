import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {
  imagenBuscada:string='';
  constructor(private _serviceError:ImagenService) { }

  ngOnInit(): void {
  }
  buscarImagenes(){
    if(this.imagenBuscada===''){
      this._serviceError.setError('Error no debe ser vacio');
    }
    
  }
}
