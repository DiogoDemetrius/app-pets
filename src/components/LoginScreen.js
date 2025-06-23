import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './LoginScreen.styles';
import api from '../api/axiosInstance';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Exemplo: salvar o token no AsyncStorage (opcional)
      // await AsyncStorage.setItem('token', token);

      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.response?.data?.error || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Esqueceu a senha?', 'Funcionalidade em desenvolvimento');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="dark" />
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
          <LinearGradient
            colors={['#ffab40', '#fb3415', '#a92419']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.logoContainer}
          >
            <Image
              source={require('../../assets/images/paw-print.png')}
              style={styles.logoText}
            />
          </LinearGradient>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#ffab40', '#fb3415', '#a92419']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>📱 Continuar com Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
}