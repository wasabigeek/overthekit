function GrooveGenerator(options) {
  this.drumset = options.drumset;

  this.baseGroove = function() {
    return new Score([
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
    ]);
  }

  this.generate = function(options) {
    var groove = new Score();

    if (options.duration) {
      var remaining = options.duration;
      while (remaining > 1) {
        groove = groove.concat(this.baseGroove());
        remaining -= this.baseGroove().sumDuration();
      }

      var slicedGroove = this.baseGroove().sliceDuration(0, remaining);
      groove = groove.concat(slicedGroove);

      remaining -= slicedGroove.sumDuration();
      if (remaining > 0) {
        groove.push(new NoteGroup(
          [new Note({ instrument: drumset.hihat })],
          remaining
        ));
      }
    } else {
      groove = this.baseGroove();
    }

    return groove;
  }
}
