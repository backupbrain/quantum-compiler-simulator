/**
 * Quantum Computer Simulator - Iterative Executor
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


function QasmRunner() {
	this.results = [];
	this.summary = [];
}

QasmRunner.prototype.run = function(script, numIterations, callback) {

	this.results = [];
	this.totals = {};
	this.values = [];
	this.summary = [];


	for (var iteration = 0; iteration < numIterations; iteration++) {
		qcpu = new QCPU();
		parser = new QASM_Parser(qcpu);
		parser.run_text(script);
		registers = qcpu.getRegisters();
		this.results[iteration] = registers;

		values = reporter.registersToString(registers);
		result = {
			"iteration": iteration,
			"result": values
		}
		//this.values.push(result);

		if (!this.inArray(values, this.values)) {
			this.values.push(values);
		}
		this.values.sort();
		if (values in this.totals) {
			this.totals[values] += 1;
		} else {
			this.totals[values] = 1;
		}


		qcpu = null;
		parser = null;

		if (callback != null) {
			percentComplete = 100 * iteration / numIterations;
			callback(percentComplete)
		}

	}

	rows = [];
	for (var v = 0; v < this.values.length; v++) {
		row = {
			"result": this.values[v],
			"num_results": this.totals[this.values[v]],
			"percent": Math.round(1000 * (this.totals[this.values[v]] / iteration)) / 10
		}
		rows.push(row);
	}
	this.summary = rows;

	output = {
		"summary": this.summary,
		"output": this.results
	}
	return output;
}


QasmRunner.prototype.inArray = function(needle, haystack) {
	return (haystack.indexOf(needle) > -1);
}

QasmRunner.prototype.display = function() {
	
}