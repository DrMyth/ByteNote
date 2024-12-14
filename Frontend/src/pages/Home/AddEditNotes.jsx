import React, { useState } from "react";
import { TagInput } from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import { axiosInstance } from "../../utils/axiosInstance";

function AddEditNotes({ handleShowToastMessage, getNotes, type, noteData, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getNotes();
        onClose();
        handleShowToastMessage("Note added successfully", "success");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.messages) {
        setError(e.response.data.messages);
      } else {
        setError("Unexpected error occurred. Please try again later.");
        console.log(e);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getNotes();
        onClose();
        handleShowToastMessage("Note Updated successfully", "success");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.messages) {
        setError(e.response.data.messages);
      } else {
        setError("Unexpected error occurred. Please try again later.");
        console.log(e);
      }
    }
  };

  const handleAddNote = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setError("");

    if (type == "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative shadow-sm">
      <button
        className="w-10 h-10 rounded-full flex text-slate-400 hover:text-slate-900 hover:bg-slate-50 items-center justify-center absolute -top-2.5 -right-1"
        onClick={onClose}
      >
        <MdClose className="text-xl" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          placeholder="Title"
          className="outline-none text-slate-950 text-lg bg-slate-50 rounded p-2 font-medium border border-gray-300"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          placeholder="Content"
          rows={10}
          className="border outline-none text-lg text-slate-950 bg-slate-50 rounded p-2 border-gray-300 xl:max-h-[25rem] lg:max-h-[10rem] max-h-[15rem] font-normal"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label mb-0.5">TAGS</label>
        <TagInput tags={tags} setTags={setTags} setError={setError} />
      </div>

      {error ? <p className="text-red-500 text-sm mt-2">{error}</p> : null}

      <button
        className={`btn-primary border w-full mt-3 p-3 font-medium`}
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
