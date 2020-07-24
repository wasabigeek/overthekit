function Displacer(options) {
  this.drumset = options.drumset;

  this.generateGroove = function() {
    return [
      new NoteGroup(
        [
          new Note({ instrument: drumset.hihat, volume: 1 }),
          new Note({ instrument: drumset.kick, volume: 1 })
        ],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [new Note({ instrument: drumset.hihat, volume: 1 })],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [
          new Note({ instrument: drumset.hihat, volume: 1 }),
          new Note({ instrument: drumset.snare, volume: 1 })
        ],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [new Note({ instrument: drumset.hihat, volume: 1 })],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [
          new Note({ instrument: drumset.hihat, volume: 1 }),
          new Note({ instrument: drumset.kick, volume: 1 })
        ],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [new Note({ instrument: drumset.hihat, volume: 1 })],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [
          new Note({ instrument: drumset.hihat, volume: 1 }),
          new Note({ instrument: drumset.snare, volume: 1 })
        ],
        DURATION_EIGHTH
      ),
      new NoteGroup(
        [new Note({ instrument: drumset.hihat, volume: 1 })],
        DURATION_EIGHTH
      ),
    ]
  }

  this.displace = function(score, options) {
    var newScore = score;

    if (options.withGroove) {
      newScore = this.generateGroove().concat(score);
    }

    return newScore;
  }
}
