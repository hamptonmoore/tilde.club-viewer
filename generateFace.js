const hashCode = s => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0)


const getOne = (set, name, r) => {
    return set[Math.abs(hashCode(name) % set.length)].repeat(r || 1);
}

const gen = (name) => {
    let base = String.raw` THEHAIR
/       \
|  EYE  |
|   N   |
\ MOUTH /
 \_____/
`
        .replace("  EYE  ", getOne(eyes, name))
        .replace("THEHAIR", getOne(hair, name, 7))
        .replace("N", getOne(nose, name))
        .replace(" MOUTH ", getOne(mouth, name))

    return base;
}

const eyes = [' 0   0 ', ' .   . ', ' -   - ', ' o   o ', ' T   T '];
const hair = ['@', '+', 'v', '~', '!', '#', '%', '^', '*'];
const nose = ['>', '<', '|', 'b', 'B', '^'];
const mouth = ['  ===  ', '   -   ', ' \\___/ '];

module.exports = { gen, width: 9, height: 6 };