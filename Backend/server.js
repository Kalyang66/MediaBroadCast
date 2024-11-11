const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

// Path to the output folder for HLS files
const outputFolder = 'C:/Users/DELL 2IN1/Desktop/MediaBroadCast/Videofiles';

// Serve HLS files from the output folder
app.use('/Videofiles', express.static(outputFolder));

// URL of the live stream (replace with the actual URL)
const liveStreamURL = 'http://62.131.207.209:8080/'; // Replace this with the live stream URL

// FFmpeg command to convert the live stream into HLS format
// const ffmpegCommand = `ffmpeg -i ${liveStreamURL} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputFolder}/stream.m3u8`;
const ffmpegPath = "C:/Users/DELL 2IN1/Desktop/ffmpeg-7.1-essentials_build/ffmpeg-7.1-essentials_build/bin/ffmpeg.exe";
const ffmpegCommand = `"${ffmpegPath}" -i ${liveStreamURL} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputFolder}/stream.m3u8`;

// Run the FFmpeg command to start the conversion process
exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
