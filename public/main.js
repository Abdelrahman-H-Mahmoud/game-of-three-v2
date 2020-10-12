const socket = io.connect("http://localhost:3000");

$('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('new_game', { name: $('#m').val() });
    return false;
});


socket.on("msg", (data) => {
    console.log(data);
    $('#messages').append($('<li>').text(data.message));
});
socket.on("turn", function (data) {
    console.log(data);
    $('#messages').append($('<li>').text(`${data.message}, last played: ${data.lastPlayedAdd} ,the number now:${data.num}, the recommended add is:${data.add}`));
    socket.emit('move', { id: data.id, add: data.add });
});
socket.on("game_ended", (data) => {
    $('#status').text(`${data.message}`);
    $('#messages').append($('<li>').text(`The Number Now Is:${data.num}`));
    console.log(data);
});

socket.on("game_started", (data) => {
    $('#messages').append($('<li>').text(`${data.message} the number is:${data.num}`));
});