
    var salesData;
    var truncLengh = 30;

    function ready () {
        Plot();
    }

    function Plot() {
        d3.json("mydata.json", function(data){console.log(data)})
        //then(function (data){
       
      //  })
        TransformChartData(chartData, chartOptions);
        BuildPie("chart", chartData, chartOptions);
    }

    function BuildPie(id, chartData, options) {
        var xVarName;
        var divisionRatio = 2.5;
        var legendoffset = 0;

        chart = d3.select("#" + id + " .innerCont");

        var yVarName = options[0].yaxis;
        width = $(chart[0]).outerWidth(),
        height = $(chart[0]).outerHeight(),
        radius = Math.min(width, height) / divisionRatio;

        xVarName = options[0].xaxis;


        
        var rcolor = d3.scale.ordinal().range(runningColors);

        arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - 200);

        chart = chart
                .append("svg")  //append svg element inside #chart
                .attr("width", width)    //set width
                .attr("height", height)  //set height
                .append("g")
                .attr("transform", "translate(" + (width / divisionRatio) + "," + ((height / divisionRatio) + 30) + ")");

        var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.Total;
                    });

        var g = chart.selectAll(".arc")
                    .data(pie(runningData))
                    .enter().append("g")
                    .attr("class", "arc");

        var count = 0;

        var path = g.append("path")
                    .attr("d", arc)
                    .attr("id", function (d) { return "arc-" + (count++); })
                    .style("opacity", function (d) {
                        return d.data["op"];
                    });

        path.append("svg:title")
        .text(function (d) {
            return d.data["title"] + " (" + d.data[yVarName] + ")";
        });

        path.style("fill", function (d) {
            return rcolor(d.data[xVarName]);
        })

        g.append("text")
         .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
         .attr("dy", ".35em")
         .style("text-anchor", "middle")
         .style("opacity", 1)
         .text(function (d) {
             return d.data[yVarName];
         });


        count = 0;
        var legend = chart.selectAll(".legend")
            .data(runningData).enter()
            .append("g").attr("class", "legend")
            .attr("legend-id", function (d) {
                return count++;
            })
            .attr("transform", function (d, i) {
                return "translate(15," + (parseInt("-" + (runningData.length * 10)) + i * 28 + legendoffset) + ")";
            })
            .style("cursor", "pointer")

        var leg = legend.append("rect");

        leg.attr("x", width / 2)
            .attr("width", 18).attr("height", 18)
            .style("fill", function (d) {
                return rcolor(d[yVarName]);
            })
        legend.append("text").attr("x", (width / 2) - 5)
            .attr("y", 9).attr("dy", ".35em")
            .style("text-anchor", "end").text(function (d) {
                return d.caption;
            });

        leg.append("svg:title")
        .text(function (d) {
            return d["title"] + " (" + d[yVarName] + ")";
        });

    }

    function TransformChartData(chartData, opts) {
        var result = [];
        var resultColors = [];
        var counter = 0;
        var hasMatch;
        var xVarName;
        var yVarName = opts[0].yaxis;

        xVarName = opts[0].xaxis;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
                ditem[xVarName] = chartData[i][xVarName];
                ditem[yVarName] = chartData[i][yVarName];
                ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                result.push(ditem);

                resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

                counter += 1;
            }
        }

        runningData = result;
        runningColors = resultColors;
        return;
    }

