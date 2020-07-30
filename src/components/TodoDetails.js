import React from 'react'
import  undoneStar  from '../img/undone.png'
import  doneStar  from '../img/done.png'
import moment from 'moment'
const TodoDetails = ({todosToDetails, todosInfo}) => {
    if(todosToDetails){
        return(
            <>
            <h5>{todosInfo}</h5>
            <div className=''>
                <ul className="list-group list-group-flush">
                    {
                        todosToDetails.length>0? (null):(<li  className="list-group-item">
                        <h6>There's no {todosInfo}</h6>
                    </li> )
                    }
            {
                todosToDetails.map(todo=>{
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
                )
                })
            }
            </ul>
        </div>
        </>)
    }
    else{
        return null
    }
}

export default TodoDetails
