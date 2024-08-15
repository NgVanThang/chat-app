import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from '~/config/firebase';
import { addDocument } from './firebaseService';

//const { auth, googleProvider, facebookProvider, getRedirectResult } = firebase;

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { isNewUser } = getAdditionalUserInfo(result);
    const user = result.user;

    if (isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerData[0].providerId,
        //  keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }

    localStorage.setItem('isNewUser', isNewUser);
    return { user, isNewUser };
  } catch (error) {
    return false;
  }
};

const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    return user;
  } catch (error) {
    console.error('Error signing in with Facebook', error);
    return false;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);

    return true;
  } catch (error) {
    return false;
  }
};

export { signInWithGoogle, signInWithFacebook, signOutUser };
