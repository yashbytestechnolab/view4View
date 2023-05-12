import { StyleSheet } from "react-native";
import { Colors, F40018 } from "../../../../Theme";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    vertical: {
        marginVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        height: 0.5,
        backgroundColor: Colors.underline,
    },
    languageContainer: {
        marginHorizontal: 16,
    },
    fontStyle: {
        ...F40018.main,
    },
});
