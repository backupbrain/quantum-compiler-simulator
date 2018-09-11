/**
 * Quantum Computer Simulator - Code Parser
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

function QASM_Parser(qcpu) {
	this.in_verbose_mode = false;
	this.functions = [
		'OPENQASM',
		'include',
		'qreg',
		'creg',
		'h',
		'x',
		'y',
		'z',
		's',
		'sdg',
		't',
		'tdg',
		'cx',
		'measure'
	];
	this.includes = [
	];
	this.num_qubits = 0;
	this.qubits_matrix = {

	};
	this.num_registers = 0;
	this.registers_matrix = {

	};
	this.qcpu = qcpu;
}

QASM_Parser.prototype.say = function(message) {
	if (this.in_verbose_mode) {
		console.log(message);
	}
}

QASM_Parser.prototype.run_text = function(script) {

	comments_regex = /\/\/[^\n]*/g;
	code = script.replace(comments_regex, "");

	multiple_nelines = /(\n)+/g;
	code = code.replace(multiple_nelines, "\n");

	lines = code.split(";");
	for (var line_number = 0; line_number < lines.length; line_number++) {
		line = lines[line_number];
		line = line.replace("\n", "").trim();
		
		this.process_command(line);
	}
	//console.log(qcpu.registers);
}

QASM_Parser.prototype.process_command = function(text) {
	firstSpace = text.indexOf(" ");
	command = text.substr(0, firstSpace);
	value = text.substr(firstSpace, line.length).trim();

	switch (command) {
		case "OPENQASM":
			this.openasm_version = value;
		break;
		case "include":
			this.includes.push(value);
		break;
		case 'qreg':
			qubit_name = value.match(/^[^\[]+/)[0];
			num_qubits = parseInt(value.match(/\[(\d)+\]/)[1]);
			this.say("qreg " + qubit_name + "[" + num_qubits + "]");
			for (var i = 0; i < num_qubits; i++) {
				this.qubits_matrix[ qubit_name + "[" + i + "]"] = this.num_qubits;
				this.num_qubits++;
			}
			this.qcpu.register_qubits(num_qubits);
		break;
		case 'creg':
			register_name = value.match(/^[^\[]+/)[0];
			num_bits = parseInt(value.match(/\[(\d)+\]/)[1]);
			this.say("creg " + register_name + "[" + num_bits + "]");
			for (var i = 0; i < num_bits; i++) {
				this.registers_matrix[ register_name + "[" + i + "]"] = this.num_registers;
				this.num_registers++;
			}
			this.qcpu.register_classical_bits(num_bits);
		break;
		case 'h':
			qubit = this.qubits_matrix[value];
			this.say("h q[" + qubit + "]");
			this.qcpu.h(qubit);
		break;
		case 'x':
			qubit = this.qubits_matrix[value];
			this.say("x q[" + qubit + "]");
			this.qcpu.x(qubit);
		break;
		case 'y':
			qubit = this.qubits_matrix[value];
			this.say("y q[" + qubit + "]");
			this.qcpu.y(qubit);
		break;
		case 'z':
			qubit = this.qubits_matrix[value];
			this.say("z q[" + qubit + "]");
			this.qcpu.z(qubit);
		break;
		case 's':
			qubit = this.qubits_matrix[value];
			this.say("s q[" + qubit + "]");
			this.qcpu.z(qubit);
		break;
		case 'sdg':
			qubit = this.qubits_matrix[value];
			this.say("sdg q[" + qubit + "]");
			this.qcpu.sdg(qubit);
		break;
		case 't':
			qubit = this.qubits_matrix[value];
			this.say("t q[" + qubit + "]");
			this.qcpu.t(qubit);
		break;
		case 'tdg':
			qubit = this.qubits_matrix[value];
			this.say("tdg q[" + qubit + "]");
			this.qcpu.tdg(qubit);
		break;
		case 'cx':
			qubits = value.replace(" ", "").split(",");
			//console.log("qubits: ");
			//console.log(qubits);
			qubit_0 = this.qubits_matrix[qubits[0]];
			qubit_1 = this.qubits_matrix[qubits[1]];
			//console.log("qubit_0: " + qubit_0);
			//console.log("qubit_2: " + qubit_1);
			this.say("cx q[" + qubit_0 + "], q[" + qubit_1 + "]");
			this.qcpu.cx(qubit_0, qubit_1);
		break;
		case 'measure':
			this.say(value);
			registers = value.replace(" ", "").split("->");
			qubit = this.qubits_matrix[registers[0].trim()];
			register = this.registers_matrix[registers[1].trim()];
			this.say("measure q[" + qubit + "] -> c[" + register + "]");
			this.qcpu.measure(qubit, register);
		break;
		default:
			// throw exception
		break;
	}
	//console.log(this.qcpu);
};



