import AudioRecorder from './audiorecorder.js';
import { saveAs } from './node_modules/file-saver/FileSaver.js';
 
let ctx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
const audioRecorder = new AudioRecorder(ctx);
navigator.getUserMedia({ audio: true }, (e) => {
    let audioInput    = ctx.createMediaStreamSource(e);
    audioInput.connect(audioRecorder.node);
    audioRecorder.node.connect(ctx.destination);
    
    setTimeout(() => {
        audioRecorder.stop();
 
        let recorded = audioRecorder.exportWaveBlob();
        saveAs(recorded, 'recorded.wav');
    }, 5000);
 
 
}, (e) => {
    console.log('error');
});

function audioStart(){
    audioRecorder.start();
};

function audioStop(){
    audioRecorder.stop();
};

document.getElementById('start').addEventListener('click', (event)=>{
    audioStart();
});

document.getElementById('stop').addEventListener('click', (event) => {
    audioStop();
})


export default audioRecorder;