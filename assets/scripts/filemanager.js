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

function FileManager(containerId) {
	this.containerId = containerId;
	self = this;
	$("#file_open").click(function(event) {
		self.show();
	});
	$("#file_lister .close_modal").click(function(event) {
		self.hide();
	});
}

FileManager.prototype.show = function() {
	$("#file_lister").fadeIn(100);
	$("#file_modal_dimmer").fadeIn(100);
	this.refreshFileList();
}

FileManager.prototype.hide = function() {
	$("#file_modal_dimmer").fadeOut(100);
	$("#file_lister").fadeOut(100);
}

FileManager.prototype.refreshFileList = function() {
	self = this;
	//filenames = filesystem.listFiles();
	files = filesystem.getFiles();
	for (var i = 0; i < files.length; i++) {
		date = new Date(files[i].mtime);
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		files[i].displayDate = year + "-" + month + "-" + day;
	}

	if (files.length > 0) {
		const tableMarkup = `<table id="simulator_overview">
			<thead>
				<tr>
					<th>Filename</th>
					<th>Modified Date</th>
					<th>Size (Kb)</th>
					<th>Actions</th>
				</tr>
			</thead><tbody>
				${files.map(file => `<tr id="file_${file.name}" class="file_actions">
					<td><a href="#" id="open_${file.name}">${file.name}</a></td>
					<td>${file.displayDate}</td>
					<td>${file.size}</td>
					<td><button class="delete">Delete</button></td>
				</tr>`).join("")}
			</tbody>
		</table>`;
		$("#" + this.containerId).html(tableMarkup);

		$(".file_actions a").click(function(event) {
			event.preventDefault();
			filename = $(this).parent().parent().attr("id").substring("file_".length);
			fileData = filesystem.open(filename);
			if (fileData.contents != null) {
				qasmFile = new QasmFile();
				qasmFile.fromString(fileData.contents);
				ide.loadFile(filename, qasmFile.code, qasmFile.numIterations);
				reporter.displaySummary(qasmFile.summary);
				reporter.displayRawData(qasmFile.outputs);
			}
			self.hide();
		});
		$(".file_actions .delete").click(function(event) {
			event.preventDefault();
			filename = $(this).parent().parent().attr("id").substring("file_".length);
			filesystem.delete(filename);
			self.refreshFileList();
		});
	} else {
		const tableMarkup = `<table id="simulator_overview">
			<thead>
				<tr>
					<th>Filename</th>
					<th>Modified Date</th>
					<th>Size (Kb)</th>
					<th>Actions</th>
				</tr>
			</thead><tbody>
				<tr class="file_actions">
					<td colspan="4"><em>You haven't saved any files</em></td>
				</tr>
			</tbody>
		</table>`
		$("#" + this.containerId).html(tableMarkup);
	}
}

FileManager.prototype.createRandomString = function(length=6) {
	alphanum = "abcdefghijklmnopqrstuvwxyz0123456789";
	alphanumLength = alphanum.length;
	randomString = "";
	for (var carat = 0; carat < length; carat++) {
		randomChar = alphanum[math.floor(math.random(0, alphanumLength))];
		randomString += randomChar;
	}
	return randomString;
}
