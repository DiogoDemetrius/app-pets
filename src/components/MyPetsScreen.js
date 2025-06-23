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
import { styles } from './MyPetsScreen.styles';

export default function MyPetsScreen({ navigation }) {
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

  // Recarrega dados quando volta para a tela
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

  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  const handlePetPress = (pet, index) => {
    // Passa tanto o pet quanto o índice para garantir identificação correta
    navigation.navigate('PetDetails', { 
      pet: pet,
      petIndex: index,
      petId: pet._id || pet.nome // Fallback para identificação
    });
  };

  const PedigreeIcon = ({ hasPedigree }) => {
    if (!hasPedigree) return null;
    
    return (
      <View style={styles.pedigreeContainer}>
        <LinearGradient
          colors={["#ffab40", "#fb3415", "#a92419"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.pedigreeBadge}
        >
          <Text style={styles.pedigreeIcon}>✓</Text>
        </LinearGradient>
        <Text style={[styles.pedigreeText, { color: '#ffab40' }]}>Pedigree</Text>
      </View>
    );
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
          <Text style={styles.headerTitle}>Meus Pets</Text>
          <Text style={styles.headerSubtitle}>
            {pets.length} {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddPet}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
              Adicione seu primeiro pet tocando no botão "+" acima
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={handleAddPet}
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
              key={pet._id || `${pet.nome}-${index}`} // Chave mais robusta
              style={styles.petCard}
              onPress={() => handlePetPress(pet, index)}
              activeOpacity={0.8}
            >
              <View style={styles.petImageContainer}>
                <Image
                  source={{ 
                    uri: pet.foto || 'https://via.placeholder.com/60x60/cccccc/ffffff?text=🐕' 
                  }}
                  style={styles.petImage}
                />
                <View style={styles.statusIndicator} />
              </View>

              <View style={styles.petInfo}>
                <View style={styles.petMainInfo}>
                  <Text style={styles.petName}>{pet.nome}</Text>
                  <PedigreeIcon hasPedigree={pet.pedigree} />
                </View>
                <Text style={styles.petBreed}>{pet.raca}</Text>
                <Text style={styles.petDetails}>
                  {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'} • {pet.sexo} • {pet.cor}
                </Text>
              </View>

              <View style={styles.petStatus}>
                <Text style={styles.statusText}>
                  Status: {pet.status_reproducao}
                </Text>
                <Text style={styles.timeText}>
                  {pet.regiao}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}