import React from 'react';
import {Button, Modal} from "react-bootstrap";
import Form from "@rjsf/bootstrap-4";

const GenericModalForm = ({show, schema, uiSchema, formData, handleClose, handleSubmit, handleDelete}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formData ? 'Edit data' : 'Add data'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form schema={schema}
                      uiSchema={uiSchema}
                      formData={formData}
                      onChange={e => console.log('Changed :', e.formData)}
                      onSubmit={e => handleSubmit(e.formData)}
                      onError={errors => console.log('Error :', errors)}
                >
                    {formData
                        ? <div>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete item
                            </Button>
                            <Button type="submit" variant="primary" className="m-3">
                                Save Changes
                            </Button>
                        </div>
                        : <Button type="submit" variant="primary" className="m-3">
                            Add
                        </Button>
                    }
                </Form>

            </Modal.Body>
            {/*<Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>*/}
        </Modal>
    );
};

export default GenericModalForm;