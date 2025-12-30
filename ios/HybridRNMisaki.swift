import Foundation
import NitroModules
import MisakiSwift

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
    
    // MARK: - HybridRNMisakiSpec Implementation
    
    /// Convert text to phonemes synchronously
    /// - Parameter text: The English text to convert
    /// - Returns: IPA phoneme string
    func phonemize(text: String) throws -> String {
        let g2pInstance = getG2P()
        let (phonemes, _) = g2pInstance.phonemize(text: text)
        return phonemes
    }
    
    /// Convert text to phonemes asynchronously
    /// - Parameter text: The English text to convert
    /// - Returns: Promise resolving to IPA phoneme string
    func phonemizeAsync(text: String) throws -> Promise<String> {
        return Promise.async { [weak self] () -> String in
            guard let self = self else {
                throw NSError(domain: "RNMisaki", code: 1, userInfo: [NSLocalizedDescriptionKey: "Instance deallocated"])
            }
            
            let g2pInstance = self.getG2P()
            let (phonemes, _) = g2pInstance.phonemize(text: text)
            return phonemes
        }
    }
}
