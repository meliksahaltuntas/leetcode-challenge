interface Graph {
    [key: string]: { [neighbor: string]: number };
}

function dijkstra(graph: Graph, start: string, end: string) {
    const dist: { [key: string]: number } = {};
    const prev: { [key: string]: string | null } = {};
    const unvisited: { [key: string]: boolean } = {};

    for (const node in graph) {
        dist[node] = Infinity;
        prev[node] = null;
        unvisited[node] = true;
    }
    dist[start] = 0;

    console.log("Baslangic:", dist);

    let step = 1;
    while (Object.keys(unvisited).length > 0) {
        let current: string | null = null;
        let minDist = Infinity;

        for (const node in unvisited) {
            if (dist[node] < minDist) {
                minDist = dist[node];
                current = node;
            }
        }

        if (!current || dist[current] === Infinity) break;

        console.log("\nAdim " + step + ": " + current + " secildi (" + dist[current] + ")");

        if (current === end) break;

        delete unvisited[current];

        const neighbors = graph[current];
        for (const neighbor in neighbors) {
            if (neighbor in unvisited) {
                const newDist = dist[current] + neighbors[neighbor];
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    prev[neighbor] = current;
                    console.log("  " + neighbor + " guncellendi: " + newDist);
                }
            }
        }

        console.log("Mesafeler:", dist);
        step++;
    }

    const path: string[] = [];
    let curr: string | null = end;
    while (curr) {
        path.unshift(curr);
        curr = prev[curr];
    }

    return { distance: dist[end], path };
}

const graph: Graph = {
    'S': { 'A': 5, 'C': 2 },
    'A': { 'B': 8, 'D': 2 },
    'B': { 'F': 4, 'D': 6 },
    'C': { 'D': 7 },
    'D': { 'F': 1 },
    'F': {}
};

const result = dijkstra(graph, 'S', 'F');
console.log("\nSonuc: " + result.path.join(' -> '));
console.log("Mesafe: " + result.distance);