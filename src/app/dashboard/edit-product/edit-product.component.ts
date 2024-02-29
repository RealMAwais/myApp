import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { productData } from '../products/products.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: any;
  productImage: any;
  selectedFile!: File;
  selectedProduct: productData = new productData;
  editForm: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storage: AngularFireStorage
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      picture: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.firstChild?.params['id'];
    this.getProductDetails(this.productId);
  }
  getProductDetails(productId: any) {
    this.apiService.getProductById(productId).subscribe((product: any) => {
      this.selectedProduct = product;
      console.log('product:', this.selectedProduct)
      this.onEdit();
    });
  }
  onEdit() {
    this.editForm.setValue({
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
      picture: this.selectedProduct.picture
    });
    this.productImage = this.selectedProduct.picture;
  }

  // async onUpdate() {
  //   this.apiService.ngxServiceLoader();
  //   const filePath = `productImages/${Date.now()}`;
  //   const snap = await this.storage.upload(filePath, this.productImage ? this.productImage : this.selectedFile);
  //   this.getUrlForImage(snap);
  // }
  // async getUrlForImage(snap: any) {
  //   const url = await snap.ref.getDownloadURL();
  //   if (url) {
  //     const userObject = this.editForm.value;
  //     userObject['picture'] = url;
  //     this.apiService.updateProduct(userObject, this.productId);
  //     this.editForm.reset();
  //   }
  // }

  async onUpdate() {
    this.apiService.ngxServiceLoader();
    if (this.selectedFile) {
      const filePath = `productImages/${Date.now()}`;
      const snap = await this.storage.upload(filePath, this.selectedFile);
      const url = await snap.ref.getDownloadURL();
      if (url) {
        this.productImage = url;
      }
    }
    const userObject = this.editForm.value;
    userObject['picture'] = this.productImage;
    this.apiService.updateProduct(userObject, this.productId);
    this.editForm.reset();
  }


  addImage(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.productImage = URL.createObjectURL(this.selectedFile);
    }
    this.apiService.ngxServiceLoader();
  }
}
