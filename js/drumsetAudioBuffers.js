function DrumsetAudioBuffers(audioContext) {
  this.loader = new BufferLoader(
    audioContext,
    [
      'acoustic-kit/kick.wav',
      'acoustic-kit/snare.wav',
      'acoustic-kit/hihat.wav',
      'acoustic-kit/tom1.wav',
      'acoustic-kit/tom2.wav',
      'acoustic-kit/tom3.wav',
    ]
    );
  this.loader.load();

  // functions since they are asynchronously loaded
  kickSound = function() { return this.loader.bufferList[0] };
  snareSound = function() { return this.loader.bufferList[1] };
  hihatSound = function() { return this.loader.bufferList[2] };
  tom1Sound = function() { return this.loader.bufferList[3] };
  tom2Sound = function() { return this.loader.bufferList[4] };
  tom3Sound = function() { return this.loader.bufferList[5] };
  this.kickSound = kickSound.bind(this);
  this.snareSound = snareSound.bind(this);
  this.hihatSound = hihatSound.bind(this);
  this.tom1Sound = tom1Sound.bind(this);
  this.tom2Sound = tom2Sound.bind(this);
  this.tom3Sound = tom3Sound.bind(this);
}
