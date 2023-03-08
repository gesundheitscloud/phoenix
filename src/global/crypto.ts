const ab2str = (buf: ArrayBuffer): string => String.fromCharCode.apply(null, new Uint8Array(buf));

/**
 * Generate a passphrase based on a 256 bit AES-GCM key
 * @returns A string representation of a 256 bit AES-GCM key
 */
export const generatePassphrase = async (): Promise<string> => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  const exported = await window.crypto.subtle.exportKey('raw', key);
  const exportedAsString = ab2str(exported);
  return window.btoa(exportedAsString);
};
