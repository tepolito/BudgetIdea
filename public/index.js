$(function () {

        var socket = io(); 

        $('#save').on('click', function (e)
        {
          let val = $('#userName').text();
          console.log(`val is ${val}`);

          var data = {'name':val};

          console.log(data); 

          $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '',             
            success: function(data) 
            {
              console.log('success');
              console.log(JSON.stringify(data));
            }
          });
        })

        let attackTime = 0;
        let releaseTime =0;
        let recording = false;
        let loop = false;

        

        var piano = new Tone.Sampler({
            'A0' : 'A0.[mp3|ogg]',
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
        // GUI //
        var keyboard = Interface.Keyboard();

        $('#loop').on('click', function()
        {
           loop = !loop;
           console.log('loop is' + loop);

           $(this).toggleClass('loopOn');

           setTimeout(function()
           {
              loop = !loop;
              console.log('loop is now ' + loop);

              $('#loop').toggleClass('loopOn');
           },2000);

           if(loop)
           {
            int = startInterval();
           }
           

        })

        keyboard.keyDown = function (note) 
        {
          let key = {note:note};
          socket.emit("keydown", key);
          

        };
        socket.on("keydown", function(key)
        {
          console.log(key);
          
          if(recording)
          {
            let time = Date.now() - attackTime;
            record_array.push({note: key.note, attack: time})
            attackTime = Date.now();
            console.log(record_array);
          }

          console.log(loop);
          if(loop && !key.inLoop)
          {
            let time = Date.now() - attackTime;
            looparr.push({note: key.note, attack: time, inLoop: true})
            attackTime = Date.now();
          }
          

          piano.triggerAttack(key.note);
        })
            
        keyboard.keyUp = function (note) 
        {
          let key = {note:note}
          socket.emit("keyup", key); 
            
        };

        socket.on("keyup", function(key)
        {
          console.log(key);
          if(recording)
          {
            let time = Date.now() - attackTime;
            record_array.push({note: key.note, release: time})
            releaseTime = Date.now();
            console.log(record_array);
          }

          if(loop && !key.inLoop)
          {
            let time = Date.now() - attackTime;
            looparr.push({note: key.note, release: time, inLoop: true})
            releaseTime = Date.now();
          }

          piano.triggerRelease(key.note);
        })
        Interface.Loader();


        /*setInterval(function()
        {
          piano.triggerAttack('A0');
        },500)*/

        //var h1 = document.getElementsByTagName('h1')[0],
        startRec = document.getElementById('start'),
        stopRec = document.getElementById('stop'),
        //clear = document.getElementById('clear'),
        save = document.getElementById('saveRecord'),
        recordedSongs = document.getElementById('recordedSongs')
        /*seconds = 0, minutes = 0, hours = 0,
        t;*/
        var record_array = [/*{note: 'C8', attack: 1000}, {note: 'A0', attack: 5000}, {note: 'A2', attack: 2500}*/];
        var looparr = [{note: 'C8', attack: 100, inLoop:true}, {note: 'C8', release: 100, inLoop:true} /*{note: 'A0', attack: 500}, {note: 'A2', attack: 250}*/];
        var allTimeouts = [];

        function playLoop(loop_array)
        {
             //console.log(loop_array);
             if(loop_array.length > 0)
             { 
              //console.log('in playrecord record-array is ' + record_array + 'the length is ' + record_array.length);
             let loops = loop_array.shift();
             //console.log('in playrecord record is ' + record);

             let t = setTimeout(function ()
               {
                  socket.emit('keydown', loops);
                  //piano.triggerRelease(record.note);
                  console.log('playloop running', loops);
                  playLoop(loop_array);

                    let r = setTimeout(function ()
                    {
                      socket.emit('keyup', loops);
                    //piano.triggerRelease(record.note);
                    
                    }, loops.release);
                    allTimeouts.push(r)

              }, loops.attack);
             allTimeouts.push(t)

             
            }
        }

        function playRecord(record_array)
        {
             console.log(record_array);
             if(record_array.length > 0)
             { 
              //console.log('in playrecord record-array is ' + record_array + 'the length is ' + record_array.length);
             let record = record_array.shift();
             //console.log('in playrecord record is ' + record);

             setTimeout(function ()
               {
                  piano.triggerAttack(record.note);
                  //piano.triggerRelease(record.note);
                  console.log(record);
                  playRecord(record_array);
              }, record.attack);
            }
        }

        playRecord(record_array);

        function startInterval()
        {
          attackTime = Date.now();
          releaseTime = Date.now();

          return setInterval(function()
          {
            console.log('somtehitn', looparr)
            window.looparr = looparr;
            let loop_array = looparr.slice();

            playLoop(loop_array);
          }, 2000);
          
        }

        var int = startInterval();
        console.log(int);

        $('#clearLoop').on('click', function (e)
        {
          clearInterval(int);
          console.log('looparr befor empty');
          console.log(looparr);
          looparr = [];
          allTimeouts.forEach(timeout =>
          {
            clearTimeout(timeout);
          })
          //int = startInterval();
          console.log(int);
        })

        /*function add() 
        {
          seconds++;
          if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
              minutes = 0;
              hours++;
            }
          }

          h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

          timer();
        }
        function timer() 
        {
          t = setTimeout(add, 1000);    
        }
        timer();*/


        /* Start button */
        startRec.onclick = function()
        {
          recording = true;
          attackTime = Date.now();
          releaseTime = Date.now();
          /*seconds = 0;
          minutes = 0 ;
          hours = 0;
          timer();*/

          record_array = [];
        }

        /* Stop button */
        stopRec.onclick = function() 
        {
          //clearTimeout(t);
          recording = false;
        }

        /* Clear button */
        /*clear.onclick = function() 
        {
          h1.textContent = "00:00:00";
          recording = false;
        }*/
    
        save.onclick = function()
        {
          //console.log('something', record_array);

         // clearTimeout(t);

          songname = $('.songTitle').val();
          console.log(songname, typeof songname);

          if(songname !== '')
          {
            $.ajax(
            {
              type: 'POST',
              data: JSON.stringify({songname: songname, song: record_array}),
              contentType: 'application/json',
              url: '/saveRecord',             
              success: function(data) 
              {
                console.log('success');
                console.log(JSON.stringify(data));
              }
            });
          }
          else
            {
              alert('enter a song name!!');
            }

            
        }

        $('.songBox').on('click', '.playButton', function (e)
        {
          console.log(this);

          console.log($(this).siblings('.span-song'));

          newSong = JSON.parse($(this).siblings('.span-song').text());

          record_array = [];
          record_array = newSong;

          console.log(record_array);

          playRecord(record_array);
        })

        


      });