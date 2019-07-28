var queue = ['PsQQ0mQ7yEI','RTmwrCkGePg','dNRC137o0j8'];
var idx = 0;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '195',
    width: '320',
    videoId: queue[0],
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    var socket = io();
    socket.emit('video event', player.getCurrentTime());
    if(event.data==YT.PlayerState.ENDED) {
        //move to the next video index in queue[]
        idx = idx + 1;
        if(idx == queue.length) {
            idx = 0;
        }
        socket.emit('video event', 'next ' + queue[idx]); //use console log in future
        player.loadVideoById({videoId:queue[idx]});
    }
}

function stopVideo() {
    player.stopVideo();
}

function addVideo(vidId) {
    //process link
    queue.push(vidId);
    //var socket = io();
    //socket.emit('chat message', queue[queue.length-1]);
    //player.loadVideoById({videoId:'RTmwrCkGePg'});
}