import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const navigate = useNavigate();

    const [signup, setSignUp] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            //? Save auth token and Redirect to home page 
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert('Account Created Successfully', 'success', 'Thank you for signing up!!');
        } else {
            props.showAlert('Invalid Details', 'danger', 'Opps!!');
        }
    }

    const onChange = (e) => {
        // ... Spread operator
        setSignUp({ ...signup, [e.target.name]: e.target.value });
    }

    return (
        <>
            <style jsx='true'>
                {`
                    .signUpBtn {
                        color: #fff;
                        text-decoration: none !important;
                        outline: 0 !important;
                        box-shadow : none !important;
                        background-color: #6f42c1;
                    }

                    .signUpBtn:hover {
                        color: #fff;
                        background-color: #61428f !important;
                    }
                `}
            </style>
            <div className='mt'>
                <div className='container center'>
                    <div className="card bg-light col-lg-5 col-md-8">
                        <div className="card-body">
                            <div className="text-center fw-bold navbar-brand">i<span style={{ color: '#6f42c1' }}>Note</span>book</div>
                            <h3 className="fw-bold"><span style={{ color: '#6f42c1' }}>Sign Up</span></h3>
                            <p>Get started with your free account</p>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <span htmlFor='name' className="input-group-text" style={{ textDecoration: 'none', borderColor: '#6f42c1' }}><i className="bx bxs-user" style={{ color: '#6f42c1' }}></i></span>
                                    <input onChange={onChange} type="type" className="form-control d-flex row" id="name" name='name' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" style={{ textDecoration: 'none', borderColor: '#6f42c1' }} />
                                </div>
                                <div className="input-group mb-3">
                                    <span htmlFor='email' className="input-group-text" style={{ textDecoration: 'none', borderColor: '#6f42c1' }}><i className="bx bxl-gmail" style={{ color: '#6f42c1' }}></i></span>
                                    <input onChange={onChange} type="email" className="form-control d-flex row" id="email" name='email' placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" style={{ textDecoration: 'none', borderColor: '#6f42c1' }} />
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <span htmlFor='password' className="input-group-text" style={{ textDecoration: 'none', borderColor: '#6f42c1' }}><i className="bx bxs-lock" style={{ color: '#6f42c1' }}></i></span>
                                            <input onChange={onChange} type="password" className="form-control" id="password" name='password' placeholder="Password" aria-label="Password" minLength={5} required aria-describedby="basic-addon1" style={{ textDecoration: 'none', borderColor: '#6f42c1' }} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <span htmlFor='confirmpassword' className="input-group-text" style={{ textDecoration: 'none', borderColor: '#6f42c1' }}><i className="bx bxs-lock" style={{ color: '#6f42c1' }}></i></span>
                                            <input onChange={onChange} type="password" className="form-control" id="confirmpassword" name='confirmpassword' required style={{ textDecoration: 'none', borderColor: '#6f42c1' }} placeholder='Confirm Password' />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn signUpBtn d-block col-xxl-3 col-xl-4 col-lg-4 col-md-6 mx-auto">Sign Up</button>
                            </form>
                        </div>
                    </div>
                    <p className='mt-2'>Already registered <Link to='/login' className='fw-bold' style={{ textDecoration: 'none' }}>Login?</Link> </p>
                </div>
            </div >
        </>
    );

};

export default SignUp;
