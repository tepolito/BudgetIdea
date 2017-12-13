$(function () {
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
        	console.log(mPos[0], mPos[1]);
        })

        $('#box').on('click', function (e)
        {
        	//alert('clicked!');

          add.addClass('move1');
          
        })

        /*$('div').on('click', 'label', function (e)
        {
          console.log(this);

          $(this).addClass('shot');

          //$(this).find('input').addClass('shot');
        })*/

      });