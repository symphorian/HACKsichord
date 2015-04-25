var HSC = (function(hsc) {
  var preventKeySignatureInstantiation = false;
	hsc.KeySignature = function(type, majorKeyName, minorKeyName, signsByLetter) {
    if (preventKeySignatureInstantiation) {
    	throw "User attempted to instantiate HscKeySignature; this is not allowed.";
    }

    this.Type = type;
    this.MajorKeyName = majorKeyName;
    this.MinorKeyName = minorKeyName;
    this.SignsByLetter = signsByLetter;
	}

  // dictionary definitions
	var keySignatures = new Object();

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

  // Load KeySignatures
	(function() {
		var xmlFilename = "KeySignatures.xml"
		var xmlRequest = new XMLHttpRequest();
		xmlRequest.open("GET", xmlFilename, false);
		xmlRequest.send();
		var xmlDoc = xmlRequest.responseXML; 
		var ksNodes = xmlDoc.getElementsByTagName("KeySignature");

		for (var i = 0; i < ksNodes.length; i++) {
			var node = ksNodes[i];
			var id = getFieldFromXMLNode(node, "ID");
			var signsByLetter = new Object();

			var noteNamePairs = node.getElementsByTagName("NoteNamePair");
			for (var j = 0; j < noteNamePairs.length; j++) {
				var pair = noteNamePairs[j];
				var letter = getFieldFromXMLNode(pair, "Letter");
				var sign = getFieldFromXMLNode(pair, "Sign");
				signsByLetter[letter] = sign;
			}

			keySignatures[id] = new hsc.KeySignature(
				getFieldFromXMLNode(node, "Type"),
				getFieldFromXMLNode(node, "MajorKeyName"),
				getFieldFromXMLNode(node, "MinorKeyName"),
				signsByLetter
			);
		}
	}).call(this);

  preventKeySignatureInstantiation = true;

  return hsc;
})(HSC || {});