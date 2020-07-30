import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route,Switch } from  'react-router-dom'
import { connect } from 'react-redux'
import  Dashboard  from './components/Dashboard';
import Summary from './components/Summary';
import SignIn from './authComponent/SignIn';
import Signup from './authComponent/SignUp';
import AddTodo from './components/AddTodo';
import ProfileUser from './components/ProfileUser';

class TodoApp extends React.Component {
  render(){
    return (
      <div className="TodoApp ">
      <Router>
        <NavBar/>
        <Switch>
            <Route exact path='/summary' component={Summary}/>
            <Route exact path='/' component={SignIn}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/addtodo' component={AddTodo}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/userProfile' component={ProfileUser}/>
        </Switch>
      </Router>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return{
    todos:store.todos
  }
}
export default connect(mapStateToProps) (TodoApp);
