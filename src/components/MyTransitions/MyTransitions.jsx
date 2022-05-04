import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import MyButtonForm from "../../UI components/myButtom/MyButtonForm";
import {BsSearch} from '@meronex/icons/bs';
import {CSSTransition} from "react-transition-group";
import './MyTransitions.css'

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
                <CSSTransition in={open} timeout={200} classNames="my-node">
            <div style={{minHeight: '150px'}}>
                        <Card body style={{width: '200px'}}>
                            {children}
                        </Card>
            </div>
                </CSSTransition>
                :
                null
            }
        </>
    );
};

export default MyTransitions;

