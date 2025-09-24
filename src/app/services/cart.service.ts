import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  
  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();
  
  private countSubject = new BehaviorSubject<number>(0);
  public count$ = this.countSubject.asObservable();

  constructor() {
    // Cargar carrito desde localStorage si existe
    this.loadCartFromStorage();
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    
    this.updateCartState();
    this.saveCartToStorage();
    this.showNotification(`${product.name} agregado al carrito`);
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartState();
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCartState();
        this.saveCartToStorage();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
    this.saveCartToStorage();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCartState(): void {
    this.cartSubject.next([...this.cartItems]);
    this.totalSubject.next(this.getTotal());
    this.countSubject.next(this.getItemCount());
  }

  private saveCartToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartState();
      }
    }
  }

  private showNotification(message: string): void {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✅</span>
        <span class="notification-text">${message}</span>
      </div>
    `;
    
    // Aplicar estilos
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(39, 174, 96, 0.3)',
      zIndex: '10000',
      animation: 'slideIn 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    });
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}