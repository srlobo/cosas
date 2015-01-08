function init(){
	console.log("Aqui");
	//Width and height
	var w = 500;
	var h = 50;
	var svg = d3
		.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var dataset = [1, 2, 3, 4, 5];
	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

	circles.attr("cx", function(d, i) {
		return (i * 50) + 25;
	})
	.attr("cy", h/2)
	.attr("r", function(d) {
		return d;
	});
}
