import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Categoria } from './interface/categoria';
import { CategoriaService } from './service/categoria.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  categorias: Categoria[]=[];
  constructor(
    private categoriaService : CategoriaService,
    private alertController: AlertController,
    private toastCtrl:ToastController
    ) { }

    ngOnInit(): void {
      this.getAllCategoria();   
     }

     getAllCategoria(){
      this.categoriaService.getAllCategoria()
      .subscribe(todos =>{
        this.categorias=todos
        
      });
    }

    async openAlert() {
      const alert = await this.alertController.create({
        header: 'Nueva Categoria',
        inputs:[{
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'Descripcion',
          type: 'text',
          placeholder: 'Descripcion categoria'
        }
        ],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: (data) => {
            this.createCategoria( data.Nombre,data.Descripcion);
            console.log('Confirm Ok');
          }
        }
        ] 
      });
      await alert.present();
    }


   async createCategoria( Nombre: string, Descripcion: string) {
      const categoria={
        Id: null,
        Nombre,
         Descripcion
      };
      this.categoriaService.createCategoria(categoria)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("La categoria fue Agregada");
        this.getAllCategoria(); 
      })     
    }

    deleteCategoria(Id:number,index:number){
      this.categoriaService.deleteCategoria(Id)
      .subscribe(()=>{
       
        this.categorias.splice(index,1);
        this.presentToast('Su categoria fue eliminada');
        this.getAllCategoria();
      })
      
    }

    async onUpdateCategoria(Id:number,index:number){
      const categoriaactual = this.categorias.find(x => x.Id=== Id)
      const alert = await this.alertController.create({
        header: 'Nueva categoria',
        inputs:[{
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: categoriaactual.Nombre
        },
        {
          name: 'Descripcion',
          type: 'text',
          placeholder: 'Cedula',
          value: categoriaactual.Descripcion
        }
        ],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Actualizar',
          handler: (data) => {
            this.updateCategoria(Id,data.Nombre,data.Descripcion);
            console.log('Update Ok');
          }
        }
        ] 
      });
      await alert.present();
    }

    async updateCategoria(Id: number, Nombre: string, Descripcion: string) {
      const categoria={
        Id: Id,
        Nombre,
        Descripcion

      };
      this.categoriaService.updateCategoria(categoria)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("La categoria fue actualizada");
        this.getAllCategoria(); 
      })     
    }
    async presentToast(message: string){
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }

}
