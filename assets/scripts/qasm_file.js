function QasmFile() {
	this.code = "";
	this.numIterations = 100;
	this.summary = [];
	this.outputs = [];
}

QasmFile.prototype.fromString = function(string) {
	var object = JSON.parse(string);
	console.log(object);
	this.code = object.code;
	this.numIterations = object.numIterations;
	this.summary = object.summary;
	this.outputs = object.outputs;
}

QasmFile.prototype.toString = function() {
	serializedObject = JSON.stringify(this);
	return serializedObject;
}