import React from "react";
import chat_data from "../../public/chat_data.json";

function Page() {
  return (
    <div className="flex flex-col items-center h-full w-full min-h-0">
      <div className="flex flex-col justify-end p-4 max-w-[900px] h-full w-full min-h-0">
        <div className="flex flex-col flex-auto min-h-0 overflow-y-scroll">
          {chat_data["messages"].map((message, i) => (
            <div
              key={i}
              className={`max-w-1/2 p-4 rounded-lg mb-4 ${
                message.role == "user" ? "ml-auto bg-blue-200" : "bg-green-200"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <form>
          <input
            type="text"
            className="p-4 bg-gray-100 outline-none border-gray-200 rounded-lg border-1 w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default Page;
