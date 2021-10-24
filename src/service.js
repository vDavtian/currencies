import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import db from "./configs/firebase";

export const getData = async (dbCollection) => {
    const querySnapshot = await getDocs(collection(db, dbCollection));
    const data = querySnapshot.docs.map(item => ({ ...item.data(), id: item.id }));

    return data;
};

export const addData = async (data, dbCollection) => {
    const collectionRef = collection(db, dbCollection);

    return await addDoc(collectionRef, data);
};

export const editData = async (data, dbCollection) => {
    const docRef = doc(db, dbCollection, data.id);
    await setDoc(docRef, data);

    return data;
}

export const deleteData = async (id, dbCollection) => {
    const docRef = doc(db, dbCollection, id);
    await deleteDoc(docRef);

    return id;
}