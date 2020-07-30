const initState={
    authError:null
}
const authReducer = (state=initState, action) => {
    switch (action.type){
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError:'Login failed'
                     }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError:null   //ako je login success onda je authError null (onda nema greske u logovanje)
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout success')
            return state
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return{
                ...state,
                authError:action.err.message
            }
        default:
            return state
    }
}

export default authReducer