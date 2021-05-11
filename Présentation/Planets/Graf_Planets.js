//nur anzeigen falls d kondition
//tooltips
//qqun a change les trucs

// set the dimensions and margins of the graph
var width = 500
var height = 450
var margin = 40

// tooltip
/*var tooli = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    ;*/

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data

//var data1 = {a: 9, b: 20, c:30, d:8, e:12}
//var data2 = ["carbonDioxide","nitrogen", "oxgygen","argon","methane","sodium","hydrogen","helium","other"]

d3.json("data.json", function(data){
    var planet = document.getElementsByTagName("H1")[1].getAttribute("id")  //der aktuelle Planet
    var Werte = data[planet][0]
    //var Komponenten = data[planet][0].carbonDioxide
    //for (element in data2){
        //var new1 = eval(data2[element])
      //  console.log(Werte.carbonDioxide)

       // console.log(Werte.data2[element])
    //}
    //var Datas = [Werte.carbonDioxide, Werte.nitrogen, Werte.argon, Werte.methane, Werte.sodium, Werte.hydrogen, Werte.helium, Werte.other]

    var Datas = {"CarbonDioxid": Werte.carbonDioxide, "nitrogen": Werte.nitrogen, "oxygen": Werte.argon, "methan": Werte.methane, "sodium" : Werte.sodium, "hydrogen" : Werte.hydrogen, "helium" : Werte.helium, "other": Werte.other}


// set the color scale
var color = d3.scaleOrdinal()
  .domain([0, d3.max(Object.values(Datas))])
  .range(["#ba0298", "#a802ba", "#8902ba", "#7c02ba", "#6a02ba", "#5902ba", "#4102ba", "#2c02ba"])

// Compute the position of each group on the pie:


var pie = d3.pie()
  .value(function(d){ 
      return d.value;})
      //console.log(Datas[1]); return Datas[1]})
      
    /*function(){
      for (i = 0; i < Datas.length; i++ ){
          counter += 1
          console.log(Datas[i], i, counter)}
      return Datas[i]
        
  //  return d.value; 
  })
  */
var data_ready = pie(d3.entries(Datas)) // This pie generator takes an array of data and then returns an array of objects that contains details about each arc angle.
//The d3.entries function in D3.js is used to return an array containing the property names and property values of the specified object.
var arc = d3.arc()
.innerRadius(width / 5)         // This is the size of the donut hole
.outerRadius(radius)


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
    d3.select(this)   // DAS AKTUELLE ELEMENT AUSWàHLEN  oder “click”
.attr("fill", "orange");
d3.select(this).append("text")
       .attr("id", "tooltip")
        .attr("x",  String(event.pageX)) //Get the x values of the mouse
       .attr("y", String(event.pageY))
       .attr("height", "90px")
       .attr("width", "20px")
       .attr("text-anchor", "middle")
       .attr("font-family", "sans-serif")
       .attr("font-size", "7px")
       .attr("font-weight", "bold")
       
       .text("kdjfl")
       //.style("fill", "white");
       ;


   
    /*//Create the tooltip label
    d3.select(this)
        .append("text") 
       .attr("id", "tooltip")
        .attr("x",  String(event.pageX /2)) //Get the x values of the mouse
       .attr("y", String(event.pageY))
       .attr("height", "90px")
       .attr("width", "200px")
       .attr("text-anchor", "middle")
       .attr("font-family", "sans-serif")
       .attr("font-size", "700px")
       .attr("font-weight", "bold")
       .attr("fill", "black")
       .attr("background-color", "red")
       .text(343295);
       console.log(d.value, d.key, event.pageX);
*/
})
.on("mouseout", function() {

    //Remove the tooltip
    d3.select("#tooltip").remove();
    d3.select(this).attr("fill", function(d){return (color(d.data.key)) ;}) 
    
})

  
  
// The arc generator
var arc = d3.arc()
.innerRadius(radius * 0.5)         // This is the size of the donut hole
.outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
.innerRadius(radius * 0.9)
.outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

// Add the polylines between chart and labels:

/*
counter = 0
for ( a in Object.values(Datas)){
  if (a >0.3){
  console.log(Object.values(Datas))
}}
*/
console.log(data_ready[3].value)
svg
.selectAll('allPolylines')
.data(data_ready)
.enter()
.append("polyline") //function(d){ d < 0.2? a = "": a = "polyline"; return a})
  .attr("stroke", "black")
  .attr("opacity", function(d){d.value > 0.1? a = "200%":  a = "0%"; 
  return a
  /*function (d){    
      if (d.value > 0.01){
      return "100%"
      }else{
        return("0%")
      }
    }
  else{
    console.log(Object.values(Datas)); return "0%"}}*/
  })
  .style("fill", "none")
  .attr("stroke-width", 1)
  .attr('points', function(d) {
    //console.log(Object.values(d))
    var posA = arc.centroid(d) // line insertion in the slice
    var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
    var posC = outerArc.centroid(d); // Label position = almost the same as posB
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
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
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
  })
  .attr("opacity", function(d){d.value > 0.1? a = "200%":  a = "0%"; 
  return a})
  .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
  })
})