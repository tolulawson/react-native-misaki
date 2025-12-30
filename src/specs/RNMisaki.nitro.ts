import { type HybridObject } from 'react-native-nitro-modules';

/**
 * Options for initializing the EnglishG2P phonemizer
 */
export interface EnglishG2POptions {
  /**
   * Use British English pronunciation (default: false for American English)
   */
  british?: boolean;
}

export interface RNMisaki
  extends HybridObject<{
    ios: 'swift';
  }> {
  /**
   * Whether to use British English pronunciation
   * Must be set before calling phonemize methods
   */
  british: boolean;

  /**
   * Convert text to phonemes synchronously
   * @param text - The English text to convert
   * @returns IPA phoneme string
   */
  phonemize(text: string): string;

  /**
   * Convert text to phonemes asynchronously
   * @param text - The English text to convert
   * @returns Promise resolving to IPA phoneme string
   */
  phonemizeAsync(text: string): Promise<string>;
}
