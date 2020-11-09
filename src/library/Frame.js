class Frame {

    /**
     * Constructor.
     */
    constructor(boardDims, elements = []) {
        this.dims = boardDims;
        this.setPixels(elements);
    }

    /**
     * List all the pixels of given elements.
     */
    setPixels(elements) {
        this.pixels = [];

        for (let elem of elements) {
            this.pixels = this.pixels.concat(elem.getPixels());
        }

        return this.pixels;
    }

    /**
     * Convert coordinate index into a coordinate pair.
     */
    indexToCoord(index) {
        let y = Math.floor(index / this.dims.x);
        let x = index - (this.dims.x * y);

        return [x, y];
    }

    /**
     * Convert a coordinate pair into a coordinate index.
     */
    coordToIndex(coord) {
        return coord[0] + (this.dims.x * coord[1]);
    }

    /**
     * Get all game board coordinates.
     */
    getAllCoords() {
        let coords = [];

        for (let y = 0; y < this.dims.y; y++) {
            for (let x = 0; x < this.dims.x; x++) {
                coords.push([x, y]);
            }
        }

        return coords;
    }

}

export default Frame;
