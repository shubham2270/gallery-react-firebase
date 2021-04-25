import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const uploadToFirebase = async (imageData, action) => {
    const collectionRef = projectFirestore.collection("images");

    try {
      await Promise.all(
        imageData.map(
          (imageFile) =>
            new Promise((resolve, reject) => {
              const storageRef = projectStorage.ref(imageFile.file.name);
              const uploadTask = storageRef.put(imageFile.file);

              // console.log("action-------", action);

              // // Cancel uploading
              // if (action === "cancel") {
              //   let output = "";
              //   output = uploadTask.cancel();
              //   console.log(output);
              //   setCancelled(output);
              // }

              // Uploads the image
              if (action === "upload") {
                uploadTask.on(
                  "state_changed",
                  (snap) => {
                    let percentage =
                      (snap.bytesTransferred / snap.totalBytes) * 100;
                    console.log(percentage);
                    setProgress(percentage);
                  },
                  reject,
                  () => {
                    // complete function ....
                    storageRef.getDownloadURL().then((url) => {
                      const createdAt = timestamp();
                      collectionRef.add({
                        url,
                        createdAt,
                        type: imageFile.type,
                        level: imageFile.level,
                      });
                      setUrl(url);
                      resolve(url);
                    });
                  }
                );
              }

              // setTimeout(() => {
              //   let output = "";
              //   output = uploadTask.cancel();
              //   console.log(output);
              // }, 1000);
            })
        )
      );
      setUploadCompleted(true);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  //   const onUploadSubmission = e => {
  //  e.preventDefault(); // prevent page refreshing
  //    const promises = [];
  //    files.forEach(file => {
  //     const uploadTask =
  //      firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
  //        promises.push(uploadTask);
  //        uploadTask.on(
  //           firebase.storage.TaskEvent.STATE_CHANGED,
  //           snapshot => {
  //            const progress =
  //              (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //               if (snapshot.state === firebase.storage.TaskState.RUNNING) {
  //                console.log(`Progress: ${progress}%`);
  //               }
  //             },
  //             error => console.log(error.code),
  //             async () => {
  //               const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //                // do something with the url
  //              }
  //             );
  //           });
  //       Promise.all(promises)
  //        .then(() => alert('All files uploaded'))
  //        .catch(err => console.log(err.code));
  // }

  return {
    progress,
    url,
    error,
    uploadCompleted,
    uploadToFirebase,
  };
};

export default useStorage;
