/*
  FUNCIONALIDAD DEL CARRITO DE COMPRAS
  JavaScript para manejar el carrito en el navbar
*/

// Estado del carrito
let cart = [];
let cartTotal = 0;

// Funciones del carrito
function toggleCart() {
  const dropdown = document.getElementById('cartDropdown');
  dropdown.classList.toggle('show');
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartDisplay();
  showAddToCartNotification(product.name);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');

  // Actualizar contador
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

  // Actualizar total
  cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElement.textContent = cartTotal.toLocaleString('es-CO');

  // Actualizar items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Tu carrito está vacío</p>
        <span class="empty-cart-icon">🛍️</span>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString('es-CO')}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Actualizar botón de checkout
  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.disabled = cart.length === 0;
}

function showAddToCartNotification(productName) {
  // Crear notificación
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">✅</span>
      <span class="notification-text">${productName} agregado al carrito</span>
    </div>
  `;

  // Agregar estilos
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(39, 174, 96, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Eliminar después de 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  alert(`Procediendo al checkout con ${cart.length} productos por un total de $${cartTotal.toLocaleString('es-CO')}`);

  // Aquí se integraría con un sistema de pago real
}

// Cerrar carrito al hacer click fuera
document.addEventListener('click', function(event) {
  const cartContainer = document.querySelector('.cart-container');
  if (!cartContainer.contains(event.target)) {
    document.getElementById('cartDropdown').classList.remove('show');
  }
});

// Estilos para la notificación
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .cart-notification {
    animation: slideIn 0.3s ease;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notification-icon {
    font-size: 1.2rem;
  }

  .notification-text {
    font-weight: 500;
  }
`;
document.head.appendChild(notificationStyles);

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
  updateCartDisplay();
});
