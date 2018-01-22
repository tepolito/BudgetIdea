function piano()
{
  var loopPiano; //the interval
var playback = [] //the notes
var recordToLoop = false;  //determines
var loopTimePiano = 0; 
var loopTimeIntPiano; 
//Start & Stop loop 
$('#piano #loopPiano').click(function(){ startLoop() })
//$('#pause-loop').click(function(){ pauseLoop() })
$('#piano #clear-loopPiano').click(function(){ clearLoop() })
function incrementLoopTime(){
  loopTimeIntPiano = setInterval(function(){
    loopTimePiano+=10;
    //console.log(`piano loop time ${loopTimePiano}`);
    $('#loopTimePiano').text(loopTimePiano)   
  },10) 
}
function startLoop(){
  clearLoop() 
  recordToLoop = true;
  incrementLoopTime();
  loopPiano = setInterval(function(){
    console.log('play')
    playLoop(); 
    loopTimePiano = 0;
  },2000)
}
function playLoop(){
  playback.forEach(function(sound){
    setTimeout(function(s){
      console.log(sound);
      //new Audio(`./drumkit/${sound.key}.ogg`).play()
      
      if(sound.attack)  //sdf
      {
        piano.triggerAttack(sound.key);
        $('.visualizer').css({'width':sound.time+'px'});
      }
      else
      {
        piano.triggerRelease(sound.key);
        $('.visualizer').css({'width':50+'px'});
      }

    }, sound.time)    
    
  })
}

function clearLoop()
{
  clearInterval(loopPiano) 
  clearInterval(loopTimeIntPiano) 
  recordToLoop = false;
  playback = []; 
  loopTimePiano = 0; 
}

/*$('.sounds button').click(function()
{
  console.log(this.name);
  let sound = this.name;  
  new Audio(`./drumkit/${sound}.ogg`).play()
  if(recordToLoop){
    playback.push({
      'key':sound,
      'attack': loopTime 
    })
  }
  
  
})*/
/*
//Add to playback 
$(window).keydown(function(e){
  if(recordToLoop){
    console.log('keydown', String.fromCharCode( e.which ));
    playback.push({
      'key':String.fromCharCode( e.which ),
      'attack': loopTime 
    })
  }
});
$(window).keyup(function(e){
  if(recordToLoop){
    console.log('keyup', String.fromCharCode( e.which ));
    playback.push({
      'key':String.fromCharCode( e.which ),
      'release': loopTime
    })    
  }
});
*/
/*
function pauseLoop(){
  clearInterval(loop) 
  clearInterval(loopTimeInt)  
  recordToLoop = false; 
}*/

var piano = new Tone.Sampler({
            'C6' : 'C6.[mp3|ogg]',
            'C1' : 'C1.[mp3|ogg]',
            'D#1' : 'Ds1.[mp3|ogg]',
            'F#1' : 'Fs1.[mp3|ogg]',
            'A1' : 'A1.[mp3|ogg]',
            'C2' : 'C2.[mp3|ogg]',
            'D#2' : 'Ds2.[mp3|ogg]',
            'F#2' : 'Fs2.[mp3|ogg]',
            'A2' : 'A2.[mp3|ogg]',
            'C3' : 'C3.[mp3|ogg]',
            'D#3' : 'Ds3.[mp3|ogg]',
            'F#3' : 'Fs3.[mp3|ogg]',
            'A3' : 'A3.[mp3|ogg]',
            'C4' : 'C4.[mp3|ogg]',
            'D#4' : 'Ds4.[mp3|ogg]',
            'F#4' : 'Fs4.[mp3|ogg]',
            'A4' : 'A4.[mp3|ogg]',
            'C5' : 'C5.[mp3|ogg]',
            'D#5' : 'Ds5.[mp3|ogg]',
            'F#5' : 'Fs5.[mp3|ogg]',
            'A5' : 'A5.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'D#6' : 'Ds6.[mp3|ogg]',
            'F#6' : 'Fs6.[mp3|ogg]',
            'A6' : 'A6.[mp3|ogg]',
            'C7' : 'C7.[mp3|ogg]',
            'D#7' : 'Ds7.[mp3|ogg]',
            'F#7' : 'Fs7.[mp3|ogg]',
            'A7' : 'A7.[mp3|ogg]',
            'C8' : 'C8.[mp3|ogg]'
        }, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'
        }).toMaster();

 /*var piano = new Tone.Sampler({
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
        }, {
            'release' : 1,
            'baseUrl' : './audio/guitar/'
        }).toMaster();
        // GUI //*/
        var keyboard = Interface.Keyboard();



        keyboard.keyDown = function (note)
        {
          piano.triggerAttackRelease(note, "8n");
          console.log(note);
          if(recordToLoop){
            playback.push({
              'key':note,
              'time': loopTimePiano,
              'attack': true 
            })
          }
          demo.setup(mouseX,mouseY);
        };

        var mouseX, mouseY;
        $(document).on('mouseover', function(e) {
          mouseX = e.pageX;
          mouseY = e.pageY;
          demo.spawn(mouseX,mouseY);
          console.log(mouseX);
        }).mouseover();

        keyboard.keyUp = function (note) 
        {
          console.log('triggerRelease fired')
          //piano.triggerRelease(note);
          if(recordToLoop){
            playback.push({
              'key':note,
              'time': loopTimePiano,
              'attack': false 
            })
        };
      }

        Interface.Loader();


};


$(document).ready(function(){
  piano();
  piano2();
});




function piano2()
{
  var loop; //the interval
var playback = [] //the notes
var recordToLoop = false;  //determines
var loopTime = 0; 
var loopTimeInt; 
//Start & Stop loop 
$('#loopDrums').click(function(){ startLoop() })
//$('#pause-loop').click(function(){ pauseLoop() })
$('#clear-loopDrums').click(function(){ clearLoop() })
function incrementLoopTime(){
  loopTimeInt = setInterval(function(){
    loopTime+=10;
    console.log(loopTime)
    $('#loopTimeDrums').text(loopTime)   
  },10) 
}
function startLoop(){
  clearLoop() 
  recordToLoop = true;
  incrementLoopTime();
  loop = setInterval(function(){
    console.log('play')
    playLoop(); 
    loopTime = 0;
  },2000)
}
function playLoop(){
  playback.forEach(function(sound){
    setTimeout(function(s){
      console.log(sound);
      new Audio(`./drumkit/${sound.key}.ogg`).play()

    }, sound.attack)    
    
  })
}

function clearLoop()
{
  clearInterval(loop) 
  clearInterval(loopTimeInt) 
  recordToLoop = false; 
  playback = []; 
  loopTime = 0; 
}

$('#soundsDrums button').click(function()
{
  console.log(this.name);
  let sound = this.name;  
  new Audio(`./drumkit/${sound}.ogg`).play()
  if(recordToLoop){
    playback.push({
      'key':sound,
      'attack': loopTime 
    })
  }
  
  
})

};
