import React, { useState } from "react"
import { API } from "../../utils"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../utils/firebase"
import logo from "../../images/radiologo.png"
import Loading from "../Layout/loading";
import Status from "../../Components/status"
import { Redirect } from "react-router";


const Upload = () => {

    const [audio, setAudio] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    /* const [uploadLink, setUploadLink] = useState(""); */
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [variant, setVariant] = useState("")


    const storage = getStorage(firebaseApp);
    const formdata = new FormData()


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
        setLoading(true)
        const storageRef = ref(storage, `audios/${audio.name}`);
        const uploadTask = uploadBytesResumable(storageRef, audio);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                setLoading(false)
                console.log(error)
                setStatus(true)
                setVariant("danger")
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setLoading(false)
                        //console.log(url);
                        
                        formdata.append("url", url)
                        
                        handleUpload()
                    })
            }
        )

        
    }

    const handleUpload = async () => {

        formdata.append("file", uploadFile)

        await API.post(
            "/search/audios",
            formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }

        })
            .then((response) => {
                setLoading(false)
                //console.log(response.data.status)
                setVariant("success")
                setStatus(true)
                /* console.log(formdata) */
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
                setVariant("danger")
                setStatus(true)
                /* console.log(formdata) */
                /* console.log(uploadFile) */
            })
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
                                </div>
                                
                                <hr />
                                <div class="form-group mt-3">
                                    <label class="mr-2">Select Audio Metadata File:</label>
                                    <input type="file" name="file" onChange={handleFile} placeholder="Select Audio Details File" />
                                </div>
                                <hr />
                                <button class="btn btn-success" onClick={handleSave}>Upload</button>
                                {loading ? <p> loading..</p> : <div></div>}
                            </div>
                        </div>
                        <br />
                    </>
                    :
                    <>
                        {redirect(variant)}
                    </>
            }

        </>
    )
}
export default Upload

