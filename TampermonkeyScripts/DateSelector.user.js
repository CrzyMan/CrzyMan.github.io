// ==UserScript==
// @name         Date Selector
// @namespace    http://www.google.com
// @version      1
// @description  It selects today's date on Rose-Hulman's employee hour log
// @author       Tyler Whitehouse
// @match        https://prod11gbss8.rose-hulman.edu/BanSS/bwpkteis.P_SelectTimeSheetDriver
// @grant        none
// ==/UserScript==

var list = document.getElementsByName('DateSelected');
if (list.length !== 0){
	var a = list[0];
	var d = new Date();
	
	for (var i = 0; i < a.options.length; i++){
		var c = a.options[i].value;
		if (parseInt(c.substring(0,2))==d.getDate()){
			a.selectedIndex = i;
			break;
		}
	}
}
document.getElementsByName('Hours')[0].focus();