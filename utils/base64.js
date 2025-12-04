export const toBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
};
