import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

  const  configureGoogleSignIn=()=> {
    GoogleSignin.configure({
      webClientId: process.env.webClientId,
      offlineAccess: false,
      scopes: [
               'https://www.googleapis.com/auth/calendar.readonly',
               'https://www.googleapis.com/auth/calendar' ,
               'https://www.googleapis.com/auth/calendar.events'
    ]
    });
  }

  const getCurrentUser= async()=> {
    try {
      const userInfo = await GoogleSignin.signInSilently();
     
        const isSignedIn = await GoogleSignin.getTokens();
        console.log(isSignedIn)
         return  await {success :isSignedIn}
      
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? '' : error.message;
      // console.log(" Google Auth Error ",error)
       return  await  error
       
    }
  }

  const signIn = async () => {
  
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
        const isSignedIn = await GoogleSignin.getTokens();
        return  await {success :isSignedIn}
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return  await  error
     
      } else if (error.code === statusCodes.IN_PROGRESS) {
        
        return  await  error
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return  await  error

      } else {
        return  await  error
      }

    }
  };
  const  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return await  {success: true}
    } catch (error) {

       return await false
    }
  };

  export{
    configureGoogleSignIn,
    getCurrentUser,
    signIn,
    signOut
  }
