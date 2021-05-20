import { Base32Clockwork as B } from "../dist/base32-cw.js";
(() => {
    let _lPass = true;
    let _lTitle = '';
    let _lFailureList = '';
    let _lTime = 0;
    const lStart = (text) => {
        _lTitle = text;
        console.log("\u001b[43;30m >>>>> " + text + " \u001b[0m");
        _lTime = performance.now();
    }
    const lResult = () => {
        if (_lPass) {
            console.log(" \u001b[44mPASS -> " + _lTitle + " \u001b[0m \n");
        } else {
            console.log("\u001b[101;30m   FAILURE -> " + _lTitle + "   \u001b[0m \n");
        }
        _lTitle = '';
        _lPass = true;
    }
    const cToBe = (value, tobe, title = '') => {
        if (value === tobe) {
            console.log(" \u001b[46m✓ \u001b[0m", title, "\u001b[32m " + value + " \u001b[0m",
                "\u001b[90m" + (performance.now() - _lTime).toPrecision(4) + "ms\u001b[0m");
        } else {
            _lPass = false;
            _lFailureList += _lTitle + " : " + title + "\n";
            console.log("\u001b[101;30m ERROR \u001b[0m", title, ":\u001b[91m " + value + " \u001b[0m", "tobe \u001b[33m " + tobe + " \u001b[0m");
        }
        _lTime = performance.now();
    }
    try {
        lStart('Clockwork Base32');
        const clkw = new B();
        cToBe(clkw.encode('foobar'), 'CSQPYRK1E8', 'Encode');
        cToBe(clkw.decode('CSQPYRK1E8'), 'foobar', 'Decode');
        lResult();

        lStart('Clockwork Reference test');
        cToBe(clkw.encode(''), '', 'Encode: (empty)');
        cToBe(clkw.encode('f'), 'CR', 'Encode: f');
        cToBe(clkw.encode('Hello, world!'), '91JPRV3F5GG7EVVJDHJ22', 'Encode: Hello, world!');
        cToBe(clkw.encode('The quick brown fox jumps over the lazy dog.'), 'AHM6A83HENMP6TS0C9S6YXVE41K6YY10D9TPTW3K41QQCSBJ41T6GS90DHGQMY90CHQPEBG', 'Encode: The quick brown fox ...');
        cToBe(clkw.decode('CR'), 'f', 'Decode CR');
        cToBe(clkw.decode('CR0'), 'f', 'Decode CR0');
        lResult();

        lStart('Clockwork Encode. padding set: false(by default) -> true');
        const clkw_pad_on = new B({ padding: true });
        cToBe(clkw_pad_on.encode('foobar'), 'CSQPYRK1E8======', 'Padding:true');
        const clkw_pad_off = new B({ padding: false });
        cToBe(clkw_pad_off.encode('foobar'), 'CSQPYRK1E8', 'Padding:false');
        lResult();

        lStart('Decode RegExp \\s');
        cToBe(clkw.decode("CS Q\n\r PYR K1 E  8    "), 'foobar', 'Base32');
        lResult();

        lStart('Return Array');
        const clkw_arr_on = new B({ array: true });
        const ret_b32_arr = clkw_arr_on.decode('CSQPYRK1E8');
        cToBe(ret_b32_arr.data, 'foobar', 'Base32');


    } catch (e) {
        console.error("\u001b[41m -> \u001b[0m", e);
        process.exit(1);
    }

    if (_lFailureList !== '') {
        console.log("\n\u001b[101;30m   !!!!! TEST FAILURE !!!!!   \u001b[0m");
        console.log("\u001b[91m" + _lFailureList + "\u001b[0m");
        process.exit(1);
    }
    console.log("\u001b[32mDone.\u001b[0m\n");
})();

