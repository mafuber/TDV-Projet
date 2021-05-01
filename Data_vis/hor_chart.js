var margin = {top: 20, right: 20, bottom: 20, left: 100},
    width = 600 - margin.left - margin.right,
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
    .domain([0,d3.max(data,function(d){ return d.percentage})])
    .range([0,width]);

    
   
    var yScale = d3.scaleBand()
    .domain(d3.map(data,function(d){return d.name}))
    .range([0,height])
    .padding(0.2);

    console.log(margin.left)
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
       .attr("fill", "blue")
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
    u
    .exit()
    .remove()
}
)}
// Initialize the plot with the first dataset
update(1)