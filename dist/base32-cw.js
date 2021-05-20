/*! github.com/niyari/base32-clockwork-ts/ MIT */
export class Base32Clockwork {
    constructor(options = {}) {
        this._lastError = { isError: false, message: '' };
        this.padding = void 0 !== options.padding && !0 === options.padding ? !0 : !1;
        this.array = void 0 !== options.array && !0 === options.array ? !0 : !1;
        this.raw = void 0 !== options.raw && !0 === options.raw ? !0 : !1;
    }
    encode(inputO) {
        this._lastError = { isError: !1, message: '' };
        const dic = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const convUint8 = (input) => {
            if (typeof input !== "object") {
                return new TextEncoder().encode(input);
            }
            return new Uint8Array(input);
        };
        const input = convUint8(inputO);
        let output = '';
        let value = 0;
        let offset = 0;
        for (let i = 0; i < input.byteLength; i++) {
            value = (value << 8) | input[i];
            offset += 8;
            if (offset >= 5) {
                output += dic[(value >>> (offset - 5)) & 31];
                offset -= 5;
            }
            if (offset >= 5) {
                output += dic[(value >>> (offset - 5)) & 31];
                offset -= 5;
            }
        }
        if (offset > 0) {
            output += dic[(value << (5 - offset)) & 31];
        }
        if (this.padding && output.length % 8) {
            output += '='.repeat(8 - (output.length % 8));
        }
        if (this.array) {
            return this.returnArray(output);
        }
        return output;
    }
    decode(input = '') {
        this._lastError = { isError: !1, message: '' };
        const dic = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        input = input.toUpperCase().replace(/\s|\=+$/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
        if (/^(()|[A-TV-Z0-9=]+)$/.test(input) === false) {
            this._lastError = { isError: !0, message: 'Invalid data: Input strings.' };
            input = '';
        }
        const length = input.length;
        const output = new Uint8Array(length * 5 / 8);
        let value = 0;
        let index = 0;
        let offset = 0;
        for (let i = 0; i < length; i++) {
            value = (value << 5) | dic.indexOf(input[i]);
            offset += 5;
            if (offset >= 8) {
                output[index++] = (value >>> (offset - 8)) & 255;
                offset -= 8;
            }
        }
        if (this.array) {
            if (this.raw) {
                return this.returnArray(output);
            }
            return this.returnArray(new TextDecoder().decode(output.buffer));
        }
        if (this.raw) {
            return output;
        }
        return new TextDecoder().decode(output.buffer);
    }
    returnArray(data) {
        let ret = { data: data };
        if (this._lastError.isError) {
            ret.error = this._lastError;
        }
        return ret;
    }
    lasterror() {
        return this._lastError;
    }
}
