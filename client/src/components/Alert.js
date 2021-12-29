import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const Alert = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleYes = (e) => {
		props.alertFunction();
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow} style={{ zIndex: 9999 }}>
				Log Out
			</Button>

			<Modal show={show} onHide={handleClose} keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Log Out</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to log out?</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={handleClose}>
						No
					</Button>
					<Button variant="danger" onClick={handleYes}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Alert;
