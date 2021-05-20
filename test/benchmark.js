import { Base32Clockwork as B } from "../dist/base32-cw.js";
(() => {
    const bCount = 1000000;
    let _sT = 0;
    const bStart = (text) => {
        console.log("\u001b[43;30m >>>>> " + text + " \u001b[0m");
        _sT = performance.now();
    }
    const bEnd = () => {
        let endT = performance.now();
        console.log("\u001b[32m " + bCount + " requests\u001b[0m",
            "\u001b[90m" + (endT - _sT).toPrecision(4) + " ms\u001b[0m",
            Math.round(bCount / (endT - _sT) * 1000 * 1000) / 1000 + " per second.\n",
            'Time per request: ' + (endT - _sT) / bCount + " ms.\n");
    }
    const tStr = () => { return Math.floor(Math.random() * bCount).toString(16) };
    try {
        const clkw = new B();
        const clkw_arr = new B({ array: true });
    
        bStart('base32_clockwork.encode');
        for (let i = 0; i < bCount; i++) {
            clkw.encode(i);
        }
        bEnd();
        bStart('base32_clockwork.encode -> decode');
        for (let i = 0; i < bCount; i++) {
            clkw.decode(clkw.encode(i));
        }
        bEnd();

        bStart('base32_clockwork.encode');
        for (let i = 0; i < bCount; i++) {
            clkw_arr.encode(tStr());
        }
        bEnd();
        bStart('base32_clockwork.encode -> base32_clockwork_arr.decode');
        for (let i = 0; i < bCount; i++) {
            clkw_arr.decode(clkw.encode(tStr()));
        }
        bEnd();

        //implementation standard of the node.js
        bStart('nodejs:ascii to base64 encode');
        for (let i = 0; i < bCount; i++) {
            Buffer.from(tStr(), 'ascii').toString('base64');
        }
        bEnd();
        bStart('nodejs:ascii to base64 encode -> decode');
        for (let i = 0; i < bCount; i++) {
            Buffer.from(Buffer.from(tStr(), 'ascii').toString('base64'), 'base64').toString('ascii');
        }
        bEnd();


    } catch (e) {
        console.error("\u001b[41m -> \u001b[0m", e);
        process.exit(1);
    }

    console.log("\u001b[32mDone.\u001b[0m\n");
})();

