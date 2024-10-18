const express = require('express');
const dijkstra = require('../utils/dijkstra');
const router = express.Router();

// POST route to reserve a table
router.post('/', (req, res) => {
    const { customerName } = req.body;
    const startTable = 'T1'; // Assuming 'T1' as the default starting table

    // Find the nearest available table using Dijkstra's algorithm
    let nearestTable = null;
    let shortestPath = [];
    let shortestDistance = Infinity;

    for (const table in global.tables) {
        if (global.tables[table].status === 'available') {
            const { distance, path } = dijkstra(global.tables, startTable, table);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                shortestPath = path;
                nearestTable = table;
            }
        }
    }

    if (nearestTable) {
        // Reserve the table
        global.tables[nearestTable].status = 'reserved';
        const reservationId = global.nextReservationId++;
        const reservation = {
            reservationId,
            customerName,
            tableId: nearestTable,
            status: 'reserved',
            path: shortestPath,
        };
        global.reservations.push(reservation);
        res.json(reservation);
    } else {
        res.status(404).json({ message: 'No available tables found' });
    }
});

// GET route to get all reservations
router.get('/', (req, res) => {
    res.json(global.reservations);
});

module.exports = router;
