var mercury = [document.getElementsByClassName('Mercury')];
var venus = [document.getElementsByClassName('Venus')];
var earth = [document.getElementsByClassName('Earth')];
var mars = [document.getElementsByClassName('Mars')];
var jupiter = [document.getElementsByClassName('Jupiter')];
var saturn = [document.getElementsByClassName('Saturn')];
var uranus = [document.getElementsByClassName('Uranus')];
var neptune = [document.getElementsByClassName('Neptune')];


// load the json
d3.json('../DATA/json/planets.json', function (error, world) {
    // Check your console to detect potential errors while loading data
    if (error) throw ('There was an error while getting geoData: ' + error);
    var svg = d3.select("body").append("svg")

// Creation of the SVG
var circles = svg.select("circle");
    svg.selectAll("circle")
        .data()
        .enter()
        .append("g")
        .on("mouseover", function (d) {
            // makes the tooltip appear on mouseover
            d3.select(this)
                .style("stroke-width", 1)
            svg.transition()
                .duration(200)
                .style("opacity", .9);
            svg.html(
                "Nom: " + d.name + "</br>" + 
                "Masse: " + d.mass + "x 10^(24) kg" + "</br>" +
                "Diamètre: " + d.diameter + "km" + "</br>" +
                "Température moyenne: " + d.meanTemperature + "°C" + "</br>" +
                "Période de rotation: " + d.rotationPeriod + "h" + "</br>" +
                "Nombre de lunes: " + d.numberOfMoons + "</br>"
            )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("");

        })

        .on("mouseout", function (d) {
            d3.select(this)
                .style("stroke-width", 0)
            //makes the tooltip disappear on mouseout

            svg.transition()
                .duration(200)
                .style("opacity", 0);
        });
})
