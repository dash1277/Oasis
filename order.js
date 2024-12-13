// Order Page: Load Order Details
document.addEventListener("DOMContentLoaded", () => {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    if (orderDetails) {
        const { cartItems, total } = orderDetails;
        const orderTable = document.getElementById("order-details");
        const orderTotal = document.getElementById("order-total");

        cartItems.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.title} x${item.quantity} - $${item.subtotal}`;
            orderTable.appendChild(listItem);
        });

        orderTotal.textContent = total;
    }
});

// Pay Button
document.getElementById('pay-button').addEventListener('click', function () {
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('delivery-address').value;
    const phone = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (fullName && address && phone && email && cardNumber && expiryDate && cvv) {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 5);
        const formattedDate = deliveryDate.toLocaleDateString();

        alert(`Thank you for your purchase, ${fullName}! Your order will be delivered by ${formattedDate}.`);
    } else {
        alert('Please fill out all fields correctly.');
    }
});