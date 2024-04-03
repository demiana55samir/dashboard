import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Iproduct } from '../../models/iproducts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  product: Iproduct = {
    name: '',
    id: '',
    price: '',
    quantity: '',
    catId: '',
    catName: '',
    imageUrl: '',
  };

  params: any;
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.productId = this.params.id;
    this.getProduct(this.params.id);
  }

  getProduct(productId: string): void {
    this.data.getProduct(productId).subscribe(
      (product) => {
        this.product = product as Iproduct;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  updateProduct(): void {
    this.data
      .updateProduct(this.productId as string, this.product)
      .then(() => {
        console.log('Product updated successfully');
        this.router.navigate(['/addproduct']);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }
}
