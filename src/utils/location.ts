import { ref, set } from "firebase/database";
import { auth, rtdb } from '../firebase.ts';

/**
 * Updates the user's live location in firebase Realtime Database.
 * @param latitude - The latitude of the user's location.
 * @param longitude - The longitude of the user's location. 
 */

export function updateLiveLocation(latitude: number, longitude: number){
    const userId = auth.currentUser?.uid; //Get the logged-in user's ID
    if(!userId) return; // Stop  if no user is logged in

    //Save location to Realtime Database under "locations/{userId}"
    set(ref(rtdb, `locations/${userId}`), {
        latitude,
        longitude,
        timestamp: Date.now(),
    });
}