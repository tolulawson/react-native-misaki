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

/**
 * Represents a single linguistic token with its phonetic representation
 */
export interface Token {
  /**
   * The original text content of the token
   */
  text: string;

  /**
   * The IPA phonetic representation of the token
   */
  phonemes: string | undefined;

  /**
   * Whitespace that follows this token in the original text
   */
  whitespace: string;

  /**
   * Start timestamp for audio alignment (in seconds)
   */
  start: number | undefined;

  /**
   * End timestamp for audio alignment (in seconds)
   */
  end: number | undefined;
}

/**
 * Result of phonemization containing both the full phoneme string and individual tokens
 */
export interface PhonemizeResult {
  /**
   * The complete IPA phoneme string for the input text
   */
  phonemes: string;

  /**
   * Array of tokens with their individual phonetic representations
   */
  tokens: Token[];
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
   * @returns PhonemizeResult containing phonemes string and tokens array
   */
  phonemize(text: string): PhonemizeResult;

  /**
   * Convert text to phonemes asynchronously
   * @param text - The English text to convert
   * @returns Promise resolving to PhonemizeResult containing phonemes string and tokens array
   */
  phonemizeAsync(text: string): Promise<PhonemizeResult>;
}
