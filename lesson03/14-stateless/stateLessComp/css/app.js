import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "root": {
        "display": "flex",
        "flex": 1,
        "flexDirection": "column",
        "alignItems": "flex-start"
    },
    "imgStyle": {
        "width": 100,
        "height": 100
    },
    "textStyle": {
        "fontSize": 30,
        "color": "red"
    }
});