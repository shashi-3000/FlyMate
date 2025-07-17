// const graph = {
//   "Delhi": { "Dubai": { price: 12000 }, "Mumbai": { price: 3000 } },
//   "Mumbai": { "London": { price: 42000 }, "Dubai": { price: 25000 } },
//   "Dubai": { "Tokyo": { price: 28000 }, "London": { price: 20000 } },
//   "London": { "Paris": { price: 9000 } },
//   "Paris": { "New York": { price: 35000 } },
//   "Tokyo": { "New York": { price: 45000 } },
//   "Kolkata": { "Delhi": { price: 4000 } },
//   "Chennai": { "Mumbai": { price: 5000 } },
//   "Bengaluru": { "Delhi": { price: 4500 } }
// };

const graph = {
  "Delhi": { "Dubai": { price: 12000 }, "Mumbai": { price: 3000 } },
  "Mumbai": { "London": { price: 42000 }, "Dubai": { price: 25000 } },
  "Dubai": { "Tokyo": { price: 28000 }, "London": { price: 20000 } },
  "London": { "Paris": { price: 9000 } },
  "Paris": { "New York": { price: 35000 } },
  "Tokyo": {}, // <- Add this
  "New York": {}, // <- Add this
  "Kolkata": { "Delhi": { price: 4000 } },
  "Chennai": { "Mumbai": { price: 5000 } },
  "Bengaluru": { "Delhi": { price: 4500 } }
};


// Dijkstra algorithm implementation
function dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = [];

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[start] = 0;
    queue.push({ node: start, cost: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const { node: current } = queue.shift();

        if (visited.has(current)) continue;
        visited.add(current);

        for (const neighbor in graph[current]) {
            const cost = graph[current][neighbor].price;
            const newDist = distances[current] + cost;

            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = current;
                queue.push({ node: neighbor, cost: newDist });
            }
        }
    }

    // Reconstruct path
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    if (path[0] !== start) return { path: [], totalCost: Infinity };
    return { path, totalCost: distances[end] };
}
