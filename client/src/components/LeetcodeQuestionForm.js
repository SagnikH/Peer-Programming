import React from 'react';
import { Form, Button } from "react-bootstrap";
import styles from "../styles/sessions.module.css";

const Leetcodequestionform = () => {
    return (
        <Form className="d-flex flex-column align-items-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Leetcode Question Link</Form.Label>
                <Form.Control
                    className={styles.input}
                    type="text"
                    placeholder="Enter link"
                />
            </Form.Group>

            <Button className={styles.formButton} type="submit">
                Create Doc
            </Button>
        </Form>
    );
}

export default Leetcodequestionform;
