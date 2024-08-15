class Note {
    constructor(noteNumber = 0, time = 0, duration = 0, index = 0) {
        this.noteNumber = noteNumber
        this.time = time
        this.duration = duration
        this.index = index
        this.pressed = false
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            (this.noteNumber - boundary[0]) * keyWidth,
            (tick - this.time) + (canvas.height - this.duration / 4 - keyHeight),
            keyWidth,
            this.duration / 4
        );
        if (this.time < tick && !this.pressed) {
            this.pressed = true
            paused = [true, this.noteNumber]
            class FakeEvent {
                constructor(n, pressed = true) {
                    let canvasRect = canvas.getBoundingClientRect()
                    this.buttons = pressed
                    this.clientX = (n - boundary[0]) * keyWidth + canvasRect.x
                    this.clientY = canvas.height - keyHeight + canvasRect.y
                }
            }

            //pressKeyMouse(new FakeEvent(this.noteNumber))
            //pressKeyMouse(new FakeEvent(this.noteNumber, false))
        }
    }
}

