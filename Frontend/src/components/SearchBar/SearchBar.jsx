import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export const SearchBar = ({onClearSearch, handleSearch, onChange, value}) => {
  return (
    <>
      <div>
        <div className="transition-all duration-500 border rounded-md w-[15rem] md:w-[25rem] flex items-center px-4 bg-slate-100">
          <input
            type="text"
            value = {value}
            onChange = {onChange}
            placeholder="Search Notes"
            className="w-full bg-transparent py-[9.5px] outline-none text-xs"
          />

          {value?<IoMdClose
            className="text-slate-500 cursor-pointer hover:text-black text-xl mr-2"
            onClick={onClearSearch}
          />:null}
          
          <FaMagnifyingGlass
            className="text-slate-500 cursor-pointer hover:text-black text-lg"
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
};
