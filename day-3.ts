//plusOne
function plusOne (digits:number[]):number[]{
    let carry = 1;
    for(let i = digits.length -1; i >=0 ; i--){
        const sum = digits[i] + carry;
        digits[i] = sum % 10;
        carry = Math.floor(sum / 10);
    }

    if(carry){
        for(let i = digits.length - 1; i >= 0; i--){
            digits[i + 1] = digits[i];
        }
        digits[0] = carry;
    }

    return digits;

}