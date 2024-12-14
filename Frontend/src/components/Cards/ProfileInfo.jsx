import React from "react";
import { Link } from "react-router-dom";
import { getInitials } from "../../utils/helper";

function ProfileInfo({ userInfo, onLogout }) {
  
  if(userInfo == null){
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="border w-12 h-12 flex text-center justify-center font-semibold text-slate-950 bg-slate-100 items-center rounded-full">
          {getInitials(userInfo?.fullName)}
        </div>
        <div className="flex-col items-center ">
          <p className="text-sm font-medium text-slate-900 translate-y-0.5">
            {userInfo.fullName?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </p>
          <button
            onClick={onLogout}
            className="text-slate-700 text-sm underline -translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
