const express = require('express');
const router = express.Router();

// Create a new order
router.post('/', (req, res) => {
  const { customerName, items, totalAmount } = req.body;
  const newOrder = {
    orderId: global.nextOrderId++,
    customerName,
    items,
    status: "pending",
    totalAmount,
  };
  global.orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get all orders
router.get('/', (req, res) => {
  res.json(global.orders);
});




// Update an order status
router.put('/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = global.orders.find(o => o.orderId == orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  order.status = status;
  res.json(order);
});

module.exports = router;
