export const FirebaseOperations = ({
  messages,
  setTextInput,
  textInput,
  handleTextSubmit,
  handleDeleteMessage,
}) => {
  return (
    <div className="w-[45%]">
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
        placeholder="Enter text to send to Firestore"
      />
      <button
        onClick={handleTextSubmit}
        className="bg-gradient-to-r from-black to-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <ul className="mt-4">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="border-b py-6 text-white flex justify-between items-center"
          >
            <span>{msg.text}</span>
            <button
              onClick={() => handleDeleteMessage(msg.id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
