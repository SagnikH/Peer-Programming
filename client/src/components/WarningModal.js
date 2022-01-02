import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap';

export default function WarningModal(props) {
    const {message, showModal, setShowModal, id, handleDelete} = props;
    const handleClose = () => {
        setShowModal(false);
    }
    const handleYes = () => {
        handleDelete(id);
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Dialog style={{width:'90%'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>No</Button>
                        <Button variant="danger" className="ml-5" onClick={handleYes}>Yes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}
