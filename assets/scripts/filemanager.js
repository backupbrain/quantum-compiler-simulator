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
