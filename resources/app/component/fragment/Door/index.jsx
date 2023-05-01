import * as React from 'react'
import store from "../../../store"
import Popin from "../../atom/Popin"

import {useEffect, useState} from "react"
import {connect} from "react-redux"
import DataTable from "../../atom/DataTable";

function Door(props) {
    useEffect(() => {
        store.dispatch.doorState.getDoorsListAction()
    }, [])
    const [viewModel, setViewModel] = useState(null)
    const [change, setChange] = useState({})

    function editOrSave(door) {
        if (door) {
            setViewModel({head: 'Edit Door', action: 'Update'})
            setChange({...door})
        } else {
            setViewModel({head: 'Add New Door', action: 'Add'})
            setChange({})
        }
    }

    function update(e) {
        e.preventDefault()
        store.dispatch.doorState.saveUpdateDoor({code: change.rasberry_pi_code, description: change.description}).then(
            () => {
                setViewModel(null)
            }
        )
    }

    function deleteAction(item) {
        store.dispatch.doorState.delete({code: item.rasberry_pi_code})
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Doors Manager</h1>
                <a className="btn btn-success" onClick={() => editOrSave()}> Add new Door</a>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Doors List</h6>
                </div>
                <div className="card-body">
                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable
                                head={['Action', 'Locker Code', 'Description',]}
                                data={props.doors.map((item) => {
                                    return [
                                        (<>
                                            <a className="btn btn-sm btn-info btn-circle"
                                               onClick={() => editOrSave(item)}>
                                                <i className="fas fa-pen-nib"/>
                                            </a>
                                            <a className="btn btn-sm btn-danger btn-circle"
                                               onClick={() => deleteAction(item)}>
                                                <i className="fas fa-trash"/>
                                            </a>
                                        </>),
                                        item.rasberry_pi_code,
                                        item.description
                                    ]
                                })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {viewModel && <Popin head={viewModel.head} onClose={() => setViewModel(false)}>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => update(e)}>
                        <div className="form-outline mb-4">
                            <label className="form-label">Locker Code</label>
                            <input type="text"
                                   className="form-control form-control-lg"
                                   onChange={(e) => setChange({...change, rasberry_pi_code: e.target.value})}
                                   value={change.rasberry_pi_code || ''}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label">Description</label>
                            <input type="text"
                                   onChange={(e) => setChange({...change, description: e.target.value})}
                                   className="form-control form-control-lg"
                                   value={change.description || ''}
                            />
                        </div>

                        <button
                            type="submit" className="btn btn-primary btn-lg btn-block mb-4"> {viewModel.action}
                        </button>
                    </form>
                </div>

            </Popin>}
        </>
    )
}


const mapState = (state) => ({
    doors: state.doorState.doors
})
export default connect(mapState, null)(Door)
