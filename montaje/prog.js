var i = 0;
var types = [{
	width: 10,
	height: 15,
},
{
	width: 20,
	height: 30,
},
{
	width: 13,
	height: 18,
},
];

function allowDrop(ev) {
	ev.preventDefault();
	//console.log("allowDrop");
	//console.log(ev);
	// mueve el div donde se ha soltado
	//
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	//console.log("drop");
	console.log("Movemos " + data + " -> " + ev.toElement.id);
	$("#" + data).detach().insertBefore(ev.toElement);
	triggerChange();
}

function triggerChange(){
	var msnry = Masonry.data("#container");
	msnry.reloadItems();
	msnry.layout();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	//console.log(ev);
}

function insert_item(width, height, t){
	var id = "cuadro_" + i;
	var el = $("<div id='" + id + "' class='photo' draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'>");
	el.height(height * 10);
	el.width(width * 10);
	$('<a href="#" onClick="transpose_item(' + id + ');">t</a><br/>').appendTo(el);
	$('<a href="#" onClick="delete_item(' + id + ');">X</a><br/>').appendTo(el);
	$("#container").append(el)
	++i;
	if(t)
		triggerChange();
}

function transpose_item(item_id){
	console.log("transpose");
	var el = $(item_id);
	var a = el.height();
	el.height(el.width());
	el.width(a);
	triggerChange();
}

function delete_item(item_id){
	console.log("delete");
	var el = $(item_id).remove();
	triggerChange();
}

function create_control(){
	_.each(types, function(value){
		var el = $("<button>" + value.width + "x" + value.height + "</button>");
		el.click(function(){
			insert_item(value.width, value.height, true)
		});
		$("#control").append(el);
		$("#control").append($("<br/>"));
	});
	_.each(types, function(value){
		var el = $("<p>Número " + value.width + "x" + value.height + " <span id='l" + value.width + "x" + value.height + "'></span></p>");
		$("#control").append(el);

		el = $("<p>Número " + value.height + "x" + value.width + " <span id='l" + value.height + "x" + value.width + "'></span></p>");
		$("#control").append(el);
	});
}

$(document).ready(function(){
	create_control();
	insert_item(10, 15, false);
	new Masonry(("#container"), {
		"columnWidth": 10,
		"gutter": 10,
	});
});
