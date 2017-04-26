// called in document.ready()
// iterates over all editorRows and takes numbers from there
var Editor = function(number, title, caption, defaultCode, answerPattern){	
	this.title = title;
	this.caption = caption;
	this.defaultCode = defaultCode;
	this.answerPattern = answerPattern;

	var $row = $("#exercise"+number).append("<div id='editorContainer"+number+"' class='editor col-lg-12 panel panel-primary'></div>");
	var $container = $row.child("#editorContainer"+number);
	$container.append("<h3>"+title+"</h3>");
	$container.append("<p>"+caption+"</p>");
	$container.append("<div id='editor"+number+"'></div>")
}

function activateEditor(number){
	window['jqconsole'+number] = $('#console'+number).jqconsole('Python console\n', '>');
	
	// console.log(window['jqconsole'+number]);
	var editor = ace.edit("editor"+number);
	editor.setTheme("ace/theme/rubyblue");
	editor.setHighlightActiveLine(false);
	editor.setShowPrintMargin(false);
	editor.container.style.lineHeight = 1.7
	editor.renderer.updateFontSize()
    editor.getSession().setMode("ace/mode/python");
    editor.getSession().setUseSoftTabs(false);
	editor.getSession().on('change', function(e) {
		$("#editorContent"+number).html(editor.getValue());
	});
	console.log(editor);
	$("#run"+number).click(function(){
		window['jqconsole'+number].Reset();
		window.jqconsole = window['jqconsole'+number];
		$("#editorContent"+number).html(editor.getValue());
		$("#console"+number).slideDown();
		brython({debug:1, ipy_id:['editorContent'+number]})
		var correct = window['jqconsole'+number].Dump().indexOf($("#answer"+number).text()) != -1 ? true : false;
		if (correct){
			$("#indicator"+number).removeClass("fa-times").addClass("fa-check");
			$("#indicator"+number).css('display', 'inline');
		} else {
			$("#indicator"+number).removeClass("fa-check").addClass("fa-times");
			$("#indicator"+number).css('display', 'inline');
		}
	});
	$("#reset"+number).click(function(){
		editor.setValue($("#defaultCode"+number).text());
		window['jqconsole'+number].Reset();
		$("#console"+number).slideUp();
		$("#indicator"+number).removeClass("fa-check").removeClass("fa-times").css('display', 'none');
	})
}

function activateWebEditor(number){
	var editor = ace.edit("editor"+number);
	editor.setTheme("ace/theme/snappy-light");
	editor.setHighlightActiveLine(false);
	editor.setShowPrintMargin(false);
	editor.container.style.lineHeight = 1.7
	editor.renderer.updateFontSize()
    editor.getSession().setMode("ace/mode/html");
    editor.getSession().setUseSoftTabs(false);
	editor.getSession().on('change', function(e) {
		$("#editorContent"+number).html(editor.getValue());
	});

	// reset iframe using default code
	$("#iframe"+number).remove();
	var iframe = document.createElement("iframe");
	iframe.id = "iframe"+number;
	iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(editor.getValue());
	iframe.setAttribute("name", "iframe"+number);
	document.getElementById("frame"+number).appendChild(iframe);

	$("#run"+number).click(function(){
		
		$("#iframe"+number).remove();
		var iframe = document.createElement("iframe");
		iframe.id = "iframe"+number;
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(editor.getValue());
		iframe.setAttribute("name", "iframe"+number);
		document.getElementById("frame"+number).appendChild(iframe);

		var answerRegex = new RegExp($("#answer"+number).text());
		// var correct = editor.getValue().indexOf($("#answer"+number).text()) != -1 ? true : false;
		console.log(editor.getValue());
		console.log(editor.getValue().match(answerRegex));
		var correct = editor.getValue().match(answerRegex) != null ? true: false;
		if (correct){
			$("#indicator"+number).removeClass("fa-times").addClass("fa-check");
			$("#indicator"+number).css('display', 'inline');
		} else {
			$("#indicator"+number).removeClass("fa-check").addClass("fa-times");
			$("#indicator"+number).css('display', 'inline');
		}
	});
	$("#reset"+number).click(function(){
		editor.setValue($("#defaultCode"+number).text());
		$("#iframe"+number).remove();
		var iframe = document.createElement("iframe");
		iframe.id = "iframe"+number;
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(editor.getValue());
		document.getElementById("frame"+number).appendChild(iframe);
		$("#indicator"+number).removeClass("fa-check").removeClass("fa-times").css('display', 'none');
	});
}

function activateGameEditor(number){
	var editor = ace.edit("editor"+number);
	editor.setTheme("ace/theme/snappy-light");
	editor.setHighlightActiveLine(false);
	editor.setShowPrintMargin(false);
	editor.container.style.lineHeight = 1.7
	editor.renderer.updateFontSize()
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseSoftTabs(false);
	editor.getSession().on('change', function(e) {
		$("#editorContent"+number).html(editor.getValue());
	});

	var templateStart = "<html><head></head><body><scr"+"ipt type='text/javascript'>";
	var templateEnd = "</scr"+"ipt></body></html>";

	// reset iframe using default code
	$("#iframe"+number).remove();
	var iframe = document.createElement("iframe");
	iframe.id = "iframe"+number;
	// $("iframe"+number).load(function(){
	// 	$(this).contents().find('body').append(templateStart+editor.getValue() + templateEnd);
	// 	console.log('load');
	// });
	iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(templateStart + editor.getValue() + templateEnd);
	iframe.setAttribute("name", "iframe"+number);
	document.getElementById("frame"+number).appendChild(iframe);

	$("#run"+number).click(function(){
		
		$("#iframe"+number).remove();
		var iframe = document.createElement("iframe");
		iframe.id = "iframe"+number;
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(templateStart + editor.getValue() + templateEnd);
		iframe.setAttribute("name", "iframe"+number);
		document.getElementById("frame"+number).appendChild(iframe);

		var answerRegex = new RegExp($("#answer"+number).text());
		// var correct = editor.getValue().indexOf($("#answer"+number).text()) != -1 ? true : false;
		// console.log(editor.getValue());
		// console.log(editor.getValue().match(answerRegex));
		var correct = editor.getValue().match(answerRegex) != null ? true: false;
		if (correct){
			$("#indicator"+number).removeClass("fa-times").addClass("fa-check");
			$("#indicator"+number).css('display', 'inline');
		} else {
			$("#indicator"+number).removeClass("fa-check").addClass("fa-times");
			$("#indicator"+number).css('display', 'inline');
		}
	});
	$("#reset"+number).click(function(){
		editor.setValue($("#defaultCode"+number).text());
		$("#iframe"+number).remove();
		var iframe = document.createElement("iframe");
		iframe.id = "iframe"+number;
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(templateStart + editor.getValue() + templateEnd);
		document.getElementById("frame"+number).appendChild(iframe);
		$("#indicator"+number).removeClass("fa-check").removeClass("fa-times").css('display', 'none');
	});
}