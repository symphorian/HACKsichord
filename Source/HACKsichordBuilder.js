var HSC = (function(hsc) {
	hsc.buildTriad = function(note, triadType) {
		if (!(note instanceof hsc.Note)) {
    	throw "The first parameter of HSC.buildTriad() must be an " +
    	  "HSC.Note object; something else was passed in.";
    }
    if (triadType == undefined) {
    	triadType = hsc.TriadType.MAJOR;
    }

    var triadTemplate = hsc.getTriadTemplate(triadType);
    var triad = new Array(note);

    for (var i = 0; i < triadTemplate.length; i++) {
			triad.push(hsc.getNoteByHalfStepNumber(
        note.HalfStepNumber + triadTemplate[i]
      ));
		}
		return triad;
	};

  hsc.buildDiatonicTriad = function(note, diatonicTriadType) {
    if (!(note instanceof hsc.Note)) {
      throw "The first parameter of HSC.buildDiatonicTriad() must be an " +
        "HSC.Note object; something else was passed in.";
    }
    if (diatonicTriadType == undefined) {
      diatonicTriadType = hsc.DiatonicTriadType.I;
    }

    var triadTemplate = 
      hsc.getTriadTemplateForDiatonicTriadType(diatonicTriadType);
    var triad = new Array(note);

    for (var i = 0; i < triadTemplate.length; i++) {
      triad.push(hsc.getNoteByHalfStepNumber(
        note.HalfStepNumber + triadTemplate[i]
      ));
    }
    return triad;
  };

	hsc.buildChord = function(note, chordType) {
		if (!(note instanceof hsc.Note)) {
    	throw "The first parameter of HSC.buildChord() must be an " +
    	  "HSC.Note object; something else was passed in.";
    }
    if (chordType == undefined) {
    	chordType = hsc.ChordType.MAJOR_SEVENTH;
    }

    var chordTemplate = hsc.getChordTemplate(chordType);
    var chord = new Array(note);
    var currentHalfStepNumber = note.HalfStepNumber;

    for (var i = 0; i < chordTemplate.length; i++) {
			currentHalfStepNumber += chordTemplate[i];
			chord.push(hsc.getNoteByHalfStepNumber(currentHalfStepNumber));
		}
		return chord;
	};

	hsc.buildScale = function(note, scaleType, upAndDown) {
		if (!(note instanceof hsc.Note)) {
    	throw "The first parameter of HSC.buildScale() must be an " +
    	  "HSC.Note object; something else was passed in.";
    }
    if (scaleType == undefined) {
    	scaleType = hsc.ScaleType.MAJOR;
    }
    if (upAndDown == undefined) {
      upAndDown = true;
    }

    var scaleTemplate = hsc.getScaleTemplate(scaleType);
    var scale = new Array(note);
    var currentHalfStepNumber = note.HalfStepNumber;

    for (var i = 0; i < scaleTemplate.length; i++) {
			currentHalfStepNumber += scaleTemplate[i];
			scale.push(hsc.getNoteByHalfStepNumber(currentHalfStepNumber));
		}
    if (!upAndDown) {
      return scale;
    }
		
    i--;
    for (i = i; i >= 0; i--) {
      currentHalfStepNumber -= scaleTemplate[i];
      scale.push(hsc.getNoteByHalfStepNumber(currentHalfStepNumber));
    }
    return scale;
	};

  return hsc;
})(HSC || {});