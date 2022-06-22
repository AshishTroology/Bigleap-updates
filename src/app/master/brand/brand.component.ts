import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent {
  brands: any = [
    {
      BrandID: '73653746',
      BrandName: 'Chai',
      brandstatus: true,
    },
  ];

  createNewBrand(): Brand {
    return new Brand();
  }

  onAddBrand(form:NgForm){
    if (form.invalid) {
      return;
    }
    console.log(form.form.value);
    this.brands.push(form.form.value);
    this.createNewBrand();
  };
}
