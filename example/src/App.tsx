import { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { EnglishG2P } from 'react-native-misaki';

interface BenchmarkResult {
  initTime: number;
  phonemizeTime: number;
  phonemizeAsyncTime: number;
  result: string;
}

const DEFAULT_TEXT = `Import Warehouses: ICE raided at least three facilities in 2025, alarming worker rights activists who believe that President Trump’s immigration crackdown has ensnared North Jersey’s import-export industry.
Afrikaner in Detention: A white South African who sought asylum in the United States expected a warm welcome. Instead, he has spent months locked up in Georgia alongside hundreds of other immigrants.
Afghan Visas: After a fatal shooting, the Trump administration froze a visa program for Afghans that Republicans in Congress had championed. The G.O.P. has not objected.
Palau Agrees to Take Migrants: The Pacific nation has signed a “memo of understanding” with the Trump administration to take up to 75 “third country nationals” who cannot be returned to their home nations. In return, Palau will receive $7.5 million and other aid.
Man Shot in ICE Confrontation: A U.S. Immigration and Customs Enforcement officer shot an undocumented driver trying to evade arrest in Maryland, according to ICE and local officials, resulting in a crash that left the driver and a passenger hospitalized.
Related Content
`;
export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [iterations, setIterations] = useState('1');
  const [benchmarkResult, setBenchmarkResult] =
    useState<BenchmarkResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runBenchmark = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setBenchmarkResult(null);

    // Wait for UI to update
    await new Promise((r) => setTimeout(r, 50));

    try {
      const numIterations = Math.max(1, parseInt(iterations, 10) || 1);

      // Benchmark: EnglishG2P initialization
      const initStart = performance.now();
      const g2p = new EnglishG2P();
      const initEnd = performance.now();
      const initTime = initEnd - initStart;

      // Benchmark: Synchronous phonemize
      let syncResult = '';
      const syncStart = performance.now();
      for (let i = 0; i < numIterations; i++) {
        syncResult = g2p.phonemize(text);
      }
      const syncEnd = performance.now();
      const phonemizeTime = (syncEnd - syncStart) / numIterations;

      // Benchmark: Async phonemize
      let asyncResult = '';
      const asyncStart = performance.now();
      for (let i = 0; i < numIterations; i++) {
        asyncResult = await g2p.phonemizeAsync(text);
      }
      const asyncEnd = performance.now();
      const phonemizeAsyncTime = (asyncEnd - asyncStart) / numIterations;

      setBenchmarkResult({
        initTime,
        phonemizeTime,
        phonemizeAsyncTime,
        result: syncResult || asyncResult,
      });
    } catch (e) {
      console.error('Benchmark error:', e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsRunning(false);
    }
  }, [text, iterations]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Misaki Benchmark</Text>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Input Text:</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Enter text to phonemize..."
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Iterations:</Text>
        <TextInput
          style={styles.iterInput}
          value={iterations}
          onChangeText={setIterations}
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#888"
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isRunning && styles.buttonDisabled,
        ]}
        onPress={runBenchmark}
        disabled={isRunning}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Running...' : 'Run Benchmark'}
        </Text>
      </Pressable>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {benchmarkResult && (
        <View style={styles.resultsBox}>
          <Text style={styles.resultsTitle}>Results</Text>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Init Time:</Text>
            <Text style={styles.metricValue}>
              {benchmarkResult.initTime.toFixed(2)} ms
            </Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>phonemize() avg:</Text>
            <Text style={styles.metricValue}>
              {benchmarkResult.phonemizeTime.toFixed(2)} ms
            </Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>phonemizeAsync() avg:</Text>
            <Text style={styles.metricValue}>
              {benchmarkResult.phonemizeAsyncTime.toFixed(2)} ms
            </Text>
          </View>

          <Text style={styles.outputLabel}>Output:</Text>
          <Text style={styles.outputText}>{benchmarkResult.result}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  container: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e6edf3',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b949e',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 14,
    fontSize: 15,
    color: '#e6edf3',
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  iterInput: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 14,
    fontSize: 15,
    color: '#e6edf3',
    width: 100,
  },
  button: {
    backgroundColor: '#238636',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonPressed: {
    backgroundColor: '#2ea043',
  },
  buttonDisabled: {
    backgroundColor: '#21262d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#3d1418',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f85149',
    padding: 14,
    marginBottom: 16,
  },
  errorText: {
    color: '#f85149',
    fontSize: 14,
  },
  resultsBox: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e6edf3',
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
  },
  metricLabel: {
    fontSize: 14,
    color: '#8b949e',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#58a6ff',
    fontVariant: ['tabular-nums'],
  },
  outputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b949e',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  outputText: {
    fontSize: 14,
    color: '#7ee787',
    lineHeight: 22,
    fontFamily: 'Menlo',
  },
});
