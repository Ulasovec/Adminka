import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BsPerson, BsBookmarkCheckFill, BsArrowRepeat, BsWrench } from "react-icons/bs";
import React from 'react';
import {useNavigate} from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    return (

        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                navigate(to);
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
                        <BsBookmarkCheckFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Users
                    </NavText>
                    <NavItem eventKey="users/info">
                        <NavText>
                            User info
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="users/role">
                        <NavText>
                            User role
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
                            Admin prof
                        </NavText>
                    </NavItem>
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