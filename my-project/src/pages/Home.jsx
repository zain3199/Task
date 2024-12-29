import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS
import Calculator from "../componens/Calculator";
import { FirebaseOperations } from "../componens/FirebaseOperations";
import { ImageOperations } from "../componens/ImageOperations";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch Firestore messages in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // Fetch uploaded images
  useEffect(() => {
    const q = query(collection(db, "images"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imgs);
    });
    return () => unsubscribe();
  }, []);

  // Handle text submission
  const handleTextSubmit = async () => {
    if (textInput.trim() === "") return;
    try {
      await addDoc(collection(db, "messages"), {
        text: textInput,
        timestamp: new Date(),
      });
      setTextInput("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!image) return;
    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      await addDoc(collection(db, "images"), { url, name: image.name });
      setImage(null);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  // Trigger Toast Notification
  const handleNotification = () => {
    toast.success("Notification Message!"); // Show success toast
  };

  // Handle deleting a message
  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId)); // Delete from Firestore
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message: ", error);
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div
      className="pt-16 h-[100vh] "
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="flex justify-center space-x-4 py-4">
        <button
          onClick={() => setTab(1)}
          className={`px-4 py-2 text-xl rounded-md ${
            tab === 1
              ? "bg-gradient-to-r  from-black to-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Notification
        </button>
        <button
          onClick={() => setTab(2)}
          className={`px-8 py-2 text-xl rounded-md ${
            tab === 2
              ? "bg-gradient-to-r  from-black to-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Read&Write Operations
        </button>
        <button
          onClick={() => setTab(3)}
          className={`px-8 py-2 text-xl rounded-md ${
            tab === 3
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Image
        </button>
        <button
          onClick={() => setTab(4)}
          className={`px-4 py-2 text-xl rounded-md ${
            tab === 4
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Calculator
        </button>
      </div>

      <div className="p-6 flex justify-center ">
        {tab === 1 && (
          <div>
            <button
              onClick={handleNotification} // Trigger toast on click
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Click Me for Notification
            </button>
          </div>
        )}

        {tab === 2 && (
          <FirebaseOperations
            handleTextSubmit={handleTextSubmit}
            setTextInput={setTextInput}
            textInput={textInput}
            messages={messages}
            handleDeleteMessage={handleDeleteMessage} // Pass the delete function
          />
        )}

        {tab === 3 && (
          <ImageOperations
            setImage={setImage}
            handleImageUpload={handleImageUpload}
            images={images}
          />
        )}
        {tab === 4 && <Calculator />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
