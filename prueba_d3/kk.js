function init(){
	console.log("init");
	console.log(data_json.conditions);

	width = 600;
	height = 250;

	var i = 0;

	var tree = d3.layout.tree()
		.size([height, width]);

	var diagonal = d3.svg.diagonal()
		.source(function(d) {
			var x = d.source.x;
			var y = d.source.y;
			return {y: y - 30, x: x};
		})
		.target(function(d) {
			var x = d.target.x;
			var y = d.target.y;
			return {y: y + 60, x: x};
		})
		.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + (width - 60) + ", 0)");

	var root = cond2tree(data_json.conditions);
	console.log(root);

	update(root);

	function update(source){
		var nodes = tree.nodes(source),
			links = tree.links(nodes);

		nodes.forEach(function(d) { d.y = d.depth * -120; });

		var node = svg.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });

		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { 
			return "translate(" + d.y + "," + d.x + ")"; });
		nodeEnter.append("rect")
			.attr("width", "90")
			.attr("height", "30")
			.attr("rx", "5")
			.attr("ry", "5")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(-30, -15)");
		nodeEnter.append("rect")
			.attr("width", "20")
			.attr("height", "24")
			.attr("rx", "2")
			.attr("ry", "2")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(35, -12)");


		var listNodes = nodeEnter.filter(function(d){
			return d.cond_type=="LIST";});
		for(var i = 8;i >= -8;i -= 4){
			listNodes.append("line")
				.attr("x1", "37")
				.attr("y1", i)
				.attr("x2", "53")
				.attr("y2", i)
				.style("stroke", "#000")
				.style("stroke-width", "1")
		}
		listNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) {
				return d.cond_var;
			})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, -7)");
		listNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) {
				return "en lista " + d.list_id;
			})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, 8)");


		var dateNodes = nodeEnter.filter(function(d){
			return d.cond_type=="DATE";});
		for(var i = 39;i <= 51;i += 4){
			dateNodes.append("line")
				.attr("x1", i)
				.attr("y1", "-14")
				.attr("x2", i)
				.attr("y2", "-10")
				.style("stroke", "#000")
				.style("stroke-width", "1")
		}
		dateNodes.append("rect")
			.attr("width", "16")
			.attr("height", "14")
			.attr("rx", "2")
			.attr("ry", "2")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(37, -6)");
		dateNodes.append("text")
			.attr("text-anchor", "middle")
			.attr("x", "45")
			.attr("y", "5")
			.style("font-weight", "bold")
			.text(function(d){return d.cd_date.split("T")[0].split("-")[2];})
			.style("fill-opacity", 1);
		dateNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) {
				switch(d.cd_comparision){
					case "GT":
						return "Después de";
						break;;
					case "LT":
						return "Antes de";
						break;;
				}
			})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, -7)");
		dateNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) { return d.cd_date.split("T")[0];})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, 8)");


		var andNodes = nodeEnter.filter(function(d){
			return d.cond_type=="AND";});
		andNodes.append("path")
			.attr("d", "M3,2 L3,22 A10 10 0 0 0 3 2 Z")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.style("fill", "#fff")
			.attr("transform", "translate(38, -12)");
		andNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text("AND")
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, -7)");
		andNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d){return d.cond_name;})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, 8)");


		var orNodes = nodeEnter.filter(function(d){
			return d.cond_type=="OR";});
		orNodes.append("path")
			.attr("d", "M3 20 A14 14 0 0 0 3 4 M3 20 A20 20 0 0 0 17 12 A20 20 0 0 0 3 4")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.style("fill", "#fff")
			.attr("transform", "translate(35, -12)");
		orNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text("OR")
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, -7)");
		orNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d){return d.cond_name;})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-27, 8)");


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

