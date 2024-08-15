const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d", {willReadFrequently: true})

let imgdata = undefined//new ImageData()
let pixels = []

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels = imgdata.data;
}
window.onresize()


class Radial {
    constructor(x, y, r = 720) {
        this.x = x? x:Math.random() * canvas.width
        this.y = y? x:Math.random() * canvas.height
        this.r = r
        this.angle = 0
    }
    update() {
        this.x += Math.cos(this.angle) * 2
        this.y += Math.sin(this.angle) * 2
        this.angle += (Math.random() * 2) - 1
        this.x %= canvas.width
        this.y %= canvas.height
    }
}

const radials = new Array(3).fill().map(() => new Radial());




let t = 0
let m = 80
let b = 0

window.requestAnimationFrame(draw)
function draw() {
    t += 0.25
    b = (Math.sin(t / 25) + 0.8) / 2 + 0.4

    let i = 0;
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            pixels[i + 0] = 0
            pixels[i + 1] = 0
            pixels[i + 2] = 0

            if (x % 15 < 15){
                let z = 40
                let v = (126 + (Math.sin((y+x + t) / z) * 126)) * b
                let rv = Math.round(v / m) * m
                pixels[i + 0] = rv
                pixels[i + 1] = rv
                pixels[i + 2] = rv
            }
            else if (y % 50 < 15){}
            else
                pixels[i + 2] = Math.abs(Math.sin((x + y - u) / 4) * 100)

            // let col = Math.max(pixels[i + 0], pixels[i + 1], pixels[i + 2])
            // pixels[i + 0] = col
            // pixels[i + 1] = col
            // pixels[i + 2] = col

            pixels[i + 3] = 255

            i += 4
        }
    }

    ctx.putImageData(imgdata, 0, 0)

    window.requestAnimationFrame(draw)
}