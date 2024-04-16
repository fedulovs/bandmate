import { getApps, initializeApp } from 'firebase/app';
import {
    collection,
    addDoc,
    getDocs,
    getFirestore,
    query,
    where,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import dotenv from 'dotenv';
import { Band } from '../band/types';
import { User } from '../user/types';
import { getAuth } from 'firebase/auth';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const bandsItemCollection = 'bands';
const usersItemCollection = 'users';

export const initializeApi = () => {
    let firebase_app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    getFirestore(firebase_app);
    console.log('Frebase was successfully init');
};

export const auth = getAuth(initializeApp(firebaseConfig));

export const getBands = async (): Promise<Band[]> => {
    const db = getFirestore();
    const items: Band[] = [];

    try {
        const querySnapshot = await getDocs(
            collection(db, bandsItemCollection)
        );

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<Band, 'id'>;

            items.push({
                id: doc.id,
                ...data,
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }

    return items;
};

export const getUsers = async (): Promise<User[]> => {
    const db = getFirestore();
    const items: User[] = [];

    try {
        const querySnapshot = await getDocs(
            collection(db, usersItemCollection)
        );

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<User, 'id'>;

            items.push({
                id: doc.id,
                ...data,
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }

    return items;
};

export const getUserById = async (id: string): Promise<User | null> => {
    const db = getFirestore();
    const usersRef = collection(db, 'users');

    // '__name__' is a keyword for documentID in firestore
    const q = query(usersRef, where('__name__', '==', id));

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
        const userData = doc.data() as User;
        userData.id = doc.id;
        return userData;
    }

    return null;
};

export const createUserInDb = async (
    uid: string,
    data: Omit<User, 'id'>
): Promise<any> => {
    const db = getFirestore();

    try {
        await setDoc(doc(db, usersItemCollection, uid), data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addTagsToUser = async (
    uid: string,
    tags: string[]
): Promise<void> => {
    const db = getFirestore();

    try {
        const userRef = doc(db, usersItemCollection, uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            await updateDoc(userRef, { tags: tags });
        } else {
            throw new Error('User not found in database');
        }
    } catch (error) {
        throw error;
    }
};

export const addBandsToUser = async (
    uid: string,
    bands: string[]
): Promise<void> => {
    const db = getFirestore();

    try {
        const userRef = doc(db, usersItemCollection, uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            await updateDoc(userRef, { bands: bands });
        } else {
            throw new Error('User not found in database');
        }
    } catch (error) {
        throw error;
    }
};

export const createTodoItem = async (data: Omit<Band, 'id'>): Promise<any> => {
    const db = getFirestore();

    try {
        await addDoc(collection(db, bandsItemCollection), data);
    } catch (error) {
        return Promise.reject(error);
    }
};
