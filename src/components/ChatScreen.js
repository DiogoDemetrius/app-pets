import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './ChatScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen({ navigation, route }) {
  const { userId, userName, userProfilePicture, isOnline } = route.params;
  const [userData, setUserData] = useState(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          setUserData({
            name: user.nome,
            profilePicture: user.fotoPerfil || 'https://via.placeholder.com/60x60/cccccc/ffffff?text=U',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUser();
  }, []);

  // Mensagens de exemplo (não interativas)
  const messages = [
    {
      id: 1,
      text: 'Oi! Vi seu anúncio do filhote de Golden Retriever. Ainda está disponível?',
      isFromUser: false,
      timestamp: '14:25',
    },
    {
      id: 2,
      text: 'Oi! Sim, ainda está disponível. Você gostaria de conhecê-lo?',
      isFromUser: true,
      timestamp: '14:26',
    },
    {
      id: 3,
      text: 'Seria ótimo! Qual seria um bom horário para visita?',
      isFromUser: false,
      timestamp: '14:27',
    },
    {
      id: 4,
      text: 'Que tal amanhã à tarde? Por volta das 15h?',
      isFromUser: true,
      timestamp: '14:28',
    },
    {
      id: 5,
      text: 'Perfeito! Você pode me enviar o endereço?',
      isFromUser: false,
      timestamp: '14:30',
    },
  ];

  if (!userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <LinearGradient
        colors={["#ffab40", "#fb3415", "#a92419"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.chatProfileContainer}>
            <Image
              source={{ uri: userProfilePicture }}
              style={styles.chatProfilePicture}
            />
            {isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
          <View style={styles.chatHeaderTextContainer}>
            <Text style={styles.chatUserName}>{userName}</Text>
            <Text style={styles.onlineStatus}>
              {isOnline ? 'Online' : 'Visto por último há 2h'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋮</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageItem,
              message.isFromUser ? styles.myMessage : styles.otherMessage
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isFromUser ? styles.myMessageBubble : styles.otherMessageBubble
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isFromUser ? styles.myMessageText : styles.otherMessageText
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTimestamp,
                  message.isFromUser ? styles.myMessageTimestamp : styles.otherMessageTimestamp
                ]}
              >
                {message.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#999999"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            disabled={!messageText.trim()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={messageText.trim() ? ["#ffab40", "#fb3415"] : ["#E0E0E0", "#CCCCCC"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.sendButtonGradient}
            >
              <Text style={styles.sendButtonText}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}