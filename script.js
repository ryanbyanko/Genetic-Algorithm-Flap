let speed = 1;
let gravity = 0.25;
let width = 400;
let height = 350;
let gap = 110;
let between = 190;
let population = 50;
let maxMutationChance = 0.3;
let idealPercent = 0.4;
let killAll = false;

let canvas = document.getElementById("canvas");
canvas.width = width, canvas.height = height;
let ctx = canvas.getContext("2d");

let birds = [];
let deads = [];
let genNum = 1;
let score = 0;
let highScore = 0;
let obstacles = [];

function obstacle(x=0,h=0) {
    this.x = x;
    this.h = h;
    this.render = function(ctx) {
        ctx.fillRect(this.x,0,30,height-this.h);
        ctx.fillRect(this.x, height+gap-this.h,30,this.h);
    }
}

function startPopulation(size=0,dead=[]) {
    const idealSize = Math.round(size*idealPercent);
    dead.sort((a,b) => {
        if(a.score === b.score) return a.dist - b.dist;
        return b.score - a.score;
    });

    birds[0] = new bird(dead[0].brain.clone());
    document.getElementById("bestBrain").innerHTML = prettyPrint(dead[0].brain);

    for(let i=1; i<size; i++) {
        birds[i] = new bird(dead[Math.floor(Math.random()*idealSize)].brain.cross(dead[Math.floor(Math.random()*idealSize)].brain));
    }
    for(let i=1; i<size; i++) birds[i].brain.mutate(i/size*maxMutationChance);

    score = 0;
    document.getElementById("gen").innerHTML = genNum++;
    obstacles = [new obstacle(50 + between, Math.round(Math.random() * (height - gap) + gap))];
}

function frame() {
    for(let i=0; i<obstacles.length; i++) obstacles[i].x -= speed;
    if(obstacles[0].x <= -30) obstacles.shift();
    if(obstacles[obstacles.length-1].x <= (width-between)) obstacles.push(new obstacle(width, Math.round(Math.random() * (height - gap) + gap)));

    ctx.clearRect(0,0,width,height);

    for(let i=0; i<obstacles.length; i++) obstacles[i].render(ctx);
    for(let i=0; i<birds.length; i++) {
        birds[i].update(gravity, speed);
        birds[i].jump(obstacles[0].x/width, obstacles[0].h/height, speed);
        birds[i].render(ctx);
    }

    const ref = birds;
    birds = [];
    for(let i=0; i<ref.length; i++) {
        if(killAll || ref[i].dead(height, gap, obstacles[0].x, height - obstacles[0].h)) deads.push({
            brain: ref[i].brain,
            score: score,
            dist: Math.abs((ref[i].y + 10) - (height - obstacles[0].h - gap/2))
        });
        else birds.push(ref[i]);
    }
    if(birds.length === 0) {
        startPopulation(population,deads);
        deads = [];
    }

    /*ctx.fillStyle="#ff0000";
    ctx.fillRect(obstacles[0].x, height-obstacles[0].h, 30, 80);
    ctx.fillStyle="#000000";*/

    score += speed;
    killAll = false;
    highScore = Math.max(score, highScore);
    
    document.getElementById("score").innerHTML = Math.round(score);
    if(highScore === score) document.getElementById("high-score").innerHTML = Math.round(highScore);

    requestAnimationFrame(frame);
}

for(let i=0; i<population; i++) {
    birds[i] = new bird(createNetwork(4,[5,1]));
}
document.getElementById("gen").innerHTML = genNum++;
obstacles = [new obstacle(50 + between, Math.round(Math.random() * (height - gap) + gap))];
requestAnimationFrame(frame);

//HS: 204041
function updateValues() {
    document.getElementById("speed-val").innerHTML = speed = parseFloat(document.getElementById("speed").value);
    document.getElementById("gravity-val").innerHTML = gravity = parseFloat(document.getElementById("gravity").value);
    document.getElementById("gap-val").innerHTML = gap = parseFloat(document.getElementById("gap").value);
    document.getElementById("between-val").innerHTML = between = parseFloat(document.getElementById("between").value);
    document.getElementById("population-val").innerHTML = population = parseFloat(document.getElementById("population").value);
    document.getElementById("maxMutationChance-val").innerHTML = maxMutationChance = parseFloat(document.getElementById("maxMutationChance").value);
    document.getElementById("idealPercent-val").innerHTML = idealPercent = parseFloat(document.getElementById("idealPercent").value);
    document.getElementById("width-val").innerHTML = canvas.width = width = parseFloat(document.getElementById("width").value);
    document.getElementById("height-val").innerHTML = canvas.height = height = parseFloat(document.getElementById("height").value);
}