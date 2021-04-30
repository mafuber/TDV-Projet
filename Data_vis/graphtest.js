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

    var OldSelection=1;
    var svg = d3.select("#my_planets")
        .append("svg")
        .attr("viewBox", "-19 -100 990 250");
    svg.selectAll("rect")
        .data(planets)
        .enter()
        .append("rect")
        .attr("rx",30)
        .attr("ry",20)
        .attr("x", function (d, i) { return d.offset })
        .attr("y", function (d) { return -95; })
        .attr("width", function (d, i) { return planetScale(d.diameter) + 2 * padding-5 })
        .attr("height", function (d) { return 215; })
        .attr("fill","black")
        .attr("id",function(d,i){return i;})
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            AtmosphericUpdate(selection);
            GroundUpdate(selection);
        });

    d3.select("rect[id='0']").attr("fill","grey");

    svg.selectAll("text")
        .data(planets)
        .enter()
        .append("text")
        .attr("x", function (d, i) { 
            return d.offset + planetScale(d.diameter) / 2 + padding / 2 -(1.47)**(d.name.length); 
        })
        .attr("y", function (d) { return 100; })
        .text(function (d) { return "" + d.name })
        .style("fill","white")
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            AtmosphericUpdate(selection);
            GroundUpdate(selection);
        });
    svg.selectAll(".planetsGradient")
        .data(planets)
        .enter()
        .append("circle")
        .attr("class", "planetGradient")
        .attr("cx", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding; })
        .attr("cy", function (d) { return 60 - planetScale(d.diameter) / 2; })
        .attr("r", function (d) { return planetScale(d.diameter) / 2; })
        .style("fill", "#33cc33")
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            AtmosphericUpdate(selection);
            GroundUpdate(selection);
        })

});
    

var margin = {top: 20, right: 10, bottom: 20, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var svg1 = d3.select("#my_dataviz1")
                .append("svg")
                .attr("viewBox", "0 0 1000 500")
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
function AtmosphericUpdate(choice) {
    d3.json("elements-atmo.json").then(function(d){
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
                .domain([0,1])
                .range([0,width]);

    var yScale = d3.scaleBand()
                .domain(d3.map(data,function(d){return d.name}))
                .range([0,height])
                .padding(0.1);

    svg1.selectAll("g").remove();

    var g1 = svg1.append("g");


    g1.append("g")
        .call(d3.axisLeft(yScale))
        .style("color","white");
    g1.append("g")
        .call(d3.axisBottom(xScale))
        .style("color","white")
        .attr("transform","translate(" + 0 + "," + height + ")");

   var u = svg1.selectAll("rect")
            .data(data)

    u.enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("y", function(d) { return yScale(d.name); })
        .attr("width", function(d) { return xScale(d.percentage); })
        .attr("height",yScale.bandwidth() )
        .attr("fill", "white");

    u.exit()
        .remove();
}
)};

var svg2 = d3.select("#my_dataviz2")
            .append("svg")
            .attr("viewBox", "0 0 1000 500")
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


function GroundUpdate(choice) {
    d3.json("elements-ground.json").then(function(d){
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
                .domain([0,1])
                .range([0,width]);

    var yScale = d3.scaleBand()
                .domain(d3.map(data,function(d){return d.name}))
                .range([0,height])
                .padding(0.1);

    svg2.selectAll("g").remove();

    var g2 = svg2.append("g");

    g2.append("g")
        .call(d3.axisLeft(yScale))
        .style("color","white");
    g2.append("g")
        .call(d3.axisBottom(xScale))
        .style("color","white")
        .attr("transform","translate(" + 0 + "," + height + ")");

    var v = svg2.selectAll("rect")
            .data(data)

    v.enter()
        .append("rect")
        .merge(v)
        .transition()
        .duration(1000)
        .attr("y", function(d) { return yScale(d.name); })
        .attr("width", function(d) { return xScale(d.percentage); })
        .attr("height",yScale.bandwidth() )
        .attr("fill", "white");
    v.exit()
        .remove();
}
)}
AtmosphericUpdate(1)
GroundUpdate(1)