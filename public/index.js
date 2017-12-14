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
        	//console.log(mPos[0], mPos[1]);
        })

        $('.box').on('click', function (e)
        {
        	//alert('clicked!');

          //console.log(this);

          socket.emit('box move');

        })

        socket.on('box move', function(user)
        {
          var box = $('<div>', {'class': 'box'})
          //console.log('something');
          /*$('.box').toggleClass('move1');*/
          $('.box').animate(
          {'background': 'red'},
          1,'linear',function ()
          {
            $('.box').remove();
            $('body').append(box);
            $('.box').text('box');

            $('.box').css({'background-color': 'red', 'top':'35%', 'left':'60%'}); 
          })
      })

        /*$('div').on('click', 'label', function (e)
        {
          console.log(this);

          $(this).addClass('shot');

          //$(this).find('input').addClass('shot');
        })*/

      });