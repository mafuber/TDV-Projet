
var div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute");


// load the json
d3.json('../DATA/json/planets.json', function (error, planets) {
  // Check your console to detect potential errors while loading data
  if (error) throw ('There was an error while getting data: ' + error);
  // console.log(planets)

  // Creation of the SVG
  d3.select("svg")
    .selectAll(".p")
    .data(planets)
    .enter()
    .append("circle")
    .attr("class", "p")
    .attr("cx", function (d) { console.log(d.cx); return parseInt(d.cx) + '%' })
    .attr("r", function (d) { console.log(d.r); return parseInt(d.r) })
    .attr("fill", function (d) { return "url(#" + d.name.toLowerCase() + ")" })
    .on("mouseover", function (d) {
      // makes the tooltip appear on mouseover
      console.log("mouseover")
      d3.select(this)
        .style("stroke", "white")
        .style("stroke-width", 1)
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("Nom: " + d.name + "</br>" +
        "Masse: " + d.mass + " x 10^(24) kg" + "</br>" +
        "Diamètre: " + d.diameter + " km" + "</br>" +
        "Température moyenne: " + d.meanTemperature + " °C" + "</br>" +
        "Période de rotation: " + d.rotationPeriod + " h" + "</br>" +
        "Nombre de lunes: " + d.numberOfMoons + "</br>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("stroke-width", 0)
      //makes the tooltip disappear on mouseout

      div.transition()
        .duration(200)
        .style("opacity", 0);
    })
    .on("click", function(d){
      d3.select(this)
      .attr("xlink:href", function(d, i){
        return "Planets/" + i + "_" + d.name + ".html"
      })
    });
})


var orbitsOn = true;


//Width and height
var w = window.innerWidth;
var h = window.innerHeight;

if (w > h) { var max = h }
else { var max = w }

// Select info div by id
d3.json('../DATA/json/planets.json', function (planets) {

  var svgDiv = d3.select("#planet");

  // define scales
  var posScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, max / 2]);

  var sizeScale = d3.scaleSqrt()
    .domain([0, 10])
    .range([0, max / 20])


  //Create SVG element
  var svg = d3.select("#planet")
    .append("svg")
    .data(planets)
    .enter()


  // add circles

  var all = svg.selectAll("circle")
    .data(planets)
    .enter();

  // orbits
  if (orbitsOn) {
    all.append("circle")

  }

  // planets
  all.append("circle")
    .classed("planet", true)
    .attr("id", function (d) { return "planet" + d.id })



  // timer adapted from http://bl.ocks.org/cloudshapes/5662234

  // Kick off the timer, and the action begins: 
  d3.timer(tickFn);

  function tickFn(_elapsed) {
    timer_elapsed = _elapsed;

    // Process all circles data. 
    for (var i = 1; i < planets.length; i++) {

      var t_circleData = planets[i];

      if (t_circleData.start == undefined) {
        t_circleData.start = _elapsed;
      };

      // Calc elapsed time.
      var t_elapsed = _elapsed - t_circleData.start;

      // Calculate how far through the desired time for one iteration.
      var t = t_elapsed / t_circleData.speed;

      // Calculate new x/y positions
      var rotation_radius = t_circleData.radius;
      var t_angle = (2 * Math.PI) * t;
      var t_x = rotation_radius * Math.cos(t_angle);
      var t_y = rotation_radius * Math.sin(t_angle);

      t_circleData.x = t_x - rotation_radius;
      t_circleData.y = t_y;

    }


    // Actually move the circles and the text.
    var t_circle = svg.selectAll("#planet");
    t_circle
      .attr("transform", function (d) { return "translate(" + posScale(d.x) + "," + posScale(d.y) + ")" });

  }
})




/*
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
          currentValue = d3.event.x;            //appel de fonction tickfn
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
    .attr("transform", "translate(0," + (-25) + ")")*/