import React from 'react'
import moment from 'moment'
import  undoneStar  from '../img/undone.png'
import  doneStar  from '../img/done.png'

const UserTodoes = (props) => {
    const { todoTemp, auth } = props
    return (
        <div>
            <h5>List of items</h5>
            <div className='noti-scroll'>
                <ul className="list-group ">
            {
               todoTemp && todoTemp.map(todo=>{
                   if(todo.authorId===auth.uid){
                return(
                    <li key={todo.id} className="list-group-item">
                        <div className="clearfix">
                            <div className='float-right'>
                        {
                            todo.done?(
                            <a href="#!" className="secondary-content"><i className="material-icons"><img alt='done-icon' src={doneStar} style={{width:'25px'}}/></i></a>):(<a href="#!" className="secondary-content"><i className="material-icons"><img alt='undone-icon' src={undoneStar} style={{width:'25px'}}/></i></a>)
                        }
                            </div>
                            <h6 className='text-break'>{todo.title}</h6>
                        </div>
                        <p className='text-break'>{todo.content} <br/>
                            Deadline: <span style={{color:'red'}}>{ moment( todo.deadline, "YYYYMMDD").fromNow()} ({todo.dedalineInDate})</span>
                        </p>
                    </li>
                )}
                else{
                    return null
                    }
                })
            }
                </ul>
            </div>
        </div>
    )
}

export default UserTodoes
