document.addEventListener("DOMContentLoaded", () =>{
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const orderDetails = document.getElementById("order-details");
    const oredrTotal = document.getElementById("order-total");

    let total = 0;
    cartItems.forEach(item =>{
        const listItem = document.createElement("li");
        listItem.textContent= `${item.name} x${item.quantity} - $${item.price}`;
        orderDetails.appendChild(listItem);
        total += item.quantity * item.price;
    });
    oredrTotal.textContent = `$${total.toFixed(2)}`;

    document.getElementById("pay-button").addEventListener("click", () =>{
        const fullName = document.getElementById("full-name").value;
        const address = document.getElementById("delivery-address").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const email = document.getElementById("email").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        if (fullName && address && phoneNumber && email && cardNumber && expiryDate && cvv){
            alert(`Thank you for your purchase, ${fullName}!\nYour order will be delivered by ${getDeliveryDate()}.`);
            localStorage.clear();
        }
        else{
            alert("Please complete all fields properly.");
        }
    });
});

function getDeliveryDate(){
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate()+3);
    return deliveryDate.toDateString();
}