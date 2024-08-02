document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');

    const updateCart = () => {
        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x R${item.price}</span>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = total;
        cartCount.innerText = cart.length;

        // Attach remove event to new buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    };

    const addToCart = (name, price, quantity) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    };

    const removeFromCart = (event) => {
        const name = event.target.getAttribute('data-name');
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const quantity = parseInt(event.target.parentElement.querySelector('.count').value);
            addToCart(name, price, quantity);
        });
    });
});
