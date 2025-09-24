/*
  COMPONENTE HEADER (BARRA DE NAVEGACIÓN)
  Componente reutilizable que muestra la navegación principal con carrito de compras
*/

// Importaciones necesarias de Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

// Importar el servicio del carrito y la directiva
import { CartService, CartItem } from '../../services/cart.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

/*
  CONFIGURACIÓN DEL COMPONENTE HEADER CON CARRITO
*/
@Component({
  // Selector: Nombre del tag HTML para usar este componente (<app-header>)
  selector: 'app-header',

  // standalone: true = Componente independiente (no necesita NgModule)
  standalone: true,

  // imports: Módulos que este componente necesita usar
  imports: [
    RouterModule,  // Para poder usar routerLink en los enlaces de navegación
    CommonModule,  // Para usar directivas como *ngFor, *ngIf
    ClickOutsideDirective  // Para detectar clicks fuera del carrito
  ],

  // Template HTML que define la estructura visual del header
  templateUrl: './header.html',

  // Estilos CSS específicos para este componente
  styleUrl: './header.css'
})

/*
  CLASE DEL COMPONENTE HEADER CON FUNCIONALIDAD DE CARRITO
*/
export class HeaderComponent implements OnInit, OnDestroy {
  // Variables para el estado del carrito
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartCount = 0;
  isCartOpen = false;

  // Subscription para limpiar observables
  private subscriptions: Subscription = new Subscription();

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del carrito
    this.subscriptions.add(
      this.cartService.cart$.subscribe(items => {
        this.cartItems = items;
      })
    );

    this.subscriptions.add(
      this.cartService.total$.subscribe(total => {
        this.cartTotal = total;
      })
    );

    this.subscriptions.add(
      this.cartService.count$.subscribe(count => {
        this.cartCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.unsubscribe();
  }

  // Alternar visibilidad del carrito
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  // Cerrar carrito
  closeCart(): void {
    this.isCartOpen = false;
  }

  // Aumentar cantidad de un producto
  increaseQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  // Disminuir cantidad de un producto
  decreaseQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      this.cartService.removeFromCart(productId);
    }
  }

  // Remover producto del carrito
  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  // Proceder al checkout
  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    alert(`Procediendo al checkout con ${this.cartItems.length} productos por un total de $${this.cartTotal.toLocaleString('es-CO')}`);
  }

  // Formatear precio en pesos colombianos
  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }
  // Sin propiedades ni métodos por ahora
}
