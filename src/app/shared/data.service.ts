import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private newProductAddedSource = new Subject<void>();
  newProductAdded$ = this.newProductAddedSource.asObservable();

  constructor() { }
  
  notifyNewProductAdded() {
    this.newProductAddedSource.next();
    console.log('product notified in data service.')
  }
}
