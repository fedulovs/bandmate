import { getApps, initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';
import { Band } from '../band/types';
import { User } from '../user/types';

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

export const initializeApi = () => {
    let firebase_app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    getFirestore(firebase_app);
    console.log('Frebase was successfully init');
};

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

export const createTodoItem = async (data: Omit<Band, 'id'>): Promise<any> => {
    const db = getFirestore();

    try {
        await addDoc(collection(db, bandsItemCollection), data);
    } catch (error) {
        return Promise.reject(error);
    }
};
