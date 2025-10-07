# Audio Format Best Practices

This guide outlines the recommended practices for using audio files in the Respiro application. Optimizing audio is crucial for creating a seamless, immersive user experience, especially in a meditative app where audio quality and performance directly impact the user's focus.

## 1. Audio Formats: The Modern Fallback Strategy

The best practice for the web is not to pick just one format, but to provide multiple formats and let the browser choose the most efficient one it supports. This is known as a "fallback strategy." The ideal order of preference is **Opus -> AAC -> MP3**.

- **Opus (`.opus`):** This is the modern champion for web audio.

  - **Pros:** Offers significantly better quality than MP3 and AAC at the same file size (or the same quality at a much smaller file size). It has extremely low latency.
  - **Cons:** Not supported by very old browsers.
  - **Recommendation:** This should be your **primary** format. It's supported by all modern browsers (Chrome, Firefox, Edge, and recent versions of Safari).

- **AAC (`.m4a`):** Generally considered the successor to MP3.

  - **Pros:** Offers better quality than MP3 at similar bitrates. It has excellent browser support, especially across the Apple ecosystem.
  - **Cons:** Slightly less efficient than Opus.
  - **Recommendation:** A great **secondary** option if Opus is not supported.

- **MP3 (`.mp3`):** The universal fallback.

  - **Pros:** Supported by virtually every browser and device in existence.
  - **Cons:** The least efficient format of the three in terms of quality per kilobyte.
  - **Recommendation:** Keep MP3 files to ensure your app works everywhere as a **final fallback**.

- **WAV (`.wav`):** Uncompressed audio format.
  - **Pros:** Lossless quality.
  - **Cons:** Massive file sizes that will dramatically slow down your app's initial load time, consume a lot of user data, and are not suitable for streaming.
  - **Recommendation:** **Avoid this format for web delivery.** It is suitable for source files before you transcode them to compressed formats.

## 2. Quality vs. File Size: Finding the Sweet Spot

For background ambient sounds, you don't need lossless, high-fidelity audio. The goal is a pleasant, non-distracting soundscape with a small file size for quick loading and efficient caching.

- **Use Variable Bitrate (VBR):** Instead of a Constant Bitrate (CBR), always export your audio using VBR. VBR is much more efficient, allocating more data to complex parts of the sound and less to simple or silent parts, resulting in better quality for the same file size.

- **Bitrate Recommendations:**

  - **Opus:** Aim for **64-96 kbps (VBR)**. You will likely find it sounds as good as or better than a 128 kbps MP3.
  - **MP3 / AAC:** A VBR setting that averages **~128 kbps** is a high-quality standard. For simple ambient tracks like a hum, you could likely go down to 96 kbps with no noticeable difference.

- **Consider Mono vs. Stereo:**
  - For sounds like the "Ambient Hum" or "Om Chant," a **mono** track will sound virtually identical to a stereo one but will be **half the file size**.
  - For immersive sounds like "Gentle Rain," **stereo** is definitely preferred. Evaluate this on a per-track basis.

## 3. Implementation in Respiro

### Fallback Logic

In `hooks/useAudio.ts`, the `startBackgroundMusic` function can be modified to implement this fallback logic. Instead of fetching just `.mp3`, it can attempt to fetch `.opus` first and fall back to `.mp3` if the request fails.

```typescript
// Example snippet for useAudio.ts
try {
  // Determine the best file path based on format
  const baseFilePath =
    musicType === BackgroundMusicType.GentleRain ? "/audio/rain" : "/audio/om";

  // Try to load the most efficient format first
  const response = await fetch(`${baseFilePath}.opus`);
  if (!response.ok) {
    throw new Error("Opus file not found, trying MP3");
  }

  // ... process the response
} catch (error) {
  // If Opus fails, fall back to MP3
  console.warn("Failed to load .opus, falling back to .mp3", error);
  const response = await fetch(`${baseFilePath}.mp3`);
  // ... process the MP3 response
}
```

### PWA Caching

When you add new audio file formats (e.g., `audio/rain.opus`, `audio/om.opus`), remember to add them to the `includeAssets` array in your `vite.config.ts` file. This ensures they are properly cached by the service worker for offline use.

```typescript
// Example snippet for vite.config.ts
VitePWA({
  // ... other options
  includeAssets: [
    // ... other assets
    "audio/rain.mp3",
    "audio/om.mp3",
    "audio/rain.opus", // Add the new format
    "audio/om.opus", // Add the new format
  ],
  // ...
});
```

## 4. How to Transcode Audio Files

To convert your source audio files (e.g., `.wav`, `.mp3`) into the recommended web formats, you can use a powerful, free, command-line tool called **FFmpeg**.

### Installing FFmpeg

FFmpeg is the industry standard for audio and video conversion. You can download it for your operating system from the official website:

- **[Download FFmpeg](https://ffmpeg.org/download.html)**

Follow the installation instructions for your OS. Once installed, you can run the `ffmpeg` commands from your terminal or command prompt.

### Conversion Commands

Navigate to the directory containing your source audio file in your terminal and use the following commands. Remember to replace the placeholder file names (`input.wav`, `output.opus`, etc.) with your actual file names.

> **Note for Windows Users:** If you get an error like `ffmpeg : The term 'ffmpeg' is not recognized...`, it means the command isn't in your system's `PATH`. If you downloaded `ffmpeg.exe` into your current folder, you must run the command by prefixing it with `.\`, for example: `.\ffmpeg.exe -i ...`.

#### Converting to Opus (Recommended Primary Format)

This command converts a source file to a high-quality stereo Opus file with a target variable bitrate of 80 kbps.

```bash
# General command format: ffmpeg -i [your-input-file] [options] [your-output-file]

# Example:
ffmpeg -i my-audio.wav -c:a libopus -b:a 80k my-audio.opus
```

- `-i my-audio.wav`: **Specifies your input file.** Replace `my-audio.wav` with the name of your source audio file (e.g., `rain.mp3`).
- `-c:a libopus`: Sets the audio codec to `libopus`, the standard Opus encoder.
- `-b:a 80k`: Sets the target **a**udio **b**itrate to 80 kbps. Opus uses VBR, so this is a target average.
- `my-audio.opus`: **Specifies your output file.** This is the name of the new file that will be created (e.g., `rain.opus`).

**For Mono Audio:** If your source is stereo but the content doesn't need it (like a simple hum), you can convert it to mono to save ~50% on file size. A lower bitrate is also acceptable.

```bash
# Example for mono conversion:
ffmpeg -i my-stereo-hum.wav -c:a libopus -b:a 64k -ac 1 my-mono-hum.opus
```

- `-ac 1`: Sets the **a**udio **c**hannels to `1` (mono).

#### Converting to MP3 (For Fallback)

If you need to create a high-quality VBR MP3 for fallback purposes, use the `libmp3lame` encoder with a quality setting.

```bash
# Example for MP3 conversion:
ffmpeg -i my-audio.wav -c:a libmp3lame -q:a 5 my-audio.mp3
```

- `-c:a libmp3lame`: Sets the audio codec to `libmp3lame`, a high-quality MP3 encoder.
- `-q:a 5`: Sets the VBR **q**uality level for the **a**udio. The scale is 0-9, where 0 is highest quality. A value of `5` is an excellent choice, typically resulting in an average bitrate of ~130 kbps.
- `my-audio.mp3`: **Specifies your output file.**

**Note on Errors:** The error message `Unable to choose an output format for '1'` typically occurs if the output filename is accidentally omitted from the command. The parser then misinterprets the last argument (like the `1` in `-ac 1`) as the filename. Always ensure you have an input and an output file specified.
