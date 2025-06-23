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
import { styles } from './HomeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
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

  const contentButtons = [
    {
      id: 1,
      title: 'Loja',
      image: 'https://via.placeholder.com/150x120/ffab40/ffffff?text=1',
      onPress: () => navigation.navigate('Content1')
    },
    {
      id: 2,
      title: 'Moda PET',
      image: 'https://via.placeholder.com/150x120/fb3415/ffffff?text=2',
      onPress: () => navigation.navigate('Content2')
    },
    {
      id: 3,
      title: 'Cuidados',
      image: 'https://via.placeholder.com/150x120/a92419/ffffff?text=3',
      onPress: () => navigation.navigate('Content3')
    }
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
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/paw-print.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userData.name}</Text>
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
        <View style={styles.buttonsGrid}>
          {contentButtons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.contentButton}
              onPress={button.onPress}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: button.image }}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonTitle}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Image
              source={require("../../assets/images/heart.png")}
              style={styles.navIcon}
            />
          <Text style={styles.navLabel}>Procurar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MyPets')}
        >
          <Image
            source={require("../../assets/images/pata-btn.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Pets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../../assets/images/house.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Messages')}
        >
          <Image
            source={require("../../assets/images/message-circle.png")}
            style={styles.navIcon}
          />
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