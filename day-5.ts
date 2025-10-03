//sqrt(x)
//Binary Search
//Time Complexity: O(log n)   Space Complexity: O(1)
function mySqrt1(x: number): number {
    let left = 0;
    let right = x;
    let answer = 0;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const middleSquared = middle * middle;

        if (middleSquared === x) {
            return middle;
        }

        if (middleSquared < x) {
            answer = middle;
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return answer;
}










// Linear Search
// Time Complexity: O(n)
function mySqrt2(x: number): number {
    for (let i = 0; i <= x; i++) {
        if (i * i === x) {
            return i;  // 
        }
        if (i * i > x) {
            return i - 1;
        }
    }
    return 0;
}