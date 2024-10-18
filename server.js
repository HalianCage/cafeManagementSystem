const express = require('express');
const ordersRouter = require('./routes/order');
const reservationsRouter = require('./routes/reservations');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
global.orders = [];
global.reservations = [];
global.tables = {
  T1: { neighbors: { T2: 1, T4: 1 }, status: "available" },
  T2: { neighbors: { T1: 1, T3: 1, T5: 1 }, status: "available" },
  T3: { neighbors: { T2: 1, T6: 1 }, status: "available" },
  T4: { neighbors: { T1: 1, T5: 1, T7: 1 }, status: "available" },
  T5: { neighbors: { T2: 1, T4: 1, T6: 1, T8: 1 }, status: "available" },
  T6: { neighbors: { T3: 1, T5: 1, T9: 1 }, status: "available" },
  T7: { neighbors: { T4: 1, T8: 1 }, status: "available" },
  T8: { neighbors: { T5: 1, T7: 1, T9: 1 }, status: "available" },
  T9: { neighbors: { T6: 1, T8: 1 }, status: "available" },
};
global.nextOrderId = 1;
global.nextReservationId = 1;

// Register routes
app.use('/order', ordersRouter);
app.use('/reservations', reservationsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
