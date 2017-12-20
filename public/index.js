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

              socket.emit('box move', tp, lft, userId, score);

              console.log(`the score i am posting is ${score}`); 
 
              var data = {'scoreAllTime':`${score}`};
 
              console.log(data); 

              $.post('',data); 

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

        socket.on('box move', function(tp, lft, userId, score)
        {

          var box = $('<div>', {'class': 'box'})

// These will make it appear different on each screen
          //tp = randomNumberGen(0,100); // will generate the number for the top %      
         //lft = randomNumberGen(0,100); // will generate the number for the left %

          //console.log(`the top value is: ${tp}, the left value is: ${lft}`);
          console.log(`my user id is ${USER.id}`);
          console.log(`i was passed ${userId} for a user id`);

          //console.log('something');
          /*$('.box').toggleClass('move1');*/ 
            
            $('.box').remove();
            $('body').append(box);
            $('.box').text('box');

            $('.box').css({'background-color': 'red', 'top': `${tp}%`, 'left':`${lft}%`});
            boxWatcher(); 

            if(USER.id == userId)
            {
              $('#player1Score').text(`Score: ${score}`);
            }
            else
            {
              $('#player2Score').text(`Score: ${score}`);
            }

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










      });