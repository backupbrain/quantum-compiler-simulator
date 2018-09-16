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

function FileManager(containerId) {
	this.containerId = containerId;
	this.refreshFileList();
}

FileManager.prototype.refreshFileList = function() {
	self = this;
	filenames = filesystem.listFiles();

	const tableMarkup = `<table id="simulator_overview">
		<thead>
			<tr>
				<th>Filename</th>
				<th>Actions</th>
			</tr>
		</thead><tbody>
			${filenames.map(filename => `<tr id="file_${filename}" class="file_actions"><td><a href="#">${filename}</a></td><td><button class="delete">Delete</button></td></tr>`).join("")}
		</tbody>
	</table>`;

	$("#" + this.containerId).html(tableMarkup);
	$(".file_actions a").click(function(event) {
		event.preventDefault();
		filename = $(this).parent().parent().attr("id").substring("file_".length);
		file_contents = filesystem.open(filename);
		if (file_contents != null) {
			$("#filename").val(filename);
			$("#editor").html(file_contents);
		}
	});
	$(".file_actions .delete").click(function(event) {
		event.preventDefault();
		filename = $(this).parent().parent().attr("id").substring("file_".length);
		filesystem.delete(filename);
		self.refreshFileList();
	});
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
