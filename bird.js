function bird(brain) {
    this.y = 50;
    this.s = 0;
    this.brain = brain;
    this.update = function(gravity=0,speed=0) {
        /*this.s += gravity;
        this.y += this.s;*/
        this.y += this.s * speed + (gravity/2) * speed * speed;
        this.s += gravity * speed;
    }
    this.jump = function(nextX=0,nextY=0,speed=0) {
        if(this.brain.activate([
            this.y/height, (this.s + 5)/20,
            nextX, nextY
        ])[0] > 0.5) {
            // jump
            this.s = -5;
        }
    }
    this.render = function(ctx) {
        ctx.fillRect(50, this.y, 20, 20);
    }
    this.dead = function(height=0,gap=0,nextX=0,nextY=0) {
        return (this.y <= 0 || this.y + 20 >= height) || (50 < nextX + 30 && 70 > nextX && (this.y < nextY || this.y + 20 > nextY + gap));
    }
}

/*
function bird() {
    this.y = 50;
    this.s = 0;
    this.update = function() {
        this.s += gravity;
        this.y += this.s;
    }
    this.jump = function(jump=false) {
        if(jump) this.s = -5;
    }
    this.render = function(ctx) {
        ctx.fillRect(50, this.y, 20, 20);
        ctx.fillText(this.s.toFixed(2),0,20);
    }
    this.dead = function() {
        return this.y <= 0 || this.y + 20 >= height;
    }
}
*/