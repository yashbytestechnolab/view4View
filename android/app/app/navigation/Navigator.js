import {NavigationActions} from 'react-navigation';
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef()
export let _navigator;
function setTopLevelNavigator(navigatorRef) {
  console.log("navigatorRef==>", navigatorRef);
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
_navigator.dispatch(
  NavigationActions.navigate({
    routeName,
    params,
  }),
);
}
function dispatch(resetAction) {
  _navigator.dispatch(resetAction
  );
  }

  export function push(...args) {
    if (navigationRef.isReady()) {
      console.log("aasdjasdjasd====> ", args);
      navigationRef.dispatch(StackActions.push(...args));
    }
  }

// add other navigation functions that you need and export them

export default {
  setTopLevelNavigator,
  navigate,
  dispatch,
  push
};
