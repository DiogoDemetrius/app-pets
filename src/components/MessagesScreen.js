import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './MessagesScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MessagesScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

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

  const conversations = [
    {
      id: 1,
      name: 'Maria Silva',
      profilePicture: 'https://via.placeholder.com/60x60/ffab40/ffffff?text=M',
      lastMessage: 'Oi! Ainda tem aquele filhote disponível?',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: 'João Santos',
      profilePicture: 'https://via.placeholder.com/60x60/fb3415/ffffff?text=J',
      lastMessage: 'Obrigado pelas dicas de cuidados!',
      timestamp: 'Ontem',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  if (!userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Mensagens</Text>
        </View>

        <TouchableOpacity style={styles.profilePictureContainer}>
          <Image
            source={{ uri: userData.profilePicture }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.conversationsSection}>
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversationItem}
              onPress={() => navigation.navigate('Chat', { 
                userId: conversation.id,
                userName: conversation.name,
                userProfilePicture: conversation.profilePicture,
                isOnline: conversation.isOnline
              })}
              activeOpacity={0.8}
            >
              <View style={styles.conversationLeft}>
                <View style={styles.profileContainer}>
                  <Image
                    source={{ uri: conversation.profilePicture }}
                    style={styles.conversationProfilePicture}
                  />
                  {conversation.isOnline && (
                    <View style={styles.onlineIndicator} />
                  )}
                </View>
                
                <View style={styles.conversationTextContainer}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                </View>
              </View>

              <View style={styles.conversationRight}>
                <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                {conversation.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {conversations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhuma conversa ainda</Text>
            <Text style={styles.emptyStateSubtext}>
              Quando você começar a conversar com outros usuários, elas aparecerão aqui.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../../assets/images/heart.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Procurar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../../assets/images/pata-btn.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Pets</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require("../../assets/images/house.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <LinearGradient
            colors={["#ffab40", "#fb3415", "#a92419"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.selectedNavIcon}
          >
            <Image
              source={require("../../assets/images/message-circle.png")}
              style={styles.navIconSelected}
            />
          </LinearGradient>
          <Text style={styles.navLabel}>Mensagens</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Config')}
        >
          <Image
            source={require("../../assets/images/cog.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}