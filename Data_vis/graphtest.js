var graphType = 0;
var scatterxOption = "mass";
var scatteryOption  = "mass";
d3.selectAll("#scatterplotoptions").attr("class","hidden");
function GraphTypeChange(Type,Option,Axis){
    graphType=Type;
    if(Axis==1){
        scatterxOption = Option;
    }else if(Axis==2){
        scatteryOption = Option;
    }
    GraphUpdate(1);
}

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
        .attr("viewBox", "-19 -100 930 250");
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
        .style("cursor", "pointer")
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            GraphUpdate(selection);
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
        .style("cursor", "pointer")
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            GraphUpdate(selection);
        });
    svg.selectAll(".planetsGradient")
        .data(planets)
        .enter()
        .append("circle")
        .attr("class", "planetGradient")
        .style("cursor", "pointer")
        .attr("cx", function (d, i) { return d.offset + planetScale(d.diameter) / 2 + padding; })
        .attr("cy", function (d) { return 60 - planetScale(d.diameter) / 2; })
        .attr("r", function (d) { return planetScale(d.diameter) / 2; })
        //.style("fill", "#33cc33")
        .style("fill", function (d) { return "url(#" + d.name + ")" })
        .on("click",function(d,i){
            var selection = i.id
            d3.select("rect[id='"+(OldSelection-1)+"']")
            .attr("fill","black");
            d3.select("rect[id='"+(selection-1)+"']")
            .attr("fill","grey");
            OldSelection=selection;
            GraphUpdate(selection);
        })

});

var margin = {top: 20, right: 5, bottom: 20, left: 100};
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var svg1 = d3.select("#my_dataviz1")
            .append("svg")
            .attr("viewBox", "0 10 750 350")
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
function GraphUpdate(choice){
    d3.selectAll("#scatterplotoptions").attr("class","hidden");
    if(graphType == 0){
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
        width =630;
        var xScale = d3.scaleLinear()
                    .domain([0,1])
                    .range([0,width]);
    
        var yScale = d3.scaleBand()
                    .domain(d3.map(data,function(d){return d.name}))
                    .range([0,height])
                    .padding(0.1);
    
        svg1.selectAll("g").remove();
    
        var g2 = svg1.append("g");
    
        g2.append("g")
            .call(d3.axisLeft(yScale))
            .style("color","white");
        g2.append("g")
            .call(d3.axisBottom(xScale))
            .style("color","white")
            .attr("transform","translate(" + 0 + "," + height + ")");

            svg1.selectAll("circle").remove();
        var v = svg1.selectAll("rect")
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
    )
    }else if(graphType == 1){
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
            console.log(data)
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
            svg1.selectAll("circle").remove();
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
        })
    }else if (graphType == 2){
        console.log(scatterxOption+"  "+scatteryOption)
        test="mass";
        d3.json("planets.json").then(function(d){
            data=d;
            yMax=d3.max(d,function(d){return eval("d."+scatteryOption+"")});
            var yScale = d3.scaleLinear()
                    .domain([yMax,0])
                    .range([0,height]);
            xMax=d3.max(d,function(d){return d.name});
        var xScale = d3.scaleBand()
                    .domain(d3.map(data,function(d){return d.name}))
                    .range([0,width])
                    //.padding(0.1);
    
        svg1.selectAll("g").remove();
        svg1.selectAll("rect").remove();
        svg1.selectAll("circle").remove();
        svg1.selectAll("text").remove();
        var g1 = svg1.append("g");

        g1.append("g")
            .call(d3.axisLeft(yScale))
            .style("color","white");
        g1.append("g")
            .call(d3.axisBottom(xScale))
            .style("color","white")
            .attr("transform","translate(" + 0 + "," + height + ")");

        svg1.append("text")
            .attr("x",width/2.2)
            .attr("y",height+35)
            .attr("font-size","100%")
            .style("fill","white")
            .text("Planets");
            svg1.append("text")
            .attr("x",-width/10)
            .attr("y",height/2)
            .attr("transform","translate(-200,120)rotate(-90)")
            .attr("font-size","100%")
            .style("fill","white")
            .text(""+scatteryOption);
        
        var u = svg1.selectAll("rect")
            .data(data)
        u.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.name)+xScale.bandwidth()/2;})
            .attr("cy",function(d){return yScale(eval("d."+scatteryOption+""))})
            .attr("r",xScale.bandwidth()/20)
            .style("fill", function (d) { return "url(#" + d.name + ")" });
            u.exit()
        /*u.enter().append("line").data(data)
        .style("stroke","white")
        .style("stroke-width",0.05)
        .attr("x1",0)
        .attr("y1",function(d){return [10,20]})
        .attr("x2",width)
        .attr("y2",function(d){return [10,]});*/
        u.exit().remove();
        })
    }else if (graphType == 3){

        d3.selectAll("#scatterplotoptions").attr("class","visible");

        console.log(scatterxOption+"  "+scatteryOption)
        test="mass";
        d3.json("planets.json").then(function(d){
        data=d;
        yMax=d3.max(d,function(d){return eval("d."+scatteryOption+"")});
        var yScale = d3.scaleLinear()
                .domain([yMax,0])
                .range([0,height]);
        xMax=d3.max(d,function(d){return eval("d."+scatterxOption+"")});
        var xScale = d3.scaleLinear()
                .domain([0,xMax])
                .range([0,width])
                //.padding(0.1);

                svg1.selectAll("g").remove();
                svg1.selectAll("rect").remove();
                svg1.selectAll("circle").remove();
                svg1.selectAll("text").remove();
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
        .append("circle")
        .attr("cx", function(d) { return xScale(eval("d."+scatterxOption+""))/*+xScale.bandwidth()/2*/;})
        .attr("cy",function(d){return yScale(eval("d."+scatteryOption+""))})
        .attr("r",/*xScale.bandwidth()/20*/3)
        .style("fill", function (d) { return "url(#" + d.name + ")" });
        u.exit()
    /*u.enter().append("line").data(data)
    .style("stroke","white")
    .style("stroke-width",0.05)
    .attr("x1",0)
    .attr("y1",function(d){return [10,20]})
    .attr("x2",width)
    .attr("y2",function(d){return [10,]});*/
u.exit().remove();
    })
}
}
GraphUpdate(3);