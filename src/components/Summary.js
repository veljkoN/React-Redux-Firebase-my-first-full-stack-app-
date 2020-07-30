import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import TodoDetails from './TodoDetails'
import { firestoreConnect } from 'react-redux-firebase'  //firestoreConnect je druga high order componenta
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const Summary = (props) => {
    const { todos, auth }=props
    const [todosAll,setTodosAll]=useState([todos])
    useEffect(()=>{
        setTodosAll(todos)
    },[todos])
    let newCount=0
    if(todos){
        newCount=todosAll && todosAll.filter(todo=>{
            if(todo.done===true){
                return todo
            }
            return null
        })
    }
    const [todosToDetails,setTodosToDetails]=useState('')
    const [todosInfo, setTodosInfo]=useState('')
    if(!auth.uid) return <Redirect to='/'/>
    return (
        <div className='row'>
            <div className='col-md-5 offset-1'>
            <h5>Summary of todo items</h5>
                <table className="table  table-hover">
                    <tbody>
                    <tr class="table-info">
                        <th>Done item</th>
                        <td>{newCount && newCount.length}</td>
                        <td><button className='btn btn-outline-dark' onClick={()=>{
                            setTodosToDetails(newCount)
                            setTodosInfo('Done items')
                        }}>More details</button></td>
                    </tr>
                    <tr class="table-info">
                        <th>Undone item</th>
                        <td>{todosAll && newCount && todosAll.length -  newCount.length}</td>
                        <td><button className='btn btn-outline-dark' onClick={()=>{
                            let newCount=0
                            if(todosAll){
                                newCount=todosAll.filter(todo=>{
                                    if(todo.done===false){
                                        return todo
                                    }
                                    return null
                                })
                            }
                            setTodosToDetails(newCount)
                            setTodosInfo('Undone items')
                        }}>More details</button></td>
                    </tr>
                    <tr class="table-danger">
                        <th>All item</th>
                        <td >{todosAll && todosAll.length}</td>
                        <td><button className='btn btn-outline-dark' onClick={()=>{
                            setTodosToDetails(todosAll)
                            setTodosInfo('All items in list') 
                        }}>More details</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className='col-md-4 offset-1'>
                <TodoDetails todosToDetails={todosToDetails} todosInfo={todosInfo}/>
            </div>
        </div>
    )
}
const mapSateToProps = (state) => {
    return{
        todos:state.firestore.ordered.todoList,
        auth:state.firebase.auth
    }
}

export default compose(
    connect(mapSateToProps),
    firestoreConnect([
        { collection:'todoList' }
    ])
) (Summary)
