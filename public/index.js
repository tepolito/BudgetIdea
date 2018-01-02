$(function () {

  //var User = require('../app/models/user');

  const USER = {id: randomNumberGen(0, 99999999), score:0};
  var SCORE_LIMIT;

  $('.start-info').hide();

        var socket = io(); 
        $('form').submit(function()
        {
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });

        socket.on('chat message', function(msg)
        {
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });

        $(window).on('mousemove', function (e)
        {
        	
        	socket.emit('mouse location', [e.clientX, e.clientY]); //sending it to server 
        })

        socket.on('mouse location', function (mPos) // get from server
        {
        	//console.log(mPos[0], mPos[1]);
        })

        function gameStarter()
        {
            $('.score-limit-form').submit(function (e)
            {
              e.preventDefault();

             slimit = $(e.currentTarget).find('.score-limit-text').val();

             SCORE_LIMIT = slimit;

              console.log(`we are playing till ${SCORE_LIMIT}`);

              $('.game-stuff').show();
              $('.start-info').hide();

            })
        }

        //gameStarter();

        function boxWatcher()
        {
            $('.box').on('click', function (e)
            {
              //alert('clicked!');

             //console.log(User);

             USER.score += 100;
             score = USER.score

             userId = USER.id;

              tp = randomNumberGen(5,95); // will generate the number for the top %
              lft = randomNumberGen(5,95); // will generate the number for the left %

              //console.log(`the top value is: ${tp}, the left value is: ${lft}`);
              //console.log(`this user's id is: ${userId}`);

              

              console.log(`the score i am posting is ${score}`); 
  
              var data = {'score':score, 'user':$('.profile').text().trim()}; 
 
              console.log(`data is ${data}`); 

              socket.emit('box move', tp, lft, userId, score, data);

              $.post('', data); 

              /*$.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '',            
                success: function(data) 
                {
                  console.log('success');
                  console.log(JSON.stringify(data)); 
                }
              });  */

            })
        }

        boxWatcher();

        socket.on('box move', function(tp, lft, userId, score, data)
        {

          var box = $('<div>', {'class': 'box'})

// These will make it appear different on each screen
          //tp = randomNumberGen(0,100); // will generate the number for the top %      
         //lft = randomNumberGen(0,100); // will generate the number for the left %

          //console.log('something');
          /*$('.box').toggleClass('move1');*/ 
            
            $('.box').remove();
            $('body').append(box);
            $('.box').text('box');

            $('.box').css({'background-color': 'red', 'top': `${tp}%`, 'left':`${lft}%`});
            boxWatcher(); 

            console.log(data);  

            $("span[data-user='" + data.user +"']").text(data.score); 

            /*if(USER.id == userId)
            {
              $('#player1Score').text(`Score: ${score}`);
            }
            else
            {
              $('#player2Score').text(`Score: ${score}`);
            }*/

            scoreChecker();
            
        })

        function scoreChecker()
        {

          var winText = $('<p>', {'class': 'win-text'});

           if(USER.score >= SCORE_LIMIT)
           {
             socket.emit('winning', $('.box').hide());

             $('body').append(winText);
             $('.win-text').text('CONGRATS YOU WIN');
             //$('.win-text').css({'top': '50%', 'left': '50%', 'font-size': '5em'});
           }

        }

        function randomNumberGen(min, max)
        {
          num = Math.floor(Math.random()*(max-min+1)+min);

          return num;
        }


        $('#save').on('click', function (e)
        {
          let val = $('#name').text();
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
        let recording = false;

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
        keyboard.keyDown = function (note) 
        {

          socket.emit("keydown", note);
          

        };
        socket.on("keydown", function(note)
        {
          console.log(note);
          
          if(recording)
          {
            let time = Date.now() - attackTime;
            record_array.push({note: note, attack: time})
            attackTime = Date.now();
            console.log(record_array);
          }
          

          piano.triggerAttack(note);
        })
            
        keyboard.keyUp = function (note) 
        {

          socket.emit("keyup", note); 
            
        };

        socket.on("keyup", function(note)
        {
          piano.triggerRelease(note);
        })
        Interface.Loader();


        /*setInterval(function()
        {
          piano.triggerAttack('A0');
        },500)*/

        var h1 = document.getElementsByTagName('h1')[0],
        start = document.getElementById('start'),
        stop = document.getElementById('stop'),
        clear = document.getElementById('clear'),
        save = document.getElementById('saveRecord'),
        seconds = 0, minutes = 0, hours = 0,
        t;
        var record_array = [{note: 'C8', attack: 1000}, {note: 'A0', attack: 5000}, {note: 'A2', attack: 2500}];

        function playRecord(record_array)
        {
             
             if(record_array.length > 0)
             { 
             let record = record_array.shift();

             setTimeout(function ()
               {
                  piano.triggerAttack(record.note);
                  console.log(record);
                  playRecord(record_array);
              }, record.attack);
            }
        }

        playRecord(record_array);

        function add() 
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
        timer();


        /* Start button */
        start.onclick = function()
        {
          recording = true;
          attackTime = Date.now();
          seconds = 0;
          minutes = 0 ;
          hours = 0;
          timer();

          record_array = [];
        }

        /* Stop button */
        stop.onclick = function() 
        {
          clearTimeout(t);
          recording = false;
        }

        /* Clear button */
        clear.onclick = function() 
        {
          h1.textContent = "00:00:00";
          recording = false;
        }
    
        save.onclick = function()
        {
          //console.log('something', record_array);

          songname = $('.songTitle').val();
          console.log(songname, typeof songname);

            $.ajax({
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


      });