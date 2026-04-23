import { db } from "@/lib/db/firebase-config";
import type { User as FirebaseUser} from "firebase/auth";
import type { User } from "@/types";
import { 
    doc,
    getDoc,
    setDoc
 } from "firebase/firestore";


function getProvider(user: FirebaseUser): User['provider'] {
    const providerId = user.providerData[0]?.providerId

    if (providerId === "google.com") return 'google'
    return 'password'
}

export async function ensureUserDocument(user:FirebaseUser) {
    const userRef = doc(db, 'users', user.uid)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
        await setDoc(userRef, {
            id: user.uid,
            email: user.email ?? '',
            provider: getProvider(user),
        })
        return
    }

    /* todo -  update doc */
}