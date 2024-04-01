import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iproduct } from '../models/iproducts';
import { IAdmins } from '../models/iAdmins';
import { Observable } from 'rxjs';
import { doc, deleteDoc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : AngularFirestore) { }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges({ idField: 'productId' });
  }

  getProduct(productId: string): Observable<any> {
    return this.firestore.doc(`products/${productId}`).valueChanges();
  }

  getAllProucts(){
    return this.firestore.collection('/prducts').snapshotChanges();
  }
  getAllProducts(): Observable<Iproduct[]> {
   return this.firestore.collection<Iproduct>('/products').valueChanges();
 }
  addProduct(product :Iproduct){
    product.id = this.firestore.createId();
    return this.firestore.collection('/products').add(product);
 }
  updateProduct(productId: string, product: any): Promise<void> {
    return this.firestore.doc(`products/${productId}`).update(product);
  }
        // let x =await this.firestore.doc(`products/${productId}`).delete();
      // console.log(x);

  // async deleteProduct(productId: string): Promise<void> {
  //   try {
  //     await deleteDoc(doc(this.firestore , "products", productId));
  //     console.log('Product deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //     throw error; 
  //   }
  // }
 /***************************************/
 addAdmin(admin :IAdmins){
  admin.id = this.firestore.createId();
  return this.firestore.collection('/admins').add(admin);
}

 getAllAdmins(){
  return this.firestore.collection('/admins').snapshotChanges();
}

deleteAdmin(admin :IAdmins){
  return this.firestore.doc('/admins'+admin.id).delete();
}

updateAdmin(admin :IAdmins){
return this.firestore.doc('/products'+admin.id).update(admin);
}

getAdmin(id:string){
  return this.firestore.doc('/admins'+id).valueChanges();
 }

}
