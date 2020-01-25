export const truncate = (str, maxLen) => {
    if(str !== undefined && str !== null) {
        if (str.length <= maxLen) {
            return str;
        }
        return str.substr(0, maxLen) + "...";
    }
    return null;
};
