const canvas = document.querySelector("canvas")
const titleCard = document.getElementById("titleCard")
const ctx = canvas.getContext("2d", {willReadFrequently: true})

let keyCount = 61.0
let keyWidth = 21.0 + 1.0 / 3.0;
let keyHeight = keyWidth * 3.0;

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    titleCard.style.translate = `0px -${keyHeight / 2.0}px`
}
window.onresize()

window.requestAnimationFrame(draw)
function draw() {
    for (let i = 0; i < keyCount; i++) {
        drawKey(i);
    };
    window.requestAnimationFrame(draw)
}

function drawKey(n) {
    switch (n % 12) {
        // Black Keys
        case 1: case 3: case 6: case 8: case 10:
            ctx.fillStyle = `hsl(0, 0%, 8%)`;
        break;
        
        // White keys
        default:
            ctx.fillStyle = `hsl(0, 0%, 100%)`;
        break;
    };
    ctx.fillRect(n * keyWidth, canvas.height - keyHeight, keyWidth, keyHeight);
};