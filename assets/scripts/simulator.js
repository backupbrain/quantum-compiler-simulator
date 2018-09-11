/**
 * Quantum Computer Simulator - Controller Layer
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

var editor = null;
var runner = null;
var filesystem = null;
var filemanager = null;

math.config({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64        // Number of significant digits for BigNumbers
})

qasm_script = '// Name of Experiment: Coin Flip v1\n\nOPENQASM 2.0;\n\nqreg q[3]; // declare qbits\ncreg c[3]; // declare registers\n\nh q[1]; // place heads side into superposition\ncx q[1],q[0]; // entangle heads and tails\nx q[1]; // set tails as opposite of heads\nmeasure q[0] -> c[0]; // measure heads, collapsing superposition\nmeasure q[1] -> c[1]; // measure tails\n// because of entanglement, heads and tails will always be opposite'

$(document).ready(function() {
	runner = new QasmRunner();
	editor = new QasmEditor("code");
	filesystem = new FileSystem();
	filemanager = new FileManager("files");

	$("#code").html(qasm_script);

	$("#run").click(function(event) {
		$("#visible_output").css("display", "none");
		$("#progress_bar_container").css("display", "block");

		startTime_ms = Date.now();
		button = $("#run");
		oldButtonText = button.html();
		button.text("Simulating...");
		button.prop("disabled", true);
		qasm_script = $("#code").html();
		qasm_script = qasm_script.replace(/\<br\>/g, "\n");
		qasm_script = qasm_script.replace(/\&gt;/g, ">");
		numIterations = parseInt($("#num_iterations").val());
		runner.run(qasm_script, numIterations, updateProgressBar);

		endTime_ms = Date.now();
		timeLapse_ms = endTime_ms - startTime_ms;
		$("#log").html(
			numIterations + " iterations in " + timeLapse_ms + " milliseconds"
		);
		button.prop("disabled", false);
		button.html(oldButtonText);
		$("#visible_output").css("display", "block");
		$("#progress_bar_container").css("display", "none");
	});

	$("#filename").val(filemanager.createRandomString());
	$("#save").click(function(event) {
		filename = $("#filename").val();
		text = $("#editor").html();
		filesystem.save(filename, text);
		filemanager.refreshFileList();
	});
});

function updateProgressBar(percent) {
	console.log("progress: " + percent);
	$("#progress_bar #progress").width(percent + "%");
}
