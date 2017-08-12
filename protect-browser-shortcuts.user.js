// ==UserScript==
// @name        Protect browser keyboard shortcuts
// @description Stop websites from highjacking some keyboard shortcuts
// @author      Alex Efros <powerman-asdf@ya.ru>
// @run-at      document-start
// @include     *
// @grant       none
// @version     1.2
// @downloadURL https://github.com/powerman/userjs-protect-browser-shortcuts/raw/master/protect-browser-shortcuts.user.js
// @updateURL   https://github.com/powerman/userjs-protect-browser-shortcuts/raw/master/protect-browser-shortcuts.user.js
// @namespace   https://github.com/powerman/userjs-protect-browser-shortcuts
// ==/UserScript==

(function(document){
	'use strict';

	var shortcuts = [
		{input:false, ctrl:false, alt:false, meta:false, shift:false, code:'Slash'},
	];
	var shortcuts_len = shortcuts.length;

	var protectKeys = function(e) {
		// console.log(e)
		for (var i=0; i<shortcuts_len; i++) {
			var k = shortcuts[i];
			if (!k.input && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
				continue;
			}
			if (e.ctrlKey  === k.ctrl  &&
			    e.altKey   === k.alt   &&
			    e.metaKey  === k.meta  &&
			    e.shiftKey === k.shift &&
			    e.code     === k.code
			    ) {
				// console.log("shortcut protected")
				e.cancelBubble = true;
				e.stopPropagation();
				e.stopImmediatePropagation();
				// e.preventDefault();
				return false;
			}
		}
	};

	document.addEventListener('keydown',  protectKeys);
	document.addEventListener('keypress', protectKeys);
	document.addEventListener('keyup',    protectKeys);

})(document);
