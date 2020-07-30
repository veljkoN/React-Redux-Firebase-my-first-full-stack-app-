import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { checkChange } from '../store/actionStore'
import moment from 'moment'
import  deleteIcon  from '../img/deleteIcon.png'
import { remove } from '../store/actionStore'
import { firestoreConnect } from 'react-redux-firebase'  //firestoreConnect je druga high order componenta
import { compose } from 'redux'

const Todo = (props) => {
    const { todos, remove, checkChange, auth } = props
    const [todoTemp, setTodoTemp]=useState(todos)
    useEffect(()=>{
        setTodoTemp(todos)
    },[todos])  
    const stylePargraf={
            textDecoration: 'line-through',
            opacity:'0.8'
        }
    const handleSelect = (e) => {
       console.log(e.target.value)
       if(e.target.value==='done'){
        const newTodos= todos.filter(todo=>{
            return todo.done===true
        })
        setTodoTemp(newTodos)
       }
       else{
        const newTodos= todos.filter(todo=>{
            return todo.done===false
        })
        setTodoTemp(newTodos)
       }
    }
    if(!todoTemp){ 
        return null
    }
        return(
        <>
        <div className="clearfix">
            <div className="float-left">
                <span className="badge badge-info mr-1" style={{fontSize:'1em',cursor:'pointer'}} onClick={()=>{ 
                        setTodoTemp(todos)
                    }}>All item</span>
                <span className="badge badge-info" style={{fontSize:'1em',cursor:'pointer'}} onClick={()=>{ 
                        const newTodos= todos.filter(todo=>{
                            return todo.authorId===auth.uid
                        })
                        setTodoTemp(newTodos)
                    }}>My item</span>
            </div>
        <div className="float-right">
            <div className="form-group">
                <select className="form-control form-control-sm" id="sel1" onChange={(e)=>handleSelect(e)}>
                    <option>status</option>
                    <option value='done'>Done</option>
                    <option value='undone'>Undone</option>
                </select>
            </div>
        </div>
    </div>
    { todoTemp.map(todo=>{
        return (
    <div className="card-body mb-2 shadow-sm " id='divContent' style={{backgroundColor:'#FCEA8C'}} key={todo.id}>
        <div className="clearfix">
            <div className="float-left form-check" style={{display:'block'}} onClick={()=>todo.authorId!==auth.uid && 
                        alert('You can change only item that you created')
                    }>
                <label className='form-check-label' style={todo.authorId===auth.uid? ({cursor:'pointer'}):({cursor:'default'})} >
                        {
                            todo.authorId===auth.uid? (<input type="checkbox" className='form-check-input'  style={todo.authorId===auth.uid? ({cursor:'pointer'}):({cursor:'default'})}  disabled={todo.authorId===auth.uid?(false):(true)} checked={todo.done} onChange={()=> {
                                let done=todo.done  
                                checkChange(todo.id,done)
                                }} />):(null)
                        }
                        <span style={ todo.done===true? ({color:'green'}):(null)}>  {todo.done && !todo.done===false? (<p style={{color:'green'}}>Done</p>):(<p style={{color:'red'}}>Undone</p>)}</span>
                </label>
            </div>
            <div className="float-right">
                <label style={todo.authorId===auth.uid? ({cursor:'pointer'}):(null)} onClick={()=>todo.authorId!==auth.uid && 
                            alert('You can delete only item that you created')
                        }>
                        {   todo.authorId===auth.uid?   (<p onClick={()=>{
                                todo.authorId===auth.uid && remove(todo.id)
                            }} href="#!" className="secondary-content right"><i className="material-icons"><img alt='done-icon' src={deleteIcon} style={{width:'18px'}}/></i></p>):(null)
                        }    
                </label>
            </div>
        </div>
        <span className="text-center text-break" id='spanTitle' style={todo.done?(stylePargraf):(null)} >{todo.title}</span>
        <h6 className='text-break' style={todo.done?(stylePargraf):(null)} >{todo.content}</h6>
        <div className="clearfix">
            <div className="float-left">
                <span  style={todo.done?(stylePargraf):(null)} ><span className='text-danger'>Deadline:</span> { moment( todo.deadline, "YYYYMMDD").fromNow()} ({todo.dedalineInDate})</span><br/>
                <span style={todo.done?(stylePargraf):(null)} >Created: { moment(todo.createdAt.toDate()).fromNow()} by <span className='font-italic text-primary'>{todo.authorFirstName} {todo.authorLastName}</span> </span>
            </div>     
        </div>            
    </div> 
        )
        })}
        </>)
}
const mapSateToProps = (state) => {
    return{
        todos:state.firestore.ordered.todoList,
        auth:state.firebase.auth
    }
}
    
const mapDispatchToProps = (dispatch) => {
    return{
        checkChange:(id,done)=>dispatch(checkChange(id,done)),   //------ovo je bilo pre firebase
        remove:(id)=>dispatch(remove(id))
        
    }
}
    
export default compose(
    connect(mapSateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection:'todoList', orderBy: ['time', 'desc'] },
        {collection:'users'}
    ])
) (Todo)
    