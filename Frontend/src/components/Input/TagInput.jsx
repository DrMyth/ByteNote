import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export const TagInput = ({ setError ,tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    console.log(inputValue);
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if(tags.length >= 5) {
      setError("You can add maximum 5 tags");
      setInputValue("");
      return;
    }
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    console.log("Remove function called");
    console.log(tags);
  };

  return (
    <div>
      {tags.length > 0 ? (
        <div className="flex items-center gap-2 flex-wrap mb-4 ">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-900 px-2 py-1 rounded flex items-center justify-center gap-1 text-sm"
            >
              {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter tags"
          className="text-md border px-3 py-2 rounded outline-none border-gray-300 bg-slate-50"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <div className=" hover:bg-blue-700 bg-white w-8 h-8 flex justify-center items-center rounded border border-blue-700">
          <button
            className="text-2xl text-blue-700 hover:text-white"
            onClick={addNewTag}
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};
