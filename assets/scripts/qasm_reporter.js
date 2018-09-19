/**
 * Quantum Computer Simulator - Simulated Quantum CPU
 * Javascript Programmable Simulated Quantum Computer
 * @author Tony Gaitatzis <backupbrain@gmail.com>
 * @date 2018-09-15
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


		downloader = new DataDownloader();
		csvData = downloader.convertObjectsToCsv(packagedData);
		urlEncodedCsvData = downloader.createDownloadLink(csvData);
		downloader.link("download_raw_data", urlEncodedCsvData, ide.getFileName() + ".csv");
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