function Orchestrator(options) {
  this.drumset = options.drumset;
  this.allowedOrchestrations = options.allowedOrchestrations;

  this.orchestrate = function(sticking) {
    var score = new Score();

    var previousSticking;
    var previousOrchestration;
    for (var stick of sticking) {
      var note;

      var instrument;
      if (stick.toUpperCase() == 'K') {
        instrument = this.drumset.kick;
      // repeated notes should be on the same drum
      } else if (previousSticking == stick) {
        instrument = previousOrchestration;
      } else {
        instrument = this.allowedOrchestrations[Math.round(Math.random() * (this.allowedOrchestrations.length - 1))];
      }
      note = new Note({ instrument: instrument, volume: 1 });

      var grouping = new NoteGroup([note]);
      score.push(grouping);

      previousSticking = stick;
      previousOrchestration = instrument;
    }

    return score;
  }
}
