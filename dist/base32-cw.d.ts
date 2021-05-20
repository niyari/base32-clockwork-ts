/*! github.com/niyari/base32-clockwork-ts/ MIT */
interface Base32Options {
    padding?: boolean;
    array?: boolean;
    raw?: boolean;
}
interface ErrorArray {
    isError: boolean;
    message: string;
}
interface ReturnArray {
    data: string | ArrayBuffer;
    error?: ErrorArray;
}
export declare class Base32Clockwork {
    private _lastError;
    private padding;
    private array;
    private raw;
    constructor(options?: Base32Options);
    encode(inputO: Uint8Array | string): string | ReturnArray;
    decode(input?: string): string | ArrayBuffer | ReturnArray;
    private returnArray;
    lasterror(): ErrorArray;
}
export {};
