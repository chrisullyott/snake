import React, { Component } from 'react';
import Header from './layout/Header';
import Board from './layout/Board';

import './App.css';

class App extends Component {

    state = {
        inPlay: false,
        score: 0
    }

    setInPlay(inPlay) {
        this.setState({inPlay: inPlay});
    }

    addToScore(value) {
        this.setState({score: this.state.score + value});
    }

    render() {
        let gameInstText = 'Play on! Use arrow or WASD keys.';
        let gameOverText = 'Game over! Refresh to play again.';
        let isGameOver = this.state.inPlay === false && this.state.score > 0;
        let bottomText = isGameOver ? gameOverText : gameInstText;

        return(
            <div className="container">
                <Header />

                <Board
                    width={800}
                    height={450}
                    scale={25}
                    setInPlay={this.setInPlay.bind(this)}
                    addToScore={this.addToScore.bind(this)} />

                <h2>Score: {this.state.score}</h2>
                <h3>{bottomText}</h3>
            </div>
        );
    };
}

export default App;
