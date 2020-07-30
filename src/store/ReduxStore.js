const state={
    todoesList:[
               
            ]
}
export const createTodoReduer = (todos=state.todoesList,action) => {
    if(action.type==='REMOVE_TODO'){
      return todos
    }
    if(action.type==='REMOVE_TODO_ERROR'){
        console.log('create project error', action.err)
        return todos
    }
    if(action.type==='UPDATE_CHECK'){
        return todos
    }
    if(action.type==='UPDATE_CHECK_ERROR'){
        console.log('create project error', action.err)
        return todos
    }
    if(action.type==='TODOS_SUM'){
        return todos.length
    }
    return todos
}






