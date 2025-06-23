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
import { styles } from './PetDetailsScreen.styles';

export default function PetDetailsScreen({ navigation, route }) {
  const { pet: routePet } = route.params;
  const [userData, setUserData] = useState(null);
  const [pet, setPet] = useState(routePet);
  const [refreshing, setRefreshing] = useState(false);

  const loadUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData(user);
        
        // Encontra o pet atualizado no storage
        const updatedPet = user.pets?.find(p => p._id === pet._id || p.nome === pet.nome);
        if (updatedPet) {
          setPet(updatedPet);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Recarrega os dados quando volta da tela de edição
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

  const handleEditPet = () => {
    navigation.navigate('EditPet', { pet });
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

  const InfoRow = ({ label, value, highlight = false }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={[styles.infoValue, highlight && { color: '#ffab40', fontWeight: '600' }]}>
        {value || 'Não informado'}
      </Text>
    </View>
  );

  if (!userData || !pet) {
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
          <Text style={styles.headerTitle}>{pet.nome}</Text>
          <Text style={styles.headerSubtitle}>Detalhes do Pet</Text>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditPet}
        >
          <Text style={styles.editButtonText}>✎</Text>
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
        {/* Card principal com foto */}
        <View style={styles.mainCard}>
          <View style={styles.petImageContainer}>
            <Image
              source={{ 
                uri: pet.foto || 'https://via.placeholder.com/120x120/cccccc/ffffff?text=🐕' 
              }}
              style={styles.petImage}
            />
            <View style={styles.statusIndicator} />
          </View>

          <View style={styles.petMainInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.petName}>{pet.nome}</Text>
              <PedigreeIcon hasPedigree={pet.pedigree} />
            </View>
            <Text style={styles.petBreed}>{pet.raca}</Text>
            <Text style={styles.petBasicInfo}>
              {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'} • {pet.sexo} • {pet.cor}
            </Text>
          </View>
        </View>

        {/* Informações detalhadas */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <InfoRow label="Nome" value={pet.nome} />
          <InfoRow label="Raça" value={pet.raca} />
          <InfoRow label="Idade" value={`${pet.idade} ${pet.idade === 1 ? 'ano' : 'anos'}`} />
          <InfoRow label="Sexo" value={pet.sexo} />
          <InfoRow label="Cor" value={pet.cor} />
          <InfoRow label="Peso" value={pet.peso ? `${pet.peso} kg` : undefined} />
          <InfoRow label="Porte" value={pet.porte} />
        </View>

        {/* Informações de reprodução */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Reprodução</Text>
          
          <InfoRow label="Status" value={pet.status_reproducao} highlight={true} />
          <InfoRow label="Pedigree" value={pet.pedigree ? 'Sim' : 'Não'} />
          {pet.genealogia && (
            <InfoRow label="Genealogia" value={pet.genealogia} />
          )}
          {pet.registro && (
            <InfoRow label="Registro" value={pet.registro} />
          )}
        </View>

        {/* Localização */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Localização</Text>
          
          <InfoRow label="Região" value={pet.regiao} />
          <InfoRow label="Cidade" value={pet.cidade} />
          <InfoRow label="Estado" value={pet.estado} />
        </View>

        {/* Informações de saúde */}
        {(pet.vacinacao || pet.vermifugacao || pet.observacoes_saude) && (
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Saúde</Text>
            
            {pet.vacinacao && (
              <InfoRow label="Vacinação" value={pet.vacinacao} />
            )}
            {pet.vermifugacao && (
              <InfoRow label="Vermifugação" value={pet.vermifugacao} />
            )}
            {pet.observacoes_saude && (
              <InfoRow label="Observações" value={pet.observacoes_saude} />
            )}
          </View>
        )}

        {/* Observações gerais */}
        {pet.observacoes && (
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <Text style={styles.observationsText}>{pet.observacoes}</Text>
          </View>
        )}

        {/* Botão de editar */}
        <TouchableOpacity 
          style={styles.editButtonMain}
          onPress={handleEditPet}
        >
          <LinearGradient
            colors={["#ffab40", "#fb3415"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.editButtonGradient}
          >
            <Text style={styles.editButtonMainText}>Editar Informações</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}