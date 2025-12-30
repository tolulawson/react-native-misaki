import { EnglishG2P, type EnglishG2POptions } from '../index';

// Mock the NitroModules
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    createHybridObject: jest.fn(() => ({
      british: false,
      phonemize: jest.fn((text: string) => `mocked-phonemes-for-${text}`),
      phonemizeAsync: jest.fn((text: string) =>
        Promise.resolve(`mocked-async-phonemes-for-${text}`)
      ),
    })),
  },
}));

describe('EnglishG2P', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance with default options (American English)', () => {
      const g2p = new EnglishG2P();
      expect(g2p).toBeInstanceOf(EnglishG2P);
    });

    it('should create an instance with British English option', () => {
      const options: EnglishG2POptions = { british: true };
      const g2p = new EnglishG2P(options);
      expect(g2p).toBeInstanceOf(EnglishG2P);
    });

    it('should create an instance with explicit American English option', () => {
      const options: EnglishG2POptions = { british: false };
      const g2p = new EnglishG2P(options);
      expect(g2p).toBeInstanceOf(EnglishG2P);
    });
  });

  describe('phonemize', () => {
    it('should convert text to phonemes synchronously', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemize('Hello');
      expect(typeof result).toBe('string');
      expect(result).toBe('mocked-phonemes-for-Hello');
    });

    it('should handle empty string', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemize('');
      expect(typeof result).toBe('string');
    });
  });

  describe('phonemizeAsync', () => {
    it('should convert text to phonemes asynchronously', async () => {
      const g2p = new EnglishG2P();
      const result = await g2p.phonemizeAsync('Hello');
      expect(typeof result).toBe('string');
      expect(result).toBe('mocked-async-phonemes-for-Hello');
    });

    it('should return a Promise', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemizeAsync('Hello');
      expect(result).toBeInstanceOf(Promise);
    });
  });
});

describe('EnglishG2POptions type', () => {
  it('should accept valid options', () => {
    const options1: EnglishG2POptions = {};
    const options2: EnglishG2POptions = { british: true };
    const options3: EnglishG2POptions = { british: false };

    // These should compile without errors
    expect(options1).toBeDefined();
    expect(options2).toBeDefined();
    expect(options3).toBeDefined();
  });
});
