import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "commonstyle h1": {
        "fontSize": 28,
        "color": "rgba(0,0,0,.85)",
        "fontWeight": "500",
        "lineHeight": 40,
        "marginBottom": 24,
        "marginTop": 8,
        "fontFamily": "Lato,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif"
    }
});