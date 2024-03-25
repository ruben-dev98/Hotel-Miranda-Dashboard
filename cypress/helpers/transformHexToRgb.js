export const transformHexToRgb = (hexCode) => {

    let hex = hexCode.split('#')[1];
    if(hex.length === 3) {
        const first = hex.substring(0, 1);
        const second = hex.substring(0, 2);
        const third = hex.substring(0, 3);
        hex = `${repeat(first, 2)}${repeat(second, 2)}${repeat(third, 2)}`
    }
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    
    return `rgb(${red}, ${green}, ${blue})`;
}

const repeat = (str, number) => {
    let stringToReturn = '';
    for(let i = 0; i < number; i++) {
        stringToReturn += str;
    }
    return stringToReturn;
}