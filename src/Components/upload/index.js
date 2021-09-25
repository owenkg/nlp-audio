import React, { useState } from "react"
import { API } from "../../utils"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../utils/firebase"
import logo from "../../images/radiologo.png"
import Alert from "../../Components/Layout/alert"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Upload = () => {

    const [audio, setAudio] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    
    const [uploadLink, setUploadLink] = useState("");
    const [status, setStatus] = useState(false)


    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, 'audios');

    const handleAudio = (e) => {
        if (e.target.id === "audio") {
            setAudio(e.target.files[0])
        }
    }
    const handleFile = (e) => {
        if (e.target.name === "file") {
            setUploadFile(e.target.files[0])
        }
    }

    const handleSave = () => {
        const uploadTask = uploadBytesResumable(storageRef, audio);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log(url);
                        /* setUploadName(audio.name) */
                        setUploadLink(url)
                        /* NotificationManager.success('Success message', 'Title here'); */
                        //console.log(uploadFile)
                    })
            }
        )
    }
    //console.log("audio: ", audio);

    const handleUpload = async () => {

        let formdata = new FormData()

        formdata.append("url", uploadLink)
        formdata.append("file", uploadFile)

        await API.post(
            "/search/audios",
            formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log("success")
                setStatus(true)
            })
            .catch((error) => {
                console.log(`error occurred ${error}`)
                console.log(uploadFile)
            })
    }

    return (
        <>
            {
                !status ?
                    <>
                        <div>
                            
                            <div className="container">
                                <a href="/">
                                    <img src={logo} />
                                </a>
                                <br />
                                <a href="/" class="mt-3 d-flex">NLP Audio Home</a>
                                <h1>Audio Upload</h1>

                                <hr />
                                <div class="form-group mt-3">
                                    <label class="mr-2">Select Audio File:</label>
                                    <input type="file" id="audio" onChange={handleAudio} />
                                    <button class="btn btn-primary" onClick={handleSave}>Get Url</button>
                                </div>
                                <hr />
                            </div>


                        </div>
                        <br />
                        {uploadLink === "" ?
                            <span></span>
                            :
                            <div class="container">

                                <div class="form-group mt-3">
                                    <p>Audio URL: {uploadLink}</p>
                                    <label class="mr-2">Select Audio Metadata File:</label>
                                    <input type="file" name="file" onChange={handleFile} placeholder="Select Audio Details File" />
                                    <button class="btn btn-success" onClick={handleUpload}>Upload</button>
                                </div>
                                <hr />
                            </div>
                        }
                    </>
                    :
                    <>
                        <Alert />
                        &&
                        <>
                            <div>
                                <div className="container">
                                    <a href="/">
                                        <img src={logo} />
                                    </a>
                                    <br />
                                    <a href="/" class="mt-3 d-flex">NLP Audio Home</a>
                                    <h1>Audio Upload</h1>

                                    <hr />
                                    <div class="form-group mt-3">
                                        <label class="mr-2">Select Audio File:</label>
                                        <input type="file" id="audio" onChange={handleAudio} />
                                        <button class="btn btn-primary" onClick={handleSave}>Get Url</button>
                                    </div>
                                    <hr />
                                </div>


                            </div>
                            <br />
                            {uploadLink === "" ?
                                <span></span>
                                :
                                <div class="container">

                                    <div class="form-group mt-3">
                                        <p>Audio URL: {uploadLink}</p>
                                        <label class="mr-2">Select Audio Metadata File:</label>
                                        <input type="file" name="file" onChange={handleFile} placeholder="Select Audio Details File" />
                                        <button class="btn btn-success" onClick={handleUpload}>Upload</button>
                                    </div>
                                    <hr />
                                </div>
                            }
                        </>
                    </>
            }

        </>
    )
}
export default Upload

