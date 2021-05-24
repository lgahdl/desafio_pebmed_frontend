import CryptoJS from 'crypto-js';

export default class Utils {

    static removeMask = (string, mask) => {
        string = new String(string);
        let maskCharArray = mask.split("");
        let maskSpecialCharacters = maskCharArray.filter((char) => {
            if (
                char == "#" ||
                char == "A" ||
                char == "X" ||
                char == "N" ||
                char == "?"
            ) {
                return false;
            }
            return true;
        });
        let stringCharArray = string.split("");
        stringCharArray = stringCharArray.filter((char) => {
            if (maskSpecialCharacters.includes(char)) {
                return false;
            }
            return true;
        })
        let removedMaskString = stringCharArray.join("");
        return removedMaskString;

    }

    static clone(obj) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = Utils.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (let attr in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = Utils.clone(obj[attr]);
            }
            return copy;
        }
    }

    static encrypt = (data, key) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    };

    static decrypt = (data, key) => {
        return JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8));
    };

    static formatDate = (date) => {
        if (!date) return null;
        const [year, month, day] = date.split("-");
        return `${day}/${month.padStart(2, "0")}/${year.padStart(2, "0")}`;
    }

    static zeroFill = (number, width)=>{
        width -= number.toString().length;
        if ( width > 0 )
        {
          return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number + ""; // always return a string
    }


    static copyToClipboard = (id, isClass) => {
        const range = document.createRange();
        const containerNode = isClass ? document.getElementsByClassName(id)[0] : document.getElementById(id)[0];
        range.selectNode(containerNode);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }
}