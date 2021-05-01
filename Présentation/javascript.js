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


    canvas.on("mouseover", function(d) {
            canvas.selectAll("text").remove()
            canvas.selectAll("image").remove()
            var texto = canvas.selectAll("text")
                .data(data.Mercury)
                .enter()
            texto.append("text")
                .attr("dy", "1em")
                .text(function(d) {
                    return "Masse de la planète : " + d.mass + " unités";
                })
            texto.append("text")
                .attr("dy", "2em")
                .text(function(d) {
                    return "Diamètre de la planète : " + d.diameter + " unités"
                })
            texto.append("text")
                .attr("dy", "3em")
                .text(function(d) {
                    return "Densité de la planète : " + d.density + " unités"
                })
            texto.append("text")
                .attr("dy", "4em")
                .text(function(d) {
                    return "Mesure de la gravité : " + d.gravity + " unités"
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