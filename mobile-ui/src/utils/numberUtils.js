export const randInt = (st, en) => {
    st = Math.round(st);
    en = Math.round(en);

    return Math.floor(Math.random() * (en - st)) + st;
};

export const addPadding = (num, padding) => {
    return num + padding;
};

export const removePadding = (num) => {
    if (num < 1000) return num;
    return num - 1000;
};

export const getPadding = (num) => {
    if (num < 1000) return 0;
    return 1000;
};
