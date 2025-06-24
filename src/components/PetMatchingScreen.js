import React, { useEffect, useState } from 'react';
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PetMatchingScreen({ navigation, route }) {
  const { selectedPet } = route.params;
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [availablePets, setAvailablePets] = useState([]);
  const [showPedigreeOnly, setShowPedigreeOnly] = useState(false);
  const [colorFilter, setColorFilter] = useState('todas');
  const [showFilters, setShowFilters] = useState(false);

  // Animação para o swipe
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const rotate = new Animated.Value(0);

  // Mock data - substitua pela sua API
  const mockPets = [
    {
      id: 1,
      nome: 'Luna',
      raca: 'Golden Retriever',
      idade: 3,
      sexo: 'Fêmea',
      cor: 'Dourado',
      pedigree: true,
      foto: 'https://via.placeholder.com/300x400/ffab40/ffffff?text=Luna',
      regiao: 'São Paulo - SP',
      dono: 'Maria Silva',
      descricao: 'Cadela muito carinhosa e brincalhona, adora crianças e outros pets.',
    },
    {
      id: 2,
      nome: 'Thor',
      raca: 'Pastor Alemão',
      idade: 4,
      sexo: 'Macho',
      cor: 'Preto e marrom',
      pedigree: false,
      foto: 'https://via.placeholder.com/300x400/333333/ffffff?text=Thor',
      regiao: 'Rio de Janeiro - RJ',
      dono: 'João Santos',
      descricao: 'Cão protetor e leal, ideal para quem busca um companheiro fiel.',
    },
    {
      id: 3,
      nome: 'Bella',
      raca: 'Labrador',
      idade: 2,
      sexo: 'Fêmea',
      cor: 'Chocolate',
      pedigree: true,
      foto: 'https://via.placeholder.com/300x400/8B4513/ffffff?text=Bella',
      regiao: 'Belo Horizonte - MG',
      dono: 'Ana Costa',
      descricao: 'Muito ativa e inteligente, perfeita para atividades ao ar livre.',
    },
  ];

  useEffect(() => {
    loadAvailablePets();
  }, [showPedigreeOnly, colorFilter]);

  const loadAvailablePets = () => {
    let filteredPets = mockPets;

    if (showPedigreeOnly) {
      filteredPets = filteredPets.filter(pet => pet.pedigree);
    }

    if (colorFilter !== 'todas') {
      filteredPets = filteredPets.filter(pet => 
        pet.cor.toLowerCase().includes(colorFilter.toLowerCase())
      );
    }

    setAvailablePets(filteredPets);
    setCurrentPetIndex(0);
  };

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
        // Swipe direita - curtir
        handleLike();
      } else if (nativeEvent.translationX < -threshold) {
        // Swipe esquerda - rejeitar
        handleReject();
      } else {
        // Voltar para o centro
        Animated.parallel([
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          Animated.spring(rotate, { toValue: 0, useNativeDriver: true }),
        ]).start();
      }
    }
  };

  const handleReject = () => {
    // Animação para sair pela esquerda
    Animated.parallel([
      Animated.timing(translateX, { 
        toValue: -screenWidth * 1.5, 
        duration: 300, 
        useNativeDriver: true 
      }),
      Animated.timing(rotate, { 
        toValue: -30, 
        duration: 300, 
        useNativeDriver: true 
      }),
    ]).start(() => {
      nextPet();
    });
  };

  const handleLike = () => {
    // Navegar para conversa
    const currentPet = availablePets[currentPetIndex];
    navigation.navigate('Chat', {
      selectedPet: selectedPet,
      matchedPet: currentPet,
    });
  };

  const nextPet = () => {
    // Reset das animações
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);

    if (currentPetIndex < availablePets.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      Alert.alert('Fim', 'Não há mais pets para mostrar!');
    }
  };

  const togglePedigreeMode = () => {
    setShowPedigreeOnly(!showPedigreeOnly);
  };

  const colors = ['todas', 'preto', 'branco', 'dourado', 'marrom', 'chocolate'];

  if (availablePets.length === 0) {
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

  const currentPet = availablePets[currentPetIndex];

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
            showPedigreeOnly && styles.pedigreeModeButtonActive
          ]}
          onPress={togglePedigreeMode}
        >
          <Text style={[
            styles.pedigreeModeText,
            showPedigreeOnly && styles.pedigreeModeTextActive
          ]}>
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
                  colorFilter === color && styles.colorFilterActive
                ]}
                onPress={() => setColorFilter(color)}
              >
                <Text style={[
                  styles.colorFilterText,
                  colorFilter === color && styles.colorFilterTextActive
                ]}>
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
                  { rotate: rotate.interpolate({
                    inputRange: [-30, 0, 30],
                    outputRange: ['-30deg', '0deg', '30deg'],
                  })},
                ],
              },
            ]}
          >
            <Image
              source={{ uri: currentPet.foto }}
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
          {currentPetIndex + 1} de {availablePets.length}
        </Text>
      </View>
    </View>
  );
}