import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function MessageModal(props) {
    const {title, message, showModal, setShowModal} = props;
    const handleClose = () => {
        setShowModal(false);
    }
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Dialog style={{width:'90%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{ message }</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success"  onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}
