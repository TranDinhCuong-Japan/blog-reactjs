import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import requestApi from '../helpers/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({});
    const [formError, setFormError] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);

    const onChange = (event) => {
        let target = event.target;
        setLoginData({

            ...loginData, [target.name]: target.value
        })
    }

    useEffect(() => {
        if(isSubmited){
            validateForm()
        }
    }, [loginData])

    const validateForm = () => {
        let isValid = true;
        const error = {};
        if(loginData.email ==='' || loginData.email === undefined){
            error.email = 'Please enter email'
        }else{
            let valid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(loginData.email);
            if(!valid){
                error.email = "Email not valid"
            }
        }

        if(loginData.password === '' || loginData.password === undefined){
            error.password = 'Please enter password'
        }

        if(Object.keys(error).length >0){
            setFormError(error);
            isValid = false;
        }else{
            setFormError({});
        }

        return isValid;
    }

    const onSubmit = () => {
        let valid = validateForm();
        console.log(loginData);
        if(valid){
            console.log('login Api')
            const test = dispatch(actions.controlLoading(true));
            console.log("test", test)
            requestApi('/auth/login', 'POST', loginData).then(res =>{
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                dispatch(actions.controlLoading(false));
                navigate('/');
            }).catch(err => {
                console.log(err)
                dispatch(actions.controlLoading(false));
                if(typeof err.response !== 'undefined'){
                    if(err.response.status !== 201){
                        toast.error(err.response.data.message, {position: 'top-center'});
                    }else{
                        toast.error('Sever is down. Please try again!', {position: 'top-center'});
                    }
                }
            })
        }
        setIsSubmited(true);
    }

  return (
     <div id="layoutAuthentication" className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name='email' type="email" placeholder="name@example.com" onChange={onChange} />
                                                <label>Email address</label>
                                                {formError.email && <p style={{ color:'red' }}>{formError.email}</p>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name='password' type="password" placeholder="Password" onChange={onChange}/>
                                                <label>Password</label>
                                                {formError.password && <p style={{ color:'red' }}>{formError.password}</p>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary" type='button' onClick={onSubmit}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <Link to='/register'>Need an account? Sign up!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
  )
}

export default Login