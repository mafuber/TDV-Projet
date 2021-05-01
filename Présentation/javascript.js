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

var width = 300;
var height = 300;

var info = d3.json("../../Data_vis/mydata.json", function(data) {
    var canvas = d3.select(".centered_container").append("svg").attr("width", width).attr("height", height);
    var imag = canvas.append("image").attr("xlink:href", "../Pictures/Merkur.jpg").attr("width", width).attr("height", height);

    //var text =
    canvas.on("mouseover", function(d) {
            canvas.selectAll("text").remove()
            canvas.selectAll("image").remove()
            canvas.selectAll("text")
                .data(data.Mercury)
                .enter()
                .append("text")
                .attr("y", function(d, i) { return i * 50 + 20; })
                .attr("fill", "black")
                .text(function(d) {
                    return "Juste pour voir si ça marche " + d.mass;
                    // " &#xA;" +
                    //   " Diamètre : " + d.diameter + "<br/>" +
                    // " autres dimensions " + "<br/>";
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
                .attr("height", height)
                .style("cursor", "")
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

});