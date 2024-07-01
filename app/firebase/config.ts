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
import { IBand } from '../band/types';
import { User } from '../user/types';
import { getAuth } from 'firebase/auth';
import { INotification } from '../notification/types';

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
const notificationsItemCollection = 'notifications';

export const initializeApi = () => {
    let firebase_app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    getFirestore(firebase_app);
    console.log('Frebase was successfully init');
};

export const auth = getAuth(initializeApp(firebaseConfig));

/** Bands */

export const getBands = async (): Promise<IBand[]> => {
    const db = getFirestore();
    const items: IBand[] = [];

    try {
        const querySnapshot = await getDocs(
            collection(db, bandsItemCollection)
        );

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<IBand, 'id'>;

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

export const getBandByName = async (
    bandName: string
): Promise<IBand | null> => {
    try {
        const db = getFirestore();

        const bandsRef = collection(db, 'bands');
        const q = query(bandsRef, where('name', '==', bandName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Assuming you want the first match
            const bandData = doc.data() as IBand;
            bandData.id = doc.id;
            return bandData;
        } else {
            console.log('No bands found with the name:', bandName);
            return null;
        }
    } catch (error) {
        console.error('Error fetching band by name:', error);
        throw error;
    }
};

/** Users */

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

export const addAboutToUser = async (
    uid: string,
    about: string
): Promise<void> => {
    const db = getFirestore();

    try {
        const userRef = doc(db, usersItemCollection, uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            await updateDoc(userRef, { about: about });
        } else {
            throw new Error('User not found in database');
        }
    } catch (error) {
        throw error;
    }
};

/** Notifications */

export const getNotificationByRecipientId = async (
    recipientId: string
): Promise<INotification[]> => {
    try {
        const db = getFirestore();
        const notificationsRef = collection(db, 'notifications');
        const q = query(
            notificationsRef,
            where('recipientUserId', '==', recipientId)
        );
        const querySnapshot = await getDocs(q);

        const notifications: INotification[] = [];

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const notificationData = doc.data() as INotification;
                notificationData.id = doc.id;
                notifications.push(notificationData);
            });
        } else {
            console.log(
                'No notifications found with the recipientId:',
                recipientId
            );
        }

        return notifications;
    } catch (error) {
        console.error('Error fetching notifications by recipientId:', error);
        throw error;
    }
};

export const createNotificationInDb = async (
    data: Omit<INotification, 'id'>
): Promise<any> => {
    const db = getFirestore();

    try {
        const docRef = await addDoc(
            collection(db, notificationsItemCollection),
            data
        );
        console.log('Notification was created with ID:', docRef.id);
        return docRef.id; // Return the ID of the created document
    } catch (error) {
        console.error('Error fetching notifications by recipientId:', error);
        return Promise.reject(error);
    }
};

export const readNotification = async (uid: string): Promise<void> => {
    try {
        const notifications: INotification[] =
            await getNotificationByRecipientId(uid);

        const db = getFirestore();
        const updatePromises = notifications.map((notification) => {
            const notificationRef = doc(db, 'notifications', notification.id);
            return updateDoc(notificationRef, { isRead: true });
        });

        await Promise.all(updatePromises);
    } catch (error) {
        console.error('Failed to mark notifications as read:', error);
    }
};

export const createTodoItem = async (data: Omit<IBand, 'id'>): Promise<any> => {
    const db = getFirestore();

    try {
        await addDoc(collection(db, bandsItemCollection), data);
    } catch (error) {
        return Promise.reject(error);
    }
};
