import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <>
            <style jsx="true">
                {`  
                    .signup:hover{
                        background-color: #61428f !important;
                    }

                    .icon{
                        margin: 20px auto 0 auto;
                        padding-top: 17px;
                        display: inline-block;
                        text-align: center;
                        border-radius: 50%;
                        width: 72px;
                        height: 72px;
                        background: #6f42c1;
                    }

                    .icon i{
                        font-size: 36px;
                        line-height: 1;
                        color: #ededed;
                    }

                    .credits{
                        background-color: #ededed;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        padding: 15px;
                        text-align: right;
                        font-size: 18px;
                        color: #000;
                        z-index: 999999;
                    }
                    
                    .credits span{
                        color: #6f42c1;
                    }
                `}
            </style>

            <div className='container col-md-6 center'>
                <h1 className="text-center fw-bold">The simple way to <br /> keep notes</h1>
                <h4 className="text-center para">All your notes, synced on all your devices. <span className="fw-bold" to="/">i<span style={{ color: '#6f42c1' }}>Note</span>book</span> now for iOS, Android, Mac, Windows, Linux, or in your browser.</h4>
                <Link className="btn my-2 signup" to='/signup' style={{ backgroundColor: '#6f42c1', color: '#ffffff', textDecoration: 'none', outline: '0', boxShadow: 'none' }}>Sign Up Now</Link>
            </div>

            <div className='container'>
                <h1 className="text-center fw-bold my-3">Comprehensive underneath, <br /> simple on the surface</h1>

                <div className="row text-center row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card bg-light h-100">
                            <div className="icon">
                                <i className='bx bxs-cloud'></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Use it everywhere</h5>
                                <p className="card-text">Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-light h-100">
                            <div className="icon">
                                <i className='bx bxs-purchase-tag'></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Stay organized</h5>
                                <p className="card-text">Add tags to find notes quickly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-light h-100">
                            <div className="icon">
                                <i className='bx bx-history' ></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Always within reach</h5>
                                <p className="card-text">Keep works on your phone, tablet and computer. Everything you add to Keep syncs across your devices so your important stuff is always with you.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-light h-100">
                            <div className="icon">
                                <i className='bx bxs-info-circle' ></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">It’s free</h5>
                                <p className="card-text">Backups, syncing - it's all completely free.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-light h-100">
                            <div className="icon">
                                <i className='bx bx-accessibility'></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Try iNotebook</h5>
                                <p className="card-text">Save your thoughts, wherever you are.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="credits mt-3">
                Designed by <span>Bhavya Khurana</span>
            </div>
        </>
    )
}

export default About
