interface Props {
  onSelect: (command: string) => void;
}

const SlashMenu = ({ onSelect }: Props) => {
  return (
    <div className="absolute bg-card border border-main rounded-md shadow-md p-2">
      <button
        onClick={() => onSelect("h1")}
        className="block w-full text-left p-1"
      >
        Heading 1
      </button>

      <button
        onClick={() => onSelect("h2")}
        className="block w-full text-left p-1"
      >
        Heading 2
      </button>

      <button
        onClick={() => onSelect("bullet")}
        className="block w-full text-left p-1"
      >
        Bullet List
      </button>

      <button
        onClick={() => onSelect("number")}
        className="block w-full text-left p-1"
      >
        Numbered List
      </button>

      <button
        onClick={() => onSelect("quote")}
        className="block w-full text-left p-1"
      >
        Quote
      </button>

      <button
        onClick={() => onSelect("image")}
        className="block w-full text-left p-1"
      >
        Insert Image
      </button>
    </div>
  );
};

export default SlashMenu;
