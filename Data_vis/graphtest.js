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


    var svg = d3.select("#my_planets")
        .append("svg")
        .attr("viewBox", "-19 -100 1000 180")

    svg.selectAll("rect")
        .data(planets)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return d.offset })
        .attr("y", function (d) { return -120; })
        .attr("width", function (d, i) { return planetScale(d.diameter) + 2 * padding })
        .attr("height", function (d) { return 190; })
        .attr("fill", "green");
    svg.selectAll("text")
        .data(planets)
        .enter()
        .append("text")
        .attr("x", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding / 2; })
        .attr("y", function (d) { return 50 + 20; })
        .text(function (d) { return "" + d.name });
    svg.selectAll(".planetsGradient")
        .data(planets)
        .enter()
        .append("circle")
        .attr("class", "planetGradient")
        .attr("cx", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding; })
        .attr("cy", function (d) { return 50 - planetScale(d.diameter) / 2; })
        .attr("r", function (d) { return planetScale(d.diameter) / 2; })
        .on("mousedown",function(d,i){update(i.id)})
        .style("fill", "red")
});

var margin = {top: 20, right: 20, bottom: 20, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg3 = d3.select("#mybuttons")
    .append("svg")
    .attr("width",100)
    .attr("height",100);
    svg3.selectAll("rect")
    .append("rect")
var margin = {top: 20, right: 20, bottom: 20, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
function update(choice) {
    d3.json("graphtest.json").then(function(d){
        if(choice==1){
            data=d.data1;
        }
        else if(choice==2){
            data=d.data2;
        }
        else if(choice==3){
            data=d.data3;
        }
        else if(choice==4){
            data=d.data4;
        }
        else if(choice==5){
            data=d.data5;
        }
        else if(choice==6){
            data=d.data6;
        }
        else if(choice==7){
            data=d.data7;
        }
        else if(choice==8){
            data=d.data8;
        }
        else if(choice==9){
            data=d.data9;
        }
   var xScale = d3.scaleLinear()
    .domain([0,1/*d3.max(data,function(d){ return d.percentage})*/])
    .range([0,width]);
    var yScale = d3.scaleBand()
    .domain(d3.map(data,function(d){return d.name}))
    .range([0,height])
    .padding(0.1);
    console.log(margin.left)
    svg.selectAll("g").remove();
    var g = svg.append("g");
    g.append("g").call(d3.axisLeft(yScale));
    g.append("g").call(d3.axisBottom(xScale))
    .attr("transform","translate(" + 0 + "," + height + ")");
    ;
   // Create the u variable
   var u = svg.selectAll("rect")
     .data(data)
   u
     .enter()
     .append("rect") // Add a new rect for each new elements
     .merge(u) // get the already existing elements as well
     .transition() // and apply changes to all of them
     .duration(1000)
       //.attr("x", function(d) { return x(d.name); })
       .attr("y", function(d) { return yScale(d.name); })
       .attr("width", function(d) { return xScale(d.percentage); })
       .attr("height",yScale.bandwidth() )
       .attr("fill", "#69b3a2")
    /*
    console.log(data)
    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y",function(d){return yScale(d.name)})
    .attr("width",function(d){return xScale(d.percentage);})
    .attr("height",yScale.bandwidth())
    .attr("fill","steelblue");*/
    u.exit().remove();
}
)}
// Initialize the plot with the first dataset
update(1)