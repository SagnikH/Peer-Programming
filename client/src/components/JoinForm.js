import React from 'react'

export default function JoinForm(props) {
    const {handleName, modalResponse, }
    return (
        <div>
            <div className={styles.linkButtons}>
                <InputModal handleName={handleName} />
                <h4>{modalResponse}</h4>

                <Form className="d-flex">
                    <Form.Control
                        className={styles2.formInput}
                        type="text"
                        placeholder="Enter link"
                    />
                    <Button
                        className={styles2.formButton}
                        type="submit"
                        onClick={joinLinkHandler}
                    >
                        Join Link
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default JoinForm;
