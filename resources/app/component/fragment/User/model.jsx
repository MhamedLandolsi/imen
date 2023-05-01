import * as React from "react";

export default function Model(props) {
    return (
        <div className="col-md-12">
            <form onSubmit={(e) => props.update(e)}>
                <div className="form-outline mb-4">
                    <label className="form-label">name</label>
                    <input type="text"
                           className="form-control form-control-lg"
                           onChange={(e) => props.change({name: e.target.value})}
                           value={props.user.name || ''}
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">IsAdmin</label>
                    <input type="checkbox"
                           onChange={(e) => props.change({is_admin: e.target.checked})}
                           checked={props.user.is_admin}
                    />
                </div>

                <div className="form-outline  mb-4">
                    <label className="form-label">Access Door</label>
                    <select className="form-control form-control-lg" onChange={(e) => props.add(e.target.value)}>
                        <option> select to add a new access</option>
                        {props.all.map((d) => (
                                <option key={d.id} value={d.rasberry_pi_code}> {d.rasberry_pi_code} </option>
                            )
                        )
                        }
                    </select>
                </div>

                <div className="form-outline mb-5" style={{display:'flex',flexWrap:'wrap',alignContent:'baseline'}}>
                        {props.doors.map((d) => (
                            <div key={d} className="card border-left-primary shadow py-2"
                                 style={{width: '100px', display: 'block'}}>
                                <i className="fa fa-window-close m-1" onClick={() => props.remove(d)}/>{d}
                            </div>
                        ))}
                </div>


                <button
                    type="submit" className="btn btn-primary btn-lg btn-block mb-4"> {props.action}
                </button>
            </form>
        </div>
    )
}
