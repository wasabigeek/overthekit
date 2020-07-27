function Notator(options) {
  this.vf = new Vex.Flow.Factory({
    renderer: {
      elementId: options.elementId,
      backend: Vex.Flow.Renderer.Backends.SVG,
      width: 500,
      height: 300,
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

  this.toDuration = function(noteGroup) {
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

    return vfDuration;
  }

  this.toNotation = function(noteGroup) {
    var keys = noteGroup.notes.map(function(note) { return note.verticalPosition });

    return {
      keys: keys,
      duration: this.toDuration(noteGroup)
    }
  }

  this.addStave = function(subScore, staveOptions = {}) {
    var stave = this.vf.Stave(staveOptions)
      .addClef('percussion')
      .addTimeSignature('4/4');

    var tickables = [];
    for (var noteGroup of subScore) {
      tickables.push(this.vf.StaveNote(this.toNotation(noteGroup)));
    }

    var voice0 = this.vf.Voice().addTickables(tickables);
    this.vf.Beam({ notes: voice0.getTickables() });

    this.vf.Formatter()
      .joinVoices(this.vf.getVoices())
      .formatToStave(this.vf.getVoices(), stave);

    return stave;
  }

  this.generateNotation = function(score) {
    var context = this.vf.getContext()
    context.clear();

    var totalSixteenths = 0;
    var subScore1 = [];
    var subScore2 = score.slice();
    do {
      var noteGroup = subScore2.shift();
      totalSixteenths += 1 / this.toDuration(noteGroup) * 16

      subScore1.push(noteGroup)
    } while (totalSixteenths < 16)

    this.addStave(subScore1, { y: 30} );
    this.addStave(subScore2, { y: 180 });

    this.vf.draw();
  }
}


