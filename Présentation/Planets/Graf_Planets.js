

// set the dimensions and margins of the graph
var width = 450
var height = 450
var margin = 40

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

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll("div")
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(width / 5)         // This is the size of the donut hole
    .outerRadius(radius))
  .attr("fill", function(d){ console.log("jdkjflkds"); return (color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

});
    