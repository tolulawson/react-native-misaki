import { type HybridObject } from 'react-native-nitro-modules';

/**
 * Penn Treebank POS tags
 */
export enum PennTag {
  // Nouns
  NN = 'NN',
  NNS = 'NNS',
  NNP = 'NNP',
  NNPS = 'NNPS',

  // Verbs
  VB = 'VB',
  VBD = 'VBD',
  VBN = 'VBN',
  VBP = 'VBP',
  VBZ = 'VBZ',
  VBG = 'VBG',

  // Adjectives
  JJ = 'JJ',
  JJR = 'JJR',
  JJS = 'JJS',

  // Adverbs
  RB = 'RB',
  RBR = 'RBR',
  RBS = 'RBS',
  WRB = 'WRB',

  // Pronouns
  PRP = 'PRP',
  PRP_DOLLAR = 'PRP$',
  WP = 'WP',
  WP_DOLLAR = 'WP$',

  // Determiners
  DT = 'DT',
  WDT = 'WDT',

  // Prepositions/Conjunctions
  IN = 'IN',
  CC = 'CC',

  // Other
  CD = 'CD',       // Cardinal number
  UH = 'UH',       // Interjection
  POS = 'POS',     // Possessive
  MD = 'MD',       // Modal
  FW = 'FW',       // Foreign word
  XX = 'XX',       // Unknown
}

interface Underscore {
  is_head: boolean;
  alias: string | null;
  stress: number | null;
  currency: string | null;
  num_flags: string;
  prespace: boolean;
  rating: number | null;
}

export interface MToken {
  text: string;
  tokenRange: [number, number];
  tag: PennTag | null;
  phonemes: string | null;
  whitespace: string;
  start_ts?: number;
  end_ts?: number;
  _: Underscore;
}

export interface PhonemizeResult {
  phonemes: string;
  tokens: MToken[];
}

export interface RNMisaki
  extends HybridObject<{
    ios: 'swift';
  }> {
  phonemize(text: string): PhonemizeResult;

  phonemizeAsync(text: string): Promise<PhonemizeResult>;
}
