import { NitroModules } from 'react-native-nitro-modules';

import {
  type RNMisaki as RNMisakiNative,
  type EnglishG2POptions,
  type Token,
  type PhonemizeResult,
} from './specs/RNMisaki.nitro.js';

export type { EnglishG2POptions, Token, PhonemizeResult };

/**
 * English Grapheme-to-Phoneme converter using MisakiSwift
 *
 * Converts English text to IPA phonemes suitable for text-to-speech engines.
 *
 * @example
 * ```typescript
 * // American English (default)
 * const g2p = new EnglishG2P();
 * const result = g2p.phonemize("Hello world!");
 * console.log(result.phonemes); // "həlˈO wˈɜɹld!"
 * console.log(result.tokens);   // [{text: "Hello", phonemes: "həlˈO", ...}, ...]
 *
 * // British English
 * const g2pBritish = new EnglishG2P({ british: true });
 * const resultBritish = g2pBritish.phonemize("Hello world!");
 * ```
 */
export class EnglishG2P {
  private native: RNMisakiNative;

  /**
   * Create a new EnglishG2P instance
   * @param options - Configuration options
   * @param options.british - Use British English pronunciation (default: false)
   */
  constructor(options?: EnglishG2POptions) {
    this.native = NitroModules.createHybridObject<RNMisakiNative>('RNMisaki');
    this.native.british = options?.british ?? false;
  }

  /**
   * Convert text to phonemes synchronously
   * @param text - The English text to convert
   * @returns PhonemizeResult containing phonemes string and tokens array
   */
  phonemize(text: string): PhonemizeResult {
    return this.native.phonemize(text);
  }

  /**
   * Convert text to phonemes asynchronously
   * @param text - The English text to convert
   * @returns Promise resolving to PhonemizeResult containing phonemes string and tokens array
   */
  phonemizeAsync(text: string): Promise<PhonemizeResult> {
    return this.native.phonemizeAsync(text);
  }
}
