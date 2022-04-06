import React, {useState} from 'react';
import {Modal} from "react-bootstrap";



function BootModal() {
    const [smShow, setSmShow] = useState(true);


    return (
        <>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Login Failed.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Error: </Modal.Body>
            </Modal>
        </>
    );
}

export default BootModal;