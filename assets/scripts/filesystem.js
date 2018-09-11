function FileSystem() {
	this.isSupported = false;
	this.folderKey = "qsim_";
	if (typeof(Storage) !== "undefined") {
		this.isSupported = true;
	}
}

FileSystem.prototype.open = function(filename) {
	if (this.isSupported == true) {
		return localStorage.getItem(this.folderKey + filename);
	}
}

FileSystem.prototype.save = function(filename, text) {
	if (this.isSupported == true) {
		localStorage.setItem(this.folderKey + filename, text);
	}
}

FileSystem.prototype.delete = function(filename) {
	if (this.isSupported == true) {
		localStorage.removeItem(this.folderKey + filename);
	}
}

FileSystem.prototype.listFiles = function() {
	filenames = [];
	for (var i = 0; i < localStorage.length; i++) {
		keyName = localStorage.key(i);
		if (keyName.indexOf(this.folderKey) == 0) {
			filename = keyName.substring(this.folderKey.length);
			filenames.push(filename);
		}
	}
	return filenames;
}