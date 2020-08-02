function StickingPadder(options = {}) {
  this.desiredLength = options.desiredLength || 16;

  var pad = function(sticking) {
    var remainingLength = Number(this.desiredLength);
    var finalString = '';

    var previousSticking = '';
    while (remainingLength > 0) {
      var next;
      if (remainingLength > sticking.length) {
        next = sticking;
      } else {
        // workaround to alternate for padding
        if (previousSticking == 'L') {
          next = 'R';
        } else {
          next = 'L';
        }
      }
      finalString = finalString.concat(next);

      remainingLength -= next.length;
      previousSticking = next;
    }

    return finalString;
  }
  this.pad = pad.bind(this);
}
