import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calculator from "../componens/Calculator";
import { FirebaseOperations } from "../componens/FirebaseOperations";
import { ImageOperations } from "../componens/ImageOperations";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

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

  const handleImageUpload = async () => {
    if (!image) return;
    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      await addDoc(collection(db, "images"), { url, name: image.name });
      setImage(null);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleNotification = () => {
    toast.success("Notification Message!");
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message: ", error);
      toast.error("Failed to delete message.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <div
      className="pt-8 h-[100vh]"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundRepeat: "repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="flex justify-between items-center px-5 py-4">
        <div>
          {user ? (
            <p className="text-lg font-semibold text-white">
              Welcome, {user.email || "User"}!
            </p>
          ) : (
            <p className="text-lg font-semibold text-gray-800">Not Logged In</p>
          )}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex justify-center flex-col sm:flex-row py-2 gap-4 sm:space-x-4 sm:py-4 px-5">
        <button
          onClick={() => setTab(1)}
          className={`px-2 py-2 text-xl rounded-md ${
            tab === 1
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Notification
        </button>
        <button
          onClick={() => setTab(2)}
          className={`px-8 py-2 text-xl rounded-md ${
            tab === 2
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
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

      <div className="sm:p-6 p-1 flex justify-center ">
        {tab === 1 && (
          <div>
            <button
              onClick={handleNotification}
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
            handleDeleteMessage={handleDeleteMessage}
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
