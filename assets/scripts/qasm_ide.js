/**
 * Quantum Computer Simulator - Editor
 * Javascript Programmable Simulated Quantum Computer
 * @author Tony Gaitatzis <backupbrain@gmail.com>
 * @date 2018-09-01
 */
 /*
MIT License

Copyright (c) 2018 Tony Gaitatzis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function QasmIde() {
	this.init();
}

QasmIde.prototype.init = function() {
	ide = this;
	$("#file_save").click(function(event) {
		filename = $("#editable_filename").html();
		code = ide.getCleanedCodeFromEditor();
		numIterations = ide.getNumIterations();
		ide.save(filename, code, numIterations);
	});
	$("#file_new").click(function(event) {
		ide.new();
	});
	this.new();
}

QasmIde.prototype.getCleanedCodeFromEditor = function() {
	return editor.getValue();
}

QasmIde.prototype.getFileName = function() {
	filename = $("#editable_filename").html();
	return filename;
}

QasmIde.prototype.getNumIterations = function() {
	numIterations = parseInt($("#simulator_num_iterations").val());
	return numIterations;
}

QasmIde.prototype.loadFile = function(filename, code, numIterations) {
	$("#editable_filename").html(filename);

	editor.session.setValue(code);
	$("#simulator_num_iterations").val(numIterations);
}

QasmIde.prototype.save = function() {
	outputs = runner.results;
	summary = runner.summary;
	filename = $("#editable_filename").html();
	code = this.getCleanedCodeFromEditor();
	numIterations = this.getNumIterations();
	qasmFile = new QasmFile();
	qasmFile.code = code;
	qasmFile.numIterations = numIterations;
	qasmFile.summary = summary;
	qasmFile.outputs = outputs;
	filesystem.save(filename, qasmFile);
}

QasmIde.prototype.new = function() {
	editor.session.setValue("");
	$("#editable_filename").html(filemanager.createRandomString() + ".qsm");
	reporter.hide();
}