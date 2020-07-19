var VexFlowDrumset = {
  SNARE: 'c/5',
  CLOSED_HIHAT: 'g/5/x',
  KICK: 'f/4',
  HI_TOM: 'e/5',
  MID_TOM: 'd/5',
  FLOOR_TOM: 'a/4',
}

function toNotation(noteGroup) {
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

function createMeasure(setup, score) {
  var stave = vf.Stave().addClef('percussion');

  if (score.length > 0) {
    setup(vf);

    vf.Formatter()
      .joinVoices(vf.getVoices())
      .formatToStave(vf.getVoices(), stave);
  }

  vf.draw();
}

function generateNotation(score) {
  var context = vf.getContext()
  context.clear();

  createMeasure(function(vf) {
    var voice0 = vf.Voice().addTickables(
      score.map(function(noteGroup) {
        return vf.StaveNote(toNotation(noteGroup));
      })
    );

    vf.Beam({ notes: voice0.getTickables() });
  }, score);
}
