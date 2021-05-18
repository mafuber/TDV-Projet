window.onresize = function(){ 
  console.log("fghgf"); location.reload(); }
console.log("jdkfjsaldjföladskjf")
const width_document  = window.innerWidth;
const height_document = window.innerHeight;

var width = width_document/4

var margin = 20

var radius = width / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", width)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

d3.json("data.json", function(data){
    var planet = document.getElementsByTagName("H1")[1].getAttribute("id")  //der aktuelle Planet
    var Werte = data[planet][0]
    var Datas = {"CarbonDioxid": Werte.carbonDioxide, "nitrogen": Werte.nitrogen, "oxygen": Werte.argon, "methan": Werte.methane, "sodium" : Werte.sodium, "hydrogen" : Werte.hydrogen, "helium" : Werte.helium, "other": Werte.other}
  

// set the color scale
var color = d3.scaleOrdinal()
  .domain([0, d3.max(Object.values(Datas))])
  .range(["#ba0298", "#a802ba", "#8902ba", "#7c02ba", "#6a02ba", "#5902ba", "#4102ba", "#2c02ba"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d){ 
      return d.value;})
   
var data_ready = pie(d3.entries(Datas)) // This pie generator takes an array of data and then returns an array of objects that contains details about each arc angle.
//The d3.entries function in D3.js is used to return an array containing the property names and property values of the specified object.
var arc = d3.arc()
.innerRadius(width / 5)         // This is the size of the donut hole
.outerRadius(radius)

var tooltip = d3.select("body")
          .append("p")
          .attr("class", "tooltip")
          
// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll("div")
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr("fill", function(d){return (color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("mouseover", function(d) {

    d3
      .select(this)   // DAS AKTUELLE ELEMENT AUSWàHLEN  oder “click”
      .attr("fill", "orange");

      // makes the tooltip appear on mouseover
    d3
      .select(this)
      .style("stroke", "white")
      .style("stroke-width", "3px");

    tooltip
      .style("opacity", 0)
      .style("position", "absolute").transition()
      .duration(200)
      .style("opacity", .9);
    tooltip
      .style("opacity", 1)
      .style("position", "absolute")
      .style("fill", "black")
      .style("background-color", "black")
      .html( d.data.key.charAt(0).toUpperCase()+d.data.key.slice(1) +":" + d.value * 100 +"%")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
      .style("padding", "10px");})
      .on("mouseout", function (d) {

    d3
      .select(this)
      .attr("fill", function(d){return (color(d.data.key))})
      .style("stroke-width", "2px")
      .style("stroke", "black")
        //makes the tooltip disappear on mouseout
  
    d3
      .selectAll(".tooltip")
      .style("opacity", 0)  
      })
  
// The arc generator
var arc = d3.arc()
.innerRadius(radius * 0.5)         // This is the size of the donut hole
.outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
.innerRadius(radius * 0.9)
.outerRadius(radius * 0.9)

// Add the polylines between chart and labels:


svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append("polyline") 
  .attr("stroke", "black")
  .attr("opacity", function(d){d.value > 0.016? a = "200%":  a = "0%"; return a })
  .style("fill", "none")
  .attr("stroke-width", 1)
  .attr('points', function(d) {
    var posA = arc.centroid(d) // line insertion in the slice
    var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
    var posC = outerArc.centroid(d); // Label position = almost the same as posB
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    posC[0] = radius * 0.8 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
    return [posA, posB, posC]
  })



// Add the keys(label)
svg
.selectAll('allLabels')
.data(data_ready)
.enter()
.append('text')
  .text( function(d) {console.log(d.data.key); console.log(d.data.key.charAt(0).toUpperCase()+d.data.key.slice(1));
    return d.data.key.charAt(0).toUpperCase()+d.data.key.slice(1) } )
  .attr('transform', function(d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.8 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
  })
  .attr("opacity", function(d){d.value > 0.016? a = "200%":  a = "0%"; 
  return a})
  .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
  })
  
  .style("font-size", "15px")
})
