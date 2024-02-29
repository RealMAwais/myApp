import { Pipe, PipeTransform } from '@angular/core';
import { productData } from './dashboard/products/products.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(myLocalArray: productData[], searchValue: string): productData[]{
    if (!myLocalArray || !searchValue){
      return myLocalArray;
    }
    return myLocalArray.filter(data => 
      data.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.price.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
  }

}
