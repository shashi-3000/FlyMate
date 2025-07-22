
const graph = {
  "Delhi": { "Dubai": { price: 12000 }, "Mumbai": { price: 3000 } },
  "Mumbai": { "London": { price: 42000 }, "Dubai": { price: 25000 } },
  "Dubai": { "Tokyo": { price: 28000 }, "London": { price: 20000 } },
  "London": { "Paris": { price: 9000 } },
  "Paris": { "New York": { price: 35000 } },
  "Tokyo": {}, 
  "New York": {},
  "Kolkata": { "Delhi": { price: 4000 } },
  "Chennai": { "Mumbai": { price: 5000 } },
  "Bengaluru": { "Delhi": { price: 4500 } }
};


// Dijkstra algorithm implementation - pure dijkstra
// function dijkstra(start, end) {
//     const distances = {};
//     const previous = {};
//     const visited = new Set();
//     const queue = [];

//     for (const node in graph) {
//         distances[node] = Infinity;
//         previous[node] = null;
//     }

//     distances[start] = 0;
//     queue.push({ node: start, cost: 0 });

//     while (queue.length > 0) {
//         queue.sort((a, b) => a.cost - b.cost);
//         const { node: current } = queue.shift();

//         if (visited.has(current)) continue;
//         visited.add(current);

//         for (const neighbor in graph[current]) {
//             const cost = graph[current][neighbor].price;
//             const newDist = distances[current] + cost;

//             if (newDist < distances[neighbor]) {
//                 distances[neighbor] = newDist;
//                 previous[neighbor] = current;
//                 queue.push({ node: neighbor, cost: newDist });
//             }
//         }
//     }

//     // Reconstruct path
//     const path = [];
//     let current = end;
//     while (current) {
//         path.unshift(current);
//         current = previous[current];
//     }

//     if (path[0] !== start) return { path: [], totalCost: Infinity };
//     return { path, totalCost: distances[end] };
// }


// Dijkstra algorithm implementation - K stops
function dijkstraWithKStops(start, end, k) {
    const distances = {};
    const queue = [];

    for (const node in graph) {
        distances[node] = Infinity;
    }

    queue.push({ node: start, cost: 0, stops: 0, path: [start] });

    let bestPath = [];
    let minCost = Infinity;

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);  // Greedy selection
        const { node, cost, stops, path } = queue.shift();

        if (stops > k + 1) continue; // +1 to account for 0-based counting

        if (node === end) {
            if (cost < minCost) {
                minCost = cost;
                bestPath = [...path];
            }
            continue;
        }

        for (const neighbor in graph[node]) {
            const nextCost = cost + graph[node][neighbor].price;
            queue.push({
                node: neighbor,
                cost: nextCost,
                stops: stops + 1,
                path: [...path, neighbor]
            });
        }
    }

    if (bestPath.length === 0 || minCost === Infinity) {
        return {
            path: [],
            totalCost: Infinity
        };
    }

    return {
        path: bestPath,
        totalCost: minCost
    };

}
