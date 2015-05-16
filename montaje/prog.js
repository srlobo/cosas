var types = [{
	height: 10,
	width: 15,
	number: 7
},
{
	height: 15,
	width: 10,
	number: 7
},
{
	height: 20,
	width: 30,
	number: 0
},
{
	height: 30,
	width: 20,
	number: 0
},
{
	height: 13,
	width: 18,
	number: 7
},
{
	height: 18,
	width: 13,
	number: 7
}
];

function allowDrop(ev) {
	ev.preventDefault();
}

function generate_sequence(number){
	var i = 0;
	_.each(types, function(value){
		for(j = 0;j < value.number;++j){
			var el = $("<div id='cuadro_" + i + "' class='photo' draggable='true'>");
			el.height(value.height * 10);
			el.width(value.width * 10);
			$("#container").append(el)
			++i;
		}
	});
	var divs = $("#container").children();
	while (divs.length) {
		$("#container").append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
	}
}

$(document).ready(function(){
	generate_sequence(20);
	new Masonry(("#container"), {
		"columnWidth": 10,
		"gutter": 10,
	})
});


