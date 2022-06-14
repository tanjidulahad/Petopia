import { firebaseInitialize } from './firebaseInit'
import { getMessaging, getToken } from "firebase/messaging";
// import messaging from 'firebase/messaging';

firebaseInitialize()
export const useFirebase = () => new Promise(async (resolve, reject) => {
    try {
        const messaging = getMessaging();
        const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY })
        resolve(token)
    } catch (error) {
        reject('')
    }
})