const configForm = document.getElementById('config');
const boundary = [];
let configured = false
let keyCount = undefined;
const keyBufferTime = 1
const keyMaxTime = 0.5
configForm.addEventListener("submit", e => onSelected(e));
document.body.addEventListener("mousedown", pressKeyMouse)
document.body.addEventListener("mouseup", pressKeyMouse)
document.body.addEventListener("mousemove", slideKeyMouse)

let displacement = 2
const displacementInput = document.getElementById("displacement")
const displacementOutput = document.querySelector("output[for='displacement']")
displacementInput.addEventListener("input", updateDisplacement)
updateDisplacement()

function updateDisplacement() {
    displacement = displacementInput.valueAsNumber
    displacementOutput.textContent = displacement.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const mousePressedKey = {"pressed": false, "key": -1}
const keysPressed = {};
const notes = [];
let tick = 0;
let tempo = 0;
let paused = [false, -1];
var mouseDown = 0;

function getFreq(midiNumber) {
    // http://www.phys.unsw.edu.au/jw/notes.html
    let firstPart = (midiNumber - 69) / 12
    let result = Math.pow(2, firstPart) * 440
    return result
}
function slideKeyMouse(e) {
    if (!mousePressedKey["pressed"]) return;
    if (boundary.length !== 2) return;
    let canvasRect = canvas.getBoundingClientRect()
    let x = e.clientX - canvasRect.x

    let key = Math.floor(x / keyWidth) + boundary[0]
    if (key < boundary[0] || key >= boundary[1]) return;
    if (key == mousePressedKey["key"]) return;

    const now = Tone.now();

    
    synth.triggerRelease(now);
    keyoff(mousePressedKey["key"])
    
    mousePressedKey["key"] = key
    mousePressedKey["pressed"] = true

    synth.triggerAttack(getFreq(key), now);
    keyon(key)
}
function pressKeyMouse(e) {
    let press = e.buttons
    if (boundary.length !== 2) return;
    
    const now = Tone.now();
    if (press) {
        let canvasRect = canvas.getBoundingClientRect()
        let x = e.clientX - canvasRect.x
        let y = e.clientY - canvasRect.y
        
        if (y < canvas.height - keyHeight) return

        let key = Math.floor(x / keyWidth) + boundary[0]
        if (key < boundary[0] || key > boundary[1]) return;
        try {
            
            synth.triggerAttack(getFreq(key), now);
        } catch (_) {

        }
        keyon(key)
        mousePressedKey["key"] = key
        mousePressedKey["pressed"] = true
    }
    else {
        let key = mousePressedKey["key"]
        mousePressedKey["pressed"] = false
        try {
            synth.triggerRelease(now + 0.2);
        } catch (_) {
            
        }
            
        keyoff(key)
    }
}

const midiOptions = document.getElementById("input")

WebMidi
    .enable()
    .then(webMidiEnabled)
    .catch(err => alert(err));

function webMidiEnabled() {
    WebMidi.inputs.forEach((device, index) => {
        setTimeout(() => {
            midiOptions.selectedIndex = index + 1
        }, 100)

        midiOptions.innerHTML += `<option value="${index}">${device.name}</option>`;
    });
};

function onSelected(e) {
    e.preventDefault();
    Tone.start()
    let file = e.target[1]
    getMidiFileData(file);
    
    const selected = midiOptions.selectedIndex - 1;

    if (selected == -1) {
        alert('Using touch controls.');
        configKeyRange(36)
        configKeyRange(96)
        return
    }

    alert('Please press the lowest key of your keyboard and then the highest.');
    //config(36)
    //config(96)
    const Input = WebMidi.inputs[selected];
    Input.addListener("noteon", e => keyon(e));
    Input.addListener("noteoff", e => keyoff(e));
};


async function getMidiFileData(input) {
    const file = input.files[0];
    if (file.type !== 'audio/midi' && file.type !== 'audio/mid') return
    const fileBytes = await file.bytes()
    const midi = new Midi(fileBytes);
    tempo = midi.header.ppq
    midi.tracks.forEach(track => {
        track.notes.forEach(note => {
            const noteNumber = note.midi
            const time = note.ticks
            const duration = note.durationTicks
            notes.push(new Note(noteNumber, time, duration, notes.length))
        });
    });
};

function configKeyRange(key) {
    if (boundary.length >= 2) return false;
    boundary.push(key);
    if (boundary.length === 2) {
        doneConfig();
    };
    return true
};

function sortTwo(arr) {
    let temp = Math.min(arr[0], arr[1])
    arr[0] = temp
    arr[1] = Math.max(arr[0], arr[1])
}

function doneConfig() {
    sortTwo(boundary);
    boundary[1] += 1;

    keyCount = boundary[1] - boundary[0];
    for (let i = boundary[0]; i < boundary[1]; i++) {
        keysPressed[i] = {"pressed": false, "time": 0, "buffer": 0}
    }
    alert(`Done configuring!\nPiano keys: ${boundary[0]} - ${boundary[1]} (${keyCount})`);
    document.getElementById('config').remove();
    updateKeys();
    configured = true
    window.requestAnimationFrame(loop);
};

function keyon(e) {
    let note = undefined
    if (typeof e == "object")
        note = e.note.number
    else note = e
    
    if (!configured) {
        configKeyRange(note);
        return
    }
    
    if (note < boundary[0] || note > boundary[1]) return;

    keysPressed[note]["buffer"] = keyBufferTime
    keysPressed[note]["pressed"] = true;

};

function keyoff(e) {
    if (!configured) return;

    let note = undefined
    if (typeof e == "object")
        note = e.note.number
    else note = e

    if (note < boundary[0] || note > boundary[1]) return;


    keysPressed[note]["pressed"] = false;
    keysPressed[note]["time"] = 0
    drawKey(note, false);
};

// ------------------------Canvas------------------------\\
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let keyWidth = 0;
let keyHeight = 0;
canvas.style.background = '#333';

function updateKeys() {
    for (let i = boundary[0]; i < boundary[1]; i++) {
        let pressed = keysPressed[i]["pressed"]
        let time = keysPressed[i]["time"]
        let buffer = keysPressed[i]["buffer"]

        keysPressed[i]["buffer"] -= 0.065
        if (keysPressed[i]["buffer"] <= 0)
            keysPressed[i]["buffer"] = 0
        if (pressed)
            keysPressed[i]["time"] += 0.065

        if (i == paused[1] && ((time > 0 && time <= keyMaxTime) || buffer > 0))
            paused = [false, -1]
        
    
        drawKey(i, pressed || buffer > 0 + time > keyMaxTime);
    };
};

function drawKey(n, pressed) {
    keyWidth = canvas.width / keyCount;
    keyHeight = keyWidth * 3
    switch (n % 12) {
        // Black Keys
        case 1: case 3: case 6: case 8: case 10:
            ctx.fillStyle = `hsl(0, 0%, ${8 + pressed * 40}%)`;
        break;
        
        // White keys
        default:
            ctx.fillStyle = `hsl(0, 0%, ${100 - pressed * 40}%)`;
        break;
    };
    ctx.fillRect((n - boundary[0]) * keyWidth, canvas.height - keyHeight, keyWidth, keyHeight);
};

// draw

function drawNote() {
    notes.forEach(note => {
        note.draw();
    });
};

let lastMs = Date.now()
function loop() {
    let currMs = Date.now()
    lastMs - Date.now()
    let delta = (currMs - lastMs) / 1000
    lastMs = currMs
    
    if (!paused[0]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawNote();
        tick += tempo / (35.2 * displacement)
    }
    ctx.clearRect(0, canvas.height - keyHeight, canvas.width, canvas.height)
    updateKeys();
    window.requestAnimationFrame(loop);
};

const synth = new Tone.Synth().toDestination();
