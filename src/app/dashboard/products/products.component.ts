import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { productData } from './products.model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'productsComponent',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class productsComponent implements OnInit {

  employeeModelObject: productData = new productData;
  productForm: FormGroup;
  myLocalArray: any = [];
  searchValue: any;
  totalLength: any;
  p: any;
  formattedArray: any = {};
  editValue: any;
  editableId: any;
  deleteIndexId: any;
  selectedFile!: File;
  productImage: any;
  sortingOrder: string = 'ascending';
  mySelectedIndexFilter: any;
  url: any;
  deleted: any;
  searchQuery: string = '';
  hasSearchQuery: boolean = false;
  selectedItem: any;
  currentUser: any;

  ngOnInit() {
    this.getAllData();
    this.apiService.ngxServiceLoader();
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      // console.log('current user :', this.currentUser);
    });
  }

  constructor(
    private apiService: ApiService,
    private storage: AngularFireStorage,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      picture: new FormControl('')
    });
  }

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    picture: new FormControl('')
  });

  onEdit(id: any) {
    // debugger
    const mySelectedIndexFilter = this.myLocalArray.find((data: any) => data.id === id);
    this.editForm.setValue({
      name: mySelectedIndexFilter.name,
      price: mySelectedIndexFilter.price,
      description: mySelectedIndexFilter.description,
      picture: mySelectedIndexFilter.picture
    });
    this.productImage = mySelectedIndexFilter.picture;
    this.editableId = id;
  }

  async onUpdate() {
    this.apiService.ngxServiceLoader();
    const filePath = `productImages/${Date.now()}`;
    const snap = await this.storage.upload(filePath, this.selectedFile);
    this.getUrlForImage(snap);
  }

  async getUrlForImage(snap: any) {
    const url = await snap.ref.getDownloadURL();
    if (url) {
      const userObject = this.editForm.value;
      userObject['picture'] = url;
      this.apiService.updateProduct(userObject, this.editableId);
      this.editForm.reset();
    }
  }

  async uploadDataoFireStorage() {
    this.apiService.ngxServiceLoader();
    const filePath = `productImages/${Date.now()}`;
    const snap = await this.storage.upload(filePath, this.selectedFile);
    this.getUrl(snap);
  }

  async getUrl(snap: any) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;
    if (url) {
      let userObject = this.productForm.value;
      userObject['picture'] = url;
      userObject['userId'] = this.currentUser.uid;
      this.apiService.addProduct(userObject);
      // this.dataService.notifyNewProductAdded();
      this.productForm.reset();
    }
    this.productImage = '';
  }

  deleteProduct(deleteIndexId: any) {
    // debugger
    this.apiService.ngxServiceLoader();
    this.apiService.deleteProduct(deleteIndexId);
  }

  getAllData(): void {
    this.apiService.getProducts().subscribe((fireBaseData: any) => {
      this.myLocalArray = fireBaseData;
    });
  }

  addImage(event: any) {
    this.selectedFile = event.target.files[0];
    this.apiService.ngxServiceLoader();
  }
  sortArray(property: any, order: string) {
    if (order == 'ascending') {
      this.myLocalArray.sort((a: any, b: any) => b[property] > a[property] ? -1 : 1);
      this.sortingOrder = 'descending';
    } else {
      this.myLocalArray.sort((a: any, b: any) => b[property] > a[property] ? 1 : -1);
      this.sortingOrder = 'ascending';
    }
  }

  resetForm() {
    this.productForm.reset();
  }

  get f() {
    return this.productForm.controls;
  }
  resetFilters() {
    this.searchQuery = '';
    this.hasSearchQuery = false;
    this.getAllData();
  }
  searchButton() {
    if (this.myLocalArray.length) {
      const filteredDataArr = this.myLocalArray.filter((data: any) =>
        data.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        data.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.myLocalArray = filteredDataArr;
    } else {
      return this.myLocalArray;
    }
  }
  openFileInput() {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.click();
  }
  viewImage(id: any) {
    const selectedItem = this.myLocalArray.find((data: any) => data.id === id);
    this.productImage = selectedItem.picture;
    this.selectedItem = selectedItem;
  }
  // viewProduct(productId: string) {
  //   this.apiService.setProductId(productId);
  //   this.router.navigate(['/view-product']);
  // }
  viewProduct(productId: string) {
    this.apiService.setProductId(productId);
    this.router.navigate(['/view-product', productId]);
  }
}
