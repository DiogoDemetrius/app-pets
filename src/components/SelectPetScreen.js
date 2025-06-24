import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './SelectPetScreen.styles';

export default function SelectPetScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData(user);
        setPets(user.pets || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handlePetPress = (pet, index) => {
    // Navega para a tela de matching passando o pet selecionado
    navigation.navigate('PetMatching', { 
      selectedPet: pet,
      petIndex: index,
      petId: pet._id || pet.nome
    });
  };

  if (!userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.loadingText}>Carregando...</Text>
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

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Selecionar Pet</Text>
          <Text style={styles.headerSubtitle}>
            Escolha qual pet vai procurar um match
          </Text>
        </View>

        <View style={styles.headerRight} />
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhum pet cadastrado</Text>
            <Text style={styles.emptyMessage}>
              Você precisa ter pelo menos um pet cadastrado para usar o matching
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddPet')}
            >
              <LinearGradient
                colors={["#ffab40", "#fb3415"]}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.emptyButtonGradient}
              >
                <Text style={styles.emptyButtonText}>Adicionar Pet</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          pets.map((pet, index) => (
            <TouchableOpacity
              key={pet._id || `${pet.nome}-${index}`}
              style={styles.petCard}
              onPress={() => handlePetPress(pet, index)}
              activeOpacity={0.8}
            >
              <View style={styles.petImageContainer}>
                <Image
                  source={{ 
                    uri: pet.foto || 'https://via.placeholder.com/80x80/cccccc/ffffff?text=🐕' 
                  }}
                  style={styles.petImage}
                />
              </View>

              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.nome}</Text>
                <Text style={styles.petBreed}>{pet.raca}</Text>
              </View>

              <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}