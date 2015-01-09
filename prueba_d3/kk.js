function init(){
	console.log("init");
	console.log(data_json.conditions);

	var margin = {top: 5, right: 100, bottom: 5, left: 100},
	width = 600 - margin.right - margin.left,
	height = 200 - margin.top - margin.bottom;

	var i = 0;

	var tree = d3.layout.tree()
		.size([height, width]); 

	var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var root = cond2tree(data_json.conditions);
	console.log(root);

	update(root);

	function update(source){
		var nodes = tree.nodes(source),
			links = tree.links(nodes);

		nodes.forEach(function(d) { d.y = d.depth * 100; });

		var node = svg.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });

		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { 
			return "translate(" + d.y + "," + d.x + ")"; });

		nodeEnter.append("rect")
			.attr("width", "60")
			.attr("height", "30")
			.attr("rx", "5")
			.attr("ry", "5")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(-30, -15)");

		nodeEnter.append("text")
			//.attr("x", "30")
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.text(function(d) { return d.name; })
			.style("fill-opacity", 1);

		// Declare the links
		var link = svg.selectAll("path.link")
			.data(links, function(d) { return d.target.id; });

		// Enter the links.
		link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", diagonal);

	}

}

function cond2tree(cond_list){
	// Buscamos el nodo raiz
	var root = null;
	_.each(cond_list, function(d){
		if(!d.cond_parent_id){
			root = resolvetree(d);
		}
	});
	return root;

	function resolvetree(node){
		node.name = node.cond_name;
		if(node.cond_type == "AND" || node.cond_type == "OR" ){
			node.children = [];
			_.each(cond_list, function(d){
				// console.log("en each, probando " + d.id + " en " + node.condlist);
				// console.log(node.condlist.indexOf(d.id));
				if(node.condlist.indexOf(d.id) != -1){
					node.children.push(resolvetree(d));
				}
			});
		}

		return node;
	}
}

