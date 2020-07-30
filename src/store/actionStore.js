
export const createTodo = (todo) => {
    return ( dispatch, getState, { getFirebase, getFirestore } ) =>{     //vracam funkciju koja uzima dispatch metod;    posle toga prosledjujem dva parametra koja sam dodao thunk-u kao extraparametre u index.js(getFirebase i gerFirestore)
        //make async call to database 
        const firestore=getFirestore()  //ovako kreiram firestore
        const profile = getState().firebase.profile   //ovako pristupam podacima o profilu u firebase
        const authorId=getState().firebase.auth.uid
        firestore.collection('todoList').add({
            ...todo,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt:new Date()
        }).then(() => {
            dispatch({type:'ADD_TODO',todo:todo})  //dispatch funkcja prosledjuje type i objakt todo
        }).catch((err) =>{
            dispatch({type:'CREATE_TODO_ERROR', err})
        })
    }
}
export const remove = (id) => {
    return ( dispatch, getState, { getFirebase, getFirestore } ) => {
        const firestore=getFirestore()
        firestore.collection('todoList').doc(id.toString()).delete()
        .then(()=>{
            dispatch({type:'REMOVE_TODO',id:id})
        })
        .catch((err) =>{
            dispatch({type:'REMOVE_TODO_ERROR', err})
        })
    }
}
export const checkChange = (id,done) => {
    return ( dispatch, getState, { getFirebase, getFirestore } ) => {
        const firestore=getFirestore()
        firestore.collection('todoList').doc(id).update({
            done:!done
        })
        .then(()=>{
            dispatch({type:'UPDATE_CHECK',id:id})
        })
        .catch((err) =>{
            dispatch({type:'UPDATE_CHECK_ERROR', err})
        })
    }
}
export const allTodos =( sum ) => {
    return{
        type:'TODOS_SUM',
        payload:sum
    }
}

