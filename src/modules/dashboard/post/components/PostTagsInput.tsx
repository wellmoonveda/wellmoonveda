import { useState } from "react";

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
}

const PostTagsInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (!input.trim()) return;

    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-main">Tags</h3>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-main border px-2 py-1 rounded w-full"
          placeholder="Add tag..."
        />

        <button
          onClick={addTag}
          className="btn-prime px-3 py-1 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-soft px-2 py-1 rounded text-sm flex items-center gap-1"
          >
            {tag}

            <button onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTagsInput;
