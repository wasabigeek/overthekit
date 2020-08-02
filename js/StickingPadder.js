function StickingPadder(options = {}) {
  this.length = options.length || 16;

  this.pad = function(sticking) {
    var remainingLength = Number(this.length);
    var finalString = '';

    while (remainingLength > 0) {
      var next;
      if (remainingLength > sticking.length) {
        next = sticking;
      } else {
        // FIXME: alternate
        next = 'R'.repeat(remainingLength);
      }
      finalString = finalString.concat(next);

      remainingLength -= sticking.length;
    }

    return finalString;
  }
}
