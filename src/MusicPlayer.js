// eslint-disable-next-line no-unused-vars

class MusicPlayer {
    audioPlayer = undefined;
    currentlyPlayingSource = undefined;


    constructor() {
        this.audioPlayer = document.createElement('audio');
        document.body.append(this.audioPlayer);
    }

    PlayTrack(src) {
        this.Pause();
        this.ChangeSource(src);
        this.Play();
    }

    Play() {
        if (this.currentlyPlayingSource === undefined) return false;
        try {
            this.audioPlayer.play();
        } catch (e) {
            console.log(e)
        }
        console.log("music should be playing")
    }

    Pause() {
        this.audioPlayer.pause();
    }

    ChangeSource(value) {
        this.currentlyPlayingSource = value;
        this.audioPlayer.src = value;
        this.audioPlayer.load();
    }

    GetTime(seconds) {
        seconds = Math.round(seconds);
        let minutes = String(Math.floor(seconds / 60));
        seconds = String(seconds - Number(minutes) * 60)
        while (minutes.length < 2) {
            minutes = "0" + minutes;
        }
        while (seconds.length < 2) {
            seconds = "0" + seconds;
        }
        return minutes + " : " + seconds
    }

    get duration() {
        // return 67;
        return this.GetTime(this.audioPlayer.duration);
    }

    get currentTime() {
        // return 32
        return this.GetTime(this.audioPlayer.currentTime);
    }

    set currentTime(value) {
        value = Number(value);
        console.log("Setting Current Time, Input value:", value, "Computed second:", Math.floor(value * (this.audioPlayer.duration / 1000)))
        if (value < 0 || value > 1000) throw new Error("Value must be between 0 and 1000");
        this.audioPlayer.currentTime = Math.floor(value * (this.audioPlayer.duration / 1000));
    }

    get sliderValue() {
        return this.audioPlayer.currentTime / this.audioPlayer.duration * 1000
    }

    get currentlyPlaying() {
        return "abcd";
    }

    OnTimeUpdated(fn) {
        this.audioPlayer.ontimeupdate = fn;
    }

    OnFinishedPlayback(fn) {
        this.audioPlayer.onended = fn;
    }
}

export default MusicPlayer;
