//nur anzeigen falls d kondition
//tooltips
//qqun a change les trucs

// set the dimensions and margins of the graph
var width = 450
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
var data_ready = pie(d3.entries(Datas))

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
  .attr("fill", function(d){ console.log("jdkjflkds"); return (color(d.data.key)) })
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
       .attr("width", "200px")
       .attr("text-anchor", "middle")
       .attr("font-family", "sans-serif")
       .attr("font-size", "700px")
       .attr("font-weight", "bold")
       
       .text("kdjfl")
       .style("fill", "white");
       console.log(d.value, d.key, event.pageX);;


   
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
    d3.select(this).attr("fill", function(d){ console.log("jdkjflkds"); return (color(d.data.key)) ;}) 
    
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
svg
.selectAll('allPolylines')
.data(data_ready)
.enter()
.append("polyline") //function(d){ d < 0.2? a = "": a = "polyline"; return a})
  .attr("stroke", "black")
  .style("fill", "none")
  .attr("stroke-width", 1)
  .attr('points', function(d) {
    var posA = arc.centroid(d) // line insertion in the slice
    var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
    var posC = outerArc.centroid(d); // Label position = almost the same as posB
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
    return [posA, posB, posC]
  })


// Add the polylines between chart and labels:
svg
.selectAll('allLabels')
.data(data_ready)
.enter()
.append('text')
  .text( function(d) { console.log(d.data.key) ; return d.data.key } )
  .attr('transform', function(d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
  })
  .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
  })

/*
  // Add the polylines between chart and labels:
svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d) // line insertion in the slice
      var posB = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9).centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9).centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })
/*
  svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
    .text( function(d) { console.log(d.data.key) ; return d.data.key } )
    .attr('transform', function(d) {
        var pos = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9).centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
 */
    
    
   /* .select("#tooltip")
    .style("left",  parseFloat(d3.select(this).attr("x")) + "px")
    .style ("top", parseFloat(d3.select(this).attr("y"))/2 +  "px")
    .select("#value")

    .text("slkdjgkl")
    .classed("hidden",false);
    console.log(d)})
    .on("mouseout",function() {d3.select(this)     // wenn Maus nicht mehr auf dem Objekt ist wird blau (auch für Infobulles)
    .attr("fill", function(d){ console.log("jdkjflkds"); return (color(d.data.key)) ;})  })
   /* .on("mouseover", function (d) {d3.select(this)
      .transition()
      .duration(200)
      // makes the tooltip appear on mouseover
      .style("opacity", .9)
          .setAttribute("width", "110% ")
          .setAttribute("height", "110%")
         
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
          .style("right", (d3.event.pageX) - "px")
          .style("button" (d3.event.pageY+28)- "px")
  })

  .on("mouseout", function (d) {
      //makes the tooltip disappear on mouseout
      div.transition()
          .duration(200)
          .style("opacity", .0);
      
          d3.select(this)
          .setAttribute("width", "100% ")
          .setAttribute("height", "100%")
  }); */
    
//D3.select(„p”)
//.on(“click”, function(){//Do something on click});

})

/*
var width = 1500,
    height = 1000;
const humanReadable = (num, precision = 3, addSpace = true) => {
    const UNITS = ['', 'thousand', 'million', 'billion'];
    if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
    const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
    const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
    return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};
function getColor(colorValue) {
    if(colorValue == 1){
        return "red"}
    else if(colorValue == 2)
{
        return "blue"}
    else if(colorValue == 3) {
        return "green"
    }
    else if(colorValue == 4){
        return "yellow"
    }
    else if(colorValue == 5){
        return "pink"
    }
    else if (colorValue == 6){
        return "black"
    }
    else if (colorValue == 7){
        return "brown"
    }
}

// tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
// The geoMercator() function in d3.js is used to draw The spherical Mercator projection.
var projection = d3.geoMercator()
    .translate([width / 2, height / 1.5])
    .scale((width + 1) / 2 / Math.PI); // Replace this variable with your projection definition

var path = d3.geoPath(projection);

// Creation of the SVG
var svg = d3.select('div.map').append("svg")
    .attr("width", width)
    .attr("height", height);

// load the json
d3.json("world-lowres.geo.json", function (error, world) {
    // Check your console to detect potential errors while loading data
    if (error) throw ('There was an error while getting geoData: ' + error);

    svg.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        //.classed("Balken", true)  /*so kann eine Klasse definiert werden
  
        .attr("d", "m 100 100 h 100 v 200 h 200 v 299" )
        .attr("d", "m 100 100" + function(j, index) {  
        for (a in world.features[index].geometry.coordinates){
            console.log( "hkladsj" + String(a[0]) + String(a[1]));
        return "h" + String(a[0]) + "v" +String(a[1])}})

       
      /* <g id="white_gaps" stroke="white" stroke-width="8" fill="white">
       <!-- shift from dx=-95 and dy=45 and make a line of 190 -->

       <path d="m-95 45 h 190" stroke="white" />
       <circle id="eye_left" cx="-42" r="4" />
     //  .attr("d", "m 100 100 h 100 v 200 h 200 v 299")
        .attr("width", width)
        .attr("heigth", height)
        .attr("stroke", "black")
        .attr("fill", "black")

    //.attr("stroke", getColor(d))
     
        
        .on("mouseover", function (d) {
            // makes the tooltip appear on mouseover
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html()
                .getElementsByClassName("path")
                .setAttribute("width", "110% ")
                .setAttribute("height", "110%")
               
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("right", (d3.event.pageX) - "px")
                .style("button" (d3.event.pageY+28)- "px")
        })

        .on("mouseout", function (d) {
            //makes the tooltip disappear on mouseout
            div.transition()
                .duration(200)
                .style("opacity", .0);
            div.html()
                .getElementsByClassName("path")
                .setAttribute("width", "100% ")
                .setAttribute("height", "100%")
        }); 
})


div.tooltip {
    position: absolute;
    text-align: center;
    width: auto;
    height: auto;
    padding: 10px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 5px;
    border-radius: 8px;
    pointer-events: none;
    text-size-adjust: auto;
  }
  */