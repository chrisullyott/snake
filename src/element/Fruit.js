import Element from './Element';

class Fruit extends Element {

    /**
     * Constructor.
     */
    constructor(boardDims) {
        super(boardDims);
        this.position = null;
        this.padding = 1;
        this.scoreValue = 10;
        this.color = 'rgb(237, 14, 86)';
    }

    /**
     * Whether the fruit has been placed on the board.
     */
    isPlaced() {
        return this.position !== null;
    }

    /**
     * Find some coordinates for the fruit.
     */
    place() {
        if (this.position === null) this.position = {};
        let xDiv = Math.floor(this.dims.x) - 1;
        let yDiv = Math.floor(this.dims.y) - 1;
        this.position.x = this.randBetween(this.padding, xDiv - this.padding);
        this.position.y = this.randBetween(this.padding, yDiv - this.padding);
    }

    /**
     * Take the fruit off the board.
     */
    take() {
        this.position = null;
    }

    /**
     * Calculate some random value between two limits.
     */
    randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get all the pixels to output for the board.
     */
    getPixels() {
        if (!this.isPlaced()) return [];
        return this.pixel(this.position.x, this.position.y, this.color);
    }
}

export default Fruit;
