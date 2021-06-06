const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

const colours = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(173,216,230,0.8)',
    'rgba(211,211,211,0.8)'
];

const maxSize = 40;
const minSize =0;
const mauseRadius = 60;

// Mouse position 
let mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// create constructor function for particle
function Particle(x, y, directionX, directionY, size, colour) {
    this.x = x;
    this.y = y;
    this.dirextionX =directionX;
    this.dirextionY = directionY;
    this.size = size;
    this.colour = colour;
}

// Draw method
Particle.prototype.draw = function (){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.colour;
    ctx.fill();
}

// add update method to particle prototype
Particle.prototype.update = function() {
    if(this.x + this.size*2 > canvas.width ||
        this.x -this.size*2 < 0) {
            this.dirextionX = -this.dirextionX;
        }
    if(this.y + this.size*2 > canvas.height ||
        this.y -this.size*2 < 0) {
            this.dirextionY = -this.dirextionY;
        }
    
    this.x += this.dirextionX;
    this.y += this.dirextionY;
    
    // mouse interactivity
    if (mouse.x - this.x < mauseRadius &&
        mouse.x - this.x > -mauseRadius &&
        mouse.y - this.y < mauseRadius &&
        mouse.y - this.y > -mauseRadius) {
            if(this.size < maxSize){
                this.size += 5;
            } else if (this.size > minSize){
                this.size -= 1;
            }
            if (this.size < 0){
                this.size = 0;
            }
            this.draw();
        }   
}

// Create particle array
function init(){
    particleArray = [];
    for(let i=0; i < 1000; i++){
        let size =0;
        let x = (Math.random() * ((innerWidth - size*2) - (size*2)) + size *2);
        let y = (Math.random() * ((innerHeight - size*2) - (size*2)) + size *2);
        let directionX = (Math.random() * .2) - 0.1;
        let directionY = (Math.random() * .2) - 0.1;
        let colour = colours[Math.floor(Math.random() * colours.length)];

        particleArray.push(new Particle(
            x,
            y,
            directionX,
            directionY,
            size,
            colour
        ));
        console.log(particleArray);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i =0;i < particleArray.length; i++ ){
        particleArray[i].update();
        particleArray[i].draw();
    }
}

init();
animate();

// resize event
window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// remove mouse position peridically 
setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);