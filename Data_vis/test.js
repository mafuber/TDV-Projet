/*var svg1 = d3.select("#svg1");
svg1.append("circle")
    .attr("cx",100)
    .attr("cy",100)
    .attr("r",90)
    .attr("fill","green");
var svg2 = d3.select("#svg2");
svg2.append("circle")
    .attr("cx",100)
    .attr("cx",100)
    .attr("r",90)
    .attr("fill","blue");*/
var margin = { top: 100, right: 30, bottom: 30, left: 30 },
    width = 700 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

d3.json("planets.json").then(function (data) {
    planets = data

    var planetScale = d3.scaleLinear()
        .domain([0, d3.max(planets, function (d) { return d.diameter; })])
        .range([0, 150]);

    var padding = 30;
    planets.forEach(function (d, i) {
        if (i === 0) {
            d.offset = 0;
        } else {
            d.offset = planets[i - 1].offset + planetScale(planets[i - 1].diameter) + padding * 2;
        }
    });


    var svg1 = d3.select("body")
        .append("svg")
        .attr("viewBox", "-19 -100 1000 180")

    svg1.selectAll("rect")
        .data(planets)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return d.offset })
        .attr("y", function (d) { return -120; })
        .attr("width", function (d, i) { return planetScale(d.diameter) + 2 * padding })
        .attr("height", function (d) { return 190; })
        .attr("fill", "green");
    svg1.selectAll("text")
        .data(planets)
        .enter()
        .append("text")
        .attr("x", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding / 2; })
        .attr("y", function (d) { return 50 + 20; })
        .text(function (d) { return "" + d.name });
    svg1.selectAll(".planetsGradient")
        .data(planets)
        .enter()
        .append("circle")
        .attr("class", "planetGradient")
        .attr("cx", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding; })
        .attr("cy", function (d) { return 50 - planetScale(d.diameter) / 2; })
        .attr("r", function (d) { return planetScale(d.diameter) / 2; })
        .style("fill", "red")
});


/*var svg2 = d3.select("body")
                .append("svg")
                .attr("viewBox","0 0 200 100")

var rect = svg2.selectAll("rect")
                .data([10])
                .enter()
                .append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("width",50)
                .attr("height",50)
                .attr("fill","green");*/