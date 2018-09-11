/**
 * Quantum Computer Simulator - Editor
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

function QasmEditor(editableDivId) {
	this.editableDivId = editableDivId
	this.editableDiv = $("#" + this.editableDivId);
	this.KEYPRESS_ENTER = 13;
	this.init();
}

QasmEditor.prototype.init = function() {
	editor = this;
	this.editableDiv.keypress(function(event) {
		if(event.which == editor.KEYPRESS_ENTER) {
			event.preventDefault();
			//console.log('You pressed enter!');
			caretPosition = editor.getCaretPosition();
			//console.log(caretPosition);
			text = editor.editableDiv.html();
			newText = [text.slice(0, caretPosition), "\n", text.slice(caretPosition)].join('');
			if (caretPosition == text.length) {
				newText = newText + "\n";
			}
			editor.editableDiv.html(newText);
			editor.setCurrentCursorPosition(caretPosition+1);
			editor.setCurrentCursorPosition(caretPosition+1);

		}
	});
}

QasmEditor.prototype.getCaretPosition = function() {
	var caretPos = 0;
	var sel;
	var range;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount) {
			range = sel.getRangeAt(0);
			if (range.commonAncestorContainer.parentNode == this.editableDiv.get(0)) {
				caretPos = range.endOffset;
			}
		}
	} else if (document.selection && document.selection.createRange) {
		range = document.selection.createRange();
		if (range.parentElement() == editableDiv) {
			var tempEl = document.createElement("span");
			this.editableDiv.insertBefore(tempEl, this.editableDiv.first());
			var tempRange = range.duplicate();
			tempRange.moveToElementText(tempEl);
			tempRange.setEndPoint("EndToEnd", range);
			caretPos = tempRange.text.length;
		}
	}
	return caretPos;
}

QasmEditor.prototype.setCurrentCursorPosition = function(chars) {
	if (chars >= 0) {
		var selection = window.getSelection();
		range = this.createRange(this.editableDiv.get(0), { count: chars });

		if (range) {
			range.collapse(false);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
};

QasmEditor.prototype.createRange = function(node, chars, range) {
	if (!range) {
		range = document.createRange()
		range.selectNode(node);
		range.setStart(node, 0);
	}

	if (chars.count === 0) {
		range.setEnd(node, chars.count);
	} else if (node && chars.count >0) {
		if (node.nodeType === Node.TEXT_NODE) {
			if (node.textContent.length < chars.count) {
				chars.count -= node.textContent.length;
			} else {
				range.setEnd(node, chars.count);
				chars.count = 0;
			}
		} else {
		   for (var lp = 0; lp < node.childNodes.length; lp++) {
				range = this.createRange(node.childNodes[lp], chars, range);

				if (chars.count === 0) {
					break;
				}
			}
		}
	} 

	return range;
};