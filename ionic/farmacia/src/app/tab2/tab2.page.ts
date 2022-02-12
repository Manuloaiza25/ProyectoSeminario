import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Proveedor } from './interface/proveedor';
import { ProveedorService } from './service/proveedor.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  proveedor: Proveedor[]=[];
  constructor(
    private proveedorService : ProveedorService,
    private alertController: AlertController,
    private toastCtrl:ToastController
    ) { }

    ngOnInit(): void {
      this.getAllProveedor();   
     }

     getAllProveedor(){
      this.proveedorService.getAllProveedor()
      .subscribe(todos =>{
        this.proveedor=todos
        
      });
    }

    async openAlert() {
      const alert = await this.alertController.create({
        header: 'Nuevo Proveedor',
        inputs:[{
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'Cedula',
          type: 'text',
          placeholder: 'Cedula'
        },
        {
          name: 'Telefono',
          type: 'text',
          placeholder: 'Telefono '
        },
        {
          name: 'Entidad',
          type: 'text',
          placeholder: 'Entidad'
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
            this.createCategoria(data.Nombre,data.Cedula,data.Telefono,data.Entidad);
            console.log('Confirm Ok');
          }
        }
        ] 
      });
      await alert.present();
    }

   async createCategoria( Nombre: string, Cedula: string, Telefono: string, Entidad: string) {
      const proveedor={
        Id: null,
        Nombre,
        Cedula,
        Telefono,
        Entidad

      };
      this.proveedorService.createProveedor(proveedor)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("El proveedor fue agregado");
        this.getAllProveedor(); 
      })     
    }

    deleteProveedor(Id:number,index:number){
      this.proveedorService.deleteProveedor(Id)
      .subscribe(()=>{
       
        this.proveedor.splice(index,1);
        this.presentToast('Su proveedor fue eliminado');
        this.getAllProveedor();
      })
      
    }

    async onUpdateProveedor(Id:number,index:number){
      const provedoractual = this.proveedor.find(x => x.Id=== Id)
      const alert = await this.alertController.create({
        header: 'Nuevo Proveedor',
        inputs:[{
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: provedoractual.Nombre
        },
        {
          name: 'Cedula',
          type: 'text',
          placeholder: 'Cedula',
          value: provedoractual.Cedula
        },
        {
          name: 'Telefono',
          type: 'text',
          placeholder: 'Telefono ',
          value: provedoractual.Telefono
        },
        {
          name: 'Entidad',
          type: 'text',
          placeholder: 'Entidad',
          value: provedoractual.Entidad
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
            this.updateProveedor(Id,data.Nombre,data.Cedula,data.Telefono,data.Entidad);
            console.log('Update Ok');
          }
        }
        ] 
      });
      await alert.present();
    }

    async updateProveedor(Id: number, Nombre: string, Cedula: string, Telefono: string, Entidad: string) {
      const proveedor={
        Id: Id,
        Nombre,
        Cedula,
        Telefono,
        Entidad

      };
      this.proveedorService.updateProveedor(proveedor)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("El proveedor fue actualizado");
        this.getAllProveedor(); 
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
