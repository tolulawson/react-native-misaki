import { NitroModules } from 'react-native-nitro-modules';
import type { Misaki } from './Misaki.nitro';

const MisakiHybridObject =
  NitroModules.createHybridObject<Misaki>('Misaki');

export function multiply(a: number, b: number): number {
  return MisakiHybridObject.multiply(a, b);
}
