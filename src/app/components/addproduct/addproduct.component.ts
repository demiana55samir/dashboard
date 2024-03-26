import { Component } from '@angular/core';
import { Iproducts } from '../../models/iproducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  products: Iproducts[];

  constructor(private router : Router) {
    this.products = [
      {
        id: 100,
        name: 'iphone',
        quantity: 10,
        price: 50000,
        imageUrl: 'https://fakeimg.pl/250x100/',
        catName: 'string',
        catId: 1,
      },
      {
        id: 200,
        name: 'labtop',
        quantity: 10,
        price: 50000,
        imageUrl: 'https://fakeimg.pl/250x100/',
        catName: 'string',
        catId: 2,
      },
      {
        id: 300,
        name: 'clothes',
        quantity: 10,
        price: 50000,
        imageUrl: 'https://fakeimg.pl/250x100/',
        catName: 'string',
        catId: 3,
      },
      {
        id: 400,
        name: 'jewellary',
        quantity: 10,
        price: 50000,
        imageUrl: 'https://fakeimg.pl/250x100/',
        catName: 'string',
        catId: 4,
      },
    ];
  }

  goHome(){
    this.router.navigateByUrl("/home")
  }
}
