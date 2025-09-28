// Search Insert Position
//Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
//You must write an algorithm with O(log n) runtime complexity.

function SearchInsert1(nums: number[], target: number): number {

    let low = 0;
    let high = nums.length - 1;


    while (low <= high) {
        let mid = Math.floor((high + low) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        if (target > nums[mid]) {
            low = mid + 1;
        }

        if (nums[mid] > target) {
            high = mid - 1;
        }
    }


    return low;

}


// Linear Search 

function searchInsert2(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {

        if (nums[i] >= target) {
            return i;
        }
    }

    return nums.length;
}