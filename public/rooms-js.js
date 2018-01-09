$(function()
{
	var socket = io();

	socket.emit('load');

	$('#createRoomButton').on('click', function (e)
        {
          console.log('createRoomsButton clicked');

          room = $('#createdRoomNameText').val();

          console.log('room is ' + room);

          socket.emit('createRoom', room);  
        });

	$('.joinRoom').on('click', function(e)
	{
		console.log('join button clicked');

		room = $(this).siblings('.activeRoomName').val();

		socket.emit('joinRoom', room);
	})

	socket.on('joinRoom', function(room)
	{
		alert(`you joined ${room}!!`);
	})

	socket.on('createRoom', function(room)
	{
		$('#activeRooms').append(`<div class ='activeRoom'>
          	<span class='activeRoomName'>${room}</span>
          	<button class='joinRoom'>Join</button>
          	</div>`);
	})

	socket.on('load', function(room_arr)
	{
		room_arr.forEach((rooms)=>
		{
			$('#activeRooms').append(`<div class ='activeRoom'>
          	<span class='activeRoomName'>${rooms}</span>
          	<button class='joinRoom'>Join</button>
          	</div>`);
		})
		
	})



	socket.on('message', function(msg)
	{
		console.log(msg);
	})
});