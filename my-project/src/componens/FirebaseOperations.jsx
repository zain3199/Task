export const FirebaseOperations = ({
  messages,
  setTextInput,
  textInput,
  handleTextSubmit,
}) => {
  return (
    <>
      <div className="w-[35%] ">
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
            <li key={msg.id} className="border-b py-2">
              {msg.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
