import React, { Component } from 'react';
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createTodo } from '../store/actionStore'
import Calendar2 from './Calendar2';

class AddTodo extends Component {
    state={ 
        title:null,
        content:null,
        done:false,
        time:null,
        deadline:null,
        dedalineInDate:null
    }
    stateTemp={ 
        title:null,
        content:null,
        done:false,
        time:null,
        deadline:null,
        dedalineInDate:null
    }
    handleInput = (e) => {
        this.setState({
           [e.target.id]:e.target.value
        })
        this.stateTemp={
            ...this.stateTemp,
            [e.target.id]:e.target.value
        }
    }
    setDeadline = (date,dateInTime) => {
        this.setState({
            ...this.state,
            deadline:date,
            dedalineInDate:dateInTime
        })
        this.stateTemp={
            ...this.stateTemp,
            deadline:date,
            dedalineInDate:dateInTime
        }
    }
  render() {
    const { auth } = this.props
    if(!auth.uid) return <Redirect to='/dashboard'/>
    return (
        <div className='row mt-5'>
            <div className='col-md-4 offset-1 '>
                <h4>Create new todo item</h4>
                <form onSubmit={(e)=>{
                        e.preventDefault()
                    if(this.state.title === null || this.state.content === null || this.state.deadline === null) return
                    
                    this.props.createTodo({
                        ...this.state,
                        time: moment().calendar()
                    })
                    this.stateTemp={
                        ...this.stateTemp,
                        time: moment().calendar()
                    }
                    const title=document.querySelector('#title')
                        title.value=''
                        const content=document.querySelector('#content')
                        content.value=''
                        this.setState({
                            ...this.state,
                            title:null,
                            content:null,
                            deadline:null,
                        })
                    }}>
                    <div class="form-group">
                        <input type="text" id="title" class="form-control" onChange={this.handleInput} placeholder='Title'/>
                    </div>
                    <div class="form-group">
                        <input  type="text" id="content"  class="form-control" onChange={this.handleInput} placeholder='Content'/>
                    </div>
                    <div  style={{position:'relative', zIndex:'1000'}}>
                        <Calendar2 setDeadline={this.setDeadline}/>
                    </div>
                    <button style={{zIndex:'10',marginTop:'20px',backgroundColor:' #ff1d58',color:'white'}} className={` btn ${(this.state.title === null || this.state.content === null || this.state.deadline === null )?('disabled'):(null)
                            }`}  onClick={()=>{
                            }}>Add todo</button> 
                </form>
            </div>
            <div className='col-md-4 offset-1'>
                {
                    this.stateTemp.title!=null && this.stateTemp.time!=null && this.stateTemp.content!=null? (<div >
                    <div className='alert alert-info' >
                        <h4>Last created item:</h4>
                        <h6  className="card-title text-break">Title: {this.stateTemp.title}</h6>
                         <p className='text-break'>Content: {this.stateTemp.content}</p>
                         <p  className="">Created: {this.stateTemp.time}</p>
                         <p className=" red-text text-darken-4">Deadline: { moment( this.stateTemp.deadline, "YYYYMMDD").fromNow()} ({this.stateTemp.dedalineInDate})</p>
                         <p >{this.stateTemp.authorFirstName} {this.stateTemp.authorLastName}</p>
                        <label>
                            <p className=" black-text text-darken-4">Undone</p>
                            <span></span>
                        </label>
                    </div>
                </div>): (<h4>Create item</h4>)
                }
            </div>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        createTodo: (localState) => dispatch( createTodo(localState) )
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (AddTodo);