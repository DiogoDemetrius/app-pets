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
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './RegisterScreen.styles';
import api from '../api/axiosInstance';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Erro', 'Você deve aceitar os termos de uso');
      return;
    }

    setLoading(true);

    try {
      await api.post('/usuarios', {
        nome: name,
        email,
        password,
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha no registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleTermsPress = () => {
    Alert.alert('Termos de Uso', 'Aqui você implementaria a visualização dos termos');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Política de Privacidade', 'Aqui você implementaria a visualização da política');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <LinearGradient
            colors={["#ffab40", "#fb3415", "#a92419"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.logoContainer}
          >
            <Image
              source={require("../../assets/images/paw-print.png")}
              style={{ width: 32, height: 32 }}
            />
          </LinearGradient>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
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
              placeholder="Digite sua senha (mín. 6 caracteres)"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite novamente sua senha"
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              {termsAccepted && <Text style={styles.checkboxText}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Eu aceito os{" "}
              <Text style={styles.termsLink} onPress={handleTermsPress}>
                Termos de Uso
              </Text>{" "}
              e a{" "}
              <Text style={styles.termsLink} onPress={handlePrivacyPress}>
                Política de Privacidade
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#ffab40", "#fb3415", "#a92419"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>
                {loading ? "Criando conta..." : "Registrar"}
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
          <Text style={styles.footerText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.loginText}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}