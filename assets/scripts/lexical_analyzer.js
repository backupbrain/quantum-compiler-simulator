

function LexicalAnalyzer(text) {
}

LexicalAnalyzer.prototype.run = function(text) {
	formattedText = this.stripComments(text);
	formattedText = this.trimWhitespace(formattedText);
	formattedText = this.resetNewlines(formattedText);
	return formattedText;
}


LexicalAnalyzer.prototype.stripComments = function(text) {
	commentsRegex = /\/\/[^\n]+/g
	return text.replace(commentsRegex, "");
}

LexicalAnalyzer.prototype.trimWhitespace = function(text) {
	cleanedText = text.replace(/\n+/g, "\n");
	//spacesToTabs = singleLine.replace(/    /g, "\t");
	cleanedText = cleanedText.replace(/[ ]+/g, " ");
	cleanedText = cleanedText.trim();
	return cleanedText;
}

LexicalAnalyzer.prototype.resetNewlines = function(text) {
	nlText = text.replace(/\n/g, "").replace(/\;/g, ";\n");
	nlText = nlText.replace(/\}/g, "}\n").replace(/\{/g, "\n{\n");
	nlText = nlText.replace(/\n[ ]+/g, "\n");
	return nlText;
}
