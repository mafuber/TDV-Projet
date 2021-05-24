/*sources for elements-ground.json :
Mercury:    https://www.universetoday.com/13992/composition-of-mercury/ 
Venus :     http://mentallandscape.com/V_Venera11.htm (end of the document)
Earth:      https://en.wikipedia.org/wiki/Earth
Mars:       https://www.lpi.usra.edu/education/IYPT/Mars.pdf
Jupiter:    composition is the same as atmospheric (gaz giant)
Saturn:     composition is the same as atmospheric (gaz giant)
Uranus:     composition is the same as atmospheric (gaz giant)
Neptune:    composition is the same as atmospheric (gaz giant)


Sources for the atmosphere:
https://nssdc.gsfc.nasa.gov/planetary/factsheet/
*/

//Definition of a few global variables and attribute a class

var graphType = 1;
var scatterxOption = "numberOfMoons";
var scatteryOption = "diameter";
var OldSelection = 1;

d3.selectAll("#scatterplotoptions").attr("class", "hidden");

//Main Function to set the Graph type (atmo-ground OR scatterplot)
function GraphTypeChange(Type, Option, Axis) {
    graphType = Type;
    if (Axis == 1) {
        scatterxOption = Option;
    } else if (Axis == 2) {
        scatteryOption = Option;
    }
    GraphUpdate(OldSelection);
}
//All the planets-size picture, names of them and selection to switch between the planet data 
d3.json("planets.json").then(function(data) {

    //create the X axis
    planets = data
    var planetScale = d3.scaleLinear()
        .domain([0, d3.max(planets, function(d) { return d.diameter; })])
        .range([0, 150]);

    //and add a correct padding between the planets
    var padding = 30.2;
    planets.forEach(function(d, i) {
        if (i === 0) {
            d.offset = 0;
        } else {
            d.offset = planets[i - 1].offset + planetScale(planets[i - 1].diameter) + padding * 2;
        }
    });

    //create the svg viewBox calling with the my_planets id
    var svg = d3.select("#my_planets")
        .append("svg")
        .attr("x", 0)
        .attr("viewBox", "0 -100 900 220");

    // append the selector rectangles (grey) with a onclick function to switch the data in the further created function GraphUpdate
    svg.selectAll("rect")
        .data(planets)
        .enter()
        .append("rect")
        .attr("rx", 30)
        .attr("ry", 20)
        .attr("x", function(d, i) { return d.offset })
        .attr("y", function(d) { return -95; })
        .attr("width", function(d, i) { return planetScale(d.diameter) + 2 * padding - 5 })
        .attr("height", function(d) { return 215; })
        .attr("fill", "black")
        .attr("id", function(d, i) { return i; })
        .style("cursor", "pointer")
        .on("click", function(d, i) {
            var selection = i.id
            d3.select("rect[id='" + (OldSelection - 1) + "']")
                .attr("fill", "black");
            d3.select("rect[id='" + (selection - 1) + "']")
                .attr("fill", "grey");
            OldSelection = selection;
            GraphUpdate(selection);
        });
    
    //fill the first rectangle so the user undestands the interaction with the planets
    d3.select("rect[id='0']").attr("fill", "grey");

    // append the name of the planets and enable the interaction also for switching planets
    svg.selectAll("text")
        .data(planets)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
            return d.offset + planetScale(d.diameter) / 2 + padding / 2 - (1.47) ** (d.name.length);
        })
        .attr("y", function(d) { return 100; })
        .text(function(d) { return "" + d.name })
        .style("fill", "white")
        .style("cursor", "pointer")
        .on("click", function(d, i) {
            var selection = i.id
            d3.select("rect[id='" + (OldSelection - 1) + "']")
                .attr("fill", "black");
            d3.select("rect[id='" + (selection - 1) + "']")
                .attr("fill", "grey");
            OldSelection = selection;
            GraphUpdate(selection);
        });
    
    //append the circle for the planets with correct proportions (diameter) and add a gradient 
    svg.selectAll(".planetsGradient")
        .data(planets)
        .enter()
        .append("circle")
        .attr("class", "planetGradient")
        .style("cursor", "pointer")
        .attr("cx", function(d, i) { return d.offset + planetScale(d.diameter) / 2 + padding; })
        .attr("cy", function(d) { return 60 - planetScale(d.diameter) / 2; })
        .attr("r", function(d) { return planetScale(d.diameter) / 2; })
        .style("fill", function(d) { return "url(#" + d.name + ")" })
        .on("click", function(d, i) {
            var selection = i.id
            d3.select("rect[id='" + (OldSelection - 1) + "']")
                .attr("fill", "black");
            d3.select("rect[id='" + (selection - 1) + "']")
                .attr("fill", "grey");
            OldSelection = selection;
            GraphUpdate(selection);
        })

});


//create other svg (svg1) for the Graphs. Setting global variables for the sizes and make a viewBox

var margin = { top: 20, right: 5, bottom: 20, left: 100 };
var width = 1500 - margin.left - margin.right;
var height = 200 - margin.top - margin.bottom;
var svg1 = d3.select("#my_dataviz1")
    .append("svg")
    .attr("viewBox", "0 10 750 350")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Function to create and update the graphs
function GraphUpdate(choice) {
    d3.selectAll("#scatterplotoptions").attr("class", "hidden");

    //first option: the ground data:
    if (graphType == 0) {
        d3.json("elements-ground.json").then(function(d) {
            console.log(data);
            if (choice == 1) {
                data = d.data1;
            } else if (choice == 2) {
                data = d.data2;
            } else if (choice == 3) {
                data = d.data3;
            } else if (choice == 4) {
                data = d.data4;
            } else if (choice == 5) {
                data = d.data5;
            } else if (choice == 6) {
                data = d.data6;
            } else if (choice == 7) {
                data = d.data7;
            } else if (choice == 8) {
                data = d.data8;
            }
            // clearing text from last time function called
            svg1.selectAll("text").remove();
            width = 630;
            //creating the x scale and y scale:
            var xScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, width]);

            var yScale = d3.scaleBand()
                .domain(d3.map(data, function(d) { return d.name }))
                .range([0, height])
                .padding(0.1);

            //append the scales x & y
            svg1.selectAll("g").remove();
            var g2 = svg1.append("g");

            g2.append("g")
                .call(d3.axisLeft(yScale))
                .style("color", "white")
                .style("font-family", "Dosis");
            g2.append("g")
                .call(d3.axisBottom(xScale))
                .style("color", "white")
                .attr("transform", "translate(" + 0 + "," + height + ")");

            //remove the circle if the scatter plot was called before
            svg1.selectAll("circle").remove();

            // creating the rectangles with transition
            var v = svg1.selectAll("rect")
                .data(data);
            v.enter()
                .append("rect")
                .merge(v)
                .transition()
                .duration(1000)
                .attr("y", function(d) { return yScale(d.name); })
                .attr("width", function(d) { return xScale(d.percentage); })
                .attr("height", yScale.bandwidth())
                .attr("fill", "chocolate");
            v.exit()
                .remove();
        })
    // now we have the option with the atmospheric data and the idea is the same as before
    } else if (graphType == 1) {
        d3.json("elements-atmo.json").then(function(d) {
            if (choice == 1) {
                data = d.data1;
            } else if (choice == 2) {
                data = d.data2;
            } else if (choice == 3) {
                data = d.data3;
            } else if (choice == 4) {
                data = d.data4;
            } else if (choice == 5) {
                data = d.data5;
            } else if (choice == 6) {
                data = d.data6;
            } else if (choice == 7) {
                data = d.data7;
            } else if (choice == 8) {
                data = d.data8;
            }
            console.log(data)
            width = 630;
            svg1.selectAll("text").remove();
            var xScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, width]);

            var yScale = d3.scaleBand()
                .domain(d3.map(data, function(d) { return d.name }))
                .range([0, height])
                .padding(0.1);

            svg1.selectAll("g").remove();

            var g1 = svg1.append("g");


            g1.append("g")
                .call(d3.axisLeft(yScale))
                .style("color", "white")
                .style("font-family", "Dosis");
            g1.append("g")
                .call(d3.axisBottom(xScale))
                .style("color", "white")
                .attr("transform", "translate(" + 0 + "," + height + ")");
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
                .attr("height", yScale.bandwidth())
                .attr("fill", "chocolate");

            u.exit()
                .remove();
        })
        // here we have the scatter plot option but the user is not choosing the x axis
    } else if (graphType == 2) {
        console.log(scatterxOption + "  " + scatteryOption)
        test = "mass";
        d3.json("planets.json").then(function(d) {
            data = d;
            //Find the range of values for all the axis
            yMax = d3.max(d, function(d) { return eval("d." + scatteryOption + "") });
            yMin = d3.min(d, function(d) { return eval("d." + scatteryOption + "") });
            var yScale = d3.scaleLinear()
                .domain([yMax, yMin])
                .range([0, height]);
            xMax = d3.max(d, function(d) { return d.name });
            xMin = d3.min(d, function(d) { return d.name });
            var xScale = d3.scaleBand()
                .domain(d3.map(data, function(d) { return d.name }))
                .range([0, width])
            //clear the svg1 of any elements form before
            svg1.selectAll("g").remove();
            svg1.selectAll("rect").remove();
            svg1.selectAll("circle").remove();
            svg1.selectAll("text").remove();

            //creating the axis
            var g1 = svg1.append("g");

            g1.append("g")
                .call(d3.axisLeft(yScale))
                .style("color", "white")
                .attr("class", "scale");
            g1.append("g")
                .call(d3.axisBottom(xScale))
                .style("color", "white")
                .style("font-family", "Dosis")
                .attr("transform", "translate(" + 0 + "," + height + ")");

            // making the x & y labels
            svg1.append("text")
                .attr("x", width / 2.2)
                .attr("y", height + 35)
                .attr("font-size", "100%")
                .style("fill", "white")
                .text("Planets");
            svg1.append("text")
                .attr("x", -width / 10)
                .attr("y", height / 2)
                .attr("transform", "translate(-200,120)rotate(-90)")
                .attr("font-size", "100%")
                .style("fill", "white")
                .text("" + scatteryOption);

            // placing the planets with a gradient
            var u = svg1.selectAll("rect")
                .data(data)
            u.enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.name) + xScale.bandwidth() / 2; })
                .attr("cy", function(d) { return yScale(eval("d." + scatteryOption + "")) })
                .attr("r", xScale.bandwidth() / 20)
                .style("fill", function(d) { return "url(#" + d.name + ")" });
            u.exit()
            u.exit().remove();
        })
        // Last option, the user can choose the axis and for that we change
        //the class of #scatterplotoptions to visible and we repeat almost 
        //the same process as for graphType==2
    } else if (graphType == 3) {

        d3.selectAll("#scatterplotoptions").attr("class", "visible");

        console.log(scatterxOption + "  " + scatteryOption)
        test = "mass";
        d3.json("planets.json").then(function(d) {
            data = d;
            yMax = d3.max(d, function(d) { return eval("d." + scatteryOption + "") });
            yMin = d3.min(d, function(d) { return eval("d." + scatteryOption + "") });
            var yScale = d3.scaleLinear()
                .domain([yMax, yMin])
                .range([0, height]);
            xMax = d3.max(d, function(d) { return eval("d." + scatterxOption + "") });
            xMin = d3.min(d, function(d) { return eval("d." + scatterxOption + "") });
            var xScale = d3.scaleLinear()
                .domain([xMin, xMax])
                .range([0, width])
                //.padding(0.1);

            svg1.selectAll("g").remove();
            svg1.selectAll("rect").remove();
            svg1.selectAll("circle").remove();
            svg1.selectAll("text").remove();
            var g1 = svg1.append("g");

            g1.append("g")
                .call(d3.axisLeft(yScale))
                .style("color", "white");
            g1.append("g")
                .call(d3.axisBottom(xScale))
                .style("color", "white")
                .attr("transform", "translate(" + 0 + "," + height + ")");


            svg1.append("text")
                .attr("x", width / 2.2)
                .attr("y", height + 35)
                .attr("font-size", "100%")
                .style("fill", "white")
                .text("" + scatterxOption);
            svg1.append("text")
                .attr("x", -width / 10)
                .attr("y", height / 2)
                .attr("transform", "translate(-200,120)rotate(-90)")
                .attr("font-size", "100%")
                .style("fill", "white")
                .text("" + scatteryOption);

            var u = svg1.selectAll("rect")
                .data(data)
            u.enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(eval("d." + scatterxOption + "")) /*+xScale.bandwidth()/2*/ ; })
                .attr("cy", function(d) { return yScale(eval("d." + scatteryOption + "")) })
                .attr("r", 3)
                .style("fill", function(d) { return "url(#" + d.name + ")" });
            u.exit()
            u.exit().remove();
        })
    }
}
//Calling the function when the page launches
GraphUpdate(1);