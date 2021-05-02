var mercury = [document.getElementsByClassName('Mercury')];
var venus = [document.getElementsByClassName('Venus')];
var earth = [document.getElementsByClassName('Earth')];
var mars = [document.getElementsByClassName('Mars')];
var jupiter = [document.getElementsByClassName('Jupiter')];
var saturn = [document.getElementsByClassName('Saturn')];
var uranus = [document.getElementsByClassName('Uranus')];
var neptune = [document.getElementsByClassName('Neptune')];

width = 150

var json = d3.json("../DATA/json/planets.json", function(data){
    var svg = d3.select("body")
            .append("svg")
            .attr("width",width)
    var g = svg.selectAll("g")
            .append("g")
    var circle = g.selectAll("circle")
                .append("circle")
                .data(data)
                .attr("r", data.r)
                .attr("cx", data.cx)
                .attr("name", data.name)
})

/*var text2 = d3.json("../DATA/json/planets.json", function(data) {
    var canvas = d3.select("body").append("svg").attr("width", width).attr("height", height);
    var circles = d3.selectAll("svg")
    .append("circle")
    
    .attr("viewBox", "-480 -450 1000 900")

    circles.on("mouseover", function(d) {
            canvas.selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("y", function(d, i) { return i * 50 + 100; })
                .attr("fill", "white")
                .text(function(d) {
                    return "Nom: " + d.name + "</br>" + 
                    "Masse: " + d.mass + "x 10^(24) kg" + "</br>" +
                    "Diamètre: " + d.diameter + "km" + "</br>" +
                    "Température moyenne: " + d.meanTemperature + "°C" + "</br>" +
                    "Période de rotation: " + d.rotationPeriod + "h" + "</br>" +
                    "Nombre de lunes: " + d.numberOfMoons + "</br>";
                })
            d3.select(this)
                .style("cursor", "pointer")
                .transition()
                .duration(200)
                .style("opacity", 1);


        })
        .on("mouseout", function(d) {
            d3.select(this)
                .append("image")
                .attr("width", width)
                .attr("height", 200)
                .style("cursor", "")
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

});
/*
// load the json
d3.json('../DATA/json/planets.json', function (error, planets) {
    // Check your console to detect potential errors while loading data
    if (error) throw ('There was an error while getting geoData: ' + error);
    var svg = d3.select("body").append("svg")

// Creation of the SVG
var circles = svg.selectAll("circle");
    svg.selectAll("circle")
        .data(planets)
        .append("g")
        .attr("cx", function(d){return d.cx})
        .attr("r", function(d){return d.r})
        .on("mouseover", function (d) {
            // makes the tooltip appear on mouseover
            d3.select(this)
                .style("stroke-width", 1)
            svg.transition()
                .duration(200)
                .style("opacity", .9);
            svg.html(
                "Nom: " + d.name + "</br>" + 
                "Masse: " + d.mass + "x 10^(24) kg" + "</br>" +
                "Diamètre: " + d.diameter + "km" + "</br>" +
                "Température moyenne: " + d.meanTemperature + "°C" + "</br>" +
                "Période de rotation: " + d.rotationPeriod + "h" + "</br>" +
                "Nombre de lunes: " + d.numberOfMoons + "</br>"
            )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("");

        })

        .on("mouseout", function (d) {
            d3.select(this)
                .style("stroke-width", 0)
            //makes the tooltip disappear on mouseout

            svg.transition()
                .duration(200)
                .style("opacity", 0);
        });
})

*/


var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2021-01-01"),
    endDate = new Date("2030-04-01");

var margin = {top:50, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);  

////////// slider //////////
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");
    
var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue)); 
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")