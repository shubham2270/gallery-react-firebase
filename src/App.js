import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import SignIn from "./components/SignIn";
import { auth } from "./firebase/config";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState("");

  const isAdmin = ["shubham2270@gmail.com", "guptasneha.sg53@gmail.com"];

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <div className='App'>
      <Title />
      <SignIn />
      {isAdmin.includes(userData?.email) && <UploadForm />}
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
