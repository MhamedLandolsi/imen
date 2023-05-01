import * as React from 'react';
import store from "../../../store";

import {useEffect} from "react";
import {connect} from "react-redux";
import DataTable from "../../atom/DataTable";

function Request(props) {
    useEffect(() => {
        store.dispatch.requestState.getRequestListAction().then(() => {
        });
    }, []);

    function validation(id, value) {
        store.dispatch.requestState.validateRequest({id: id, validation: value}).then();
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Request Manager</h1>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Request List</h6>
                </div>
                <div className="card-body">

                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable
                                head={['Action', 'Description', 'Status', 'User']}
                                data={props.request.map((item) => {
                                    return [
                                        (<>

                                            <a className="btn btn-sm btn-info btn-circle"
                                               onClick={() => validation(item.id, 1)}>
                                                <i className="fas fa-check"/>
                                            </a>
                                            <a className="btn btn-sm btn-danger btn-circle"
                                               onClick={() => validation(item.id, 2)}>
                                                <i className="fas fa-window-close"/>
                                            </a>
                                        </>),
                                        item.description,
                                        item.status,
                                        item.user && item.user.name + '(' + item.user.username + ')'
                                    ]
                                })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapState = (state) => ({
    request: state.requestState.request
})
export default connect(mapState, null)(Request)
