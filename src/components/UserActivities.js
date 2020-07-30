import React from 'react'
import moment from 'moment'
const UserActivities = (props) => {
    const { notifications, profile } = props
    return (
        <div className='mt-1'>
        <h5 className='text-center'>Last activities</h5>
        <div className='noti-scroll'>
        <ul className="list-group list-group-flush">
            {
                notifications && notifications.map(noti=>{
                    if(noti.user===`${profile.firstName} ${profile.lastName}`){
                        return (<li className='list-group-item' key={noti.id}>
                            <h6>{noti.content}</h6>
                            <p  className="text-success">{moment(noti.time.toDate()).fromNow()}</p>
                        </li>
                        )
                    }
                    return null
                })
            }
        </ul>
        </div>
    </div>
    )
}

export default UserActivities
