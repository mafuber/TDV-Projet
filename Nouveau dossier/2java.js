var sys = { x: 500, y: 350 };

function setup() {
    createCanvas(sys.x * 2, sys.y * 2);
}

function star(dist, color, radius) {
    this.render = function () {
        resetMatrix();
        translate(sys.x, sys.y);
            translate(dist, 0)
        fill(color.r, color.g, color.b)
        circle(0, 0, radius);
    }
}

var sun = new star(0, { r: 255, g: 255, b: 0 }, 50);

var earth = new star(100, { r: 0, g: 200, b: 100 }, 20);

function draw() {
    background(70)
    sun.render();
    earth.render();
}