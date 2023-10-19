import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Router from 'next/router';
import { useState } from 'react';

// function to login into crb and getting the token
const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
        infinityCode:"rw123456789"
    })
    const loginHandler = async(e) => {
        e.preventDefault();
        try {
            const response=await axios.post("https://secure3.crbafrica.com/duv2/login",data)
            const loginTime = new Date().getTime();
            console.log(loginTime)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("loginTime",loginTime)
            Router.push('/crb/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4 rounded">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter username"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                            <small id="emailHelp" className="form-text text-muted">Please enter URWEGO username</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <button type="submit"
                                className="btn btn-primary mt-2"
                                style={{ width: "100%" }}
                                onClick={loginHandler}>
                                Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
