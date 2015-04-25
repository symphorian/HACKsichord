var HSC = (function(hsc) {
	// step definitions
	var halfStep = 1;
	var wholeStep = 2;
	var tripleStep = 3;

	// common scale template definitions
	var chromaticScaleTemplate = [
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep,
	  halfStep
	];
	var majorScaleTemplate = [
	  wholeStep,
	  wholeStep,
	  halfStep,
	  wholeStep,
	  wholeStep,
	  wholeStep,
	  halfStep
	];
	var minorNaturalScaleTemplate = [ // use for descending
		wholeStep,
		halfStep,
		wholeStep,
		wholeStep,
		halfStep,
		wholeStep,
		wholeStep
  ]; 
	var minorHarmonicScaleTemplate = [
	  wholeStep,
	  halfStep,
	  wholeStep,
	  wholeStep,
	  halfStep,
	  tripleStep,
	  halfStep
	];
	var minorMelodicScaleTemplate = [ // use for ascending
	  wholeStep,
	  halfStep,
	  wholeStep,
	  wholeStep,
	  wholeStep,
	  wholeStep,
	  halfStep
	];

  // interval definitions
	var perfect1stInterval = 0*halfStep;
	var augmented1stInterval = perfect1stInterval+1*halfStep;
	
	var major2ndInterval = 2*halfStep; // 2
	var minor2ndInterval = major2ndInterval-1*halfStep; // 1
	var augmented2ndInterval = major2ndInterval+1*halfStep; // 3
	var diminished2ndInterval = minor2ndInterval-1*halfStep; // 0 

	var major3rdInterval = 4*halfStep; // 4
	var minor3rdInterval = major3rdInterval-1*halfStep; // 3
	var augmented3rdInterval = major3rdInterval+1*halfStep; // 5
	var diminished3rdInterval = minor3rdInterval-1*halfStep; // 2

	var perfect4thInterval = 5*halfStep; // 5
	var augmented4thInterval = perfect4thInterval+1*halfStep; // 6
	var diminished4thInterval = perfect4thInterval-1*halfStep; // 4

	var perfect5thInterval = 7*halfStep; // 7
	var augmented5thInterval = perfect5thInterval+1*halfStep; // 8
	var diminished5thInterval = perfect5thInterval-1*halfStep; // 6

	var major6thInterval = 9*halfStep; // 9
	var minor6thInterval = major6thInterval-1*halfStep; // 8
	var augmented6thInterval = major6thInterval+1*halfStep; // 10
	var diminished6thInterval = minor6thInterval-1*halfStep; // 7

	var major7thInterval = 11*halfStep; // 11
	var minor7thInterval = major7thInterval-1*halfStep; // 10
	var augmented7thInterval = major7thInterval+1*halfStep; // 12
	var diminished7thInterval = minor7thInterval-1*halfStep; // 9

	var perfect8thInterval = 12*halfStep; // 12
	var augmented8thInterval = perfect8thInterval+1*halfStep; // 13 (1)
	var diminished8thInterval = perfect8thInterval-1*halfStep; // 11

	// chord template definitions
	var majorTriadChordTemplate = [major3rdInterval,perfect5thInterval];
	var minorTriadChordTemplate = [minor3rdInterval,perfect5thInterval];
	var augmentedTriadChordTemplate = [major3rdInterval,augmented5thInterval];
	var diminishedTriadChordTemplate = [minor3rdInterval,diminished5thInterval];

	var dominant7thChordTemplate = majorTriadChordTemplate.concat([minor7thInterval]);
	var major7thChordTemplate = majorTriadChordTemplate.concat([major7thInterval]);
	var minor7thChordTemplate = minorTriadChordTemplate.concat([minor7thInterval]);
	var halfDiminished7thChordTemplate = 
	  diminishedTriadChordTemplate.concat([minor7thInterval]);
	var fullyDiminished7thChordTemplate = 
	  diminishedTriadChordTemplate.concat([diminished7thInterval]);

	var minorMajor7thChordTemplate = minorTriadChordTemplate.concat([major7thInterval]);
	var augmentedMajor7thChordTemplate = 
	  augmentedTriadChordTemplate.concat([major7thInterval]);
	var augmented7thChordTemplate = augmentedTriadChordTemplate.concat([minor7thInterval]);

  hsc.TriadType = Object.freeze({
  	MAJOR: 'major',
		MINOR: 'minor',
		AUGMENTED: 'augmented',
		DIMINISHED: 'diminished'
  });

  hsc.ChordType = Object.freeze({
    DOMINANT_SEVENTH: 'dominant7th',
    MAJOR_SEVENTH: 'major7th',
    MINOR_SEVENTH: 'minor7th',
    HALF_DIMINISHED_SEVENTH: 'halfDiminished7th',
    FULLY_DIMINISHED_SEVENTH: 'fullyDiminished7th',
    MINOR_MAJOR_SEVENTH: 'minorMajor7th',
    AUGMENTED_MAJOR_SEVENTH: 'augmentedMajor7th',
    AUGMENTED_SEVENTH: 'augmented7th'
	});

	hsc.IntervalType = Object.freeze({
		PERFECT_FIRST: 'perfect1st',
		AUGMENTED_FIRST: 'augmented1st',
		MAJOR_SECOND: 'major2nd',
		MINOR_SECOND: 'minor2nd',
		AUGMENTED_SECOND: 'augmented2nd',
		DIMINISHED_SECOND: 'diminished2nd',
		MAJOR_THIRD: 'major3rd',
		MINOR_THIRD: 'minor3rd',
		AUGMENTED_THIRD: 'augmented3rd',
		DIMINISHED_THIRD: 'diminished3rd',
		PERFECT_FOURTH: 'perfect4th',
		AUGMENTED_FOURTH: 'augmented4th',
		DIMINISHED_FOURTH: 'diminished4th',
		PERFECT_FIFTH: 'perfect5th',
		AUGMENTED_FIFTH: 'augmented5th',
		DIMINISHED_FIFTH: 'diminished5th',
		MAJOR_SIXTH: 'major6th',
		MINOR_SIXTH: 'minor6th',
		AUGMENTED_SIXTH: 'augmented6th',
		DIMINISHED_SIXTH: 'diminished6th',
		MAJOR_SEVENTH: 'major7th',
		MINOR_SEVENTH: 'minor7th',
		AUGMENTED_SEVENTH: 'augmented7th',
		DIMINISHED_SEVENTH: 'diminished7th',
		PERFECT_EIGHTH: 'perfect8th',
		AUGMENTED_EIGHTH: 'augmented8th',
		DIMINISHED_EIGHTH: 'diminished8th'
	});

  hsc.ScaleType = Object.freeze({
		CHROMATIC: 'chromatic',
		MAJOR: 'major',
		MINOR_NATURAL: 'minor',
		MINOR_HARMONIC: 'harmonic',
		MINOR_MELODIC: 'melodic'
	});

	hsc.DiatonicTriadType = Object.freeze({
		I: 'I',
		ii: 'ii',
		iii: 'iii',
		IV: 'IV',
		V: 'V',
		vi: 'vi',
		viio: 'viio'
	});

	hsc.getInterval = function(intervalType) {
		var vIntervalType = validateIntervalType(intervalType);
		if (vIntervalType == null) return 0;

		switch(intervalType) {
			case hsc.IntervalType.PERFECT_FIRST:
        return perfect1stInterval;

      case hsc.IntervalType.AUGMENTED_FIRST:
        return augmented1stInterval;

      case hsc.IntervalType.MAJOR_SECOND:
        return major2ndInterval;

      case hsc.IntervalType.MINOR_SECOND:
        return minor2ndInterval;

      case hsc.IntervalType.AUGMENTED_SECOND:
        return augmented2ndInterval;

      case hsc.IntervalType.DIMINISHED_SECOND:
        return diminished2ndInterval;

      case hsc.IntervalType.MAJOR_THIRD:
        return major3rdInterval;

      case hsc.IntervalType.MINOR_THIRD:
        return minor3rdInterval;

      case hsc.IntervalType.AUGMENTED_THIRD:
        return augmented3rdInterval;

      case hsc.IntervalType.DIMINISHED_THIRD:
        return diminished3rdInterval;

      case hsc.IntervalType.PERFECT_FOURTH:
        return perfect4thInterval;

      case hsc.IntervalType.AUGMENTED_FOURTH:
        return augmented4thInterval;

      case hsc.IntervalType.DIMINISHED_FOURTH:
        return diminished4thInterval;

      case hsc.IntervalType.PERFECT_FIFTH:
        return perfect5thInterval;

      case hsc.IntervalType.AUGMENTED_FIFTH:
        return augmented5thInterval;

      case hsc.IntervalType.DIMINISHED_FIFTH:
        return diminished5thInterval;

      case hsc.IntervalType.MAJOR_SIXTH:
        return major6thInterval;

      case hsc.IntervalType.MINOR_SIXTH:
        return minor6thInterval;

      case hsc.IntervalType.AUGMENTED_SEVENTH:
        return augmented7thInterval;

      case hsc.IntervalType.DIMINISHED_SEVENTH:
        return diminished7thInterval;

      case hsc.IntervalType.PERFECT_EIGHTH:
        return perfect8thInterval;

      case hsc.IntervalType.AUGMENTED_EIGHTH:
        return augmented8thInterval;

      case hsc.IntervalType.DIMINISHED_EIGHTH:
        return diminished8thInterval;

      default:
        return 0;
		}
	}

	hsc.getTriadTemplate = function(triadType) {
    var vTriadType = validateTriadType(triadType);
    if (vTriadType == null) return [0, 0];

    switch(triadType) {
    	case hsc.TriadType.MAJOR:
    	  return majorTriadChordTemplate;

    	case hsc.TriadType.MINOR:
    	  return minorTriadChordTemplate;

    	case hsc.TriadType.AUGMENTED:
    	  return augmentedTriadChordTemplate;

    	case hsc.TriadType.DIMINISHED:
    	  return diminishedTriadChordTemplate;

    	default: 
    	  return [0, 0];
    }
	}

	hsc.getTriadTemplateForDiatonicTriadType = function(diatonicTriadType) {
    var vDiatonicTriadType = validateDiatonicTriadType(diatonicTriadType);
    if (vDiatonicTriadType == null) return [0, 0];

    var triadType;
    switch(diatonicTriadType) {
    	case hsc.DiatonicTriadType.I:
    	  triadType = hsc.TriadType.MAJOR;
    	  break;

    	case hsc.DiatonicTriadType.ii:
    	  triadType = hsc.TriadType.MINOR;
    	  break;

    	case hsc.DiatonicTriadType.iii:
    	  triadType = hsc.TriadType.MINOR;
    	  break;

    	case hsc.DiatonicTriadType.IV:
    	  triadType = hsc.TriadType.MAJOR;
    	  break;

    	case hsc.DiatonicTriadType.V:
    	  triadType = hsc.TriadType.MAJOR;
    	  break;

    	case hsc.DiatonicTriadType.vi:
    	  triadType = hsc.TriadType.MINOR;
    	  break;

    	case hsc.DiatonicTriadType.viio:
    	  triadType = hsc.TriadType.DIMINISHED;
    	  break;
    }

    if (!triadType) {
    	return [0, 0];
    }

    return hsc.getTriadTemplate(triadType);
	}

	hsc.getChordTemplate = function(chordType) {
    var vChordType = validateChordType(chordType);
    if (vChordType == null) return [0, 0, 0];

    switch(chordType) {
    	case hsc.ChordType.DOMINANT_SEVENTH:
    	  return dominant7thChordTemplate;

    	case hsc.ChordType.MAJOR_SEVENTH:
    	  return major7thChordTemplate;

    	case hsc.ChordType.MINOR_SEVENTH:
    	  return minor7thChordTemplate;

    	case hsc.ChordType.HALF_DIMINISHED_SEVENTH:
    	  return halfDiminished7thChordTemplate;

    	case hsc.ChordType.FULLY_DIMINISHED_SEVENTH:
    	  return fullyDiminished7thChordTemplate;

    	case hsc.ChordType.MINOR_MAJOR_SEVENTH:
    	  return minorMajor7thChordTemplate;

    	case hsc.ChordType.AUGMENTED_MAJOR_SEVENTH:
    	  return augmentedMajor7thChordTemplate;

    	case hsc.ChordType.AUGMENTED_SEVENTH:
    	  return augmented7thChordTemplate;

    	default: 
    	  return [0, 0, 0];
    }
  }

  hsc.getScaleTemplate = function(scaleType) {
		var vScaleType = validateScaleType(scaleType);
		if (vScaleType == null) return [0,0,0,0,0,0,0];

		var scaleTemplate;
		switch(scaleType) {
			case hsc.ScaleType.CHROMATIC:
				scaleTemplate = chromaticScaleTemplate;
				break; 

			case hsc.ScaleType.MAJOR:
				scaleTemplate = majorScaleTemplate;
				break;

			case hsc.ScaleType.MINOR_NATURAL:
				scaleTemplate = minorNaturalScaleTemplate;
				break;

			case hsc.ScaleType.MINOR_HARMONIC:
				scaleTemplate = minorHarmonicScaleTemplate;
				break;

			case hsc.ScaleType.MINOR_MELODIC:
				scaleTemplate = minorMelodicScaleTemplate;
				break;
		}
		return scaleTemplate;
	}

	function validateIntervalType(intervalType) {
		var validatedIntervalType;
		switch(intervalType) {
			case hsc.IntervalType.PERFECT_FIRST:
      case hsc.IntervalType.AUGMENTED_FIRST:
      case hsc.IntervalType.MAJOR_SECOND:
      case hsc.IntervalType.MINOR_SECOND:
      case hsc.IntervalType.AUGMENTED_SECOND:
      case hsc.IntervalType.DIMINISHED_SECOND:
      case hsc.IntervalType.MAJOR_THIRD:
      case hsc.IntervalType.MINOR_THIRD:
      case hsc.IntervalType.AUGMENTED_THIRD:
      case hsc.IntervalType.DIMINISHED_THIRD:
      case hsc.IntervalType.PERFECT_FOURTH:
      case hsc.IntervalType.AUGMENTED_FOURTH:
      case hsc.IntervalType.DIMINISHED_FOURTH:
      case hsc.IntervalType.PERFECT_FIFTH:
      case hsc.IntervalType.AUGMENTED_FIFTH:
      case hsc.IntervalType.DIMINISHED_FIFTH:
      case hsc.IntervalType.MAJOR_SIXTH:
      case hsc.IntervalType.MINOR_SIXTH:
      case hsc.IntervalType.AUGMENTED_SEVENTH:
      case hsc.IntervalType.DIMINISHED_SEVENTH:
      case hsc.IntervalType.PERFECT_EIGHTH:
      case hsc.IntervalType.AUGMENTED_EIGHTH:
      case hsc.IntervalType.DIMINISHED_EIGHTH:
        validatedIntervalType = intervalType;
		}
		return validatedIntervalType;
	}

	function validateTriadType(triadType) {
		var validatedTriadType;
		switch(triadType) {
			case hsc.TriadType.MAJOR:
			case hsc.TriadType.MINOR:
			case hsc.TriadType.AUGMENTED:
			case hsc.TriadType.DIMINISHED:
			  validatedTriadType = triadType;
			  break;
		}
		return validatedTriadType;
	}

	function validateChordType(chordType) {
		var validatedChordType;
		switch(chordType) {
			case hsc.ChordType.DOMINANT_SEVENTH:
      case hsc.ChordType.MAJOR_SEVENTH:
      case hsc.ChordType.MINOR_SEVENTH:
      case hsc.ChordType.HALF_DIMINISHED_SEVENTH:
      case hsc.ChordType.FULLY_DIMINISHED_SEVENTH:
      case hsc.ChordType.MINOR_MAJOR_SEVENTH:
      case hsc.ChordType.AUGMENTED_MAJOR_SEVENTH:
      case hsc.ChordType.AUGMENTED_SEVENTH:
			  validatedChordType = chordType;
			  break;
		}
		return validatedChordType;
	}

	function validateScaleType(scaleType) {
		var validatedScaleType;
		switch(scaleType) {
			case hsc.ScaleType.CHROMATIC:
			case hsc.ScaleType.MAJOR:
			case hsc.ScaleType.MINOR_NATURAL:
			case hsc.ScaleType.MINOR_HARMONIC:
			case hsc.ScaleType.MINOR_MELODIC:
				validatedScaleType = scaleType;
				break;
		}
		return validateScaleType;
	}

	function validateDiatonicTriadType(diatonicTriadType) {
		var validatedDiatonicTriadType;
		switch(diatonicTriadType) {
			case hsc.DiatonicTriadType.I:
			case hsc.DiatonicTriadType.ii:
			case hsc.DiatonicTriadType.iii:
			case hsc.DiatonicTriadType.IV:
			case hsc.DiatonicTriadType.V:
			case hsc.DiatonicTriadType.vi:
			case hsc.DiatonicTriadType.viio:
			  validatedDiatonicTriadType = diatonicTriadType;
			  break;
		}
		return validatedDiatonicTriadType;
	}

  return hsc;
})(HSC || {});