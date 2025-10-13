// Graf veri yapısı
interface Graph {
    [key: string]: { [neighbor: string]: number };
}

// Sonuç veri yapısı
interface DijkstraResult {
    distances: { [key: string]: number };
    previous: { [key: string]: string | null };
    path: string[];
}

function dijkstra(graph: Graph, start: string, end: string): DijkstraResult {
    console.log("🚀 Dijkstra Algoritması Başlıyor!\n");
    console.log("Başlangıç: " + start + ", Hedef: " + end + "\n");

    // ============================================
    // 1. BAŞLANGIÇ - VERİ YAPILARINI HAZIRLA
    // ============================================

    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};

    // Set yerine obje kullan
    const unvisited: { [key: string]: boolean } = {};

    // Tüm düğümleri başlat
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        unvisited[node] = true;
    }

    distances[start] = 0;

    console.log("📊 Başlangıç Durumu:");
    console.log("Mesafeler:", distances);
    console.log("Ziyaret edilmemiş:", Object.keys(unvisited));

    // repeat yerine döngü
    let separator = "";
    for (let i = 0; i < 60; i++) separator += "=";
    console.log("\n" + separator + "\n");

    // ============================================
    // 2. ANA DÖNGÜ
    // ============================================

    let step = 1;

    while (Object.keys(unvisited).length > 0) {
        console.log("\n🔄 ADIM " + step + ":");

        let dash = "";
        for (let i = 0; i < 60; i++) dash += "-";
        console.log(dash);

        // En yakın düğümü bul
        let currentNode: string | null = null;
        let smallestDistance = Infinity;

        for (const node in unvisited) {
            if (distances[node] < smallestDistance) {
                smallestDistance = distances[node];
                currentNode = node;
            }
        }

        if (currentNode === null || distances[currentNode] === Infinity) {
            console.log("❌ Ulaşılabilir düğüm kalmadı!");
            break;
        }

        console.log("\n📍 Seçilen düğüm: " + currentNode + " (mesafe: " + distances[currentNode] + ")");

        if (currentNode === end) {
            console.log("\n🎯 HEDEFE ULAŞILDI: " + end);
            break;
        }

        // Ziyaret edildi işaretle
        delete unvisited[currentNode];
        console.log("✓ " + currentNode + " ziyaret edildi olarak işaretlendi");

        // Komşuları güncelle
        console.log("\n🔍 " + currentNode + "'ın komşularını kontrol ediyorum:");

        const neighbors = graph[currentNode] || {};

        for (const neighbor in neighbors) {
            if (!(neighbor in unvisited)) {
                console.log("  ⏭️  " + neighbor + ": Zaten ziyaret edildi, atlanıyor");
                continue;
            }

            const edgeWeight = neighbors[neighbor];
            const newDistance = distances[currentNode] + edgeWeight;
            const oldDistance = distances[neighbor];

            console.log("  🔗 " + currentNode + " → " + neighbor + ":");
            console.log("     Kenar ağırlığı: " + edgeWeight);
            console.log("     Yeni mesafe: " + distances[currentNode] + " + " + edgeWeight + " = " + newDistance);
            console.log("     Eski mesafe: " + oldDistance);

            if (newDistance < oldDistance) {
                distances[neighbor] = newDistance;
                previous[neighbor] = currentNode;
                console.log("     ✅ GÜNCELLEME! " + neighbor + " = " + newDistance + " (" + currentNode + " üzerinden)");
            } else {
                console.log("     ❌ Güncelleme yok (eski yol daha kısa)");
            }
        }

        console.log("\n📊 Güncel Mesafeler:", distances);
        console.log("🗺️  Önceki düğümler:", previous);
        console.log("⏳ Ziyaret edilmemiş:", Object.keys(unvisited));

        step++;
    }

    // ============================================
    // 3. YOLU OLUŞTUR
    // ============================================

    let separator2 = "";
    for (let i = 0; i < 60; i++) separator2 += "=";
    console.log("\n" + separator2);
    console.log("\n🛤️  YOLU OLUŞTUR (Geri Takip):");

    let dash2 = "";
    for (let i = 0; i < 60; i++) dash2 += "-";
    console.log(dash2);

    const path: string[] = [];
    let current: string | null = end;

    while (current !== null) {
        path.unshift(current);
        console.log("← " + current);
        current = previous[current];
    }

    return { distances, previous, path };
}

// ============================================
// 4. GRAFİĞİ TANIMLA
// ============================================

const graph: Graph = {
    'S': { 'A': 5, 'C': 2 },
    'A': { 'B': 8, 'D': 2 },
    'B': { 'F': 4, 'D': 6 },
    'C': { 'D': 7 },
    'D': { 'F': 1 },
    'F': {}
};

// ============================================
// 5. ÇALIŞTIR
// ============================================

console.log("🗺️  GRAFİK:");
console.log("\n         5         8");
console.log("    S -----> A -----> B");
console.log("    |        |        |");
console.log("    2        2        6");
console.log("    |        |        |");
console.log("    v        v        v");
console.log("    C -----> D -----> F");
console.log("         7        1");
console.log("\n    B ---4---> F\n");

const result = dijkstra(graph, 'S', 'F');

// ============================================
// 6. SONUÇLAR
// ============================================

let separator3 = "";
for (let i = 0; i < 60; i++) separator3 += "=";
console.log("\n" + separator3);
console.log("\n🎉 SONUÇLAR:");
console.log(separator3);
console.log("\n📍 En kısa yol: " + result.path.join(' → '));
console.log("📏 Toplam mesafe: " + result.distances['F']);
console.log("\n📊 Tüm düğümlere mesafeler:");
for (const node in result.distances) {
    console.log("   " + node + ": " + result.distances[node]);
}