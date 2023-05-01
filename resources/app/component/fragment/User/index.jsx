import * as React from 'react';
import store from "../../../store";
import Popin from "../../atom/Popin"

import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Model from "./model";
import ModelNewUser from "./modelNewUser";
import DataTable from "../../atom/DataTable";

function User(props) {
    useEffect(() => {
        store.dispatch.userManagerState.getUserListAction();
    }, []);
    const [viewModel, setViewModel] = useState(null);
    const [change, setChange] = useState({});
    const [doors, setDoors] = useState([]);
    const [allDoors, setAllDoors] = useState([]);
    const [render, forceRender] = useState(1);

    async function editOrSave(user) {
        if (user) {
            setViewModel({head: 'Edit User', action: 'Update'});
            setChange({...user});
            let oldDoors = [];

            user.access_door.map((access) => {
                oldDoors.push(access.door.rasberry_pi_code);
            });
            setDoors(oldDoors);
            setAllDoors((await store.dispatch.doorState.getDoorsListAction()))
        } else {
            setViewModel({head: 'Register New User', action: 'Add'});
            setChange({});
        }
    }

    const update = e => {
        e.preventDefault();

        store.dispatch.userManagerState.saveUpdateUser({
            username: change.username,
            name: change.name,
            admin: change.is_admin,
            doors: doors,
        }).then(
            () => {
                setViewModel(null);
                setDoors([]);
            }
        );
    };
    const save = e => {
        e.preventDefault();

        store.dispatch.userManagerState.registerUser({
            username: change.username,
            name: change.name,
            password: change.password,
        }).then(
            () => {
                setViewModel(null);
            }
        );
    };

    const deleteAction = item => {
        store.dispatch.userManagerState.delete({code: item.username}).then(() => {
        });
    };

    const changeData = data => {
        setChange({...change, ...data});
    };

    const addDoor = code => {
        const exist = doors.filter((d) => {
            return d === code
        });

        if (exist.length === 0) {
            doors.push(code);
            forceRender(render + 1);
            setDoors(doors)
        }
    };

    const removeDoor = code => {
        setDoors(doors.filter((d) => d !== code));
        forceRender(render + 1);

    };

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">User Manager</h1>
                <a className="btn btn-success" onClick={() => editOrSave()}> Register new User</a>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">User List</h6>
                </div>
                <div className="card-body">

                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable
                                head={['Action', 'Username', 'Name', 'IsAdmin', 'Access Doors']}
                                data={props.users.map((item) => {
                                    return [
                                        (<>
                                            <a className="btn btn-sm btn-info btn-circle"
                                               onClick={async () => await editOrSave(item)}>
                                                <i className="fas fa-pen-nib"/>
                                            </a>
                                            <a className="btn btn-sm btn-danger btn-circle"
                                               onClick={() => deleteAction(item)}>
                                                <i className="fas fa-trash"/>
                                            </a>
                                        </>),
                                        item.username,
                                        item.name,
                                        item.is_admin ? "Yes" : "No",
                                        item.access_door.map((access) => (

                                            <div
                                                key={access.door.rasberry_pi_code}>{access.door.description + '(' + access.door.rasberry_pi_code + ')'}</div>
                                        ))
                                    ]
                                })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {viewModel && viewModel.action === 'Update' &&
            <Popin head={viewModel.head} onClose={() => setViewModel(false)}>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    {render && (<Model update={update}
                                       change={(data) => changeData(data)}
                                       add={(code) => addDoor(code)}
                                       remove={(code) => removeDoor(code)}
                                       action={viewModel.action}
                                       doors={doors}
                                       all={allDoors}
                                       user={change}
                    />)}
                </div>

            </Popin>}
            {viewModel && viewModel.action === 'Add' &&
            <Popin head={viewModel.head} onClose={() => setViewModel(false)}>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <ModelNewUser save={save} change={(data) => changeData(data)}/>)
                </div>

            </Popin>}

        </>
    )
}


const mapState = (state) => ({
    users: state.userManagerState.users
})
export default connect(mapState, null)(User)
