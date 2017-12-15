$(function () {

  const USER = {id: randomNumberGen(0, 99999999), score:0};

        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
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

        function boxWatcher()
        {
            $('.box').on('click', function (e)
                    {
                      //alert('clicked!');
          
                      console.log(USER.id);

                      userId = USER.id;
          
                      tp = randomNumberGen(5,95); // will generate the number for the top %
                      lft = randomNumberGen(5,95); // will generate the number for the left %
          
                      console.log(`the top value is: ${tp}, the left value is: ${lft}`);
                      console.log(`this user's id is: ${userId}`);
          
                      socket.emit('box move', tp, lft, userId);  
          
                    })
        }

        boxWatcher();

        socket.on('box move', function(tp, lft)
        {

          var box = $('<div>', {'class': 'box'})

// These will make it appear different on each screen
          //tp = randomNumberGen(0,100); // will generate the number for the top %      
         //lft = randomNumberGen(0,100); // will generate the number for the left %

          console.log(`the top value is: ${tp}, the left value is: ${lft}`);

          //console.log('something');
          /*$('.box').toggleClass('move1');*/
            
            $('.box').remove();
            $('body').append(box);
            $('.box').text('box');

            $('.box').css({'background-color': 'red', 'top': `${tp}%`, 'left':`${lft}%`});
            boxWatcher(); 
            
        })

        function randomNumberGen(min, max)
        {
          num = Math.floor(Math.random()*(max-min+1)+min);

          return num;
        }

      });