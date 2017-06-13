import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "main": {
        "height": 150 * vh,
        "display": "flex",
        "flexDirection": "row",
        "backgroundColor": "#ececec",
        "paddingLeft": 35,
        "paddingTop": 20,
        "paddingRight": 35,
        "paddingBottom": 20
    },
    "menu": {
        "paddingTop": 25,
        "height": "100%",
        "width": 240,
        "float": "left",
        "backgroundColor": "white"
    },
    "content": {
        "height": "100%",
        "width": "100%",
        "paddingTop": 35,
        "paddingRight": 35,
        "paddingBottom": 35,
        "paddingLeft": 35,
        "overflow": "auto",
        "alignSelf": "stretch",
        "backgroundColor": "white"
    },
    "footer": {
        "clear": "both",
        "fontSize": 12,
        "background": "#fff",
        "position": "relative",
        "zIndex": 1,
        "color": "rgba(0,0,0,.65)",
        "boxShadow": "0 1000px 0 1000px #fff"
    },
    "footer ul": {
        "overflow": "hidden",
        "marginTop": 0,
        "marginRight": "2%",
        "marginBottom": 0,
        "marginLeft": "2%",
        "listStyle": "none"
    },
    "footer ul li": {
        "float": "left",
        "width": "25%",
        "paddingTop": 24,
        "paddingRight": "2%",
        "paddingBottom": 24,
        "paddingLeft": "2%"
    },
    "footer ul li>h2": {
        "fontSize": 14,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 12,
        "marginLeft": "auto",
        "fontWeight": "500",
        "position": "relative"
    },
    "anticon": {
        "fontSize": 16,
        "position": "absolute",
        "left": -22,
        "top": 3,
        "color": "#aaa"
    },
    "anticon-customer-service:before": {
        "content": "\\E634"
    },
    "anticon-customerservice:before": {
        "content": "\\E634"
    },
    "markdown": {
        "color": "rgba(0,0,0,.65)",
        "fontSize": 14,
        "lineHeight": 1.8
    },
    "markdown h1": {
        "fontSize": 28,
        "color": "rgba(0,0,0,.85)",
        "fontWeight": "500",
        "lineHeight": 40,
        "marginBottom": 24,
        "marginTop": 8,
        "fontFamily": "Lato,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif"
    },
    "markdown aedit-button": {
        "lineHeight": 12,
        "display": "inline-block",
        "marginLeft": 10,
        "height": 12,
        "textDecoration": "none"
    },
    "markdown aedit-button anticon": {
        "display": "block",
        "fontSize": 16
    },
    "markdown aedit-button i": {
        "color": "#999"
    },
    "pic-plus >*": {
        "display": "inline-block!important",
        "verticalAlign": "middle"
    },
    "pic-plus span": {
        "fontSize": 30,
        "color": "#aaa",
        "marginTop": 0,
        "marginRight": 20,
        "marginBottom": 0,
        "marginLeft": 20
    },
    "markdown toc": {
        "background": "#fbfbfb",
        "borderLeft": "2px solid #eee"
    },
    "toc a": {
        "paddingLeft": 16
    },
    "markdown h2": {
        "marginTop": 20,
        "fontSize": 22,
        "marginBottom": 18
    },
    "liststyle": {
        "display": "list-item",
        "marginLeft": 20,
        "listStyleType": "circle",
        "textAlign": "-webkit-match-parent"
    },
    "liststyle img": {
        "verticalAlign": "middle",
        "maxWidth": "100%"
    }
});