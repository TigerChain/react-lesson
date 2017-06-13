import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header": {
        "height": 100,
        "backgroundColor": "white",
        "paddingTop": 15,
        "paddingBottom": 15,
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "paddingRight": 25
    },
    "logo": {
        "marginLeft": 40,
        "display": "flex",
        "alignItems": "center"
    },
    "headerLogo": {
        "alignItems": "center",
        "display": "flex"
    },
    "logo span": {
        "color": "#70b1f2",
        "fontSize": 16,
        "marginLeft": 8
    },
    "shuxian": {
        "marginLeft": 100,
        "marginRight": 25
    },
    "searchstyle": {
        "border": "none",
        "zoom": 1
    },
    "navright": {
        "display": "flex",
        "alignItems": "center"
    },
    "slectLangueButton": {
        "marginLeft": 10
    }
});