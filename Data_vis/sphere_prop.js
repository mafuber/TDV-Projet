var margin = {top:100,right:30,bottom:30,left:30},
            width = 700 -margin.left-margin.right,
            height = 200 - margin.top -margin.bottom;

            d3.json("planets.json").then(function(data){
                planets=data

            var planetScale = d3.scaleLinear()
                .domain([0,d3.max(planets, function(d){return d.diameter;})])
                .range([0,150]);
                console.log(planetScale(10))

            var padding = 10;
            planets.forEach(function(d,i){
                if(i===0){
                    d.offset = 0;
                } else{
                    d.offset = planets[i-1].offset+planetScale(planets[i-1].diameter)+padding*2;
                }
            });

            var svg = d3.select("body")
                .classed("svg-container",true)
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 650 1000")
                .classed("svg-content-responsive", true)
                    //.attr("width",width+margin.left+margin.right)
                    //.attr("height",height+margin.top+margin.bottom)
                .append("g")
                    .attr("transform","translate("+(margin.left)+","+margin.top+")");

            var gradientRadial = svg.append("defs").selectAll("radialGradient")
                .data(planets)
                .enter().append("radialGradient")
                .attr("id", function(d){"gradient-"+d.name;})
                .attr("cx","30%")
                .attr("cy","30%")
                .attr("r","65%");
            /*gradientRadial.append("stop")
                .attr("offset","0%")
                .attr("stop-color",function(d){ return d3.rgb(d.color).brighter(1);});
            gradientRadial.append("stop")
                .attr("offset","50%")
                .attr("stop-color", function(d){return d.color;});
            gradientRadial.append("stop")
                .attr("offset","100%")
                .attr("stop-color", function(d){rgb(d.color).darker(1.5);});*/
            svg.selectAll("rect")
                .data(planets)
                .enter()
                .append("rect")
                .attr("x",function(d,i){ return d.offset+padding})
                .attr("y",function(d){return 50;})
                .attr("width",function(d,i){return planetScale(d.diameter)})
                .attr("height",function(d){return 10;})
                .attr("fill","green");
            svg.selectAll("text")
                .data(planets)
                .enter()
                .append("text")
                .attr("x",function(d,i){ return d.offset+planetScale(d.diameter)/2+padding;})
                .attr("y",function(d){return 50+20;})
                .text(function(d){return ""+d.name});
            svg.selectAll(".planetsGradient")
                .data(planets)
                .enter()
                .append("circle")
                .attr("class","planetGradient")
                .attr("cx",function(d,i){ return d.offset+planetScale(d.diameter)/2+padding;})
                .attr("cy",function(d){return 50-planetScale(d.diameter)/2;})
                .attr("r", function(d){ return planetScale(d.diameter)/2;})
                .style("fill","red")
            });