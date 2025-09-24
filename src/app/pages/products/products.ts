import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, Product } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  
  constructor(private cartService: CartService) {}

  // Método para agregar producto al carrito
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Productos disponibles
  products: Product[] = [
    {
      id: 'gaming-extreme',
      name: 'PC Gaming Extreme',
      price: 2499000,
      image: '/imagenes/computador7.jpg'
    },
    {
      id: 'laptop-business',
      name: 'Laptop Business Pro',
      price: 1299000,
      image: '/imagenes/computador9.jpg'
    },
    {
      id: 'pc-office',
      name: 'PC Office Master',
      price: 899000,
      image: '/imagenes/computador10.jpg'
    },
    {
      id: 'laptop-gaming',
      name: 'Laptop Gaming ROG',
      price: 1999000,
      image: '/imagenes/computador2.jpg'
    },
    {
      id: 'workstation-pro',
      name: 'Workstation Pro Max',
      price: 4599000,
      image: '/imagenes/computador3.jpg'
    },
    {
      id: 'all-in-one',
      name: 'PC All-in-One Elite',
      price: 1799000,
      image: '/imagenes/computador4.jpg'
    },
    {
      id: 'ultrabook-premium',
      name: 'Ultrabook Premium',
      price: 1599000,
      image: '/imagenes/computador5.jpg'
    },
    {
      id: 'gaming-rgb',
      name: 'PC Gaming RGB Master',
      price: 2199000,
      image: '/imagenes/computador6.jpg'
    }
  ];

  // Formatear precio
  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }
}
