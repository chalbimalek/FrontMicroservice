import { Component } from '@angular/core';
import { CustomStompService } from 'src/app/service/custom-stomp.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    nom: '',
    prix: 0
  };

  constructor(private productService: ProductService, private CustomStompService:CustomStompService) {}

  // Méthode pour ajouter un produit
  addProduct() {
    this.productService.addProduct(this.product).subscribe(
      () => {
        console.log('Product added successfully');
        alert('Product added successfully');
        this.CustomStompService.sendNotification(`Product added: ${this.product.nom}`);

      },
      error => {
        console.error('Error adding product', error);
        alert('Failed to add product');
      }
    );
  }

}
