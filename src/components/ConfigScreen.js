import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './ConfigScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if (theme) {
          setIsDarkMode(theme === 'dark');
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      }
    };

    loadUser();
    loadTheme();
  }, []);

  const handleThemeToggle = async (value) => {
    setIsDarkMode(value);
    try {
      await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const configOptions = [
    {
      id: 1,
      title: 'Conta',
      subtitle: 'Gerenciar informações da conta',
      icon: 'https://via.placeholder.com/40x40/ffab40/ffffff?text=👤',
      onPress: () => navigation.navigate('Account'),
      showArrow: true,
    },
    {
      id: 2,
      title: 'Notificações',
      subtitle: 'Configurar alertas e notificações',
      icon: 'https://via.placeholder.com/40x40/fb3415/ffffff?text=🔔',
      onPress: () => navigation.navigate('Notifications'),
      showArrow: true,
    },
    {
      id: 3,
      title: 'Tema',
      subtitle: 'Modo escuro/claro',
      icon: 'https://via.placeholder.com/40x40/a92419/ffffff?text=🌙',
      onPress: null,
      showArrow: false,
      hasSwitch: true,
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
          <Text style={styles.headerTitle}>Configurações</Text>
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
        <View style={styles.configSection}>
          {configOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.configItem}
              onPress={option.onPress}
              activeOpacity={option.onPress ? 0.8 : 1}
              disabled={!option.onPress}
            >
              <View style={styles.configItemLeft}>
                <Image
                  source={{ uri: option.icon }}
                  style={styles.configIcon}
                />
                <View style={styles.configTextContainer}>
                  <Text style={styles.configTitle}>{option.title}</Text>
                  <Text style={styles.configSubtitle}>{option.subtitle}</Text>
                </View>
              </View>

              <View style={styles.configItemRight}>
                {option.hasSwitch ? (
                  <Switch
                    trackColor={{ false: "#E0E0E0", true: "#ffab40" }}
                    thumbColor={isDarkMode ? "#fb3415" : "#f4f3f4"}
                    ios_backgroundColor="#E0E0E0"
                    onValueChange={handleThemeToggle}
                    value={isDarkMode}
                  />
                ) : option.showArrow ? (
                  <Text style={styles.arrowIcon}>→</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("SelectPet")}
        >
          <Image
            source={require("../../assets/images/heart.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Procurar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("MyPets")}
        >
          <Image
            source={require("../../assets/images/pata-btn.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Pets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../../assets/images/house.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Messages")}
        >
          <Image
            source={require("../../assets/images/message-circle.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Mensagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <LinearGradient
            colors={["#ffab40", "#fb3415", "#a92419"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.selectedNavIcon}
          >
            <Image
              source={require("../../assets/images/cog.png")}
              style={styles.navIconSelected}
            />
          </LinearGradient>
          <Text style={styles.navLabel}>Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}