import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { fetchSignInMethodsForEmail,linkWithCredential } from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  console.log(user);
  
  // add user to firestore
};

// export const doSignInWithFacebook = async () => {
//   const provider = new FacebookAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   const user = result.user;
//   console.log(user);
//   // const credential = FacebookAuthProvider.credentialFromResult(result);
//   // const accessToken = credential.accessToken;

//   // // Optional: Use access token to fetch more user info from Graph API
//   // const fbResponse = await fetch(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${accessToken}`);
//   // const fbData = await fbResponse.json();

//   // const userData = {
//   //   uid: user.uid,
//   //   displayName: user.displayName || fbData.name,
//   //   email: user.email || fbData.email,
//   //   photoURL: user.photoURL || fbData.picture?.data?.url,
//   //   provider: user.providerId,
//   // };

//   // console.log("Final Facebook user data:", userData);

//   // // Here you might want to set this in your auth context or DB

//   // return userData;

//   // add user to firestore
  
// };

export const doSignInWithFacebook = async (setErrorMessage) => {
  const provider = new FacebookAuthProvider();
  const db = getDatabase();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await set(ref(db, 'users/' + user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: 'facebook'
    });

    console.log("Facebook login successful and user saved to Realtime DB");
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = FacebookAuthProvider.credentialFromError(error);
      const email = error.customData.email;
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes('password')) {
        setErrorMessage("An account already exists with this email using Email/Password. Please sign in using your email.");
      } else if (methods.includes('google.com')) {
        setErrorMessage("Account exists with Google. Please sign in with Google to link your Facebook account.");
        
        try {
          const googleProvider = new GoogleAuthProvider();
          const googleResult = await signInWithPopup(auth, googleProvider);

          if (googleResult.user) {
            await linkWithCredential(googleResult.user, pendingCred);

            await set(ref(db, 'users/' + googleResult.user.uid), {
              uid: googleResult.user.uid,
              displayName: googleResult.user.displayName,
              email: googleResult.user.email,
              photoURL: googleResult.user.photoURL,
              provider: 'google+facebook'
            });

            console.log("Facebook account linked to Google and saved to DB");
          }
        } catch (linkError) {
          setErrorMessage("Failed to link Facebook with Google account.");
          console.log(linkError)
        }
      } else {
        // setErrorMessage(`Account already exists with: ${methods.join(', ')}`);
        setErrorMessage("Account already exists. Try logging in with another email or using a different sign-in method.");
      }
    } else {
      console.error("Facebook login failed", error);
      setErrorMessage("Facebook login failed. Please try again.");
    }
  }
};


export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};