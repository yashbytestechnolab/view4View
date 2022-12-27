import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors?.white,
    },
    iconWrapper: {
      backgroundColor: Colors.pink,
      height: 40,
      width: 40,
      borderRadius: 20,
      position: 'absolute',
      bottom: 120,
      right: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plusIcon: {
      color: Colors.white,
      fontSize: 25,
      fontWeight: '400',
    },
    addButtonWrapper: {
      height: 35,
      width: 55,
      backgroundColor: Colors?.pink,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      marginLeft: 8,
    },
    textInputWrapper: {
      borderBottomColor: Colors?.gray,
      borderBottomWidth: 2,
      width: '80%',
    },
    urlWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });