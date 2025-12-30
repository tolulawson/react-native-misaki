import {
  EnglishG2P,
  type EnglishG2POptions,
  type PhonemizeResult,
} from '../index';

// Helper to create a mock PhonemizeResult
const createMockResult = (text: string): PhonemizeResult => ({
  phonemes: `mocked-phonemes-for-${text}`,
  tokens: [
    {
      text: text,
      phonemes: `mocked-phonemes-for-${text}`,
      whitespace: '',
      start: undefined,
      end: undefined,
    },
  ],
});

// Mock the NitroModules
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    createHybridObject: jest.fn(() => ({
      british: false,
      phonemize: jest.fn((text: string) => createMockResult(text)),
      phonemizeAsync: jest.fn((text: string) =>
        Promise.resolve(createMockResult(text))
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
      expect(typeof result).toBe('object');
      expect(result.phonemes).toBe('mocked-phonemes-for-Hello');
      expect(Array.isArray(result.tokens)).toBe(true);
    });

    it('should return tokens with correct structure', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemize('Hello');
      expect(result.tokens.length).toBeGreaterThan(0);
      const token = result.tokens[0];
      expect(token).toHaveProperty('text');
      expect(token).toHaveProperty('phonemes');
      expect(token).toHaveProperty('whitespace');
    });

    it('should handle empty string', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemize('');
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('phonemes');
      expect(result).toHaveProperty('tokens');
    });
  });

  describe('phonemizeAsync', () => {
    it('should convert text to phonemes asynchronously', async () => {
      const g2p = new EnglishG2P();
      const result = await g2p.phonemizeAsync('Hello');
      expect(typeof result).toBe('object');
      expect(result.phonemes).toBe('mocked-phonemes-for-Hello');
      expect(Array.isArray(result.tokens)).toBe(true);
    });

    it('should return a Promise', () => {
      const g2p = new EnglishG2P();
      const result = g2p.phonemizeAsync('Hello');
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve to PhonemizeResult with tokens', async () => {
      const g2p = new EnglishG2P();
      const result = await g2p.phonemizeAsync('Hello');
      expect(result.tokens.length).toBeGreaterThan(0);
      const token = result.tokens[0];
      expect(token).toHaveProperty('text');
      expect(token).toHaveProperty('phonemes');
      expect(token).toHaveProperty('whitespace');
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

describe('PhonemizeResult type', () => {
  it('should have correct structure', () => {
    const result: PhonemizeResult = {
      phonemes: 'test',
      tokens: [
        {
          text: 'test',
          phonemes: 'test',
          whitespace: '',
          start: undefined,
          end: undefined,
        },
      ],
    };

    expect(result.phonemes).toBe('test');
    expect(result.tokens).toHaveLength(1);
    expect(result.tokens[0]!.text).toBe('test');
  });

  it('should allow tokens with timestamps', () => {
    const result: PhonemizeResult = {
      phonemes: 'test',
      tokens: [
        {
          text: 'test',
          phonemes: 'test',
          whitespace: ' ',
          start: 0.0,
          end: 0.5,
        },
      ],
    };

    expect(result.tokens[0]!.start).toBe(0.0);
    expect(result.tokens[0]!.end).toBe(0.5);
  });
});
