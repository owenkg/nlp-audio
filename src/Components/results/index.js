import React, { useState, useEffect } from "react"
import { API } from '../../utils';
import Header from '../Layout/header';
import AudioCard from './box';
import Loading from '../Layout/loading';

const Results = (props) => {
    /* const [data, setData] = useState([]) */
    const [audios, setAudios] = useState([])
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(false)


    const getAudios = async () => {
        setLoading(true)
        await API.get('/search/audios')

            .then((response) => {
                setAudios(response.data.data)
                console.log(response.data.data)
                setLoading(false)
                //console.log(`lenght ${audios.length}`)
            })
            .catch((error) => {
                //console.log(`error occurred ${error}`)
                setLoading(false)
            })
    }

    const getAudiosByTag = async () => {
        /* setLoading(true) */
        await API.post(
            '/search_tag',
            {
                tag_name: props.location.state.tag_name
            }
        )
            .then((response) => {
                setAudios(response.data.data)
                //setUrls(response.data.data.URLs)
                //console.log(response.data.data.URLs)
                console.log(response.data.data)
                setLoading(false)
                //console.log(`lenght ${audios.length}`)
            })
            .catch((error) => {
                console.log(`error occurred ${error}`)
                setLoading(false)
            })
    }

    const getAudiosByTopic = async () => {
        await API.post(
            '/search_topic',
            {
                topic_name: props.location.state.topic_name
            }
        )
            .then((response) => {
                setAudios(response.data.data.Audios)
                //console.log(response.data.data.Audios)
                setLoading(false)
                //console.log(`lenght ${audios.length}`)
            })
            .catch((error) => {
                console.log(`error occurred ${error}`)
                setLoading(false)
            })
    }

    const getAudiosBySelected = async () => {
        await API.post(
            '/search_tag',
            {
                tag_name: props.location.state.selected
            }
        )
            .then((response) => {
                setAudios(response.data.data.Audios)
                //console.log(response.data.data.Audios)
                setLoading(false)
                //console.log(`lenght ${audios.length}`)
            })
            .catch((error) => {
                console.log(`error occurred ${error}`)
                setLoading(false)
            })
    }

    const selector = () => {
        if (!props.location.state) {
            getAudios()
        }
        else if (props.location.state.topic_name) {
            getAudiosByTopic()
        }
        else if (props.location.state.tag_name) {
            getAudiosByTag()
        }
        else if (props.location.state.selected) {
            getAudiosBySelected()
        }
        else {
            getAudios()
        }

    }

    useEffect(() => {
        selector()
    }, [])

    return (
        <>
            {loading ?
                <Loading />
                :
                <div>
                    <Header title={'Results'} />
                    <section id="hero" className="d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                {audios.length > 0 ? audios.map((audio) => (
                                    <div className="col d-flex justify-content-start mb-3 mr-3" style={{ width: '50%' }}>
                                        {audio['transcripts'].length > 0 ?
                                            audio['transcripts'].map((item) => (
                                                <AudioCard key={item.filename} name={item.filename} audio_url={item.url} />
                                            ))
                                            :
                                            <h2 style={{ marginTop: '100px', color: 'black' }}>No Audios Available!</h2>
                                        }
                                    </div>
                                ))
                                    : <h2 style={{ marginTop: '100px', color: 'black' }}>No Audios Available!</h2>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    )

}

export default Results;
