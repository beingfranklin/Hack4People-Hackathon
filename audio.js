import AudioRecorder from 'audiorecorder';
import { saveAs } from 'filesaver.js';
 
let ctx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
audioRecorder = new AudioRecorder(ctx);
navigator.getUserMedia({ audio: true }, (e) => {
    let audioInput    = ctx.createMediaStreamSource(e);
        
 
    audioInput.connect(audioRecorder.node);
    audioRecorder.node.connect(ctx.destination);
    
    
    
    
 

    setTimeout(() => {
        audioRecorder.stop();
 
        let recorded = audioRecorder.exportWavBlob();
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


  module.exports = audioStart;