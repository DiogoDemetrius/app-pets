import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { styles } from './PetMatchingScreen.styles';
import api from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PetMatchingScreen({ navigation, route }) {
  const { selectedPet } = route.params;
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [availablePets, setAvailablePets] = useState([]);
  const [showPedigreeOnly, setShowPedigreeOnly] = useState(false);
  const [colorFilter, setColorFilter] = useState('todas');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Animação para o swipe
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Cores disponíveis para filtro
  const colors = ['todas', 'preto', 'branco', 'dourado', 'marrom', 'chocolate'];

  // Buscar pets compatíveis do backend
  useEffect(() => {
    async function loadAvailablePets() {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post(
          '/match/pets',
          {
            raca: selectedPet.raca,
            sexo: selectedPet.sexo,
            cor: selectedPet.cor,
            pedigree: selectedPet.pedigree,
            displasia_coxofemural: selectedPet.displasia_coxofemural,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailablePets(response.data);
        setCurrentPetIndex(0);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar pets compatíveis.');
        setAvailablePets([]);
      }
      setLoading(false);
    }
    loadAvailablePets();
  }, [selectedPet]);

  // Filtros locais
  useEffect(() => {
    setCurrentPetIndex(0);
  }, [showPedigreeOnly, colorFilter, availablePets.length]);

  const filteredPets = availablePets.filter(pet => {
    if (showPedigreeOnly && !pet.pedigree) return false;
    if (colorFilter !== 'todas' && !pet.cor.toLowerCase().includes(colorFilter.toLowerCase())) return false;
    return true;
  });

  // Swipe handler
  const handleSwipeGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      translateX.setValue(nativeEvent.translationX);
      translateY.setValue(nativeEvent.translationY);
      const rotation = nativeEvent.translationX / screenWidth * 30;
      rotate.setValue(rotation);
    }

    if (nativeEvent.state === State.END) {
      const threshold = screenWidth * 0.25;

      if (nativeEvent.translationX > threshold) {
        handleLike();
      } else if (nativeEvent.translationX < -threshold) {
        handleReject();
      } else {
        Animated.parallel([
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          Animated.spring(rotate, { toValue: 0, useNativeDriver: true }),
        ]).start();
      }
    }
  };

  const handleReject = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -screenWidth * 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -30,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      nextPet();
    });
  };

  const handleLike = () => {
    const currentPet = filteredPets[currentPetIndex];
    navigation.navigate('Chat', {
      selectedPet: selectedPet,
      matchedPet: currentPet,
    });
  };

  const nextPet = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);

    if (currentPetIndex < filteredPets.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      Alert.alert('Fim', 'Não há mais pets para mostrar!');
    }
  };

  const togglePedigreeMode = () => {
    setShowPedigreeOnly(!showPedigreeOnly);
  };

  if (loading) {
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
        </LinearGradient>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Buscando pets compatíveis...</Text>
        </View>
      </View>
    );
  }

  if (filteredPets.length === 0) {
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
        </LinearGradient>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum pet encontrado</Text>
          <Text style={styles.emptyMessage}>
            Tente ajustar os filtros ou volte mais tarde
          </Text>
        </View>
      </View>
    );
  }

  const currentPet = filteredPets[currentPetIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
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

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterButtonText}>🎨</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pedigreeModeButton,
            showPedigreeOnly && styles.pedigreeModeButtonActive,
          ]}
          onPress={togglePedigreeMode}
        >
          <Text
            style={[
              styles.pedigreeModeText,
              showPedigreeOnly && styles.pedigreeModeTextActive,
            ]}
          >
            Pedigree Mode
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Filtros de Cor */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filtrar por cor:</Text>
          <View style={styles.colorFilters}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorFilter,
                  colorFilter === color && styles.colorFilterActive,
                ]}
                onPress={() => setColorFilter(color)}
              >
                <Text
                  style={[
                    styles.colorFilterText,
                    colorFilter === color && styles.colorFilterTextActive,
                  ]}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Card do Pet */}
      <View style={styles.cardContainer}>
        <PanGestureHandler onGestureEvent={handleSwipeGesture}>
          <Animated.View
            style={[
              styles.petCard,
              {
                transform: [
                  { translateX: translateX },
                  { translateY: translateY },
                  {
                    rotate: rotate.interpolate({
                      inputRange: [-30, 0, 30],
                      outputRange: ['-30deg', '0deg', '30deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: currentPet.foto || 'https://via.placeholder.com/300x400?text=Sem+Foto' }}
              style={styles.petImage}
            />

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.petInfoOverlay}
            >
              <View style={styles.petInfo}>
                <View style={styles.petNameRow}>
                  <Text style={styles.petName}>{currentPet.nome}</Text>
                  {currentPet.pedigree && (
                    <View style={styles.pedigreeBadge}>
                      <Text style={styles.pedigreeIcon}>✓</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.petBreed}>{currentPet.raca}</Text>
                <Text style={styles.petDetails}>
                  {currentPet.idade} {currentPet.idade === 1 ? 'ano' : 'anos'} • {currentPet.sexo} • {currentPet.cor}
                </Text>
                <Text style={styles.petLocation}>{currentPet.regiao}</Text>
                <Text style={styles.petOwner}>Dono: {currentPet.dono}</Text>
                <Text style={styles.petDescription}>{currentPet.descricao}</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={handleReject}
        >
          <Text style={styles.rejectButtonText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={handleLike}
        >
          <Text style={styles.chatButtonText}>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de Progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentPetIndex + 1} de {filteredPets.length}
        </Text>
      </View>
    </View>
  );
}