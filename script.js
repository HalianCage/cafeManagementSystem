// Function to place an order
function placeOrder() {
    const customerName = document.getElementById('orderCustomerName').value;
    const items = document.getElementById('orderItems').value.split(',').map(item => item.trim());
    const totalAmount = parseFloat(document.getElementById('orderTotal').value);

    // Check if the input fields are filled correctly
    if (!customerName || items.length === 0 || isNaN(totalAmount)) {
        alert('Please fill in all the fields correctly.');
        return;
    }

    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerName, items, totalAmount }),
    })
    .then(response => response.json())
    .then(data => {
        // Log the success message and order details in the console
        console.log('Order placed successfully!', data);

        // Clear the input fields
        document.getElementById('orderCustomerName').value = '';
        document.getElementById('orderItems').value = '';
        document.getElementById('orderTotal').value = '';

        // Optionally, alert the user that the order was placed successfully
        alert('Order placed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while placing the order.');
    });
}




// Function to fetch orders
function fetchOrders() {
    fetch('/order')
    .then(response => response.json())
    .then(orders => {
        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = '';
        orders.forEach(order => {
            const listItem = document.createElement('li');
            listItem.textContent = `Order ID: ${order.orderId}, Customer: ${order.customerName}, Status: ${order.status}`;
            ordersList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to reserve a table
function reserveTable() {
    const customerName = document.getElementById('reservationCustomerName').value;

    fetch('/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerName }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Table reserved successfully!');
        console.log('Reservation:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to fetch reservations
function fetchReservations() {
    fetch('/reservations')
    .then(response => response.json())
    .then(reservations => {
        const reservationsList = document.getElementById('reservationsList');
        reservationsList.innerHTML = '';
        reservations.forEach(reservation => {
            const listItem = document.createElement('li');
            listItem.textContent = `Reservation ID: ${reservation.reservationId}, Table: ${reservation.tableId}, Customer: ${reservation.customerName}, Status: ${reservation.status}`;
            reservationsList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
