let hh, snare2, kick808, midBassSeq, trumpet, subBass; //Instrument. serve as container that holds a sound source
let hhPat, snarePat, kick808Pat, midBassSeqPat, trumpetPat, subBassPat; //Instrument Pattern. array of numbers we can manipulate to make beats
let hPhrase, sPhrase, kPhrase, midBassSeqPhrase, trumpetPhrase, subBassPhrase; //Instrument Phrase. defines how the instrument pattern is interpreted.
let drums; //Part. we will attach the phrase to the part, which will serve as our transport to drive the phrase
let bpmCTRL;
let beatLength;
let cellWidth;
let canvas;
let sequncerPattern;
let cursorPos;

function touchStarted() {
  // console.log("The sequencer sounds have been gestured!!!!!!!!!!!!!!!!")
  getAudioContext().resume()
}

function setup() {
  canvas = createCanvas(360, 140);
  canvas.mousePressed(canvasPressed);
  beatLength = 16;
  cellWidth = width/beatLength;
  cursorPos = 0;

  
  kick808 = loadSound('assets/808kick.wav', () => {});
  // kick808 = playKick();
  snare2 = loadSound('assets/Snare.wav', () => {});
  // snare2 = playSnare();
  hh = loadSound('assets/hat.wav', () => {});
  // hh = playHiHat();
  midBassSeq = loadSound('assets/133100__klankbeeld__horror-ambience-10.wav', () => {});
  // midBassSeq = playChirp();
  trumpet = loadSound('assets/Orch_hit_4.mp3', () => {});
  // trumpet = playTrump();
  subBass = loadSound('assets/410149__screamstudio__kick-drum.wav', () => {});
  // subBass = playLowBass();


  // kick808 = loadSound('assets/808kick.wav', () => {});
  // snare2 = loadSound('assets/Snare.wav', () => {});
  // hh = loadSound("assets/hat.wav");
  // shaker = loadSound('assets/shaker.wav', () => {});
  // oh = loadSound('assets/oh.wav', () => {});
  // fx = loadSound('assets/fx.mp3', () => {});

    
kick808Pat= [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1 , 0];
snarePat= [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
hhPat= [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
midBassSeqPat= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
trumpetPat= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0];
subBassPat= [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0];
  
sequencerPattern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  kPhrase = new p5.Phrase('kick808', (time) => {
    kick808.play(time)
  }, kick808Pat);
  sPhrase = new p5.Phrase('snare2', (time) => {
    snare2.play(time)
  }, snarePat);
  hPhrase = new p5.Phrase('hh', (time) => {
    hh.play(time)
  }, hhPat);
    midBassSeqPhrase = new p5.Phrase('midBassSeq', (time) => {
    midBassSeq.play(time)
  }, midBassSeqPat);
    trumpetPhrase = new p5.Phrase('trumpet', (time) => {
    trumpet.play(time)
  }, trumpetPat);
    subBassPhrase = new p5.Phrase('subBass', (time) => {
    subBass.play(time)
  }, subBassPat);

  drums = new p5.Part();

  drums.addPhrase(kPhrase);
  drums.addPhrase(sPhrase);
  drums.addPhrase(hPhrase);
  drums.addPhrase(midBassSeqPhrase);
  drums.addPhrase(trumpetPhrase);
  drums.addPhrase(subBassPhrase);
  drums.addPhrase('seq', sequence, sequencerPattern);
 
  bpmCTRL = createSlider(30, 600, 80, 1);
  bpmCTRL.position("fixed", 500, 500); //Placement of slider
  bpmCTRL.input(() => {drums.setBPM(bpmCTRL.value())});
  drums.setBPM('77');
  
  drawMatrix();
}  
// const button1 = document.querySelector(".js-restart");
// button1.addEventListener("click", ()=> {
//   drums.loop();
//   // drums.pause();
// })
// const button2 = document.querySelector(".js-stop");
// button2.addEventListener("click", ()=> {
//   drums.stop();
// })

function keyPressed() {
  if (key === " ") {
    if (hh.isLoaded() && snare2.isLoaded() && kick808.isLoaded() && midBassSeq.isLoaded() && trumpet.isLoaded() && subBass.isLoaded()) {
      if (!drums.isPlaying) { 
        drums.metro.metroTicks = 0; //makes animator start over at beginning after pressing spacebar
      drums.loop();
      // console.log('hey the drums')
      // drums.resume();
      } else {
        drums.pause();
      }
    } else {
         console.log('oops, be patient as the drums load...');
    }
  }
}

function canvasPressed() {
  let rowClicked = floor(6 * mouseY/height);
  let indexClicked = floor(16 * mouseX / width);
  
  if (rowClicked === 0) {
    console.log('first row' + indexClicked);
    hhPat[indexClicked] = +!hhPat[indexClicked];
  } else if (rowClicked === 1) {
    console.log('second row' + indexClicked);
    snarePat[indexClicked] = +!snarePat[indexClicked];
  } else if (rowClicked === 2) {
    console.log('third row' + indexClicked);
    kick808Pat[indexClicked] = +!kick808Pat[indexClicked];
  } else if (rowClicked === 3) {
    console.log('fourth row' + indexClicked);
    midBassSeqPat[indexClicked] = +!midBassSeqPat[indexClicked];
  } else if (rowClicked === 4) {
    console.log('fifth row' + indexClicked);
    trumpetPat[indexClicked] = +!trumpetPat[indexClicked];
  } else if (rowClicked === 5) {
    console.log('sixth row' + indexClicked);
    subBassPat[indexClicked] = +!subBassPat[indexClicked];
  }
  drawMatrix();
}

function drawMatrix(){
    background(100);
    stroke("LightGreen"); //Changes color of grid
    strokeWeight(4.2); //Changes size of boxes inside grid
    fill("red"); //Color of dot inside of box in
   
    for (let i = 0; i< beatLength+1; i++){
        line(i*cellWidth, 0, i* cellWidth, height);
    }
    for (let i =0; i< 7 ; i++){
        line(0, i*height/6, width, i*height/6);
    }
    
    noStroke();
    for (let i =0; i < beatLength; i++) {
        if(hhPat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/12, 10);
    }
        if(snarePat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/4, 10);
    }
        if(kick808Pat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/2.5, 10);
    }
        if(midBassSeqPat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/1.7, 10);
    }
        if(trumpetPat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/1.35, 10);
    }
        if(subBassPat[i] === 1) {
    ellipse(i*cellWidth +0.5*cellWidth, height/1.1, 10);
    }
  }
}

function sequence(time, beatIndex) {
  // console.log(beatIndex);
  setTimeout(() => {
  drawMatrix();
  drawPlayhead(beatIndex);  
  }, time*1000); //time is in units of seconds
}

function drawPlayhead(beatIndex) {
  stroke('rgba(131, 11, 39, 0.461)'); //changes color of moving column
  fill(255, 0, 0, 30); //fourth value transparency
  rect((beatIndex-1) * cellWidth, 0, cellWidth, height);
}

// function windowResized(){
//   console.log("hello world");
//   resizeCanvas(windowHeight, windowWidth);
  
// }
const button1 = document.querySelector(".js-restart");
button1.addEventListener("click", ()=> {
    drums.loop();
  // drums.pause();
})
button1.addEventListener("touchstart", ()=> {
    drums.loop();
    // drums.pause();
  })
const button2 = document.querySelector(".js-stop");
button2.addEventListener("click", ()=> {
  drums.stop();
})
button2.addEventListener("touchstart", ()=> {
    drums.stop();
  })