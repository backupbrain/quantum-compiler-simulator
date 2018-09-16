/**
 * Quantum Computer Simulator - Simulated Quantum CPU
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

function QCPU() {
	this.in_verbose_mode = true;
	this.MAX_QUBITS = 5;
	this.qubits = [];
	this.registers = [];
	this.qubits_measured = [];
	this.entangled_qubits = [];

	this.matrices = {
		"default": math.matrix([[1], [0]]),
	};
}

QCPU.prototype.say = function(message) {
	if (this.in_verbose_mode == true) {
		console.log(message);
	}
}

QCPU.prototype.get_num_qubits = function() {
	var num_qubits = this.qubits.length;
	return num_qubits
}

QCPU.prototype.register_qubit = function() {
	num_qubits = this.get_num_qubits();
	if (num_qubits <= this.MAX_QUBITS) {
		this.qubits.push(math.matrix([[1], [0]]));
	} else {
		// throw exception
	}
}

QCPU.prototype.register_qubits = function(num_qubits) {
	qasm = "qreg q[" + num_qubits + "];";
	this.say(qasm);
	for (var i = 0; i < num_qubits; i ++) {
		this.register_qubit();
	}
}

QCPU.prototype.get_num_classical_bits = function() {
	var num_qubits = this.qubits.length;
	return num_qubits
}

QCPU.prototype.register_classical_bit = function() {
	num_bits = this.get_num_classical_bits();
	if (num_bits <= this.MAX_QUBITS) {
		this.registers.push(0);
		this.qubits_measured.push(false);
	} else {
		// throw exception
	}
}

QCPU.prototype.register_classical_bits = function(num_bits) {
	qasm = "creg c[" + num_bits + "];";
	this.say(qasm);
	for (var i = 0; i < num_bits; i ++) {
		this.register_classical_bit();
	}
}

QCPU.prototype.id = function(qubit_id) {
	qasm = "reset q[" + qubit_id + "];";
	this.say(qasm);
	// FIXME: break entanglement
}

QCPU.prototype.h = function(qubit_id) {
	qasm = "h q[" + qubit_id + "];";
	this.say(qasm);
	this.break_entanglement(qubit_id);
	root2 = math.sqrt(math.bignumber(2));
	one_over_root2 = math.divide(1, root2);
	minus_one_over_root2 = math.multiply(-1, one_over_root2);
	transform = math.matrix([
        [one_over_root2, one_over_root2],
        [one_over_root2, minus_one_over_root2]
    ]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.x = function(qubit_id) {
	qasm = "x q[" + qubit_id + "];";
	this.say(qasm);
	transform = math.matrix([
		[0, 1],
		[1, 0]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
    /*
	// apply to entangled qubits
	entangled_bit_ids = this.get_entangled_bits(qubit_id);
	console.log("entangled bits with " + qubit_id);
	for (var row = 0; row < entangled_bit_ids.length; row++) {
		entangled_bit_id = entangled_bit_ids[row];
		console.log(entangled_bit_id)
	}
	*/
}

QCPU.prototype.y = function(qubit_id) {
	qasm = "y q[" + qubit_id + "];";
	this.say(qasm);
	i = math.complex(0, 1);
	minus_i = math.complex(0, -1);
	transform = math.matrix([
		[0, minus_i],
		[i, 0]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.z = function(qubit_id) {
	qasm = "z q[" + qubit_id + "];";
	this.say(qasm);
	transform = math.matrix([
		[1,  0],
		[0, -1]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.s = function(qubit_id) {
	qasm = "s q[" + qubit_id + "];";
	this.say(qasm);
	i = math.complex(0, 1);
	transform = math.matrix([
		[1,0],
		[0, i]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.sdg = function(qubit_id) {
	qasm = "sdg q[" + qubit_id + "];";
	this.say(qasm);
	minus_i = math.complex(0, -1);
	transform = math.matrix([
		[1,0],
		[0, minus_i]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.t = function(qubit_id) {
	qasm = "t q[" + qubit_id + "];";
	this.say(qasm);
	b_2 = math.divide(math.complex(1, 1) / math.sqrt(2));
	transform = math.matrix([
		[1, 0],
		[0, b_2]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.tdg = function(qubit_id) {
	qasm = "tdg q[" + qubit_id + "];";
	this.say(qasm);
	b_2 = math.divide(math.complex(1, -1) / math.sqrt(2));
	transform = math.matrix([
		[1, 0],
		[0, b_2]
	]);
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.u1 = function(qubit_id, angle_rads) {
	qasm = "u1 q[" + qubit_id + "];";
	this.say(qasm);
	b_2 = math.exp(math.multiply(math.complex(0, 1), angle_rads));
	transform = [
		[1, 0],
		[0, b_2]
	];
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.u2 = function(qubit_id, angle1_rads, angle2_rads) {
	qasm = "u2 q[" + qubit_id + "];";
	this.say(qasm);
	root2 = math.sqrt(2);
	a_1 = math.divide(1, root2);
	a_2_exp = math.multiply(math.complex(0, 1), angle1_rads)
	a_2 = math.exp(math.multiply(math.complex(0, 1), angle2_rads));
	b_1 = math.multiply(
		-1, 
		math.divide(
			math.exp(math.multiply(math.complex(0, 1), angle1_rads)),
			root2
		)
	);
	b_2_exp = math.add(
		math.multiply(math.complex(0, 1), angle1_rads),
		math.multiply(math.complex(0, 1), angle2_rads)
	)
	b_2 = math.divide(math.exp(b_2_exp), root2);
	transform = [
		[a_1, b_1],
		[a_2, b_2]
	];
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );
}

QCPU.prototype.u3 = function(qubit_id, angle1_rads, angle2_rads, angle3_rads) {
	qasm = "u3 q[" + qubit_id + "];";
	this.say(qasm);
	a_1 = math.cos(math.divide(angle3_rads, 2));
	b_1_exp = math.multiply(math.complex(0, 1), angle1_rads);
	b_1_multiplier = math.sin(math.divide(angle3_rads, 2));
	b_1 = math.multiply(-1, math.multiply(math.exp(b_1_exp), b_1_multiplier));
	a_2_exp = math.multiply(math.complex(0, 1), angle2_rads);
	a_2_multiplier = math.sin(math.divide(angle3_rads, 2));
	a_2 = math.multiply(math.exp(a_2_exp), a_2_multiplier);
	b_2_exp = math.add(
		math.multiply(math.complex(0, 1), angle1_rads),
		math.multiply(math.complex(0, 1, angle2_rads))
	);
	b_2_multiplier = math.cos(math.divide(angle3_rads, 2));
	b_2 = math.multiply(math.exp(b_2_exp), b_2_multiplier);
	transform = [
		[a_1, b_1],
		[a_2, b_2]
	];
    this.qubits[qubit_id] = math.multiply(
    	transform,
    	this.qubits[qubit_id]
    );

    /*
	// apply to entangled qubits
	entangled_bit_ids = this.get_entangled_bits(qubit_id);
	for (var row = 0; row < entangled_bit_ids.length; row++) {
		entangled_bit_id = entangled_bit_ids[row];
		this.qubits[entangled_bit_id] = math.multiply(
			transform,
			this.qubits[entangled_bit_id]
		)
	}
	*/
}

QCPU.prototype.does_entanglement_exist = function(qubit_id_1, qubit_id_2) {
	for (var pair_id = 0; pair_id < this.entangled_qubits.length; pair_id++) {
		var is_bit1_found = false;
		var is_bit2_found = false;
		var pair = this.entangled_qubits[pair_id];
		for (var qubit_id = 0; qubit_id < pair.length; qubit_id++) {
			if (pair[qubit_id] == qubit_id_1) {
				is_bit1_found = true;
			}
			if (pair[qubit_id] == qubit_id_2) {
				is_bit2_found = true;
			}
			if (is_bit1_found && is_bit2_found) {
				return true;
			}
		}
	}
	return false;
}

QCPU.prototype.get_entangled_bits = function(bit_id) {
	entanglements = []
	for (var pair_id = 0; pair_id < this.entangled_qubits.length; pair_id++) {
		entangled_pair = this.entangled_qubits[pair_id];
		//console.log(entangled_pair);
		if (entangled_pair[0] == bit_id) {
			entanglements.push(entangled_pair[1]);
		}
		if (entangled_pair[1] == bit_id) {
			entanglements.push(entangled_pair[0]);
		}
	}
	//console.log("get_entangled_bits: ");
	//console.log(this.entangled_qubits);
	return entanglements;
}

QCPU.prototype.get_entangled_rows = function(bit_id) {
	row_ids = [];
	does_entanglement_exist = (this.get_entangled_bits(bit_id).length > 0);
	if (does_entanglement_exist) {
		for (var row_id = 0; row_id < this.entangled_qubits.length; row_id++) {
			pair = this.entangled_qubits[row_id];
			if (bit_id in pair) {
				row_ids.push(row_id);
			}
		}
	}
	return row_ids;
}

QCPU.prototype.break_entanglement = function(bit_id) {
	row_ids = this.get_entangled_rows(bit_id);
	for (var row_id = (row_ids.length - 1); row_id >= 0; row_id--) {
		this.entangled_qubits.pop(row_id);
	}
}

QCPU.prototype.cx = function(qubit_id_1, qubit_id_2) {
	qasm = "cx q[" + qubit_id_1 + "],q[" + qubit_id_2 + "];";
	this.say(qasm);

	// FIXME: measure all entangled bits
	// so that going forward, all interactions are interrelated.
	// a better way to do this might be to 
	this.measure(qubit_id_1);
	this.measure(qubit_id_2);

	does_entanglement_exist = this.does_entanglement_exist(
		qubit_id_1,
		qubit_id_2
	);
	if (this.does_entanglement_exist(qubit_id_1, qubit_id_2) == false) {
		this.entangled_qubits.push([qubit_id_1, qubit_id_2]);
	}
	control_qubit = this.qubits[qubit_id_1];
	this.qubits[qubit_id_2] = control_qubit;
	/*
	output = "";
	for (var i=0; i<this.entangled_qubits.length; i++) {
		qubits = this.entangled_qubits[i];
		output += "[";
		for (var j = 0; j < qubits.length; j++) {
			output += qubits[j] + ",";
		}
		output += "],";
	}
	console.log(output);
	*/
}

QCPU.prototype.measure = function(qubit_id, classical_bit_id=null) {
	if (classical_bit_id == null) {
		classical_bit_id = qubit_id;
	}
	qasm = "measure q[" + qubit_id + "] -> c[" + classical_bit_id + "];";
	this.say(qasm);

	probabilities = [
		math.multiply(
			this.qubits[qubit_id].get([0, 0]),
			this.qubits[qubit_id].get([0, 0])
		),
		math.multiply(
			this.qubits[qubit_id].get([1, 0]),
			this.qubits[qubit_id].get([1, 0])
		)
	];

	classical_state = 0;
	var sum = 0;
	random_number = math.random(1);
	//console.log("probabilities:");
	//console.log(probabilities);
	for (var value = 0; value < probabilities.length; value++) {
		sum = math.add(sum, probabilities[value]);
		/*
		console.log(
			"qubit " + qubit_id + " value: " + value + \
			" from: " + random_number + ", sum: " + sum
		);
		*/
		if (random_number <= sum) {
			classical_state = value;
			break;
		}
	}
	//console.log("qubit " + qubit_id + " classical state: " + classical_state + " from: " + random_number + ", sum: " + sum);
	if (classical_state == 0) {
		this.qubits[qubit_id] = math.matrix([[1], [0]]);
	} else {
		this.qubits[qubit_id] = math.matrix([[0], [1]]);
	}
	this.registers[classical_bit_id] = classical_state;
	this.qubits_measured[qubit_id] = true;
	entangled_bit_ids = this.get_entangled_bits(qubit_id);

	output = "";
	for (var i=0; i<this.entangled_qubits.length; i++) {
		qubits = this.entangled_qubits[i];
		output += "[";
		for (var j = 0; j < qubits.length; j++) {
			output += qubits[j] + ",";
		}
		output += "],";
	}
	/*
	for (var row = 0; row < entangled_bit_ids.length; row++) {
		entangled_bit_id = entangled_bit_ids[row];
		this.qubits[entangled_bit_id] = this.qubits[qubit_id];
	}
	this.break_entanglement(qubit_id);
	*/
	return classical_state;
}

QCPU.prototype.getRegisters = function() {
	result = []
	for (registerId = 0; registerId < this.registers.length; registerId++) {
		result.push(this.registers[registerId]);
	}
	return result;
}
