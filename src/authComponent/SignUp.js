import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/authAction'
 

class Signup extends Component {
    state={
        email:'',
        password:'',
        firstName:'',
        lastName:''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value   //[e.target.id]  uzima id iz elementa
        })
    }
    handleSubmit =(e) =>{
        e.preventDefault()
        this.props.signUp(this.state)
    }
    render() {
        const { auth, authError } = this.props
        if(auth.uid) return <Redirect  to='/dashboard'/>
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 offset-3 mt-4 jumbotron' style={{backgroundColor:'#ffaaab'}}>
                        <h5>Login</h5>
                        <form onSubmit={this.handleSubmit} >
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Your Email" id="email" name="email" onChange={this.handelChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text">E-mail</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" id="password" name="password" onChange={this.handelChange}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">Password</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="First Name" id="firstName" name="firstName" onChange={this.handelChange}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">First Name</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Last Name" id="lastName" name="lastName" onChange={this.handelChange}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">Last Name</span>
                                </div>
                            </div>
                            <button type="submit" className="btn" style={{backgroundColor:'#ff1d58',color:'white'}}>Sign Up</button>
                            <div className='red-text center'>
                            {
                                authError ? <p>{authError}</p> : null
                            }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        signUp: ( newUser ) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Signup)
