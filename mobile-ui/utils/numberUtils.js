export const randInt = (st, en) => {
    st = Math.round(st)
    en = Math.round(en)

    return Math.floor(Math.random() * (en - st)) + st
}
