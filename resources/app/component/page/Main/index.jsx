import * as React from 'react';
import {useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Door from "../../fragment/Door";
import DashBoard from "../../fragment/DashBoard";
import User from "../../fragment/User";
import Request from "../../fragment/Request";
import Chat from "../../fragment/Chat";
import routesList from "../../../route";
import {connect} from "react-redux";
import store from "../../../store";
import "../../../static/custom.css"

const Main = (props) => {
    const [showMenu, setShowMenu] = useState(false)
    const [toggleSideMenu, setToggleSideMenu] = useState(false)
    return (
        <BrowserRouter>
            <div id="wrapper">
                <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" + (toggleSideMenu ? ' toggled' : '')}>
                    <div className="sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-door-open"/>
                        </div>
                        <div className="sidebar-brand-text mx-3">OpenDoor</div>
                    </div>

                    {routesList.map((link) => (
                        <li className="nav-item" key={link.name}>
                            <NavLink to={link.path}
                                     className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                <i className={"fas fa-fw " + link.icon}/>
                                <span>{link.name}</span></NavLink>
                        </li>
                    ))}
                    <hr className="sidebar-divider d-none d-md-block"/>
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" onClick={() => setToggleSideMenu(!toggleSideMenu)}>
                            <i className={"fas " + (toggleSideMenu ? "fa-arrow-right": "fa-arrow-left")}/>
                        </button>
                    </div>
                </ul>

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <ul className="navbar-nav ml-auto">
                                <div className="topbar-divider d-none d-sm-block"/>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link hover-color"
                                       style={{cursor: 'pointer', color:"#456bd8"}}
                                       onClick={() => setShowMenu(!showMenu)}
                                    >
                                        <i className="fas fa-user"/> {props.user.name}
                                    </a>
                                    <div
                                        className={"dropdown-menu dropdown-menu-right shadow animated--grow-in " + (showMenu ? "show" : "")}>
                                        <a className="dropdown-item"
                                           onClick={() => store.dispatch.userState.unsetUser()}>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                                            Logout
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>
                        <div className="container-fluid">
                            <Routes>
                                <Route exact path="/" element={<DashBoard/>}/>
                                <Route exact path="doors" element={<Door/>}/>
                                <Route exact path="users" element={<User/>}/>
                                <Route exact path="requests" element={<Request/>}/>
                                <Route exact path="chat" element={<Chat/>}/>
                            </Routes>

                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright OpenDoor &copy; 2023</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}
const mapState = (state) => ({
    user: state.userState.user
})
export default connect(mapState, null)(Main)
