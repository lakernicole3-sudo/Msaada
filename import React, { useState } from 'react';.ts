import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AIAnalyzer() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0]);
    }
  };

  const analyzeImage = async (photo) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      name: 'injury.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://your-api-url.com/analyze-injury', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 Scan Injury</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF0000" />}

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.title}>{result.condition}</Text>
          {result.immediate_steps.map((step, i) => (
            <Text key={i}>• {step}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    button: { backgroundColor: '#E63946', padding: 15, borderRadius: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    resultCard: { marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});