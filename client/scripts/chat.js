$(function () {
    var socket = io();
    var currentTime = 5;
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        addVideo($('#addvid').val());
        $('#m').val('');
        $('#addvid').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('vidloc', function(msg, id) {
        if(msg > currentTime+1) {
            currentTime = msg;
            $('#messages').append($('<li>').text(msg + ' ' + id));
            player.loadVideoById({ videoId: id, startSeconds: msg});
        }
        //player.seekTo(msg, true);
    });
}); 