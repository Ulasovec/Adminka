import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
    BsPerson,
    BsArrowRepeat,
    BsWrench,
    BsPeopleFill,
    BsCollectionFill, BsLink, BsColumns, BsDiagram3
} from "react-icons/bs";
import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../store/context/UserContext";


const SideBar = ({expanded,setExpanded}) => {
    const navigate = useNavigate();
    const {setIsAuth} = useContext(UserContext);
    return (

        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                if (to === '/logout'){
                    setIsAuth({sid: undefined})
                }
                else navigate(to);
                // Add your code here
            }}
            onToggle={()=>setExpanded(!expanded)}
            style = {{position: 'fixed'}}
        >

            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="admin">
                <NavItem eventKey="admin">
                    <NavIcon>
                        <BsPerson style={{ fontSize: '1.75em' }}/>
                    </NavIcon>
                    <NavText>
                        Hallo Admin
                    </NavText>
                </NavItem>
                <NavItem eventKey="ControlList">
                    <NavIcon>
                        <BsPeopleFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Access Control Lists
                    </NavText>
                    <NavItem eventKey="users">
                        <NavText>
                            Users
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="roles">
                        <NavText>
                            Roles
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="applications">
                        <NavText>
                            Applications
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="users-roles">
                        <NavText>
                            Users and Roles
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="tables ">
                    <NavIcon>
                        <BsCollectionFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Content Manager
                    </NavText>
                    <NavItem eventKey="tables">
                        <NavText>
                            Table List
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="models ">
                    <NavIcon>
                        <BsColumns style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Data Models
                    </NavText>
                    <NavItem eventKey="models">
                        <NavText>
                            Model List
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="directories ">
                    <NavIcon>
                        <BsDiagram3 style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Data Directories
                    </NavText>
                    <NavItem eventKey="directories">
                        <NavText>
                            Data Tree
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="logic">
                    <NavIcon>
                        <BsLink style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Business Logic
                    </NavText>
                    <NavItem eventKey="logic">
                        <NavText>
                            Calculator List
                        </NavText>
                    </NavItem>
                </NavItem>

                <NavItem eventKey="settings">
                    <NavIcon>
                        <BsWrench style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                    <NavItem eventKey="settings">
                        <NavText>
                            Admin manager
                        </NavText>
                    </NavItem>
                </NavItem>

                <NavItem eventKey="about">
                    <NavIcon>
                        <BsPerson style={{ fontSize: '1.75em' }}/>
                    </NavIcon>
                    <NavText>
                        About
                    </NavText>
                </NavItem>

                <NavItem eventKey="logout">
                    <NavIcon>
                        <BsArrowRepeat style={{ fontSize: '1.75em' }}/>
                    </NavIcon>
                    <NavText>
                        Logout
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>

    );

};

export default SideBar;