# base32-clockwork-ts
Clockwork Base32 encode/decode for TypeScript


## Install
```sh
npm i @niyari/base32-clockwork-ts
```


## Demo
https://niyari.github.io/base32-ts/demo/


## Usage
```js
const base32_clockwork = new Base32Clockwork();
base32_clockwork.encode('foobar');
// str = "CSQPYRK1E8"
base32_clockwork.decode('CSQPYRK1E8');
// str = "foobar"
```

In decoding, the misleading character "IiLl" is treated as 1 and "Oo" is treated as 0.
```js
base32_clockwork.decode('CSQPYRKlE8'); // 1 -> l
// str = "foobar"
```

### Encoding multibyte character set
```js
base32_clockwork.encode('Tofu on Fire!📛'); // (📛 = Name Badge:for Japanese preschoolers.)
// str = "AHQPCX90DXQ20HK9E9JJ3W4ZJEDG"
base32_clockwork.decode("AHQPCX90DXQ20HK9E9JJ3W4ZJEDG");
// str = "Tofu on Fire!📛"
```


## API(Options)
```
new Base32Clockwork([{ [padding] [,raw] }]);
```

### Encode: Set padding ( = ) 
```
{ padding: <bool> }
```

```js
const b32_cw_pad = new Base32Clockwork({ padding: true });
b32_cw_pad.encode('foobar');
// str = "CSQPYRK1E8======"
```

### Decode: Raw
Return Uint8Array object.
```
{ raw: <bool> }
```

```js
const b32_cw = new Base32Clockwork();
b32_cw_.decode('CSQPYRK1E8'); // (default)
const b32_cw_raw0 = new Base32Clockwork({ raw: false });
b32_cw_raw0.decode('CSQPYRK1E8');
// Return value: String

const b32_cw_raw1 = new Base32Clockwork({ raw: true });
b32_cw_raw1.decode('CSQPYRK1E8');
// Return value: Uint8Array object
```


## See Also:
 [Clockwork Base32]

 [Crockford]


## License
MIT

[Clockwork Base32]: https://gist.github.com/szktty/228f85794e4187882a77734c89c384a8
[Crockford]: https://www.crockford.com/base32.html
