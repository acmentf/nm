import crypto from "crypto";
import Vue from 'vue'
// Md5加密
export const Md5 = (password) => {
    let md5 = crypto.createHash("md5");
    md5.update(password);
    return md5.digest("hex");
}
// 缓存处理
export const storage = {
    setLocal: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    getLocal: function (key) {
        let value = window.localStorage.getItem(key);
        return value;
    },
    setLocalObj: function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getLocalObj: function (key) {
        let value = window.localStorage.getItem(key);
        return JSON.parse(value);
    },
    setSession: function (key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSession: function (key) {
        let value = window.localStorage.getItem(key);
        return JSON.parse(value);
    },
    clearOneLocal: function (key) {
        window.localStorage.removeItem(key);
    },
    clearOneSession: function (key) {
        window.sessionStorage.removeItem(key);
    },
    clearAllLocal: function () {
        window.localStorage.clear();
    },
    clearAllSession: function () {
        window.sessionStorage.clear();
    }
}

//获取用户信息
export const getUserPms = (url, idcode, token, memberid) => {
    return new Promise((resolve, reject) => {
        resolve({
            url,
            idcode,
            token,
            memberid
        })
    });
}

export const getMobileType = () => {
    //  获取设备 是安卓还是苹果


    const type = navigator.userAgent;
    if (/android/i.test(type)) {
        return true; //这是Android平台下浏览器
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(type)) {
        return false; //这是iOS平台下浏览器
    }
}

export const goBackNative = () => {
    //  判断当前设备是Android还是iOS

    let isAndroid = getMobileType();

    //  跳转至原生APP业务员页面
    if (isAndroid) {
        // 安卓
        window.android.goback();
    } else {
        //  苹果
        window.webkit.messageHandlers.goback.postMessage(null);
    }
}


export const getDocumentTop = () => {
    let scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

    return scrollTop;
}

export const getWindowHeight = () => {
    let windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}


export const getScrollHeight = () => {
    let scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
export const arriveBottom = () => {
    return getScrollHeight() == getWindowHeight() + getDocumentTop()
}

export const isAndroid = () => {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

export const getTimestamp = (date) => {
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    return new Date(date).getTime();
}
export const goResourceInfor = (type, code, Msg) => {

    let isAndroid = getMobileType();

    //  跳转至原生APP业务员页面
    if (isAndroid) {
        // 安卓
        window.android.goResourceInfor(type, code, Msg);
    } else {
        //  苹果
        window.webkit.messageHandlers.goResourceInfor.postMessage(JSON.stringify({ type, code, Msg }));
    }
}
//判断是否滚动到底部
export const isScrollBottom = (callback) => {
    window.onscroll = () => {
        let scrollT =
            document.documentElement.scrollTop || document.body.scrollTop;
        let scrollH =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        let clientH =
            (document.documentElement.clientHeight || document.body.clientHeight) +
            50;
        if (scrollT + clientH >= scrollH - 50) {
            callback();
        }
    };
}

//获取浏览器链接参数
export const getQueryVariable = (variable) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

//金额格式
export const fmoney = (s, n = 2) => {
    let t = "";
    if (n) {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];

        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    } else {
        return s
    }
}

// function getDocumentTop() {
//     let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
//     if (document.body) {
//         bodyScrollTop = document.body.scrollTop;
//     }
//     if (document.documentElement) {
//         documentScrollTop = document.documentElement.scrollTop;
//     }
//     scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop; return scrollTop;
// }

// function getWindowHeight() {
//     let windowHeight = 0;
//     if (document.compatMode == "CSS1Compat") {
//         windowHeight = document.documentElement.clientHeight;
//     } else {
//         windowHeight = document.body.clientHeight;
//     }
//     return windowHeight;
// }
// function getWindowHeight() {
//     let windowHeight = 0;
//     if (document.compatMode == "CSS1Compat") {
//         windowHeight = document.documentElement.clientHeight;
//     } else {
//         windowHeight = document.body.clientHeight;
//     }
//     return windowHeight;
// }


//获取东八区时间

export const getDM8 = () => {
    // 目标时区，东8区
    const targetTimezone = -8;
    // 当前时区与中时区时差，以min为维度
    const dif = new Date().getTimezoneOffset();
    // 本地时区时间 + 本地时区时差  = 中时区时间
    // 目标时区时间 + 目标时区时差 = 中时区时间
    // 目标时区时间 = 本地时区时间 + 本地时区时差 - 目标时区时差
    // 东8区时间
    return new Date().getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000);

}

//通过时间戳返回今天，明天，后天日期
export const format = (timestamp, fmt) => {
    let t = new Date(timestamp * 1000)
    var o = {
        "M+": t.getMonth() + 1,                 //月份 
        "d+": t.getDate(),                    //日 
        "h+": t.getHours(),                   //小时 
        "m+": t.getMinutes(),                 //分 
        "s+": t.getSeconds(),                 //秒 
        "q+": Math.floor((t.getMonth() + 3) / 3), //季度 
        "S": t.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;

}

//js 转秒钟转为00:00格式 by FeikeQ
export const realFormatSecond = (second,split) => {
    var secondType = typeof second;
    if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        var _addZero_mimute = (mimute < 10) ? ("0" + mimute) : mimute;
        if(split){
            return _addZero_mimute + "′" + ("0" + second).slice(-2)+ "″";
        }else{
            return _addZero_mimute + ":" + ("0" + second).slice(-2);
        }
        
    } else {
        if(split){
            return "00′00″";
        }else{
            return "00:00";
        }
        
    }
}
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}




