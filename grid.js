class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.map = [];

        for (let y = 0; y < height; y++) {
            this.map[y] = []; // set up inner array
            for (let x = 0; x < width; x++) {
                this.map[y][x] = " ";
            }
        }
    }

    hasCollison(x, y, width, height) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                let ty = y + h;
                let tx = x + w;

                if (this.map[ty]) {
                    if (this.map[ty][tx] != " ") {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    place(string, x, y) {
        let splitString = string.split('\n')

        for (let index in splitString) {
            let row = splitString[index];
            let rowSplit = row.split("");

            for (let charIndex in rowSplit) {
                let ty = y + Number(index);
                let tx = x + Number(charIndex);

                if (this.map[ty]) {
                    if (this.map[ty][tx]) {
                        this.map[ty][tx] = rowSplit[charIndex];
                    }
                }

            }
        }
    }

    rasterize() {
        let raster = "";

        for (let line of this.map) {
            raster += line.join("") + "\n";
        }

        return raster;
    }

}

module.exports = Grid;