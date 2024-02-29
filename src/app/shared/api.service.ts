import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { productData } from '../dashboard/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productId = new BehaviorSubject<string>('');
  productId$ = this.productId.asObservable();

  constructor(
    private firebaseDb: AngularFireDatabase,
    private ngxService: NgxUiLoaderService
  ) { }

  getProducts(): Observable<any[]> {
    return this.firebaseDb.list('Product').valueChanges();
  }
  addProduct(productObject: productData) {
    const customId = this.generateCustomId(productObject.price);
    productObject.id = customId;
    this.firebaseDb.object('Product/' + customId).set(productObject);
    // Notify about the new product
    this.firebaseDb.list('Product-Notifications').push({ type: 'newProduct', productId: customId });
  }
  deleteProduct(productIndexId: any) {
    this.firebaseDb.object('Product/' + productIndexId).remove();
  }
  updateProduct(productObject: any, id: any) {
    this.firebaseDb.object('Product/' + id).update(productObject);
  }
  getProductById(productId: string): Observable<any> {
    return this.firebaseDb.object('Product/' + productId).valueChanges();
  }
  setProductId(id: any) {
    this.productId.next(id);
  }
  getNewProductAdded(): Observable<any> {
    return this.firebaseDb.list('Product-Notifications').valueChanges();
  }
  ngxServiceLoader() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 2000);
  }
  generateCustomId(prefix: string = 'custom'): string {
    const timestamp = new Date().getTime().toString(16);
    const random = Math.floor(Math.random() * 1000000).toString(16);
    const uniqueId = `${prefix}_${timestamp}_${random}`;
    return uniqueId;
  }

}
