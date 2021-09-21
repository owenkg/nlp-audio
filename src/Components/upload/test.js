import React, { useState } from "react"
import { API } from "../../utils"
import { storage } from "../../utils/firebase"

const AudioUpload = () => {

    const [audio, setAudio] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadName, setUploadName] = useState("");
    const [uploadLink, setUploadLink] = useState("");

    const handleAudio = (e) => {
        if (e.target.files[0]) {
            setAudio(e.target.files[0])
        }
    }
    const handleFile = (e) => {
        if (e.target.files[0]) {
            setUploadFile(e.target.files[0])
        }
    }

    const handleSave = () => {
        const uploadTask = storage.ref(`audios/${audio.name}`).put(audio);

        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("audios")
                    .child(audio.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setUploadName(audio.name)
                        setUploadLink(url)
                        //console.log(uploadFile)
                    })
            }
        )
    }
    //console.log("audio: ", audio);

    const handleUpload = async () => {
        await API.post(
            "/search/audios",
            {
                audio_name: uploadName,
                audio_url: uploadLink,
                audio_file: uploadFile
            })
            .then((response) => { console.log("success") })
            .catch((error) => {
                console.log(`error occurred ${error}`)

            })
    }

    return (
        <>
            <div>
                Audio Upload <br />
                <input type="file" onChange={handleAudio} placeholder="Select Audio File"/>
                {/* <button onClick={handleSave}>Save</button> */}
            </div>
            <div>
            <input type="file" onChange={handleFile} placeholder="Select Audio Details File"/>
                {/* <button onClick={handleSave}>Save</button> */}
            </div>
            <div>
            <button onClick={handleSave}>Save</button>
            </div>
            <br/>
            {uploadName === "" ?
                <span>No audio saved</span>
                :
                <div>
                    <p>Audio Name: {uploadName}</p>
                    <p>Audio Details: {uploadFile}</p>
                    <p>Audio URL: {uploadLink}</p>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            }

        </>
    )
}
export default AudioUpload