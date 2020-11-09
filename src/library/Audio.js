class Audio {

    sounds = {
        'blip': {
            'url': '/static/audio/blip.mp3',
            'volume': 0.05
        },
        'fail': {
            'url': '/static/audio/fail.mp3',
            'volume': 0.05
        }
    }

    /**
     * Get the AudioContext. Assuming this would be called when it's time to play.
     */
    getContext() {
        if (!this.audioContext) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            this.audioContext.resume();
        }

        return this.audioContext;
    }

    /**
     * Load all sounds.
     */
    loadAll() {
        for (let key in this.sounds) this.loadItem(key);

        return this;
    }

    /**
     * Load a sound by its name.
     */
    loadItem(name) {
        let request = new XMLHttpRequest();
        request.open('GET', this.sounds[name].url, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            this.getContext().decodeAudioData(request.response, (newBuffer) => {
                this.sounds[name].buffer = newBuffer;
            });
        }

        request.send();
    }

    /**
     * Play a sound by its name.
     */
    play(name) {
        let sound = this.sounds[name];
        let volume = this.sounds[name].volume || 0.5;

        if (sound.buffer) {
            let source = this.getContext().createBufferSource();
            source.buffer = sound.buffer;

            let gainNode = this.getContext().createGain();
            gainNode.gain.value = volume;

            gainNode.connect(this.getContext().destination);
            source.connect(gainNode);
            source.start();
        }

        return this;
    }

}

export default Audio;
