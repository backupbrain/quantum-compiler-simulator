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