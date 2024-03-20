import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../App";

const Test =() => {

   const doing =async()=>{
    // Create an initial document to update.
    const frankDocRef = doc(db, "users", "frank");
    await setDoc(frankDocRef, {
        name: "Frank",
        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        age: 12
    });
    
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
        "age": 13,
        "favorites.color": "Red"
    });

    console.log("zapisano")
   }





    return<div>test
        <button onClick={doing}>klick</button>
    </div>
}

export default Test