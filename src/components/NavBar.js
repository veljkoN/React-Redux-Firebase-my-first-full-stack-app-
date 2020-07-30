import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {  signOut } from '../store/authAction'
import  logoutImg from '../img/logout.png'
import profileDefault from '../img/default-profile.png'

const NavBar = (props) => {
  const activeS={
    backgroundColor:' white',
    color:'#eb1736',
    borderRadius:'4px'
  }
    const { auth, profile } =props
    return(
      <nav className="navbar navbar-expand-md  navbar-dark" style={{backgroundColor:' #ff1d58'}}>
        <Link className="navbar-brand white" to='/dashboard' style={{color:'white',fontWeight:'bold'}}>Todo App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar"  >
          <ul className="navbar-nav mr-3">   
          {
            auth.uid? (
                <><li className="nav-item"><NavLink to="/dashboard" className='nav-link' style={{color:'white'}} activeStyle={activeS}>Dashboard</NavLink></li>
                <li className="nav-item"><NavLink to="/addtodo" className='nav-link'  style={{color:'white'}}  activeStyle={activeS}>Add todo</NavLink></li>
                <li className="nav-item"><NavLink  to="/summary" className='nav-link'  style={{color:'white'}}  activeStyle={activeS}>Summary</NavLink></li>
            </>
            ):
            (
              <><li className="nav-item mr-2"><NavLink to={'/'} className='nav-link' style={{color:'white'}}  activeStyle={activeS}>SignIn</NavLink></li>
              <li className="nav-item"><NavLink to={'/signup'} className='nav-link'  style={{color:'white'}}  activeStyle={activeS}>Signup</NavLink></li></>
            )
          }
          </ul>
          { 
            auth.uid?(
          <div className="dropdown mr-5 ml-5">
            <button type="button" className="btn btn-dark dropdown-toggle" style={{borderRadius:'5px'}} data-toggle="dropdown">
              <NavLink  to='/#'><span  className='btn btn-danger rounded-circle'>{profile.initials && profile.initials.toUpperCase()}</span></NavLink>
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to='/userProfile'>My profile  <img style={{width:'17px'}} src={profileDefault} alt='profileDefault'/></Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to='/' onClick={props.signOut}>Logout <img style={{width:'17px'}} src={logoutImg} alt='logout'/></Link>
            </div>
          </div>):(null)
        }
        </div>
      </nav>
    )
}
const MapStateToProps = (state) => {
  return{
    auth:state.firebase.auth,
    profile:state.firebase.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    signOut:()=>dispatch(signOut())
  }
}
export default connect(MapStateToProps,mapDispatchToProps)(NavBar)



