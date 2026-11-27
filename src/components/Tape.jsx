// Orange strip between the hero and the content, tilted like tape on a
// poster, with the stack scrolling across.
const WORDS = ["full stack dev", "React", "Next.js", "TypeScript", "Node.js", "Google Cloud", "Docker", "breaks prod sometimes"];

const Tape = () => {
  const run = WORDS.map((w) => `${w}  /  `).join("");
  return (
    <div className='tape' aria-hidden='true'>
      <div className='tape-track'>
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  );
};

export default Tape;
