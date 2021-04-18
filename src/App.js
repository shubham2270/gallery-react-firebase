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

  const adminEmails = ["shubham2270@gmail.com", "guptasneha.sg53@gmail.com"];

  const isAdmin = adminEmails.includes(userData?.email);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <div className='App'>
      <Title />
      <SignIn />
      {isAdmin && <UploadForm />}
      <ImageGrid setSelectedImg={setSelectedImg} isAdmin={isAdmin} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
