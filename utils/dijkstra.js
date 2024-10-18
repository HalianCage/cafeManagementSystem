const PriorityQueue = require('js-priority-queue');

function dijkstra(graph, start, end) {
    const distances = {};
    const previousNodes = {};
    const queue = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });

    // Initialize distances and queue
    for (const node in graph) {
        if (node === start) {
            distances[node] = 0;
            queue.queue({ node, priority: 0 });
        } else {
            distances[node] = Infinity;
        }
        previousNodes[node] = null;
    }

    while (queue.length > 0) {
        const { node: currentNode } = queue.dequeue();

        if (currentNode === end) {
            // Reached the destination, build the path
            const path = [];
            let current = end;
            while (current !== null) {
                path.unshift(current);
                current = previousNodes[current];
            }
            return { distance: distances[end], path };
        }

        // Process neighbors
        for (const neighbor in graph[currentNode].neighbors) {
            const distance = graph[currentNode].neighbors[neighbor];
            const newDistance = distances[currentNode] + distance;

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previousNodes[neighbor] = currentNode;
                queue.queue({ node: neighbor, priority: newDistance });
            }
        }
    }

    // If the end node is not reachable
    return { distance: Infinity, path: [] };
}

module.exports = dijkstra;
