import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">i<span style={{ color: '#6f42c1' }}>Note</span>book</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                        <style jsx="true">
                            {`
                                button[aria-expanded="false"] > .close{
                                    display: none;
                                }
                        
                                 button[aria-expanded="true"] > .open{
                                    display: none;
                                }
                                
                                .navbar-toggler{
                                    border: none;
                                    font-size: 30px;
                                }
                                
                                .navbar-toggler:focus {
                                    text-decoration: none;
                                    outline: 0;
                                    box-shadow: none;
                                }

                                .login:hover, .signup:hover, .logout:hover {
                                    background-color: #61428f !important;
                                }
                            `}
                        </style>

                        <i className="bx bx-menu open fw-bold text-dark"></i>
                        <i className="bx bx-x close fw-bold text-dark"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav text-center me-auto mb-2 mb-lg-0">
                            {/* <NavLink activeclassname="active" className="nav-link" to="/">Home</NavLink> */}
                            <NavLink activeclassname="active" className="nav-link text-dark" to="/about">About</NavLink>
                        </div>
                        {!localStorage.getItem('token') ? <form className="d-flex gap-2 button">
                            <Link className="btn login" to='/login' style={{ backgroundColor: '#6f42c1', color: '#ffffff', textDecoration: 'none', outline: '0', boxShadow: 'none' }}>Login</Link>
                            <Link className="btn signup" to='/signup' style={{ backgroundColor: '#6f42c1', color: '#ffffff', textDecoration: 'none', outline: '0', boxShadow: 'none' }}>SignUp</Link>
                        </form> : <Link onClick={handleLogout} className="btn logout" to='/' style={{ backgroundColor: '#6f42c1', color: '#ffffff', textDecoration: 'none', outline: '0', boxShadow: 'none' }}>Logout</Link>}
                    </div>
                </div>
            </nav >
        </div >
    );
};

export default Navbar;
