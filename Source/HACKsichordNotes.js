var HSC = (function(hsc) {
	var preventNoteInstantiation = false;
	hsc.Note = function(letter, sign, octave, frequency, halfStepNumber) {
    if (preventNoteInstantiation) {
    	throw "User attempted to instantiate HscNote; this is not allowed.";
    }

    this.Letter = letter;
    this.Sign = sign;
    this.Octave = octave;
    this.Name = this.Letter + this.Sign + this.Octave;
    this.Frequency = frequency;
    this.HalfStepNumber = parseInt(halfStepNumber, 10);
	}

	// dictionary definitions
  var notes = new Object();
	var notesByName = new Object(); // Object<Name, Note>
	var notesByHalfStepNumber = new Object(); // Object<HalfStepNumber, Array<Note>>

	hsc.getNoteByHalfStepNumber = function(halfStepNumber) {
		var results = notesByHalfStepNumber[halfStepNumber];
		if (results && results.length > 0) {
			return results[0];
		} else {
			return null;
		}
	}

	hsc.getNoteByName = function(name) {
		// var result = null;
		// var octave = notesByName[octave];
		// if (octave && octave[name]) {
		// 	result = octave[name];
		// }
		// return result;
		return notesByName[name];
	}

	function getFieldFromXMLNode(xmlNode, fieldName) {
  	var value = null;
  	if (xmlNode.getElementsByTagName(fieldName) && 
  		xmlNode.getElementsByTagName(fieldName).length > 0
    ) {
    	if (xmlNode.getElementsByTagName(fieldName)[0].childNodes.length == 0) {
        value = "";
    	} else {
    		value = xmlNode.getElementsByTagName(fieldName)[0].childNodes[0].nodeValue;
    	}
  		
  	}
  	return value;
  }

  // Load Notes
  (function() {
		var xmlFilename = "NoteFrequencies.xml"
		var xmlRequest = new XMLHttpRequest();
		xmlRequest.open("GET", xmlFilename, false);
		xmlRequest.send();
		var xmlDoc = xmlRequest.responseXML; 
		noteNodes = xmlDoc.getElementsByTagName("Note");

	  for (var i = 0; i < noteNodes.length; i++) {
	  	var node = noteNodes[i];
	  	var id = getFieldFromXMLNode(node, "ID");
	  	notes[id] = new hsc.Note(
	  		getFieldFromXMLNode(node, "Letter"),
	  		getFieldFromXMLNode(node, "Sign"),
	  		getFieldFromXMLNode(node, "Octave"),
	  		getFieldFromXMLNode(node, "Frequency"),
	  		getFieldFromXMLNode(node, "HalfStepNumber")
	  	);
	  }

	  for (var id in notes) {
	  	var note = notes[id];
	  	var name = note.Name;
	  	var halfStepNumber = note.HalfStepNumber;

	  	notesByName[name] = note;

	    if (!notesByHalfStepNumber[halfStepNumber]) {
	    	notesByHalfStepNumber[halfStepNumber] = [];
	    }
	    notesByHalfStepNumber[halfStepNumber].push(note);
	  }
	}).call(this);

  preventNoteInstantiation = true;

  return hsc;
})(HSC || {});