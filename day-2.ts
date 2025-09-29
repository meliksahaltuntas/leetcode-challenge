//Length of last word

function LengthOfLastWord1(s: string): number {

    let length = 0;
    let index = s.length - 1;

    while (index >= 0 && s[index] == " ") {
        index--;
    }

    while (index >= 0 && s[index] !== " ") {
        length++;
        index--;
    }

    return length;
}

// time complexity o(n)
// space complexity o(1)

//=================================================================
function lengthOfLastWord2(s: string): number {
    const words = s.trim().split(' ');
    return words[words.length - 1].length;
}

// time complexity o(n)
// space complexity o(n)

//=================================================================
//Regex
function lengthOfLastWord(s: string): number {
    const match = s.trim().match(/\w+$/);
    return match ? match[0].length : 0;
}

// time complexity o(n)
// space complexity o(m)