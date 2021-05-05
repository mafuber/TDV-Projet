var orbitsOn = true;

var planetData = [
  { "i": 0, "size": 1, "radius": 0, "speed": 10000, "colour" : "#ddc", "start": undefined},
  { "i": 1, "size": 5, "radius": 8, "speed": -4000, "colour" : "#cdd", "start": undefined},
  { "i": 2, "size": 3, "radius": 4, "speed": 7000, "colour" : "#cdc", "start": undefined},
  { "i": 3, "size": 7, "radius": 6, "speed": 5000, "colour" : "#dcd", "start": undefined},
  { "i": 4, "size": 1, "radius": 2, "speed": 1000, "colour" : "#ccd", "start": undefined},
  { "i": 4, "size": 1.5, "radius": 3, "speed": -2000, "colour" : "#ddd", "start": undefined}
  ];

//Width and height
var w = window.innerWidth;
var h = window.innerHeight;

if (w>h) {var max = h}
else {var max = w}

// Select info div by ID
var svgDiv = d3.select("#svgDiv");

// define scales
var posScale = d3.scale.linear()
            .domain([0, 10])
            .range([0, max/2]);

var sizeScale = d3.scale.sqrt()
            .domain([0, 10])
            .range([0, max/20])

//Create SVG element
var svg = d3.select("#planetDiv")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// add circles
all = svg.selectAll("circle")
  .data(planetData)
  .enter();

  // orbits
  if (orbitsOn) {
    all.append("circle")
    .attr("cx", w/2)
    .attr("cy", h/2)
    .attr("r", function(d) {
      return posScale(d.radius);
    })
    .style("stroke", function(d) {
      return d.colour;
    })
    .style("fill", "rgba(0,0,0,0)");
  }
  
  // planets
  all.append("circle")
  .classed("planet", true)
  .attr("id", function(d) {return "planet" + d.i})
  .attr("cx", function(d) {
     return w/2 + posScale(d.radius);
  })
  .attr("cy", h/2)
  .attr("r", function(d) {
    return sizeScale(d.size);
  })
  .style("fill", function(d) {
    return d.colour;
  });


// timer adapted from http://bl.ocks.org/cloudshapes/5662234

// Kick off the timer, and the action begins: 
d3.timer(tickFn);

function tickFn(_elapsed) {
  timer_elapsed = _elapsed;

  // Process all circles data. 
  for (var i = 0; i<planetData.length;i++)  {

    var t_circleData = planetData[i];

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
  var t_circle = svg.selectAll(".planet");
  t_circle
    .attr("transform", function(d) {return "translate(" + posScale(d.x) + "," + posScale(d.y) + ")"});

}