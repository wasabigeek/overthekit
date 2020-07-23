function Notator(options) {
  this.vf = new Vex.Flow.Factory({
    renderer: {
      elementId: options.elementId,
      backend: Vex.Flow.Renderer.Backends.SVG,
      width: 500,
      height: 120,
    },
  });

  this.POSITIONS = {
    SNARE: 'c/5',
    CLOSED_HIHAT: 'g/5/x2',
    KICK: 'f/4',
    HI_TOM: 'e/5',
    MID_TOM: 'd/5',
    FLOOR_TOM: 'a/4',
  }

  this.toNotation = function(noteGroup) {
    var keys = noteGroup.notes.map(function(note) { return note.verticalPosition });

    var vfDuration;
    switch (noteGroup.duration) {
      case DURATION_EIGHTH:
        vfDuration = '8';
        break;
      case DURATION_SIXTEENTH:
        vfDuration = '16';
        break;
      default:
        break;
    }

    return {
      keys: keys,
      duration: vfDuration
    }
  }


  this.generateNotation = function(score) {
    var context = this.vf.getContext()
    context.clear();

    var stave = this.vf.Stave()
    .addClef('percussion')
    .addTimeSignature('4/4');

    if (score.length > 0) {
      var tickables = [];
      for (var noteGroup of score) {
        tickables.push(this.vf.StaveNote(this.toNotation(noteGroup)));
      }

      var voice0 = this.vf.Voice().addTickables(tickables);
      this.vf.Beam({ notes: voice0.getTickables() });

      this.vf.Formatter()
        .joinVoices(this.vf.getVoices())
        .formatToStave(this.vf.getVoices(), stave);
    }
    this.vf.draw();
  }
}


