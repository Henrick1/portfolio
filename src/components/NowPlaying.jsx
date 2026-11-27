import mantraDisc from "../assets/mantra-disc.webp";

// "Now playing" chip on the hero: a spinning disc, the track and a small
// equalizer. Edit NOW_PLAYING to change the song shown.
export const NOW_PLAYING = {
  title: "MANTRA",
  artist: "Bring Me The Horizon",
  cover: mantraDisc, // the CD from the album art, spinning
};

const NowPlaying = ({ className = "" }) => (
  <div
    className={`now-playing inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0E131B]/85 backdrop-blur-md py-2 pl-2 pr-4 ${className}`}
    aria-label={`Now playing: ${NOW_PLAYING.title} by ${NOW_PLAYING.artist}`}
  >
    {NOW_PLAYING.cover ? (
      <img src={NOW_PLAYING.cover} alt='' className='np-disc np-cover' />
    ) : (
      <span className='np-disc' aria-hidden='true' />
    )}
    <span className='flex flex-col leading-tight'>
      <span className='font-mono text-[11px] text-[#FF8A3D]'>now playing</span>
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
