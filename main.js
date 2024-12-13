//Mobile version Menu Button
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

//  elements
const cartTable = document.querySelector(".summary-table tbody");
const totalCell = document.getElementById("Total");

// Quantity Inputs
document.querySelectorAll('.med input[type="number"]').forEach(input => {
    input.addEventListener("change", updateTable);
});

// Clear the cart
function updateTable() {
    cartTable.innerHTML = "";
    let total = 0;

    document.querySelectorAll(".med .product-box").forEach(box => {
        const quantity = box.querySelector("input").value;
        const price = parseFloat(box.querySelector(".price").innerHTML.replace("$", ''));
        const title = box.querySelector(".product-title").innerHTML;

        // Add items to the table
        if (quantity > 0) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${box.closest(".med").querySelector(".section-title").innerText}</td>
                <td>${title}</td>
                <td>${quantity}</td>
                <td>$${(quantity * price).toFixed(2)}</td>
            `;

            cartTable.appendChild(row);

            // Update total price
            total += quantity * price;
        }
    });

    totalCell.innerText = `$${total.toFixed(2)}`;
}

// Add Favourite Button
document.getElementById("add-favourites").addEventListener("click", () => {
    let cartItems = [];

    document.querySelectorAll(".med .product-box").forEach(box => {
        const quantity = box.querySelector("input").value;
        if (quantity > 0) {
            const title = box.querySelector(".product-title").innerText;
            const price = parseFloat(box.querySelector(".price").innerText.replace('$', ''));

            cartItems.push({
                section: box.closest(".med").querySelector(".section-title").innerText,
                title: title,
                quantity: quantity,
                price: price
            });
        }
    });

    localStorage.setItem("favourites", JSON.stringify(cartItems));
    alert("Added to Favourites!");
});

// Apply Favourite Button
document.getElementById("apply-favourites").addEventListener("click", () => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));

    if (favourites && favourites.length > 0) {
        cartTable.innerHTML = "";
        document.querySelectorAll('.med input[type="number"]').forEach(input => {
            input.value = 0;
        });

        let total = 0;

        favourites.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.section}</td>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
            `;
            cartTable.appendChild(row);

            total += item.quantity * item.price;

            // Set input values for saved items
            document.querySelectorAll('.med .product-box').forEach(box => {
                if (box.querySelector(".product-title").innerText === item.title) {
                    box.querySelector("input").value = item.quantity;
                }
            });
        });

        totalCell.innerText = `$${total.toFixed(2)}`;
    } else {
        alert("No favourites saved!");
    }
});

// Buy Now Button
document.getElementById('buy-now').addEventListener('click', function () {
    const cartItems = [];
    document.querySelectorAll(".med .product-box").forEach(box => {
        const quantity = box.querySelector("input").value;
        if (quantity > 0) {
            const title = box.querySelector(".product-title").innerText;
            const price = parseFloat(box.querySelector(".price").innerText.replace('$', ''));

            cartItems.push({
                title: title,
                quantity: quantity,
                price: price,
                subtotal: (quantity * price).toFixed(2)
            });
        }
    });

    const total = document.getElementById("Total").innerText;

    localStorage.setItem("orderDetails", JSON.stringify({ cartItems, total }));

    window.location.href = 'Order.html';
});