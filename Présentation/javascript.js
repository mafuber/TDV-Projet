var counter;
counter = 0

function out(a) {

    a.classList.toggle("change"); /*Get the current element (this) and toggle the class between the "current" class und change (ajoute le class change apres lautre class)*/

    if ((counter % 2) == 0) {
        document.getElementById("button_next").style.right = "200px";
        document.getElementById("button_next").style.opacity = "0%";
    } else {
        document.getElementById("button_next").style.right = "0px";
        document.getElementById("button_next").style.opacity = "100%";

    }
    counter += 1
}
// demander à Jessica s'il faut effacer la fonction d'avant ou pas?

var canvas = d3.select(".Mercure").append("svg").attr("viewBox", "0 0 700 350");
function planeteswap(planeteName){
    var info = d3.json("../../Data_vis/ivandata.json", function(data) {

    
        canvas.append("image").attr("xlink:href", "../Pictures/" + planeteName + ".jpg").attr("width", "100%").attr("height", "100%");
    
        canvas.on("mouseover", function(d) {
                canvas.selectAll("text").remove()
                canvas.selectAll("image").remove()
                var texto = canvas.selectAll("text")
                    .data(data[planeteName])
                    .enter()
    
                //on n'arrivait pas à effectuer une seule formule avec l'assistant
                texto.append("text")
                    .attr("dy", "1em")
                    .text(function(d) {
                        return "Masse de la planète : " + d.mass + " x 10^(24) kg";
                    })
                texto.append("text")
                    .attr("dy", "2em")
                    .text(function(d) {
                        return "Diamètre de la planète : " + d.diameter + "km"
                    })
                texto.append("text")
                    .attr("dy", "3em")
                    .text(function(d) {
                        return "Densité de la planète : " + d.density + " g/dm^3"
                    })
                texto.append("text")
                    .attr("dy", "4em")
                    .text(function(d) {
                        return "Mesure de la gravité : " + d.gravity + " m/s^2"
                    })
                texto.append("text")
                    .attr("dy", "5em")
                    .text(function(d) {
                        return "Température moyenne : " + d.meanTemperature + " °C"
                    })
                texto.append("text")
                    .attr("dy", "6em")
                    .text(function(d) {
                        return "Longeur d'une journée : " + d.lengthOfDay + " h"
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
                    .attr("xlink:href", "../Pictures/" + planeteName + ".jpg")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .style("cursor", "")
                    .transition()
                    .duration(200)
                    .style("opacity", 1);
            })
    
    });
}

