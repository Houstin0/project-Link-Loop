import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

function Inbox() {


  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState([]);

  const [dropdownStates, setDropdownStates] = useState([]);

  // Function to toggle the dropdown for a specific message
  const toggleDropdown = (messageId) => {
    setDropdownStates((prevStates) => {
      const index = prevStates.findIndex(
        (state) => state.messageId === messageId
      );

      if (index !== -1) {
        // Toggle the isOpen state for the specific message
        const newStates = [...prevStates];
        newStates[index] = { messageId, isOpen: !newStates[index].isOpen };
        return newStates;
      } else {
        // If the state for the message doesn't exist, create a new one with isOpen set to true
        return [...prevStates, { messageId, isOpen: true }];
      }
    });
  };

  // Function to format date and time
  const formatCreatedAt = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return format(createdAtDate, "MMMM dd, yyyy HH:mm");
  };

  // Function to fetch conversations
  const fetchConversations = async (userId) => {
    try {
      const response = await fetch(`https://link-loop-db.onrender.com/friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        console.error("Error fetching friends:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching friends:", error.message);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);

      // Check if user.id is defined before making the API call
      if (parsedUserData.id) {
        fetchConversations(parsedUserData.id);

        // Check if there is a selected friend in local storage
        const storedSelectedFriend = localStorage.getItem("selectedFriend");
        if (storedSelectedFriend) {
          setSelectedFriend(JSON.parse(storedSelectedFriend));
        }
      }
    }
  }, []);

  const handleFriendClick = (friendId) => {
    // If the clicked friend is already selected, unselect them
    if (selectedFriend && selectedFriend.id === friendId) {
      setSelectedFriend(null);
      // Clear selected friend from local storage
      localStorage.removeItem("selectedFriend");
    } else {
      // Find the selected friend's data from conversations
      const friendData = conversations.find(
        (conversation) => conversation.friend.id === friendId
      );

      // Set the selectedFriend state with the friend's data
      setSelectedFriend(friendData ? friendData.friend : null);

      // Save selected friend to local storage
      localStorage.setItem(
        "selectedFriend",
        JSON.stringify(friendData ? friendData.friend : null)
      );
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    try {
      const response = await fetch(`https://link-loop-db.onrender.com/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          sender_id: user.id,
          receiver_id: selectedFriend.id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        // Fetch updated conversations after sending the message
        fetchConversations(user.id);

        // Clear the input field
        setNewMessage("");
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-700"
        aria-label="Sidebar"
      >
      

        <div className="w-full max-w-md p-2 bg-gray-100 sm:p-4 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4 pt-4">
            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-gray-100">
              Friends
            </h5>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="h-96 overflow-y-auto">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {conversations.map((conversation) => (
                <li
                  key={conversation.friend.id}
                  className={`py-2 cursor-pointer hover:bg-gray-300 sm:py-3 ${
                    selectedFriend === conversation.friend
                      ? "bg-blue-200 dark:bg-blue-500"
                      : ""
                  }`}
                  onClick={() => handleFriendClick(conversation.friend.id)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={conversation.friend.profile_picture}
                        alt={conversation.friend.username}
                      />
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-purple-700  truncate dark:text-purple-500 ">
                        {conversation.friend.username}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {selectedFriend ? (
        <div className="flex flex-col h-screen bg-gray-200 dark:bg-gray-900 sm:ml-64 divide-y divide-gray-500 dark:divide-gray-700">
          <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
              {selectedFriend && (
                <a
                  href=""
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <div className="relative">
                    <img
                      className="w-8 h-8 rounded"
                      src={selectedFriend.profile_picture}
                      alt={selectedFriend.username}
                    />
                    <span className="absolute top-1 left-6 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                  <h6 className="text-lg font-bold dark:text-white">
                    {selectedFriend.username}
                  </h6>
                </a>
              )}

              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </div>
          </nav>

          <div className="flex-1 overflow-y-auto flex flex-col-reverse">
            {conversations.map((conversation) => (
              <div
                key={conversation.friend.id}
                className=" p-2 bg-gray-200 dark:bg-gray-900"
              >
                {conversation.friend.id === selectedFriend.id && (
                  <>
                    {conversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-center gap-2.5 ${
                          message.sender_id === user.id
                            ? "justify-end rtl:justify-start"
                            : "justify-start rtl:justify-end"
                        }`}
                      >
                        {message.sender_id !== user.id && (
                          <img
                            className="w-8 h-8 rounded-full"
                            src={message.sender.profile_picture}
                            alt="Profile"
                          />
                        )}
                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                          <div
                            className={`flex items-center space-x-2 ${
                              message.sender_id === user.id
                                ? "justify-end rtl:space-x-reverse"
                                : ""
                            }`}
                          >
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {message.sender.username}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {formatCreatedAt(message.created_at)}
                            </span>
                          </div>
                          <div
                            className={`flex flex-col leading-1.5 p-4 ${
                              message.sender_id === user.id
                                ? "bg-gray-100 rounded-e-xl self-end dark:bg-gray-800"
                                : "bg-gray-700 rounded-es-xl self-start dark:bg-gray-700"
                            }`}
                          >
                            {/* <p classNameName="text-sm font-normal text-gray-900 dark:text-white"> */}
                            <p
                              className={`text-sm font-normal ${
                                message.sender_id === user.id
                                  ? "text-gray-900 dark:text-gray-300"
                                  : "text-gray-100 dark:text-gray-100"
                              }`}
                            >
                              {message.content}
                            </p>
                          </div>
                        </div>
                        {message.sender_id === user.id && (
                          <img
                            className="w-8 h-8 rounded-full"
                            src={message.sender.profile_picture}
                            alt="Profile"
                          />
                        )}

                        {/* Add dropdown button and menu here */}

                        <button
                          onClick={() => toggleDropdown(message.id)}
                          id={`dropdownMenuIconButton_${message.id}`}
                          data-dropdown-toggle={`dropdownDots_${message.id}`}
                          data-dropdown-placement="bottom-start"
                          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                          >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                        </button>
                        <div
                          id={`dropdownDots_${message.id}`}
                          className={`z-10 ${
                            dropdownStates.find(
                              (state) => state.messageId === message.id
                            )?.isOpen
                              ? "block"
                              : "hidden"
                          } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Reply
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Forward
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Copy
                              </a>
                            </li>

                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:text-red-500 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>

          <form
            className="p-2 border border-gray-900"
            onSubmit={handleSendMessage}
          >
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <textarea
                id="chat"
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-900 placeholder-gray-900 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-green-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-screen p-4 sm:ml-64 flex items-center justify-center">
          <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 class="text-2xl text-center font-extrabold dark:text-gray-100">
              Select a friend to start a conversation
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
export default Inbox;
