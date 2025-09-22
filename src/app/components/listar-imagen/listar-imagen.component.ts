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
  constructor(private _imagenService:ImagenService) { 
    this.suscripcion=this._imagenService.getTerminoBusqueda().subscribe(data=>{
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}
