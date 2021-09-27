import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

const Status = (props) => {
    const [show, setShow] = useState(true);
    const history = useHistory();

    const redirectTag = () => {
        setShow(false)
        history.push("/upload")
    }

    return (
        <div>
            {
                props.location.state.variant === "success" ?
                    <Alert show={show} variant={props.variant}>
                        <Alert.Heading>Success</Alert.Heading>
                        <p>
                            Audio has been uploaded successfully!
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => redirectTag()} variant="outline-success">
                                Close
                            </Button>
                        </div>
                    </Alert>
                    :
                    props.location.state.variant === "danger" ?

                    <Alert variant="danger" show={show}>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            Audio not uploaded. Audio already in system!
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => redirectTag()} variant="outline-danger">
                                Close
                            </Button>
                        </div>
                    </Alert>
                    :
                    <Alert variant="secondary" show={show}>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            Not Authorised !
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => redirectTag()} variant="outline-danger">
                                Go Back
                            </Button>
                        </div>
                    </Alert>
            }


            {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
        </div>
    )
}

export default Status
/*
<Alert variant="danger" show={show} onClose={() => redirectTag()} dismissible>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            Audio not uploaded. Audio already in system!
                        </p>
                    </Alert>
*/