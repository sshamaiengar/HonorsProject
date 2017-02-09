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
	
	console.log(window['jqconsole'+number]);
	var editor = ace.edit("editor"+number);
	editor.setTheme("ace/theme/rubyblue");
	editor.setHighlightActiveLine(false);
	editor.setShowPrintMargin(false);
	editor.container.style.lineHeight = 1.7
	editor.renderer.updateFontSize()
    editor.getSession().setMode("ace/mode/python");
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
		editor.setValue("");
		window['jqconsole'+number].Reset();
		$("#console"+number).slideUp();
		$("#indicator"+number).removeClass("fa-check").removeClass("fa-times").css('display', 'none');
	})
}