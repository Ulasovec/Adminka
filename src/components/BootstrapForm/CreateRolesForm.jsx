import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import MyButtonForm from "../../UI components/MyButtonForm";
import {BsPlusSquare} from "react-icons/bs";


const CreateRolesForm = ({roles, setRolesName, handlerCreate}) => {

    //const [id, setId] = useState(2);

    function inputHandler(e) {
        e.preventDefault();
        //setRolesName({id: id})
        //setRolesArray([...rolesArray, roles]);
        //setId(id + 1);
        handlerCreate();
        setRolesName({name: "", about: ""});
    }

    return (
        <Form onSubmit={inputHandler}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <MyButtonForm data-title="Add"><BsPlusSquare style={{fontSize: '1.8em'}}/></MyButtonForm>
                </div>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                              value={roles.name}
                              onChange={(e) => setRolesName({name: e.target.value})}/>
                {/*<Button variant="outline-success"  id="button-addon2" type="submit" style={{marginRight:'8px'}}>*/}
                {/*    Save*/}
                {/*</Button>*/}


            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3}
                              value={roles.about}
                              onChange={(e) => setRolesName({about: e.target.value})}/>

            </Form.Group>
        </Form>
    );
};

export default CreateRolesForm;