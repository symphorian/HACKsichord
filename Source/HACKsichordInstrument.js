var HSC = (function(hsc) {
	hsc.Instrument = function(audioContext) {
		this.AudioContext = audioContext;
	}

	hsc.Cue = function(duration, futureTime, currentTime) {
		this.Duration = duration == undefined ? 1 : duration;
		this.FutureTime = futureTime == undefined ? 0 : futureTime;
		this.CurrentTime = currentTime;
	}

	hsc.Instrument.prototype.play = function(note, cue) {
    if (!(note instanceof hsc.Note)) {
    	throw "The first parameter of HSC.Instrument.playNote() must be an " +
    	  "HSC.Note object; something else was passed in.";
    }
    if (!(cue instanceof hsc.Cue)) {
    	throw "The second parameter of HSC.Instrument.playNote() must be an " +
    	  "HSC.Cue object; something else was passed in.";
    }
    var duration = cue.Duration;
    var futureTime = cue.FutureTime;
    var currentTime = cue.CurrentTime == undefined 
      ? this.AudioContext.currentTime 
      : cue.CurrentTime;

		var oscillatorNode = this.AudioContext.createOscillator();
		oscillatorNode.frequency.value = note.Frequency;

		var gainNode = this.AudioContext.createGain();
		//gainNode.gain.value = 0.1;
		gainNode.gain.linearRampToValueAtTime(0.0, currentTime + futureTime);
		gainNode.gain.linearRampToValueAtTime(
			0.1, 
			currentTime + futureTime + duration * 1/10
		);
		gainNode.gain.linearRampToValueAtTime(
			0.1, 
			currentTime + futureTime + duration * 9/10
		);
		gainNode.gain.linearRampToValueAtTime(
			0.0, 
			currentTime + futureTime + duration
		);

		oscillatorNode.connect(gainNode);
		gainNode.connect(dynamicsCompressorNode);
		gainNode.connect(this.AudioContext.destination);

		oscillatorNode.start(currentTime + futureTime, 0, duration);
		oscillatorNode.stop(currentTime + futureTime + duration);
	};

	hsc.Instrument.prototype.playNotesAtCue = function(notes, cue) {
		for (var i = 0; i < notes.length; i++) {
			this.play(notes[i], cue);
		}
	}

	hsc.Instrument.prototype.playNotesAtCues = function(notes, cues) {
		if (notes.length != cues.length) {
			throw "The array of HSC.Notes and the array of HSC.Cues passed " +
			  "into HSC.Instrument.playNotesAtCues() must contain the same " +
			  "number of elements in each array; " + notes.length + " notes " +
			  "and " + cues.length + " cues were passed in.";
		}
		for (var i = 0; i < notes.length; i++) {
			this.play(notes[i], cues[i]);
		}
	}

	return hsc;
})(HSC || {});