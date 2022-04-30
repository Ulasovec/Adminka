import React, {useState} from 'react';
import {Card, Collapse} from "react-bootstrap";
import MyButtonForm from "../../UI components/myButtom/MyButtonForm";
import {BsSearch} from '@meronex/icons/bs';

const MyTransitions = ({children}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MyButtonForm
                onClick={() => setOpen(!open)}
                data-title="Sort by..."
            >
                <BsSearch style={{fontSize: '2em', marginBottom: '12px'}}/>
            </MyButtonForm>
            {(open)
                ?
            <div style={{minHeight: '150px'}}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card body style={{width: '200px'}}>
                            {children}
                        </Card>
                    </div>
                </Collapse>
            </div>
                :
                null
            }
        </>
    );
};

export default MyTransitions;

