function init(){
	console.log("init");
	console.log(data_json.conditions);

	var width = 1000;
	var height = 1000;

	var tree = d3.layout.tree()
		.nodeSize([100, 30]);

	var diagonal = d3.svg.diagonal()
		.source(function(d) {
			var x = d.source.x;
			var y = d.source.y;
			return {y: y + 10, x: x};
		})
		.target(function(d) {
			var x = d.target.x;
			var y = d.target.y;
			return {y: y - 10, x: x};
		})
		.projection(function(d) { return [d.x, d.y]; });

	var svg = d3.select("body").append("svg")
		.attr("width", "1000")
		.attr("height", "1000")
		.append("g")
		.attr("transform", "translate(300, 30)");

	var root = cond2tree(data_json.conditions);
	console.log(root);

	update(root);

	function update(source){
		var nodes = tree.nodes(source),
			links = tree.links(nodes);

		nodes.forEach(function(d) { d.y = d.depth * 50; });

		var node = svg.selectAll("g.node")
			.data(nodes, function(d) {return d.id});

		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")"; });
		nodeEnter.append("rect")
			.attr("width", "90")
			.attr("height", "30")
			.attr("rx", "5")
			.attr("ry", "5")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(-45, -15)");
		nodeEnter.append("rect")
			.attr("width", "20")
			.attr("height", "24")
			.attr("rx", "2")
			.attr("ry", "2")
			.style("fill", "#fff")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.attr("transform", "translate(20, -12)");


		var listNodes = nodeEnter.filter(function(d){
			return d.cond_type=="LIST";});
		for(var i = 8;i >= -8;i -= 4){
			listNodes.append("line")
				.attr("x1", "22")
				.attr("y1", i)
				.attr("x2", "38")
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
			.attr("transform", "translate(-42, -7)");
		listNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) {
				return "en lista " + d.list_id;
			})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, 8)");


		var dateNodes = nodeEnter.filter(function(d){
			return d.cond_type=="DATE";});
		for(var i = 24;i <= 36;i += 4){
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
			.attr("transform", "translate(22, -6)");
		dateNodes.append("text")
			.attr("text-anchor", "middle")
			.attr("x", "30")
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
			.attr("transform", "translate(-42, -7)");
		dateNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d) { return d.cd_date.split("T")[0];})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, 8)");


		var andNodes = nodeEnter.filter(function(d){
			return d.cond_type=="AND";});
		andNodes.append("path")
			.attr("d", "M3,2 L3,22 A10 10 0 0 0 3 2 Z")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.style("fill", "#fff")
			.attr("transform", "translate(23, -12)");
		andNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text("AND")
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, -7)");
		andNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d){return d.cond_name;})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, 8)");


		var orNodes = nodeEnter.filter(function(d){
			return d.cond_type=="OR";});
		orNodes.append("path")
			.attr("d", "M3 20 A14 14 0 0 0 3 4 M3 20 A20 20 0 0 0 17 12 A20 20 0 0 0 3 4")
			.style("stroke", "#000")
			.style("stroke-width", "1")
			.style("fill", "#fff")
			.attr("transform", "translate(20, -12)");
		orNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text("OR")
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, -7)");
		orNodes.append("text")
			.attr("dy", ".35em")
			.attr("text-anchor", "left")
			.text(function(d){return d.cond_name;})
			.style("fill-opacity", 1)
			.style("font-size", 10)
			.attr("transform", "translate(-42, 8)");


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

