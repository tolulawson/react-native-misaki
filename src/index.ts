import { NitroModules } from 'react-native-nitro-modules';

import {
  type RNMisaki as RNMisakiNative,
  type EnglishG2POptions,
} from './specs/RNMisaki.nitro.js';

export type { EnglishG2POptions };

/**
 * English Grapheme-to-Phoneme converter using MisakiSwift
 *
 * Converts English text to IPA phonemes suitable for text-to-speech engines.
 *
 * @example
 * ```typescript
 * // American English (default)
 * const g2p = new EnglishG2P();
 * const phonemes = g2p.phonemize("Hello world!");
 * // "həlˈO wˈɜɹld!"
 *
 * // British English
 * const g2pBritish = new EnglishG2P({ british: true });
 * const phonemesBritish = g2pBritish.phonemize("Hello world!");
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
   * @returns IPA phoneme string
   */
  phonemize(text: string): string {
    return this.native.phonemize(text);
  }

  /**
   * Convert text to phonemes asynchronously
   * @param text - The English text to convert
   * @returns Promise resolving to IPA phoneme string
   */
  phonemizeAsync(text: string): Promise<string> {
    return this.native.phonemizeAsync(text);
  }
}
