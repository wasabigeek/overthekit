function StickingPadder(options = {}) {
  this.length = options.length || 16;

  this.pad = function(sticking) {
    var remainingLength = Number(this.length);
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
}
