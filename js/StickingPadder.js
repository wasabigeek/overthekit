function StickingPadder() {

  this.pad = function(sticking) {
    // TODO: 16th note triplets
    var remainingLength = 16;
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
