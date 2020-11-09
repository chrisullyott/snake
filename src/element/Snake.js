import Element from './Element';

class Snake extends Element {

    dirs = {
        U: { code: 'U', vector: {x:0, y:-1} },
        D: { code: 'D', vector: {x:0, y:1}  },
        L: { code: 'L', vector: {x:-1, y:0} },
        R: { code: 'R', vector: {x:1, y:0}  }
    };

    dirKeys = {
        87: 'U', 38: 'U',
        83: 'D', 40: 'D',
        65: 'L', 37: 'L',
        68: 'R', 39: 'R'
    };

    invDirs = {
        U: 'D',
        D: 'U',
        L: 'R',
        R: 'L'
    };

    /**
     * Constructor.
     */
    constructor(boardDims) {
        super(boardDims);
        this.color = 'rgb(30, 200, 11)';
        this.headColor = 'rgb(25, 245, 25)';
        this.body = [this.newSegment()];
    }

    /**
     * Get the first segment.
     */
    head() {
        return this.body[0];
    }

    /**
     * Get the last segment.
     */
    tail() {
        return this.body[this.body.length - 1];
    }

    /**
     * Direct the snake's head by a given keyCode.
     */
    directByKey(dirKey) {
        if (!this.dirKeys.hasOwnProperty(dirKey)) return;
        if (this.head().dir.code === this.invDirs[this.dirKeys[dirKey]]) return;
        this.head().dir = this.dirs[this.dirKeys[dirKey]];
    }

    /**
     * Whether the snake's head has met a given position.
     */
    headMeets(pos) {
        return this.head().pos.x === pos.x && this.head().pos.y === pos.y;
    }

    /**
     * Whether the snake's head meets any other segment.
     */
    headMeetsBody() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.headMeets(this.body[i].pos)) return true;
        }

        return false;
    }

    /**
     * Calculate one move's coordinate value, given the distance and axis maximum.
     */
    nextCoord(coord, dist, max) {
        coord += dist;

        if (coord === max) {
            coord = 0;
        } else if (coord < 0) {
            coord = max - 1;
        }

        return coord;
    }

    /**
     * Move the snake forward across the board.
     */
    updatePosition() {
        for (let i = 0; i < this.body.length; i++) {
            for (let a of ['x', 'y']) {
                this.body[i].pos.[a] = this.nextCoord(
                    this.body[i].pos.[a],
                    this.body[i].dir.vector.[a],
                    this.dims.[a]
                );
            }
        }

        return this;
    }

    /**
     * Shift the direction of all snake segments.
     */
    updateDirections() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].dir = this.body[i - 1].dir;
        }

        return this;
    }

    /**
     * Move all segments one step across the board.
     */
    move() {
        this.updatePosition().updateDirections();
    }

    /**
     * Create and return a new snake segment with default values.
     */
    newSegment() {
        return {
            pos: {x:-1, y:0},
            dir: this.dirs['R']
        };
    }

    /**
     * Add a new segment to the tail.
     */
    grow() {
        let seg = this.newSegment();

        // Same direction.
        seg.dir = this.tail().dir;

        // One tick behind the tail.
        seg.pos.x = this.nextCoord(this.tail().pos.x, seg.dir.vector.x * -1, this.dims.x);
        seg.pos.y = this.nextCoord(this.tail().pos.y, seg.dir.vector.y * -1, this.dims.y);

        this.body.push(seg);
    }

    /**
     * Get all the pixels to output for the board.
     */
    getPixels() {
        let pixels = [];

        for (let i = 0; i < this.body.length; i++) {
            let color = i === 0 ? this.headColor : this.color;
            pixels.push(this.pixel(this.body[i].pos.x, this.body[i].pos.y, color));
        }

        return pixels;
    }
}

export default Snake;
