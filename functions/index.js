const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello ninjas!");
});

//ova funkcija createNotification kreira notifikacije u firesore za sve ove funkcije ispod
const createNotification = ( notification => {
    console.log(notification)
    return admin.firestore().collection('notifications').add(notification)
            .then(doc => {
                console.log('Notification added', doc)
            })
}) 


exports.projectCreated = functions.firestore.document('todoList/{todoId}').onCreate(doc=>{  //ovo je trigger jer kada se kreira novi todo, onda se pokrece ova funkcija
    const project = doc.data()
    const notification = {
        content: 'Added new item',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    } 
    return createNotification (notification)
})

exports.userJoined = functions.auth.user().onCreate(user=>{   //user je trigger-->kad se kreira user                                                             
    return admin.firestore().collection('users').doc(user.uid)   //userJoin ce se prikazati u konzoli za funkcije
            .get().then(doc => {
                const newUser = doc.data()
                const notification = {
                    content:'Joined',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification (notification)
            })
})
/*
exports.userChangeCheck = functions.firestore.document('todoList/{todoId}').onUpdate(doc=>{
    const todoAfter = doc.after.data()
    console.log(todo)
    const notification = {  
        content : 'change item',
        user: 'neki user',
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification (notification)
})
*/

exports.updateUser = functions.firestore
    .document('todoList/{todoUID}')
    .onUpdate((change, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();

      // ...or the previous value before this update
      const previousValue = change.before.data();

      // access a particular field as you would any JS property
      //const name = newValue.name;
      const notification = {  
        content : 'Change status of item',
        user: `${newValue.authorFirstName} ${newValue.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

       return createNotification (notification)
    });

    exports.deleteUser = functions.firestore
        .document('todoList/{todoUID}')
        .onDelete((snap, context) => {
          // Get an object representing the document prior to deletion
          // e.g. {'name': 'Marie', 'age': 66}
          
          const deletedValue = snap.data();
          const notification = {  
            content : 'Delete item',
            user: `${deletedValue.authorFirstName} ${deletedValue.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification (notification)
        });
    
        
       