/**
 * Quantum Computer Simulator - Simulated Quantum CPU
 * Javascript Programmable Simulated Quantum Computer
 * @author Tony Gaitatzis <backupbrain@gmail.com>
 * @date 2018-09-18
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

function DataDownloader() {
}

DataDownloader.prototype.link = function(linkId, urlEncodedData, filename) {
	link = $("#" + linkId);
	link.attr('href', urlEncodedData);
	link.attr('download', filename);
}

DataDownloader.prototype.convertObjectsToCsv = function(
	data,
	dataWrapper='"',
	columnDelimiter=",",
	lineDelimiter="\n"
) {
	var result;
	var counter;
	var data;

	if (data == null || !data.length) {
		return null;
	}

	keys = Object.keys(data[0]);
	result = "";
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach(function(item) {
		counter = 0;
		keys.forEach(function(key) {
			if (counter > 0) result += columnDelimiter;
			result += item[key]; //dataWrapper + item[key] + dataWrapper;
			counter++;
		});
		result += lineDelimiter;
	});
	return result;
}

DataDownloader.prototype.createDownloadLink = function(
	data,
	mimetype="data:text/csv",
	charset="utf-8"
) {
	if (data == null) return null;

	if (!data.match(/^data:text\/csv/i)) {
		data = mimetype + ";" + "charset=" + charset + "," + data;
	}
	urlEncodedData = encodeURI(data);
	return urlEncodedData;
}