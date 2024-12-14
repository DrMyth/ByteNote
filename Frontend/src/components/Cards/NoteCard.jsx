import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

export const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border p-4 rounded bbg-white hover:shadow-xl transition-all ease-in-out shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-xs text-slate-500">{date}</p>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-900"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-slate-600 mt-2">
        {content}
      </p>

      <div className="flex justify-between items-center mt-2">
        <p className="text-slate-500 text-xs mt-2">
          {tags.map((tag, index) => {
            return (
              <span key={index} className="text-primary border px-2 py-1 mr-1 rounded bg-slate-100">
                {tag}
              </span>
            );
          })}
        </p>
        <div className="flex items-center gap-2">
          <MdCreate
            onClick={onEdit}
            className="icon-btn hover:text-green-600"
          />
          <MdDelete
            onClick={onDelete}
            className="icon-btn hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};
