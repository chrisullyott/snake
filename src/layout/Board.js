import React, { Component } from 'react';
import Audio from '../library/Audio';
import Frame from '../library/Frame';
import Queue from '../library/Queue';
import Snake from '../element/Snake';
import Fruit from '../element/Fruit';

class Board extends Component {

    inPlay = false;
    framesPerSecond = 10;

    /**
     * Constructor.
     */
    constructor(props) {
        super(props);

        this.dims = this.calcDimensions(props.width, props.height, props.scale);

        this.canvas = React.createRef();

        this.keyQueue = new Queue(2);
        this.keyQueue.enqueue(39);

        this.audio = new Audio();
    }

    /**
     * Calculate board dimension values.
     */
    calcDimensions(width, height, scale) {
        let xMax = width / scale;
        let yMax = height / scale;

        if (xMax % 1 !== 0 || yMax % 1 !== 0) {
            throw new Error('Bad scale');
        }

        return {x:xMax, y:yMax};
    }

    /**
     * Bind user keydowns.
     */
    bindKeydowns() {
        return window.addEventListener('keydown', e => {
            this.keyQueue.enqueue(e.keyCode);
            if (!this.hadFirstInteraction) this.handleFirstInteraction();
        });
    }

    /**
     * Handle the first user interaction.
     */
    handleFirstInteraction() {
        this.audio.loadAll();
        this.hadFirstInteraction = true;
    }

    /**
     * Set whether this game is in play.
     */
    setInPlay(inPlay) {
        this.inPlay = inPlay;
        this.props.setInPlay(inPlay);
    }

    /**
     * Begin animation.
     */
    componentDidMount() {
        this.bindKeydowns();
        this.start();
    }

    /**
     * Start the game.
     */
    start() {
        this.setInPlay(true);
        this.snake = new Snake(this.dims);
        this.fruit = new Fruit(this.dims);
        this.fruit.place();
        this.animate();
    }

    /**
     * Move the game forward.
     */
    play() {
        // Direct the snake.
        if (this.keyQueue.isNotEmpty()) {
            this.snake.directByKey(this.keyQueue.dequeue());
        }

        // Move the snake.
        this.snake.move();

        // He ate a fruit!
        if (this.snake.headMeets(this.fruit.position)) {
            this.snake.grow();
            this.fruit.place();
            this.audio.play('blip');
            this.props.addToScore(this.fruit.scoreValue);
        }

        // He ate himself!
        if (this.snake.headMeetsBody()) {
            this.stop();
            this.audio.play('fail');
        }

        // List all elements in the frame.
        let elements = [
            this.fruit,
            this.snake
        ];

        return new Frame(this.dims, elements);
    }

    /**
     * Stop the game.
     */
    stop() {
        this.setInPlay(false);
        clearTimeout(this.timerId);
    }

    /**
     * Draw a new frame of pixels onto the canvas.
     */
    draw(canvas, ctx, frame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = frame.pixels.length - 1; i > -1; i--) {
            ctx.fillStyle = frame.pixels[i].color;
            ctx.fillRect(
                frame.pixels[i].coord[0] * this.props.scale,
                frame.pixels[i].coord[1] * this.props.scale,
                this.props.scale,
                this.props.scale
            );
        }
    }

    /**
     * Animate frames recursively.
     */
    animate() {
        if (!this.inPlay) return;

        this.timerId = setTimeout(() => {
            this.animateId = requestAnimationFrame(() => this.animate());

            this.draw(
                this.canvas.current,
                this.canvas.current.getContext('2d'),
                this.play()
            );

        }, 1000 / this.framesPerSecond);
    }

    render() {
        return(
            <canvas
                ref={this.canvas}
                width={this.props.width}
                height={this.props.height}>
            </canvas>
        );
    };
}

export default Board;
