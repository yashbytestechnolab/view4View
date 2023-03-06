import RBSheet from "react-native-raw-bottom-sheet";
import { AutoPlayScreen } from "../modules/AutoPlay/AutoPlayBuy";


interface bottomSheetProps {
    bottomSheetRef?: any,
    childrens?: any,
    bottomRef?:any
}

const BottomSheet = (props: bottomSheetProps) => {
    let {bottomRef} = props;
    return (
        <RBSheet
            ref={bottomRef}
            height={380}
            openDuration={250}
            customStyles={{
                container: {
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius:16,
                    borderTopLeftRadius:16
                }
            }}
        >
            <AutoPlayScreen />
        </RBSheet>
    )
}
export default BottomSheet;