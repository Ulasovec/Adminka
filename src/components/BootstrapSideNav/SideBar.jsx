import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BsPerson, BsBookmarkCheckFill, BsArrowRepeat, BsWrench } from "react-icons/bs";

import React from 'react';

const SideBar = () => {
    return (

        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home" >
                    <NavIcon>
                        <BsPerson style={{ fontSize: '1.75em' }}/>
                    </NavIcon>
                    <NavText>
                        Hallo Admin
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <BsBookmarkCheckFill style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Users
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            User info
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            User role
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="Settings">
                    <NavIcon>
                        <BsWrench style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                    <NavItem eventKey="Settings_Prof">
                        <NavText>
                            Admin prof
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Settings_manager">
                        <NavText>
                            Admin manager
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="logout" >
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