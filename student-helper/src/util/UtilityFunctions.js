export const truncate = (str, maxLen) => {
    if(str !== undefined && str !== null) {
        if (str.length <= maxLen) {
            return str;
        }
        return str.substr(0, maxLen) + "...";
    }
    return null;
};

export const courseYearToRoman = year => {
    switch (year) {
        case 1: return "I";
        case 2: return "II";
        case 3: return "III";
        case 4: return "IV";
        default: return null;
    }
};
