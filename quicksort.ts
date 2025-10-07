// Quicksort algorithm

let array = [25, 35, 12, 32, 108, 10, 57, 43, 39, 65, 49];

function quicksort(array: number[]): number[] {
  // Base case: 0 veya 1 elemanlı array zaten sıralıdır
  if (array.length < 2) {
    return array;
  }

  // Pivot seçimi (rastgele)
  const pivotIndex = Math.floor(Math.random() * array.length);
  const pivot = array[pivotIndex];

  // Array'i üç parçaya ayır
  const left: number[] = [];   // Pivot'tan küçükler
  const middle: number[] = [];  // Pivot'a eşitler
  const right: number[] = [];   // Pivot'tan büyükler

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else if (array[i] === pivot) {
      middle.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quicksort(left), ...middle, ...quicksort(right)];
}

const sortedArray = quicksort(array);
console.log("Orijinal:", array);
console.log("Sıralanmış:", sortedArray);