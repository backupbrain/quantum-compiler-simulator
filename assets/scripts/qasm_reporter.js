function QasmReporter() {

}

QasmReporter.prototype.displaySummary = function(summaryData) {
	if ((summaryData == null) || (summaryData.length == 0)) {
		$("#output_overview").fadeOut(100);
	} else {
		const tableMarkup = `<table id="simulator_overview">
			<thead>
				<tr>
					<th>Output</th><th>Percent Output</th><th>Num Results</th>
				</tr>
			</thead><tbody>
				${summaryData.map(row => `<tr><td><code>${row.result}</code></td><td>${row.percent} %</td><td>${row.num_results}</td></tr>`).join("")}
			</tbody>
		</table>`;

		$("#output_overview").html(tableMarkup);
		$("#output_overview").fadeIn(100);
		this.show();
	}
}

QasmReporter.prototype.displayRawData = function(rawData, inLittleEndianMode=true) {
	packagedData = [];
	for (var i = 0; i < rawData.length; i++) {
		package = {
			"iteration": i,
			result: this.registersToString(rawData[i], inLittleEndianMode)
		};
		packagedData.push(package);
	}
	if ((rawData == null) || (rawData.length == 0)) {
		$("#output_raw_data").fadeOut(100);
	} else {
		const rawDataTableMarkup = `<table id="simulator_output_data">
			<thead>
				<tr>
					<th>Iteration</th><th>Output</th>
				</tr>
			</thead><tbody>
				${packagedData.map(result => `<tr><td>${result.iteration}</td><td><code>${result.result}</code></td></tr>`).join("")}
			</tbody>
		</table>`;

		$("#output_raw_data").html(rawDataTableMarkup);
		$("#output_raw_data").fadeIn(100);
		this.show();
	}
}


QasmReporter.prototype.show = function() {
	$("#visible_output").fadeIn(100);
}

QasmReporter.prototype.hide = function() {
	$("#visible_output").fadeOut(100);
	$("#output_raw_data").html("");
	$("#output_overview").html("");
}

QasmReporter.prototype.reportSpeed = function(numIterations, timeLapse_ms) {
	$("#log").html(
		numIterations + " iterations in " + timeLapse_ms + " milliseconds"
	);
}

QasmReporter.prototype.registersToString = function(registerArray, littleEndianMode=true) {
	values = "";
	if (littleEndianMode) {
		for (var registerId = 0; registerId < registerArray.length; registerId++) {
			values = registerArray[registerId] + values;
		}
	} else {
		for (var registerId = registerArray.length - 1; registerId >= 0; registerId--) {
			values = registerArray[registerId] + values;
		}
	}
	return values;

}