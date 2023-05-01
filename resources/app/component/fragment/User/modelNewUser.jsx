import * as React from "react"

export default function ModelNewUser(props) {
    return (
        <div className="col-md-12">
            <form onSubmit={(e) => props.save(e)}>

                <div className="form-outline mb-4">
                    <label className="form-label">username</label>
                    <input type="text"
                           className="form-control form-control-lg"
                           onChange={(e) => props.change({username: e.target.value})}
                    />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label">name</label>
                    <input type="text"
                           className="form-control form-control-lg"
                           onChange={(e) => props.change({name: e.target.value})}
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label">password</label>
                    <input type="text" minLength="6"
                           className="form-control form-control-lg"
                           onChange={(e) => props.change({password: e.target.value})}
                    />
                </div>

                <button
                    type="submit" className="btn btn-primary btn-lg btn-block mb-4"> create new User
                </button>
            </form>
        </div>
    )
}
