var HSC = (function(hsc) {
	hsc.Instrument = function(audioContext, waveType, adsrEnvelope) {
		this.AudioContext = audioContext;

		this.VibratoFrequency = null;
		this.VibratoDelay = null;
		this.VibratoValue = null;

		switch(waveType) {
			case "sine":
			case "square":
			case "sawtooth":
			case "triangle":
			  this.WaveType = waveType;
			  break;

			default:
			  this.WaveType = "sine";
		}

		this.FilterAmplitudeModifier = null;
		this.FilterFrequencyModifier = null;
		this.FilterMaxQ = null;
		this.FilterMaxGain = null;

		if (adsrEnvelope == undefined || 
			!(adsrEnvelope instanceof hsc.ADSREnvelope)
		) {
			this.Envelope = new hsc.ADSREnvelope(.05, 1.2, .05, .1);
		} else {
			this.Envelope = adsrEnvelope;
		}
	}

	hsc.Cue = function(duration, futureTime, currentTime) {
		this.Duration = duration == undefined ? 1 : duration;
		this.FutureTime = futureTime == undefined ? 0 : futureTime;
		this.CurrentTime = currentTime;
	}

	hsc.ADSREnvelope = function(
		attackDuration,
		attackVolume, // percentage
		decayDuration,
		releaseDuration
	) {
		this.AttackDuration = attackDuration;
		this.AttackVolume = attackVolume;
		this.DecayDuration = decayDuration;
		this.ReleaseDuration = releaseDuration;
	}

	hsc.Instrument.prototype.hasVibrato = function() {
		return this.VibratoDelay != undefined && 
		  this.VibratoValue && 
		  this.VibratoFrequency;
	}

	hsc.Instrument.prototype.setVibrato = function(delay, value, frequency) {
		this.VibratoDelay = delay;
		this.VibratoValue = value == undefined ? 1 : value;
		this.VibratoFrequency = frequency == undefined ? 5 : frequency;
	}

	hsc.Instrument.prototype.hasFiltering = function() {
		return this.FilterAmplitudeModifier &&
			this.FilterFrequencyModifier &&
			this.FilterMaxQ &&
			this.FilterMaxGain;
	}

	hsc.Instrument.prototype.setFiltering = function(
		amplitudeModifier,
		frequencyModifier,
		maxQ,
		maxGain
	) {
		this.FilterAmplitudeModifier = amplitudeModifier;
		this.FilterFrequencyModifier = frequencyModifier;
		this.FilterMaxQ = maxQ;
		this.FilterMaxGain = maxGain;
	}

	hsc.Instrument.prototype.play = function(note, cue, volume) {
    if (!(note instanceof hsc.Note)) {
    	throw "The first parameter of HSC.Instrument.playNote() must be an " +
    	  "HSC.Note object; something else was passed in.";
    }
    if (!(cue instanceof hsc.Cue)) {
    	throw "The second parameter of HSC.Instrument.playNote() must be an " +
    	  "HSC.Cue object; something else was passed in.";
    }
    if (volume == undefined) {
    	volume = 0.5;
    }
    var duration = cue.Duration;
    var futureTime = cue.FutureTime;
    var currentTime = cue.CurrentTime == undefined 
      ? this.AudioContext.currentTime 
      : cue.CurrentTime;

    // TODO: revise logic to handle notes shorter than
    // attackDuration + decayDuration + releaseDuration
    var attackDuration = this.Envelope.AttackDuration;
    var attackVolume = this.Envelope.AttackVolume;
    var decayDuration = this.Envelope.DecayDuration;
    var releaseDuration = this.Envelope.ReleaseDuration;

		var vibratoOscNode;
		var vibratoGainNode;
		if (this.hasVibrato()) {
			vibratoOscNode = this.AudioContext.createOscillator();
			vibratoOscNode.type = "triangle";
			vibratoOscNode.frequency.value = this.VibratoFrequency;

			vibratoGainNode = this.AudioContext.createGain();
			vibratoGainNode.gain.linearRampToValueAtTime(
				0.0, 
				currentTime + futureTime
			);
			vibratoGainNode.gain.linearRampToValueAtTime(
				0.0, 
				currentTime + futureTime + this.VibratoDelay
			);
			vibratoGainNode.gain.linearRampToValueAtTime(
				this.VibratoValue, 
				currentTime + futureTime + this.VibratoDelay + 1
			);
		}

		var oscillatorNode = this.AudioContext.createOscillator();
		oscillatorNode.type = this.WaveType;
		oscillatorNode.frequency.value = note.Frequency;

		var cutoffFrequency;
		var lowPassFilter;
		var peakingFilter;
		if (this.hasFiltering()) {
			cutoffFrequency = note.Frequency*Math.pow(
				this.FilterFrequencyModifier, (volume*this.FilterAmplitudeModifier)
			);

			lowPassFilter = this.AudioContext.createBiquadFilter();
			lowPassFilter.type = "lowpass";
			lowPassFilter.frequency.value = cutoffFrequency;

			console.log("frequency: " + note.Frequency);
			console.log("lowpass cutoff frequency: " + lowPassFilter.frequency.value);

			peakingFilter = this.AudioContext.createBiquadFilter();
			peakingFilter.type = "peaking";
			peakingFilter.frequency.value = cutoffFrequency / Math.pow(2, 7);
			peakingFilter.gain.value = this.FilterMaxGain * (1.0 - volume);
			peakingFilter.Q.value = this.FilterMaxQ * (1.0 - volume);

			console.log("volume: " + volume);
			console.log("peaking frequency: " + peakingFilter.frequency.value);
			console.log("peaking Q: " + peakingFilter.Q.value);
			console.log("peaking gain: " + peakingFilter.gain.value);
		}
		
		var gainNode = this.AudioContext.createGain();
		//gainNode.gain.value = 0.1;
		gainNode.gain.linearRampToValueAtTime(0.0, currentTime + futureTime);
		gainNode.gain.linearRampToValueAtTime(
			volume*attackVolume, 
			currentTime + futureTime + attackDuration
		);
		gainNode.gain.linearRampToValueAtTime(
			volume, 
			currentTime + futureTime + attackDuration + decayDuration
		);
		gainNode.gain.linearRampToValueAtTime(
			volume, 
			currentTime + futureTime + duration - releaseDuration
		);
		gainNode.gain.linearRampToValueAtTime(
			0.0, 
			currentTime + futureTime + duration
		);

		if (this.hasVibrato()) {
			vibratoOscNode.connect(vibratoGainNode);
			vibratoGainNode.connect(oscillatorNode.frequency);
			vibratoOscNode.start(currentTime + futureTime, 0, duration);
			vibratoOscNode.stop(currentTime + futureTime + duration);
		}
		//oscillatorNode.connect(gainNode);

		if (this.hasFiltering()) {
			oscillatorNode.connect(lowPassFilter);
			lowPassFilter.connect(peakingFilter);
			peakingFilter.connect(gainNode);
		} else {
			oscillatorNode.connect(gainNode);
		}
		gainNode.connect(dynamicsCompressorNode);
		gainNode.connect(this.AudioContext.destination);

		oscillatorNode.start(currentTime + futureTime, 0, duration);
		oscillatorNode.stop(currentTime + futureTime + duration);
	};

	hsc.Instrument.prototype.playNotesAtCue = function(notes, cue, volume) {
		for (var i = 0; i < notes.length; i++) {
			this.play(notes[i], cue, volume);
		}
	}

	hsc.Instrument.prototype.playNotesAtCues = function(notes, cues, volume) {
		if (notes.length != cues.length) {
			throw "The array of HSC.Notes and the array of HSC.Cues passed " +
			  "into HSC.Instrument.playNotesAtCues() must contain the same " +
			  "number of elements in each array; " + notes.length + " notes " +
			  "and " + cues.length + " cues were passed in.";
		}
		for (var i = 0; i < notes.length; i++) {
			this.play(notes[i], cues[i], volume);
		}
	}

	return hsc;
})(HSC || {});