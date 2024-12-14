import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { NoteCard } from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import moment from "moment";
import { Toast } from "../../components/ToastMessage/Toast";
import { EmptyCard } from "../../components/Cards/EmptyCard";
import noNote from "../../assets/images/noNote.jpg";
import addNote from "../../assets/images/addNote.jpg";

export const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSearch, setIsSearch] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (e) {
      console.log(e);
      console.log("An error unexpected occurred while fetching notes");
      setAllNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleCloseToast = () => {
    setShowToastMessage({ isShown: false, message: "", type: "add" });
  };

  const handleShowToastMessage = (message, type) => {
    setShowToastMessage({ isShown: true, message: message, type: type });
  };

  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (e) {
      console.log(e);
      console.log("An error unexpected");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        getNotes();
        handleShowToastMessage("Note Deleted successfully", "delete");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.messages) {
        setError(e.response.data.messages);
      } else {
        console.log("Unexpected error occurred. Please try again later.");
        console.log(e);
      }
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        getNotes();
        handleShowToastMessage("Note Updated successfully", "success");
      }
    } catch (e) {
      console.log("Unexpected error occurred. Please try again later.");
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
    getNotes();
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar
          userInfo={userInfo}
          onSearchNotes={onSearchNotes}
          handleClearSearch={handleClearSearch}
        />

        <div class="flex flex-row gap-2 h-screen justify-center xl:mt-70 mt-40">
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />

      <div className="mx-auto container">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 m-5 ">
            {allNotes.map((note, index) => (
              <div key={note._id} className="flex flex-col max-h-[400px] overflow-hidden">
              <NoteCard
                key={note._id}
                title={note.title}
                date={moment(note.createdOn).format("DD MMM YYYY")}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
              </div>
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noNote : addNote}
            message={
              isSearch
                ? "Oops! No notes found matching your search!"
                : "Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!"
            }
          />
        )}
      </div>

      <div
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
        className="h-16 w-16 rounded-2xl cursor-pointer bg-primary hover:bg-blue-600 flex items-center justify-center absolute bottom-10 right-10"
      >
        <MdAdd className="text-4xl text-white" />
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel=""
        className="xl:w-[80vh] lg:w-[90vh] md:w-[80vh] max-w-[80%] w-[80vh] transition-all duration-100 max-h-3/4 bg-white rounded mx-auto xl:mt-14 lg:mt-8 p-5"
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getNotes={getNotes}
          handleShowToastMessage={handleShowToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};
