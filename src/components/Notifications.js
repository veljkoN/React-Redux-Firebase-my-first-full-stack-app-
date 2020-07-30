import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment'

const Notifications = ( props ) => {
    const {notifications} =props
    return (
        <div className='card-body '>
            <span className='card-title'>Notifications</span>
            <ul className="list-group list-group-flush">
            {
                notifications && notifications.map(item=>{
                    return (
                        <li className="list-group-item" key={item.id}>
                                <span className='text-danger'>{item.user} </span>
                            <span>{item.content}</span>
                            <div className='gray-text'>
                                {moment(item.time.toDate()).fromNow()}
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        todos:state.firestore.ordered.todoList,
        notifications:state.firestore.ordered.notifications
        
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        //{ collection:'todoList'},
        { collection:'notifications', limit :5, orderBy:['time','desc']}
    ])
)  (Notifications)
