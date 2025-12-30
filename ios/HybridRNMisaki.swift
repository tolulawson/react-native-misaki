import Foundation
import NitroModules
import MisakiSwift
import MLXUtilsLibrary

class HybridRNMisaki: HybridRNMisakiSpec {
    
    // MARK: - Properties
    
    /// Whether to use British English pronunciation
    var british: Bool = false {
        didSet {
            // Recreate the G2P instance when british flag changes
            if oldValue != british {
                g2pQueue.async { [weak self] in
                    guard let self = self else { return }
                    self._g2p = EnglishG2P(british: self.british)
                }
            }
        }
    }
    
    /// G2P instance - initialized eagerly in background
    private var _g2p: EnglishG2P?
    
    /// Serial queue for thread-safe G2P access
    private let g2pQueue = DispatchQueue(label: "com.rnmisaki.g2p")
    
    // MARK: - Initialization
    
    /// Initialize and start loading the G2P model in the background
    override init() {
        super.init()
        // Start loading G2P immediately in background so it's ready ASAP
        g2pQueue.async { [weak self] in
            guard let self = self else { return }
            self._g2p = EnglishG2P(british: self.british)
        }
    }
    
    /// Get the G2P instance, waiting for initialization if needed (thread-safe)
    private func getG2P() -> EnglishG2P {
        return g2pQueue.sync {
            if _g2p == nil {
                // Fallback: if somehow not initialized yet, create now
                _g2p = EnglishG2P(british: british)
            }
            return _g2p!
        }
    }
    
    // MARK: - Helper Methods
    
    /// Convert MisakiSwift MToken array to Nitro Token array
    private func convertTokens(_ mTokens: [MToken]) -> [Token] {
        return mTokens.map { mToken in
            Token(
                text: mToken.text,
                phonemes: mToken.phonemes,
                whitespace: mToken.whitespace,
                start: mToken.start_ts,
                end: mToken.end_ts
            )
        }
    }
    
    /// Perform phonemization and return result with tokens
    private func performPhonemize(text: String) -> PhonemizeResult {
        let g2pInstance = getG2P()
        let (phonemes, mTokens) = g2pInstance.phonemize(text: text)
        let tokens = convertTokens(mTokens)
        return PhonemizeResult(phonemes: phonemes, tokens: tokens)
    }
    
    // MARK: - HybridRNMisakiSpec Implementation
    
    /// Convert text to phonemes synchronously
    /// - Parameter text: The English text to convert
    /// - Returns: PhonemizeResult containing phonemes string and tokens array
    func phonemize(text: String) throws -> PhonemizeResult {
        return performPhonemize(text: text)
    }
    
    /// Convert text to phonemes asynchronously
    /// - Parameter text: The English text to convert
    /// - Returns: Promise resolving to PhonemizeResult containing phonemes string and tokens array
    func phonemizeAsync(text: String) throws -> Promise<PhonemizeResult> {
        return Promise.async { [weak self] () -> PhonemizeResult in
            guard let self = self else {
                throw NSError(domain: "RNMisaki", code: 1, userInfo: [NSLocalizedDescriptionKey: "Instance deallocated"])
            }
            
            return self.performPhonemize(text: text)
        }
    }
}
