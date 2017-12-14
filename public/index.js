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

          console.log(this);

          socket.emit('box move', user);

        })

        socket.on('box move', function(move)
        {
          console.log('something');
          /*$('.box').toggleClass('move1');*/
          $('.box').animate({
            'background': 'red'
          },1000,function ()
          {
            $('.box').remove();
            setTimeout(function()
            {

            })
          })
      })

        /*$('div').on('click', 'label', function (e)
        {
          console.log(this);

          $(this).addClass('shot');

          //$(this).find('input').addClass('shot');
        })*/

      });