var i = 0;
var conversion_factor = 10;
var types = [{
	width: 10,
	height: 15,
},
{
	width: 13,
	height: 18,
},
{
	width: 20,
	height: 30,
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

	// Rellenamos datos
	$("#container_height").text($("#container").height());
	$("#container_width").text($("#container").width());

	var numbers = {};
	_.each(types, function(value){
		numbers["l" + value.width + "x" + value.height] = 0;
		numbers["l" + value.height + "x" + value.width] = 0;
	});

	_.each($("#container").children(), function(el){
		var w = $(el).width() / conversion_factor;
		var h = $(el).height() / conversion_factor;
		numbers["l" + w + "x" + h]++;
	});

	console.log(numbers);
	_.each(numbers, function(value, key){
		$("#" + key).text(value);
	});
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	//console.log(ev);
}

function insert_item(width, height, t){
	var id = "cuadro_" + i;
	var el = $("<div id='" + id + "' class='photo' draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'>");
	el.height(height * conversion_factor);
	el.width(width * conversion_factor);
	$('<a href="#" onClick="transpose_item(' + id + ');">t</a>').appendTo(el);
	$('<a href="#" onClick="delete_item(' + id + ');">X</a>').appendTo(el);
	$('<br/>').appendTo(el);
	$('<br/>').appendTo(el);
	$('<span class="grande">' + i + '</span>').appendTo(el);
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
		var el = $("<p>Número " + value.width + "x" + value.height + ": <span id='l" + value.width + "x" + value.height + "'></span></p>");
		$("#control").append(el);

		el = $("<p>Número " + value.height + "x" + value.width + ": <span id='l" + value.height + "x" + value.width + "'></span></p>");
		$("#control").append(el);
	});
	$("<p>Anchura: <span id='container_width'></span></p>").appendTo("#control");
	$("<p>Altura: <span id='container_height'></span></p>").appendTo("#control");
}

$(document).ready(function(){
	create_control();
	insert_item(10, 15, false);
	new Masonry(("#container"), {
		"columnWidth": 1 * conversion_factor,
		"gutter": 1 * conversion_factor,
	});
	$("#container").css("position", "absolute");
	$("#container").width(110 * conversion_factor);
	$("#container").height(150 * conversion_factor);
});
