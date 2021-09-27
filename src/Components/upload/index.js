import React, { useState } from "react"
import { API } from "../../utils"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../utils/firebase"
import logo from "../../images/radiologo.png"
import Status from "../../Components/status"
import { Redirect } from "react-router";


const Upload = () => {

    const [audio, setAudio] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);

    const [uploadLink, setUploadLink] = useState("");
    const [status, setStatus] = useState(false)
    const [variant, setVariant] = useState("")


    const storage = getStorage(firebaseApp);


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

    const handleUpload = async () => {

        let formdata = new FormData()

        formdata.append("url", uploadLink)
        formdata.append("file", uploadFile)

        await API.post(
            "/search/audios",
            formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }

        })
            .then((response) => {
                console.log(response)
                setVariant("success")
                setStatus(true)

            })
            .catch((error) => {
                console.log(error)
                setVariant("danger")
                setStatus(true)

                /* console.log(uploadFile) */
            })
    }

    const handleSave = () => {
        const storageRef = ref(storage, `audios/${audio.name}`);
        const uploadTask = uploadBytesResumable(storageRef, audio);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
                setVariant("danger")
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log(url);
                        /* setUploadName(audio.name) */
                        setUploadLink(url)
                        /* NotificationManager.success('Success message', 'Title here'); */
                        //console.log(uploadFile)
                        handleUpload()
                    })
            }
        )

        
    }

    const redirect = (v_value) => {
        return (
            <Redirect to={{
                pathname: "/status",
                search: `upload_?audio=name+${audio.name}_id`,
                state: { variant: v_value }
            }} />
        )
    }
    //console.log("audio: ", audio);



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
                                    {/* <button class="btn btn-primary" onClick={handleSave}>Get Url</button> */}
                                </div>
                                <hr />
                                <div class="form-group mt-3">
                                    <label class="mr-2">Select Audio Metadata File:</label>
                                    <input type="file" name="file" onChange={handleFile} placeholder="Select Audio Details File" />
                                    {/* <button class="btn btn-primary" onClick={handleSave}>Get Url</button> */}
                                </div>
                                <hr />
                                <button class="btn btn-success" onClick={handleSave}>Upload</button>
                            </div>


                        </div>
                        <br />
                        {/* uploadLink === "" ?
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
                         */}
                    </>
                    :
                    <>
                        {/* <Status variant={variant}/> */}
                        {redirect(variant)}

                    </>
            }

        </>
    )
}
export default Upload

