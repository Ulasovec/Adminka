import React, {useState} from 'react';
import {Modal} from "react-bootstrap";


function InfoModal({title, message}) {
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
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
            </Modal>
        </>
    );
}

export default InfoModal;