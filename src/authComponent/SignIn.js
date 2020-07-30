import React from 'react'
import { connect } from 'react-redux'
import {signIn} from '../store/authAction'
import { Redirect } from 'react-router-dom'

class SignIn extends React.Component {
    state={
        email:'',
        password:''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value   //[e.target.id]  uzima id iz elementa
        })
    }
    handleSubmit =(e) =>{
        e.preventDefault()
        this.props.signIn(this.state)
    }
    render() { 
       const { authError, auth } = this.props
       if(auth.uid) return <Redirect to='/dashboard'/>
    return (
            <div className='row'>
                <div className='col-md-5 offset-3 mt-4 jumbotron ' style={{backgroundColor:'#ffaaab'}}>
                    <h5>Login</h5>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Your Email" id="email" name="email" onChange={this.handelChange}/>
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
                        <button type="submit" className="btn" style={{backgroundColor:'#ff1d58',color:'white'}}>Login</button>
                        <div className='red-text center'>
                             <p>{authError}</p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signIn:(creds)=>(dispatch(signIn(creds)))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps) (SignIn);