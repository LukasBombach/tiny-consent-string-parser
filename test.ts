const encodedTCString = `CPBkLFcPBkLFcAGABCENBNCoAP_AAH_AAAYgHDld5D7NTWFCUfx5SttgGYgV1tQUA2QCCACBAyAFAAGQ8IQCg2ASsASAhAACAQIAohIBAABEHAEEAAAAAAAEAAAAAAUEgAAIIAIEABEBAAIQAAoKAAAAAAAAgEAACAQAmECQAubmBGAAAIAwAAAAAAAACBwQFYAqTQ1BQlHYaUhpQAiIAFaQFABgAggQgQIgBAABEOCEAhNAErAEAIAAAgECAKISAQAAQAAJBAAAAAAARAAAIAAFAIAACAACBBARAQAAEAAIAgAAAAAAAAAAAQAEAJAAEAEGZgBgAAAAIAAAAAAAAQFBEAgAFQAXABDAD8AQ2Ai8BOwCkRAAEAXwSAEAEUBpwUAwAAYABUAJwAoABYADIAIUARgBHACkAFcARYAvgBogDgAHkAQgAkwBKwCsgGcAP6AhIBIICWgGMhAAIALQ0AoAFQAXABDAD8ALSAhsBF4CdgFIgMYDAAgBfAGyGQCQAVABDACYAFwAR0A-wD8AI4AmIBeYwAEAbIBJwqAWACoAIYATAAuACOAH4ARwAtICQQExALzHQAwAigDDAacPANgAGAAVACcAKAAWAAygCMAI4ATQApABXAEWAKQAcAA8gCMgEmAJXAS0BLgCcAFZAM4Af0BCQCSAEtAL2AYzAxwDHRwAEAFpCACAPsiAOABYAE0AK4AiwBSADgAIyASsAlwBOACsgGcAS0AvYmAVAANACcAKAAWABCACOAE0AKQAVAArgBvAFIARkAlYBLQCsgF-AM4AhIBIIC9gGMkgAIAvikAIAEQARSoBaAE4AUAAsABkAD4AIUARgBHACaAFQAK4AbwA7gCLAFIASsAloBWQDOAISASQAloBjIDIAQAEAXwA.YAAAAAAAAAAA`;

const segments: string[] = encodedTCString.split(".");
const len: number = segments.length;

console.log(segments);

const segmentKeys = [
  "core",
  "vendorsDisclosed",
  "vendorsAllowed",
  "publisherTC",
];

/**
 * Base 64 URL character set.  Different from standard Base64 char set
 * in that '+' and '/' are replaced with '-' and '_'.
 */
const DICT = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const REVERSE_DICT: Map<string, number> = new Map([
  ["A", 0],
  ["B", 1],
  ["C", 2],
  ["D", 3],
  ["E", 4],
  ["F", 5],
  ["G", 6],
  ["H", 7],
  ["I", 8],
  ["J", 9],
  ["K", 10],
  ["L", 11],
  ["M", 12],
  ["N", 13],
  ["O", 14],
  ["P", 15],
  ["Q", 16],
  ["R", 17],
  ["S", 18],
  ["T", 19],
  ["U", 20],
  ["V", 21],
  ["W", 22],
  ["X", 23],
  ["Y", 24],
  ["Z", 25],
  ["a", 26],
  ["b", 27],
  ["c", 28],
  ["d", 29],
  ["e", 30],
  ["f", 31],
  ["g", 32],
  ["h", 33],
  ["i", 34],
  ["j", 35],
  ["k", 36],
  ["l", 37],
  ["m", 38],
  ["n", 39],
  ["o", 40],
  ["p", 41],
  ["q", 42],
  ["r", 43],
  ["s", 44],
  ["t", 45],
  ["u", 46],
  ["v", 47],
  ["w", 48],
  ["x", 49],
  ["y", 50],
  ["z", 51],
  ["0", 52],
  ["1", 53],
  ["2", 54],
  ["3", 55],
  ["4", 56],
  ["5", 57],
  ["6", 58],
  ["7", 59],
  ["8", 60],
  ["9", 61],
  ["-", 62],
  ["_", 63],
]);

/**
 * log2(64) = 6
 */
const BASIS = 6;

function base64UrlDecode(str: string) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const strBits = REVERSE_DICT.get(str[i]).toString(2);
    result += "0".repeat(BASIS - strBits.length) + strBits;
  }

  return result;
}

for (let i = 0; i < len; i++) {
  const segString: string = segments[i];
  const firstChar: string = base64UrlDecode(segString.charAt(0));
  const segTypeBits: string = firstChar.substr(0, 3);
  const segment = segmentKeys[parseInt(segTypeBits, 2).toString()];

  console.log("segment", segment);

  const encodedString = segString;

  const bitField = base64UrlDecode(encodedString);
  let bStringIdx = 0;

  if (segment === "core") {
    const version = parseInt(bitField.substr(bStringIdx, 6), 2);
    console.log("version", version, "\n");
  }

  if (segment !== "core") {
    bStringIdx += 6;
  }
}
