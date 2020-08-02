function Orchestrator(options) {
  this.drumset = options.drumset;

  this.getOrchestration = function() {
    // global variable
    var allowedOrchestrations = getOrchestrations();
    return allowedOrchestrations[Math.round(Math.random() * (allowedOrchestrations.length - 1))]
  }

  var orchestrate = function(sticking) {
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
        instrument = this.getOrchestration();
      }
      note = new Note({ instrument: instrument, volume: 1 });

      var grouping = new NoteGroup([note]);
      score.push(grouping);

      previousSticking = stick;
      previousOrchestration = instrument;
    }

    return score;
  }
  this.orchestrate = orchestrate.bind(this);
}
