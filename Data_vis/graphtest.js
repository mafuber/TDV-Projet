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
// Create 2 datasets

//var data1 = [{ser1: 0.3, ser2: 4},{ser1: 2, ser2: 16},{ser1: 3, ser2: 8}];
 
 // set the dimensions and margins of the graph
 var margin = {top: 10, right: 30, bottom: 30, left: 50},
     width = 460 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
 // append the svg object to the body of the page
 var svg = d3.select("#my_dataviz")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
 // Initialise a X axis:
 var x = d3.scaleLinear().range([0,width]);
 var xAxis = d3.axisBottom().scale(x);
 svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class","myXaxis")
 
 // Initialize an Y axis
 var y = d3.scaleLinear().range([height, 0]);
 var yAxis = d3.axisLeft().scale(y);
 svg.append("g")
   .attr("class","myYaxis")
 
 // Create a function that takes a dataset as input and update the plot:
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
   // Create the X axis:
   x.domain([0, d3.max(data, function(d) { return d.name }) ]);
   svg.selectAll(".myXaxis").transition()
     .duration(3000)
     .call(xAxis);
 
   // create the Y axis
   y.domain([0, d3.max(data, function(d) { return d.percentage  }) ]);
   svg.selectAll(".myYaxis")
     .transition()
     .duration(3000)
     .call(yAxis);
 
   // Create a update selection: bind to the new data
   var u = svg.selectAll(".lineTest")
     .data([data], function(d){ return d.name });
 
   // Updata the line
   u
     .enter()
     .append("path")
     .attr("class","lineTest")
     .merge(u)
     .transition()
     .duration(3000)
     .attr("d", d3.line()
       .x(function(d) { return x(d.name); })
       .y(function(d) { return y(d.percentage); }))
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 2.5)
    });
 }
 
 // At the beginning, I run the update function on the first dataset:
 update(1)

