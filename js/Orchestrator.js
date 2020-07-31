function Orchestrator(options) {
  this.drumset = options.drumset;
  this.allowedOrchestrations = options.allowedOrchestrations;

  this.orchestrate = function(sticking) {
    var score = new Score();

    for (var stick of sticking) {
      var note;
      // attempt to make it sound slightly more organic with volume variations
      var volume = 1 - Math.random() * 0.2;

      if (stick.toUpperCase() == 'K') {
        note = new Note({ instrument: this.drumset.kick, volume: volume });
      } else {
        var instrument = this.allowedOrchestrations[Math.round(Math.random() * (this.allowedOrchestrations.length - 1))];
        note = new Note({ instrument: instrument, volume: volume });
      }

      var grouping = new NoteGroup([note]);
      score.push(grouping);
    }

    return score;
  }
}
