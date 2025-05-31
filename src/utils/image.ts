export function applyAlphaMask(
  rgbaPixelData: Uint8Array | Uint8ClampedArray,
  alphaMask: Uint8Array | Uint8ClampedArray
): Uint8Array | Uint8ClampedArray {
  const resultPixels = rgbaPixelData.slice();
  for (let i = 0; i < alphaMask.length; ++i) {
    const alphaValue = alphaMask[i];
    if (typeof alphaValue === "number") {
      resultPixels[4 * i + 3] = alphaValue;
    } else {
      throw new Error("Unexpected error: Corrupted alpha mask data");
    }
  }
  return resultPixels;
}
