import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit,OnDestroy {
  textoError:string='';
  mostrarError:boolean=false;
  suscripcion:Subscription;
  constructor(private _imagenService:ImagenService) { 
    this.suscripcion=this._imagenService.getError().subscribe(data=>{
      this.mostrarError=true;
      this.textoError=data;
      setTimeout(()=>{
        this.mostrarError=false;
      },2000)
      
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
