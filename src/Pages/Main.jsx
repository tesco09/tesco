import React from "react";
import appIcon from "../Assets/image/appIcon.png";

export default function Main() {
  return (
    <div className="flex flex-col items-center w-full bg-purple-200 pb-12 pt-4">
      <header className="flex md:flex-row flex-col items-center mt-[5%] w-full">
        <img
          src={appIcon}
          alt="WingedX App Icon"
          className="md:h-[15%] md:w-[15%] w-[60%] h-[20%] rounded-xl md:ml-4"
          loading="lazy"
        />
        <div className="md:ml-4 md:w-[55%] flex flex-col md:items-start items-center md:mt-0 mt-4">
          <h1 className="text-[36px] font-bold">WingedX App</h1>
          <span className="text-[12px] font-semibold text-gray-500">
            File Size: 25 MB
          </span>
          <span className="text-[12px] font-semibold text-gray-500">
            Version: 1.0.0
          </span>
        </div>
        <a
          href="https://drive.google.com/file/d/1kej2VTDwvpZgqU9SB_ITpJHhue8k6QAG/view?usp=drive_link"
          download
          className="no-underline"
          aria-label="Download WingedX App"
        >
          <span className="p-2 w-[250px] bg-green-500 rounded-xl text-[28px] font-semibold text-center text-white mt-4">
            Download
          </span>
        </a>
      </header>

      <main className="flex flex-wrap items-end justify-between gap-4 p-4 w-full">
        {["ss5.jpg", "ss2.jpg", "ss1.jpg", "ss3.jpg", "ss4.jpg", "ss6.jpg"].map(
          (image, index) => (
            <img
              key={index}
              src={require(`../Assets/image/${image}`)}
              alt={`WingedX Screenshot ${index + 1}`}
              loading="lazy"
              className="w-1/6 md:w-[150px] md:h-[250px] rounded-sm object-cover"
            />
          )
        )}
      </main>

      <footer className="flex flex-col items-center w-full mt-4">
        <h3 className="text-[20px] font-semibold text-black">Contact Us</h3>
        <span className="text-[12px] font-semibold text-gray-500">
          Contact us: wingedxnetwork@gmail.com
        </span>
      </footer>
    </div>
  );
}
