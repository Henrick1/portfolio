import mantraCover from "../assets/mantra-cover.webp";

// "Now playing" chip on the hero: the album cover, the track and a small
// equalizer. Edit NOW_PLAYING to change the song shown.
export const NOW_PLAYING = {
  title: "MANTRA",
  artist: "Bring Me The Horizon",
  cover: mantraCover, // album art, shown as a still square
};

const NowPlaying = ({ className = "" }) => (
  <div
    className={`now-playing inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0E131B]/95 py-2 pl-2 pr-4 ${className}`}
    aria-label={`Now playing: ${NOW_PLAYING.title} by ${NOW_PLAYING.artist}`}
  >
    {NOW_PLAYING.cover ? (
      <img src={NOW_PLAYING.cover} alt='' className='np-cover' />
    ) : (
      <span className='np-disc' aria-hidden='true' />
    )}
    <span className='flex flex-col leading-tight'>
      <span className='font-mono text-[11px] text-[#D4D4D8]'>now playing</span>
      <span className='text-[13px] text-white font-medium'>
        {NOW_PLAYING.title} <span className='text-white-100/60 font-normal'>&middot; {NOW_PLAYING.artist}</span>
      </span>
    </span>
    <span className='np-eq ml-1' aria-hidden='true'>
      <i />
      <i />
      <i />
      <i />
    </span>
  </div>
);

export default NowPlaying;
