function Player(options) {
  this.audioContext = options.audioContext;
  this.tempo = 120;
  this.currentAudio = [];

  this.timeInTempo = function(duration, tempo) {
    switch (duration) {
      case DURATION_EIGHTH:
        return (60 / tempo) / 2;
        break;
      case DURATION_SIXTEENTH:
        return (60 / tempo) / 4;
        break;
      default:
        break;
    }
  }

  function schedule(cumulativeTime, noteGroup) {
    var time = this.timeInTempo(noteGroup.duration, this.tempo);
    for (var note of noteGroup.notes) {
      sound = this.playSound(note.getSound(), cumulativeTime, note.volume);
      this.currentAudio.push(sound);
    }
    return cumulativeTime + time;
  }
  this.schedule = schedule.bind(this);

  this.play = function(score, options) {
    this.tempo = options.tempo || 120;

    var playbackScore = score;
    if (options.groove) {
      playbackScore = options.groove.concat(playbackScore)
    }

    // stop currentAudio
    for (var audio of this.currentAudio) {
      audio.stop();
    }
    this.currentAudio = [];

    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = this.audioContext.currentTime + 0.100;
    playbackScore.reduce(this.schedule, startTime);
  }

  this.playSound = function(buffer, time, volume = 1) {

    var source = this.audioContext.createBufferSource();
    source.buffer = buffer;

    var gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, time);
    source.connect(gainNode);

    gainNode.connect(this.audioContext.destination);

    if (!source.start) {
      source.start = source.noteOn;
    }
    source.start(time);

    return source;
  }

}
