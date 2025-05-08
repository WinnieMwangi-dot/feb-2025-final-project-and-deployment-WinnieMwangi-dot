document.addEventListener('DOMContentLoaded', function() {
    // Load cart items when page loads
    loadCartItems();
    
    // Continue shopping button
    document.querySelector('.continue-shopping').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'products.html';
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        alert('Proceeding to checkout... Payment gateway would be integrated here.');
    });
    
    // Remove All button
    const removeAllBtn = document.getElementById('remove-all-btn');
    if (removeAllBtn) {
        removeAllBtn.addEventListener('click', removeAllItems);
    }
});

function loadCartItems() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items-container');
    
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }
    
    renderCartItems(cart);
    setupCartEventListeners();
    updateOrderSummary(calculateSubtotal(cart));
    enableCheckoutButton();
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function showEmptyCart() {
    const cartContainer = document.getElementById('cart-items-container');
    cartContainer.innerHTML = `
        <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <a href="products.html" class="btn">Start Shopping</a>
        </div>
    `;
    document.getElementById('checkout-btn').disabled = true;
    updateOrderSummary(0);
    updateCartCount();
}

function renderCartItems(cart) {
    const cartContainer = document.getElementById('cart-items-container');
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${getProductImage(item.id)}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <span class="cart-item-price">KSh ${Number(item.price).toLocaleString()}</span>
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="cart-item-total">
                    <p>KSh ${itemTotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
    
    // Add Remove All button at the bottom
    cartHTML += `
        <div class="cart-actions">
            <button id="remove-all-btn" class="btn-outline">
                <i class="fas fa-trash-alt"></i> Remove All Items
            </button>
        </div>
    `;
    
    cartContainer.innerHTML = cartHTML;
}

function setupCartEventListeners() {
    // Quantity minus buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), -1);
        });
    });
    
    // Quantity plus buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), 1);
        });
    });
    
    // Quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const newQuantity = parseInt(this.value);
            if (newQuantity >= 1) {
                updateQuantity(this.getAttribute('data-id'), newQuantity, true);
            } else {
                this.value = 1;
            }
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeItem(this.getAttribute('data-id'));
        });
    });
}

function updateQuantity(productId, change, setAbsolute = false) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (setAbsolute) {
            cart[itemIndex].quantity = change;
        } else {
            cart[itemIndex].quantity += change;
        }
        
        // Ensure quantity is at least 1
        if (cart[itemIndex].quantity < 1) {
            cart[itemIndex].quantity = 1;
        }
        
        saveCart(cart);
        loadCartItems();
        showNotification('Cart updated');
    }
}

function removeItem(productId) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const removedItem = cart.splice(itemIndex, 1)[0];
        saveCart(cart);
        loadCartItems();
        showNotification(`${removedItem.name} removed from cart`);
        
        // Add animation to cart icon
        const cartIcon = document.querySelector('header .fa-shopping-cart');
        if (cartIcon) {
            cartIcon.classList.add('cart-update');
            setTimeout(() => {
                cartIcon.classList.remove('cart-update');
            }, 500);
        }
    }
}

function removeAllItems() {
    if (confirm('Are you sure you want to remove all items from your cart?')) {
        localStorage.removeItem('cart');
        showEmptyCart();
        showNotification('All items removed from cart', 'success');
        
        // Add animation to cart icon
        const cartIcon = document.querySelector('header .fa-shopping-cart');
        if (cartIcon) {
            cartIcon.classList.add('cart-update');
            setTimeout(() => {
                cartIcon.classList.remove('cart-update');
            }, 500);
        }
    }
}

function calculateSubtotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateOrderSummary(subtotal) {
    const deliveryFee = subtotal >= 3000 ? 0 : 300; // Free delivery for orders over KSh 3000
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `KSh ${subtotal.toLocaleString()}`;
    document.getElementById('delivery').textContent = deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`;
    document.getElementById('total').textContent = `KSh ${total.toLocaleString()}`;
}

function enableCheckoutButton() {
    document.getElementById('checkout-btn').disabled = false;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function getProductImage(productId) {
    const productImages = {
        1: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
        2: 'https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        3: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        4: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
        5: 'https://images.unsplash.com/photo-1595341595379-cf0f0a13c3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        6: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
        7: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        8: 'https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        9: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80',
        10: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    };
    
    return productImages[productId] || 'https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(notification);
    
    // Position and style notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#ff6b6b';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.style.zIndex = '1000';
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}