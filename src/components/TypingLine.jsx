import { useEffect, useState } from "react";

// Types each line, pauses, deletes it and moves to the next (like the
// readme-typing-svg on the GitHub profile). Static first line if the user
// prefers reduced motion.
const TypingLine = ({ lines, className = "" }) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState(reduced ? lines[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = lines[lineIndex];
    let delay = deleting ? 30 : 65;
    if (!deleting && text === full) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setLineIndex((i) => (i + 1) % lines.length);
      }
      // Array.from keeps emoji (surrogate pairs) in one piece
      const chars = Array.from(full);
      const n = Array.from(text).length + (deleting ? -1 : 1);
      setText(chars.slice(0, n).join(""));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, lineIndex, lines, reduced]);

  return (
    <p className={className} aria-label={lines.join(". ")}>
      <span aria-hidden="true">
        <span className="text-[#3B82F6]">&gt; </span>
        {text}
        <span className="inline-block w-[0.55em] h-[1.1em] -mb-[0.2em] ml-1 bg-[#3B82F6] motion-safe:animate-pulse" />
      </span>
    </p>
  );
};

export default TypingLine;
