import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: login.email, password: login.password })
        });
        const json = await response.json();
        if (json.success) {
            //? Save auth token and Redirect to home page 
            localStorage.setItem('token', json.authToken);
            props.showAlert('Logged in Successfully', 'success', 'Welcome!!');
            navigate('/');
        } else {
            props.showAlert('Invalid Credentials', 'danger', 'Opps!!');
        }
    }

    const [login, setLogin] = useState({ email: '', password: '' });

    const onChange = (e) => {
        // ... Spread operator
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    return (
        <>
            <style jsx='true'>
                {`
                    .loginBtn {
                        color: #fff;
                        text-decoration: none !important;
                        outline: 0 !important;
                        box-shadow : none !important;
                        background-color: #6f42c1;
                    }

                    .loginBtn:hover {
                        color: #fff;
                        background-color: #61428f !important;
                    }
                `}
            </style>

            <div className='mt-4 container center'>
                <h3 className="navbar-brand fw-bold">Welcome to i<span style={{ color: '#6f42c1' }}>Note</span>book</h3>
                <div className="card bg-light col-xxl-4 col-md-6">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"> <i className="bx bxs-envelope" style={{ color: '#6f42c1' }}></i> Email address</label>
                            <input type="email" className="form-control" id="email" name='email' value={login.email} aria-describedby="emailHelp" onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><i className="bx bxs-lock" style={{ color: '#6f42c1' }} ></i> Password</label>
                            <input type="password" className="form-control" id="password" name='password' value={login.password} onChange={onChange} />
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn loginBtn d-block col-xxl-3 col-xl-4 col-lg-4 col-md-6 mx-auto">Login</button>
                    </div>
                    <hr />
                    <p className='text-center'>Don't have an account? <Link to='/signup' className='fw-bold' style={{ textDecoration: 'none' }}>Sign Up</Link> </p>
                </div>
            </div>
        </>
    );
};

export default Login;
