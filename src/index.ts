import { NitroModules } from 'react-native-nitro-modules';

import { type RNMisaki as RNMisakiNative, type PhonemizeResult, type MToken } from './specs/RNMisaki.nitro.js';

export type { MToken };

export class EnglishG2P {
  private native: RNMisakiNative;

  constructor() {
    this.native = NitroModules.createHybridObject<RNMisakiNative>('RNMisaki');
  }

  phonemize(text: string): PhonemizeResult {
    return this.native.phonemize(text);
  }

  phonemizeAsync(text: string): Promise<PhonemizeResult> {
    return this.native.phonemizeAsync(text);
  }
}
