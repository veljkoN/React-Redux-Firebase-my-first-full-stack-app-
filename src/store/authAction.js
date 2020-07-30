export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase=getFirebase()    //za podatke iz firestore koristim getFirestore(), a za auth koristim getFirebase
        firebase.auth().signInWithEmailAndPassword(     //ovo je metod koji salje auth u bazu
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type:'LOGIN_SUCCESS'})  //samo dispatch jer ne moram da prosledjujem jos neke podatke
        }).catch( (err) =>{
            dispatch({type:'LOGIN_ERROR', err})
        })
    }
}
export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
            .then(() => {
                dispatch({type:'SIGNOUT_SUCCESS'})
            })
    }
} 
export const signUp = ( newUser ) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {              //firebasee sluzi da sacuvam username i password, firestore sluzi da tu stavljam user-a
        const firebase=getFirebase()
        const firestore=getFirestore()
        firebase.auth().createUserWithEmailAndPassword(     //firebase saljem email i password
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({  //firestore saljem firstN, lastN i kreiram inicijale, ali tek kad metod then vrati response
                firstName: newUser.firstName,
                lastName:newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                imageUrl:null
            })
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})  //nakon sto sam podesio podatke u firebase pa u firestore, onda dodam jos jedan then metod gde su da kazem daje sve ok(ali necu da prsledim nista)
        }).catch(err => {
            dispatch({type:'SIGNUP_ERROR',err})
        })

    }
}




    