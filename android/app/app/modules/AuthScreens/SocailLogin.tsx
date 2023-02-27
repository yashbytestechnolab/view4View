import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  LoginManager,
  AccessToken,
  Profile,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import {Platform} from 'react-native';
import {config} from '../../config';
import { useEffect, useState } from 'react';



  // export const GoogleSigned = async () => {
   
  //   GoogleSignin.configure({
  //       webClientId:'815904643318-887s7sndb8j3k564ausb25q1lqesaf3t.apps.googleusercontent.com',
        
  //       offlineAccess: true,
  //     });
      

  //  try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       console.log("userInfo",userInfo)
  //       return {
  //                 ...userInfo,
  //                 email: userInfo?.user?.email,
  //                 isSocial: true,
  //                 googleRefID: userInfo?.idToken,
  //               };
  //     } catch (error:any) {
  //       console.log(">>>>error",error)
  //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //         console.log("press2")
  //         // user cancelled the login flow
  //       } else if (error.code === statusCodes.IN_PROGRESS) {
  //         console.log("press1")
  //         // operation (e.g. sign in) is in progress already
  //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         console.log("press3")
  //         // play services not available or outdated
  //       } else {
  //         console.log("press33")
  //         // some other error happened
  //       }
  //       return error
      
  //   };
  // };
  export const googleLogin = async () => {
    GoogleSignin.configure({
      webClientId:'815904643318-887s7sndb8j3k564ausb25q1lqesaf3t.apps.googleusercontent.com',
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
  
      return {
        ...userInfo,
                  email: userInfo?.user?.email,
                  isSocial: true,
                  googleRefID: userInfo?.idToken,
      };
    } catch (error: any) {
      return error;
    }
  };
export const appleLogin = async () => {
  try {
    const userInfo: any = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const appleAuthRequestResponseCode =
      await appleAuth.getCredentialStateForUser(userInfo.user);

    if (appleAuthRequestResponseCode === appleAuth.State.AUTHORIZED) {
      return {
        ...userInfo,
        idToken: userInfo?.identityToken,
        userName:
          userInfo?.fullName?.givenName + ' ' + userInfo?.fullName?.familyName,
        email: userInfo?.email,
        user: {id: userInfo?.user},
        isSocial: true,
        socialType: 'apple',
      };
    }
  } catch (error: any) {
    return error;
  }
  // return appleAuth.onCredentialRevoked(async () => {
  //   console.log('If this function executes, User Credentials have been Revoked');
  // });
};
export const facebookLogin = async () => {
  let userInfo: any;
  try {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only")
  }
    return LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
          console.log("resultFB",result)
        if (result.isCancelled) {
          userInfo.error = null;
        } else {
          return Profile.getCurrentProfile().then(async currentProfile => {
            if (currentProfile) {
              userInfo = {
                // ...userInfo,
                ...currentProfile,
                isSocial: true,
                user: {id: currentProfile?.userID},
              };
            }
            if (Platform.OS === 'ios') {
              const data = await AuthenticationToken.getAuthenticationTokenIOS();
                return (userInfo = {
                    ...userInfo,

                    isSocial: true,
                    facebookRefID: userInfo?.userID,
                });
            } else {
              const data_1 = await AccessToken.getCurrentAccessToken();
                const response = await fetch(
                    'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
                    data_1?.accessToken);
                const json = await response.json();
                console.log("json", json);
                return await (userInfo = {
                    ...userInfo,

                    isSocial: true,
                    facebookRefID: json.id,
                    email: json?.email,
                });
            }
          });
        }
      },
    );
  } catch (error: any) {
    return error;
  }
};
