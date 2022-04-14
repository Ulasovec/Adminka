import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
    BsPerson,
    BsBookmarkCheckFill,
    BsArrowRepeat,
    BsWrench,
    BsPeopleFill,
    BsPersonLinesFill,
    BsPhoneFill
} from "react-icons/bs";
import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../store/context/UserContext";


const SideBar = () => {
    const navigate = useNavigate();
    const { setIsAuth} = useContext(UserContext);
    return (

        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                if (to === '/logout'){
                    setIsAuth({sid:undefined,role_id:undefined})
                }
                else navigate(to);
                // Add your code here
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="admins">
                <NavItem eventKey=" " >
                    <NavIcon>
                        <BsPerson style={{ fontSize: '1.75em' }}/>
                    </NavIcon>
                    <NavText>
                        Hallo Admin
                    </NavText>
                </NavItem>
                <NavItem eventKey=" ">
                    <NavIcon>
                        <BsPeopleFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Users
                    </NavText>
                    <NavItem eventKey="users">
                        <NavText>
                            Create User
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey=" ">
                    <NavIcon>
                        <BsPersonLinesFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Roles
                    </NavText>
                    <NavItem eventKey="role">
                        <NavText>
                            Create Roles
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey=" ">
                    <NavIcon>
                        <BsPhoneFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Applications
                    </NavText>
                    <NavItem eventKey="applications">
                        <NavText>
                            Application List
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