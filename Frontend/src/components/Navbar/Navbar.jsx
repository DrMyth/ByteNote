import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";

export const Navbar = ({ userInfo, onSearchNotes, handleClearSearch }) => {
  const navigate = useNavigate();

  function onLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const [searchQuery, setSearchQuery] = useState("");

  function onClearSearch() {
    setSearchQuery("");
    handleClearSearch();
  }

  function handleSearch() {
    if(searchQuery.trim()) {
      onSearchNotes(searchQuery);
    }
    console.log("Search called");
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">ByteNote</h2>

      {localStorage.getItem("token") ? (
      <>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </>
      ):null}
    </div>
  );
};
