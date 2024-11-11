import subprocess

# Define the command to run FFmpeg
ffmpeg_command = [
    "ffmpeg",
    "-i", "http://62.131.207.209:8080/",
    "-c:v", "copy",
    "-c:a", "copy",
    "-f", "hls",
    "-hls_time", "10",
    "-hls_list_size", "5",
    "-hls_flags", "delete_segments",
    "output_folder/stream.m3u8"
]

# Run the command
subprocess.run(ffmpeg_command)
