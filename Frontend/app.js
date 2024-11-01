// app.js

const video = document.getElementById('videoPlayer');
const videoUrl = 'https://path-to-your-video/playlist.m3u8'; // For HLS or .mpd for DASH

// Check for HLS Support
if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Native support for HLS (Safari, iOS)
    video.src = videoUrl;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
} else if (dashjs && videoUrl.endsWith('.mpd')) {
    // For DASH playback with dash.js
    const player = dashjs.MediaPlayer().create();
    player.initialize(video, videoUrl, true);
} else {
    console.error('Your browser does not support HLS or DASH.');
}
