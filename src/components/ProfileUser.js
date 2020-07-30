import React, {useState, useEffect} from 'react'
import 'firebase/storage'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import UserTodoes from './UserTodoes'
import UserActivities from './UserActivities'
import moment from 'moment'
import profileDefault from '../img/default-profile.png'
import { Redirect } from 'react-router-dom'

const ProfileUser = (props) => {
    const [todoTemp,setTodoTemp]=useState('')
    const { profile, auth, todos, notifications }=props
    useEffect(()=>{
        setTodoTemp(todos)
    },[todos])
    if(!auth.uid) return <Redirect to='/'/>
    return (
        <div>
            <h4>My profile</h4>
            <div className="row">
                <div className='col-md-3 offset-1'>
                    <div className="container" style={{width:'80%'}}>
                    <h6 className="card-title text-center mt-2">{`${profile.firstName} ${profile.lastName}`}</h6>
                    <img className="card-img-top img-thumbnail img-fluid mx-auto d-block mt-2" src={profileDefault} alt="profileDefaultImage" style={{width:'120px',height:'120px', padding: '2px'}}/>
                        <p className="">E-mail: {auth.email} </p>
                        <p>Created at: { moment().calendar(auth.createdAt)} </p>
                        <p>Last login: { moment().calendar(auth.lastLoginAt)} </p>
                     </div>
                </div>
                <div className='col-md-4'>
                    <UserTodoes todoTemp={todoTemp} auth={auth} />
                </div>
                <div className='col-md-4'>
                    <UserActivities notifications={notifications} profile={profile}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        todos:state.firestore.ordered.todoList,
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        notifications:state.firestore.ordered.notifications
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection:'todoList', orderBy: ['time', 'desc'] },
        { collection:'notifications', limit:500, orderBy:['time','desc']},
        { collection:'users'},
        { collection :'images'}
    ])
) (ProfileUser) 
