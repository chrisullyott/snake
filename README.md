# 🐍 Snake!

A classic snake game made with [React](https://reactjs.org/).

Some features and lessons learned:

- Smoother animations with [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). This also saves energy by allowing the browser to pause the animation when the tab is not active.
- More responsive gameplay by using a keystroke buffer queue. This allows the user to register keystrokes faster than the screen can draw the next frame, making it easier to direct the snake.
- Blips and bleeps using [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext).

Play at [http://chrisullyott.com/snake](https://react-snake.s3.us-east-2.amazonaws.com/index.html)!
