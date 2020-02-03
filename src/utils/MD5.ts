class MD5 {
    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2-alpha Copyright (C) Paul Johnston 1999 - 2005
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     *
     * Converted to AS3 By Geoffrey Williams
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */

    public static HEX_FORMAT_LOWERCASE:number = 0;
    public static HEX_FORMAT_UPPERCASE:number = 1;

    public static BASE64_PAD_CHARACTER_DEFAULT_COMPLIANCE:string = "";
    public static BASE64_PAD_CHARACTER_RFC_COMPLIANCE:string = "=";

    public static hexcase:number = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
    public static b64pad:string  = ""; /* base-64 pad character. "=" for strict RFC compliance   */


    /**
     * 使用该方法。通过hex哈希方式计算
     * @param string
     * @return
     */
    public static encrypt (str:string):string {
        return MD5.hex_md5 (str);
    }

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    public static hex_md5 (str:string):string {
        return MD5.rstr2hex (MD5.rstr_md5 (MD5.str2rstr_utf8 (str)));
    }

    public static b64_md5 (str:string):string {
        return MD5.rstr2b64 (MD5.rstr_md5 (MD5.str2rstr_utf8 (str)));
    }

    public static any_md5 (str:string, encoding:string):string {
        return MD5.rstr2any (MD5.rstr_md5 (MD5.str2rstr_utf8 (str)), encoding);
    }
    public static hex_hmac_md5 (key:string, data:string):string {
        return MD5.rstr2hex (MD5.rstr_hmac_md5 (MD5.str2rstr_utf8 (key), MD5.str2rstr_utf8 (data)));
    }
    public static b64_hmac_md5 (key:string, data:string):string {
        return MD5.rstr2b64 (MD5.rstr_hmac_md5 (MD5.str2rstr_utf8 (key), MD5.str2rstr_utf8 (data)));
    }
    public static any_hmac_md5 (key:string, data:string, encoding:string):string {
        return MD5.rstr2any(MD5.rstr_hmac_md5(MD5.str2rstr_utf8(key), MD5.str2rstr_utf8(data)), encoding);
    }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    public static md5_vm_test ():boolean {
        return MD5.hex_md5 ("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of a raw string
     */
    public static rstr_md5 (str:string):string {
        return MD5.binl2rstr (MD5.binl_md5 (MD5.rstr2binl (str), str.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    public static rstr_hmac_md5 (key:string, data:string):string {
        var bkey:Array<any> = MD5.rstr2binl (key);
        if (bkey.length > 16) bkey = MD5.binl_md5 (bkey, key.length * 8);

        var ipad:Array<any> = new Array<any>(16), opad:Array<any> = new Array<any>(16);
        for(var i:number = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash:Array<any> = MD5.binl_md5 (ipad.concat (MD5.rstr2binl (data)), 512 + data.length * 8);
        return MD5.binl2rstr (MD5.binl_md5 (opad.concat (hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    public static rstr2hex (input:string):string {
        var hex_tab:string = MD5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output:string = "";
        var x:number;
        for(var i:number = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
            +  hex_tab.charAt( x        & 0x0F);
        }
        return output;
    }

    /*
     * Convert a raw string to a base-64 string
     */
    public static rstr2b64 (input:string):string {
        var tab:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output:string = "";
        var len:number = input.length;
        for(var i:number = 0; i < len; i += 3) {
            var triplet:number = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
            for(var j:number = 0; j < 4; j++) {
                if(i * 8 + j * 6 > input.length * 8) output += MD5.b64pad;
                else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
            }
        }
        return output;
    }

    /*
     * Convert a raw string to an arbitrary string encoding
     */
    public static rstr2any(input:string, encoding:string):string {
        var divisor:number = encoding.length;
        var remainders:Array<any> = [];
        var i:number, q:number, x:number, quotient:Array<any>;

        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend:Array<any> = new Array<any>(input.length / 2);
        for(i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }

        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. We stop when the dividend is zero.
         * All remainders are stored for later use.
         */
        while(dividend.length > 0) {
            quotient = [];
            x = 0;
            for(i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if(quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[remainders.length] = x;
            dividend = quotient;
        }

        /* Convert the remainders to the output string */
        var output:string = "";
        for(i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt (remainders[i]);

        return output;
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    public static str2rstr_utf8 (input:string):string {
        var output:string = "";
        var i:number = -1;
        var x:number, y:number;

        while(++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }

            /* Encode output as utf-8 */
            if(x <= 0x7F)
                output += String.fromCharCode(x);
            else if(x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                    0x80 | ( x         & 0x3F));
            else if(x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F));
            else if(x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F));
        }
        return output;
    }

    /*
     * Encode a string as utf-16
     */
    public static str2rstr_utf16le (input:string):string {
        var output:string = "";
        for(var i:number = 0; i < input.length; i++)
            output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    }

    public static str2rstr_utf16be (input:string):string {
        var output:string = "";
        for(var i:number = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                input.charCodeAt(i)        & 0xFF);
        return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    public static rstr2binl (input:string):Array<any> {
        var output:Array<any> = new Array<any>(input.length >> 2);
        for(var i:number = 0; i < output.length; i++)
            output[i] = 0;
        for(i = 0; i < input.length * 8; i += 8)
            output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
        return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    public static binl2rstr (input:Array<any>):string {
        var output:string = "";
        for(var i:number = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
        return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    public static binl_md5 (x:Array<any>, len:number):Array<any> {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a:number =  1732584193;
        var b:number = -271733879;
        var c:number = -1732584194;
        var d:number =  271733878;

        for(var i:number = 0; i < x.length; i += 16) {
            var olda:number = a;
            var oldb:number = b;
            var oldc:number = c;
            var oldd:number = d;

            a = MD5.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = MD5.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = MD5.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = MD5.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = MD5.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = MD5.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = MD5.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = MD5.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = MD5.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = MD5.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = MD5.md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = MD5.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = MD5.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = MD5.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = MD5.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = MD5.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = MD5.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = MD5.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = MD5.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = MD5.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = MD5.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = MD5.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = MD5.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = MD5.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = MD5.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = MD5.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = MD5.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = MD5.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = MD5.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = MD5.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = MD5.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = MD5.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = MD5.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = MD5.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = MD5.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = MD5.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = MD5.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = MD5.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = MD5.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = MD5.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = MD5.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = MD5.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = MD5.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = MD5.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = MD5.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = MD5.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = MD5.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = MD5.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = MD5.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = MD5.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = MD5.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = MD5.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = MD5.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = MD5.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = MD5.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = MD5.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = MD5.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = MD5.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = MD5.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = MD5.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = MD5.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = MD5.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = MD5.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = MD5.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = MD5.safe_add(a, olda);
            b = MD5.safe_add(b, oldb);
            c = MD5.safe_add(c, oldc);
            d = MD5.safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    public static md5_cmn (q:number, a:number, b:number, x:number, s:number, t:number):number {
        return MD5.safe_add (MD5.bit_rol (MD5.safe_add (MD5.safe_add (a, q), MD5.safe_add(x, t)), s), b);
    }
    public static md5_ff (a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
        return MD5.md5_cmn ((b & c) | ((~b) & d), a, b, x, s, t);
    }
    public static md5_gg (a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
        return MD5.md5_cmn ((b & d) | (c & (~d)), a, b, x, s, t);
    }
    public static md5_hh (a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
        return MD5.md5_cmn (b ^ c ^ d, a, b, x, s, t);
    }
    public static md5_ii (a:number, b:number, c:number, d:number, x:number, s:number, t:number):number {
        return MD5.md5_cmn (c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    public static safe_add (x:number, y:number):number {
        var lsw:number = (x & 0xFFFF) + (y & 0xFFFF);
        var msw:number = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    public static bit_rol (num:number, cnt:number):number {
        return (num << cnt) | (num >>> (32 - cnt));
    }

}