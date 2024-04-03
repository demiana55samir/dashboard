import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproducts';
import {  Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  products: Iproduct[] = [];
  // product?:Iproduct ;

  productObj: Iproduct = {
    name: '',
    id: '',
    price: '',
    quantity: '',
    imageUrl: '',
    catName: '',
    catId: '',
  };

  name: string = '';
  id: string = '';
  price: string = '';
  quantity: string = '';
  imageUrl: string = '';
  catName: string = '';
  catId: string = '';

  constructor(private router: Router, private data: DataService) {
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.data.getAllProducts().subscribe(
      (products) => {
        this.products = products as Iproduct[];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  resetForm() {
    this.id = '';
    this.name = '';
    this.price = '';
    this.quantity = '';
    this.catId = '';
  }
  addProduct() {
    this.productObj.id = '';
    this.productObj.name = this.name;
    this.productObj.price = this.price;
    this.productObj.quantity = this.quantity;
    this.productObj.catId = this.catId;

    this.data.addProduct(this.productObj);

    this.resetForm();
  }

  updateProduct(id: string, product: Iproduct): void {
    this.productObj = { ...product };

    this.router.navigate(['/edit-product', id, product]);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.data
        .deleteProduct(productId)
        .then(() => {
          console.log('product deleted successfully');
          // this.data.deleteProduct(productId);
          this.getAllProducts();
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  }

}
