NOTATOR_POSITIONS = {
  SNARE: 'c/5',
  CLOSED_HIHAT: 'g/5/x2',
  KICK: 'f/4',
  HI_TOM: 'e/5',
  MID_TOM: 'd/5',
  FLOOR_TOM: 'a/4',
}

function Notator(options) {
  this.vf = new Vex.Flow.Factory({
    renderer: {
      elementId: options.elementId,
      backend: Vex.Flow.Renderer.Backends.SVG,
      width: options.width || 500,
      height: options.height || 150,
    },
  });

  /** Used to order the notes https://github.com/0xfe/vexflow/issues/104 */
  this.getPitchValue = function(note) {
    parts = note.split("/");
    return Vex.Flow.keyProperties.note_values[parts[0].toUpperCase()].int_val + (parseInt(parts[1]) * 12);
  }

  this.toDuration = function(noteGroup) {
    return String(1 / noteGroup.duration);
  }

  this.toNotation = function(noteGroup) {
    var keys = noteGroup.notes
      .map(function(note) { return note.verticalPosition })
      .sort((a, b) => this.getPitchValue(a) - this.getPitchValue(b));

    return {
      keys: keys,
      duration: this.toDuration(noteGroup)
    }
  }

  this.addStave = function(subScore, staveOptions = {}) {
    var stave = this.vf.Stave(staveOptions)
      .addClef('percussion')
      .addTimeSignature(subScore.timeSignature);

    var tickables = [];
    var currentBeamGroup = [];
    var currentBeamCounter = 0;
    var processNoteGroup = function(noteGroup) {
      var tickable = this.vf.StaveNote(this.toNotation(noteGroup));
      tickables.push(tickable);

      if (currentBeamCounter < subScore.getBeatValue()) {
        currentBeamGroup.push(tickable);
        currentBeamCounter += noteGroup.duration;
      }

      if (currentBeamCounter >= subScore.getBeatValue()) {
        try {
          this.vf.Beam({ notes: currentBeamGroup });
        } catch(error) {
          console.warn(error);
        }

        currentBeamGroup = [];
        currentBeamCounter = 0;
      }
    }
    subScore.forEach(processNoteGroup.bind(this));

    this.vf.Voice().addTickables(tickables);

    this.vf.Formatter()
      .joinVoices(this.vf.getVoices())
      .formatToStave(this.vf.getVoices(), stave);

    return stave;
  }

  this.generateNotation = function(score) {
    var context = this.vf.getContext()
    context.clear();

    var scoreCopy = score.slice();
    var scoreDuration = scoreCopy.sumDuration();

    if (scoreDuration > 1) {
      var subScore1 = score.sliceDuration(0, 1);
      var subScore2 = score.sliceDuration(1, 2);

      this.addStave(subScore1, { y: 30 } );
      this.addStave(subScore2, { y: 180 } );
    } else {
      this.addStave(scoreCopy, { y: 30 } );
    }

    this.vf.draw();
  }
}


