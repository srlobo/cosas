var types = [{
	height: 10,
	width: 15
},
{
	height: 20,
	width: 30
},
{
	height: 13,
	width: 18
}
];

var diameter = 960;
var width = diameter;
var height = diameter;
var number = 500;

function init(){
	var pack = d3.layout.pack()
		.size([diameter - 4, diameter - 4])
		.value(function(d){return d.size;});

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(2,2)");

	var root = generate_sequence(types, number);
	var node = svg.datum(root).selectAll(".node")
		.data(pack.nodes)
		.enter().append("g")
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	node.append("rect")
		.attr("width", function(d) { return d.width; })
		.attr("height", function(d) { return d.height; });

	d3.select(self.frameElement).style("height", diameter + "px");
}

function generate_sequence(types, number){
	nodes = {id: 0, children: [], parent: null}
	for(var i=1;i <= number;++i){
		var el = {};
		var ref = types[Math.floor(Math.random() * types.length)];
		el["height"] = ref["height"]
		el["width"] = ref["width"]
		el["id"] = i;
		el["parent"] = 0;
		el["children"] = [];
		//el["depth"] = 1;
		el["size"] = Math.sqrt(Math.pow(el.height, 2) + Math.pow(el.width, 2));
		nodes.children.push(el);
	}

	return nodes;
}

init();
