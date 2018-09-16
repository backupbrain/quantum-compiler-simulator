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

function FileSystem() {
	this.isSupported = false;
	this.folderKey = "qsim_v1_";
}

FileSystem.prototype.open = function(filename) {
	compressedFileMetaData = localStorage.getItem(this.folderKey + filename);
	fileMetaData = JSON.parse(this.decompress(compressedFileMetaData));
	return fileMetaData;
}

FileSystem.prototype.doesFileExist = function(filename) {
	file = localStorage.getItem(this.folderKey + filename);
	if (file == null) {
		return false;
	}
	return true;
}

FileSystem.prototype.save = function(filename, file) {
	mtime = new Date().getTime();
	fileMetaData = {
		"mtime": mtime,
		"contents": JSON.stringify(file)
	}
	saveData = this.compress(JSON.stringify(fileMetaData));
	localStorage.setItem(this.folderKey + filename, saveData);
}

FileSystem.prototype.delete = function(filename) {
	localStorage.removeItem(this.folderKey + filename);
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

FileSystem.prototype.getFiles = function() {
	files = [];
	for (var i = 0; i < localStorage.length; i++) {
		keyName = localStorage.key(i);
		if (keyName.indexOf(this.folderKey) == 0) {
			filename = keyName.substring(this.folderKey.length);
			fileData = this.open(filename);
			file = {
				"name": filename,
				"mtime": fileData["mtime"],
				"size": this.getFileSize_kb(filename)
			}
			files.push(file);
		}
		//console.log(keyName);
	}
	//console.log(files);
	return files;
}

FileSystem.prototype.getFileSize_kb = function(filenanme) {
	compressedData = localStorage.getItem(this.folderKey + filename);
	size_kb = (compressedData.length + filename.length) * 2;
	return size_kb;
}

FileSystem.prototype.getTotalFileUsage_kb = function() {
	totalUsage_kb = 0;
	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		value = localstorage.getItem(key);
		length = (key.length + value.length) * 2;
		totalUsage_kb += length;
	}
	return totalUsage_kb;
}

FileSystem.prototype.compress = function(string) {
	var compressedFile = LZString.compress(string);
	return compressedFile;
}

FileSystem.prototype.decompress = function(compressedString) {
	uncompressedString = LZString.decompress(compressedString);
	return uncompressedString;
}