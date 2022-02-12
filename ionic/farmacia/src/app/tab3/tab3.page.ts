import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Producto } from './interface/producto';
import { ProductoService } from './service/producto.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  
  producto: Producto[]=[];
  constructor(
    private productoService : ProductoService,
    private alertController: AlertController,
    private toastCtrl:ToastController
    ) { }

    ngOnInit(): void {
      this.getAllProducto();   
     }

     getAllProducto(){
      this.productoService.getAllProducto()
      .subscribe(todos =>{
        this.producto=todos
        
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
          name: 'Cantidad',
          type: 'number',
          placeholder: 'Cantidad'
        },
        {
          name: 'Precio_compra',
          type: 'number',
          placeholder: 'Precio_compra '
        },
        {
          name: 'Precio_venta',
          type: 'number',
          placeholder: 'Precio_venta'
        },
        {
          name: 'Proveedor',
          type: 'number',
          placeholder: 'Proveedor'
        },
        {
          name: 'Categoria',
          type: 'number',
          placeholder: 'Categoria'
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
            this.createCategoria(data.Nombre,data.Cantidad,data.Precio_compra,data.Precio_venta,data.Proveedor,data.Categoria);
            console.log('Confirm Ok');
          }
        }
        ] 
      });
      await alert.present();
    }

   async createCategoria( Nombre: string, Cantidad: number, Precio_compra: number, Precio_venta: number, Proveedor: number, Categoria: number) {
      const producto={
        Codigo: null,
        Nombre,
        Cantidad,
        Precio_compra,
        Precio_venta, 
        Proveedor,
        Categoria

      };
      this.productoService.createProducto(producto)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("El producto fue agregado");
        this.getAllProducto(); 
      })     
    }

    deleteProducto(Codigo:number,index:number){
      this.productoService.deleteProducto(Codigo)
      .subscribe(()=>{
       
        this.producto.splice(index,1);
        this.presentToast('Su producto fue eliminado');
        this.getAllProducto();
      })
      
    }

    async onUpdateProducto(Codigo:number,index:number){
      const productoactual = this.producto.find(x => x.Codigo=== Codigo)
      const alert = await this.alertController.create({
        header: 'Nuevo Proveedor',
        inputs:[{
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: productoactual.Nombre
        },
        {
          name: 'Cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          value: productoactual.Cantidad
        },
        {
          name: 'Precio_compra',
          type: 'number',
          placeholder: 'Precio compra',
          value: productoactual.Precio_compra
        },
        {
          name: 'Precio_venta',
          type: 'number',
          placeholder: 'Precio venta',
          value: productoactual.Precio_venta
        },
        {
          name: 'Proveedor',
          type: 'number',
          placeholder: 'Proveedor',
          value: productoactual.Proveedor
        },
        {
          name: 'Categoria',
          type: 'number',
          placeholder: 'Categoria',
          value: productoactual.Categoria
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
            this.updateProducto(Codigo,data.Nombre,data.Cantidad,data.Precio_compra,data.Precio_venta,data.Proveedor,data.Categoria);
            console.log('Update Ok');
          }
        }
        ] 
      });
      await alert.present();
    }

    async updateProducto(Codigo: number,Nombre: string, Cantidad: number, Precio_compra: number, Precio_venta: number, Proveedor: number, Categoria: number) {
      const producto={
        Codigo: Codigo,
        Nombre,
        Cantidad,
        Precio_compra,
        Precio_venta, 
        Proveedor,
        Categoria

      };
      this.productoService.updateProducto(producto)
      .subscribe((data)=>{
        console.log("entra");
        this.presentToast("El producto fue actualizado");
        this.getAllProducto(); 
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
