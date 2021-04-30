var counter;
counter = 0

function out(a) {

    a.classList.toggle("change"); /*Get the current element (this) and toggle the class between the "current" class und change (ajoute le class change apres lautre class)*/

    if ((counter % 2) == 0) {
        document.getElementById("button_next").style.right = "200px";
    } else {
        document.getElementById("button_next").style.right = "0px";

    }
    counter += 1
}

var width = 500;
var height = 500;

var text2 = d3.json("../../Data_vis/mydata.json", function(data) {
    var canvas = d3.select("body").append("svg").attr("width", width).attr("height", height);
    var imag = d3.select("svg").append("image").attr("xlink:href", "../Pictures/Merkur.jpg").attr("width", width).attr("height", 200);

    canvas.on("mouseover", function(d) {
            canvas.selectAll("text").remove()
            canvas.selectAll("image").remove()
            canvas.selectAll("text")
                .data(data.Mercury)
                .enter()
                .append("text")
                .attr("y", function(d, i) { return i * 50 + 100; })
                .attr("fill", "white")
                .text(function(d) {
                    return "Masse : " + d.mass + "/n" +
                        "</n>" + " Diamètre : " + d.diameter + "/n" + "</br>" +
                        "<br>" + " autres dimensions " + "</br>";
                })
            d3.select(this)
                .style("cursor", "pointer")
                .transition()
                .duration(200)
                .style("opacity", 1);


        })
        .on("mouseout", function(d) {
            canvas.selectAll("text").remove()
            canvas.selectAll("image").remove()
            d3.select(this)
                .append("image")
                .attr("xlink:href", "../Pictures/Merkur.jpg")
                .attr("width", width)
                .attr("height", 200)
                .style("cursor", "")
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

});