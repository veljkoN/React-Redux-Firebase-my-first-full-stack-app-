import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Notifications from './Notifications'
import Todo from './Todo'

 const Dashboard = (props) => {
    const { auth } = props
    if(!auth.uid) return <Redirect to='/'/>
    return (
        <div className='row mt-2'>
            <div className='col-md-4 offset-md-2 '>
                <Todo/>
            </div>
            <div className='col-md-3 offset-md-2 '>
                <Notifications/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth
    }
}
export default connect (mapStateToProps) (Dashboard)
