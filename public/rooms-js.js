$(function()
{
	var socket = io();

	$('#createRoomButton').on('click', function (e)
        {
          console.log('createRoomsButton clicked');

          room = $('#createdRoomNameText').val();

          console.log('room is ' + room);

          socket.emit('createRoom', room);  
        });

	socket.on('createRoom', function(room)
	{
		$('#activeRooms').append(`<div class ='activeRoom'>
          	<span class='activeRoomName'>${room}</span>
          	<button class='joinRoom'>Join</button>
          	</div>`);
	})

	socket.on('message', function(msg)
	{
		console.log(msg);
	})
});