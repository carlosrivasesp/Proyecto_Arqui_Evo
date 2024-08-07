import { Component } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrl: './agregar-productos.component.css'
})
export class AgregarProductosComponent {

  listCategorias: Categoria[] = [];
  listMarcas: Marca[] = [];

  productoForm: FormGroup;

  constructor(private _productoService: ProductoService, private _categoriaService:CategoriaService, private _marcaService: MarcaService,
    private fb: FormBuilder, private router: Router, private toastr: ToastrService){
      this.productoForm = this.fb.group({
        codigo: ['',Validators.required],
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        imagen: ['', Validators.required],
        precio: ['', [Validators.required, Validators.min(0)]],
        stock: ['',[Validators.required, Validators.min(0)]],
        marca: ['',Validators.required]
      })
  }

  ngOnInit(): void {
    this.obtenerCategorias()
    this.obtenerMarcas()
  }

  agregarProducto(){
    const prod: Producto = {
      codigo: this.productoForm.get('codigo')?.value,
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      precio: this.productoForm.get('precio')?.value,
      stock: this.productoForm.get('stock')?.value,
      marca: this.productoForm.get('marca')?.value
    }
    this._productoService.postProductos(prod).subscribe(data =>{
      this.toastr.success('Producto registrado exitosamente.')
      this.router.navigate(['/productos'])
      this.productoForm.reset()
    }, error => {
      console.log(error)
      this.toastr.error('Ocurrió un error al agregar el producto.')
    })
  }

  obtenerCategorias(){
    this._categoriaService.getCategorias().subscribe(data =>{
      this.listCategorias = data
    }, error => {
      console.log(error)
    })
  }

  obtenerMarcas(){
    this._marcaService.getMarcas().subscribe(data =>{
      this.listMarcas = data
    }, error => {
      console.log(error)
    })
  }

}
