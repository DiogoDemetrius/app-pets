import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './AddPetScreen.styles';

const regioesDF = [
  "Plano Piloto", "Gama", "Taguatinga", "Brazlândia", "Sobradinho", "Planaltina",
  "Paranoá", "Núcleo Bandeirante", "Ceilândia", "Guará", "Cruzeiro", "Samambaia",
  "Santa Maria", "São Sebastião", "Recanto das Emas", "Lago Sul", "Riacho Fundo",
  "Lago Norte", "Candangolândia", "Águas Claras", "Riacho Fundo II",
  "Sudoeste/Octogonal", "Varjão", "Park Way", "Fercal", "Jardim Botânico",
  "Itapoã", "SCIA/Estrutural", "SIA", "Vicente Pires", "Arniqueira",
  "Arapoanga", "Sol Nascente/Pôr do Sol"
];

export default function AddPetScreen({ navigation }) {
  const [petData, setPetData] = useState({
    nome: '',
    raca: '',
    idade: '',
    cor: '',
    sexo: '',
    status_reproducao: 'Disponível',
    displasia_coxofemural: 'Não Registrada',
    consanguinidade: 'Não Registrada',
    pedigree: false,
    regiao: '',
    foto: null,
  });
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria para adicionar uma foto");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPetData(prev => ({ ...prev, foto: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const handleSavePet = async () => {
    // Validações
    if (!petData.nome.trim()) {
      Alert.alert('Erro', 'Nome do pet é obrigatório');
      return;
    }
    if (!petData.raca.trim()) {
      Alert.alert('Erro', 'Raça do pet é obrigatória');
      return;
    }
    if (!petData.idade || isNaN(petData.idade) || petData.idade <= 0) {
      Alert.alert('Erro', 'Idade deve ser um número válido');
      return;
    }
    if (!petData.cor.trim()) {
      Alert.alert('Erro', 'Cor do pet é obrigatória');
      return;
    }
    if (!petData.sexo) {
      Alert.alert('Erro', 'Sexo do pet é obrigatório');
      return;
    }
    if (!petData.regiao) {
      Alert.alert('Erro', 'Região é obrigatória');
      return;
    }

    setLoading(true);

    try {
      // Recuperar dados do usuário
      const userString = await AsyncStorage.getItem('user');
      if (!userString) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      const userData = JSON.parse(userString);
      
      // Criar novo pet
      const newPet = {
        _id: Date.now().toString(), // ID temporário para o frontend
        nome: petData.nome.trim(),
        raca: petData.raca.trim(),
        idade: parseInt(petData.idade),
        cor: petData.cor.trim(),
        sexo: petData.sexo,
        status_reproducao: petData.status_reproducao,
        displasia_coxofemural: petData.displasia_coxofemural,
        consanguinidade: petData.consanguinidade,
        pedigree: petData.pedigree,
        regiao: petData.regiao,
        foto: petData.foto,
      };

      // Adicionar o pet à lista de pets do usuário
      if (!userData.pets) {
        userData.pets = [];
      }
      userData.pets.push(newPet);

      // Salvar os dados atualizados
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      // Aqui você também deveria fazer uma chamada para a API para salvar no backend
      // await api.addPet(userData._id, newPet);

      Alert.alert(
        'Sucesso',
        'Pet cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o pet');
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.headerTitle}>Adicionar Pet</Text>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, { opacity: loading ? 0.6 : 1 }]}
          onPress={handleSavePet}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Foto do Pet */}
        <View style={styles.imageSection}>
          <TouchableOpacity 
            style={styles.imageContainer}
            onPress={handleImagePicker}
          >
            {petData.foto ? (
              <Image source={{ uri: petData.foto }} style={styles.petImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderIcon}>📷</Text>
                <Text style={styles.imagePlaceholderText}>Adicionar Foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do pet"
              value={petData.nome}
              onChangeText={(text) => setPetData(prev => ({ ...prev, nome: text }))}
              maxLength={50}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Raça *</Text>
            <TextInput
              style={styles.input}
              placeholder="Raça do pet"
              value={petData.raca}
              onChangeText={(text) => setPetData(prev => ({ ...prev, raca: text }))}
              maxLength={50}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Idade *</Text>
              <TextInput
                style={styles.input}
                placeholder="Idade em anos"
                value={petData.idade}
                onChangeText={(text) => setPetData(prev => ({ ...prev, idade: text }))}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Cor *</Text>
              <TextInput
                style={styles.input}
                placeholder="Cor do pet"
                value={petData.cor}
                onChangeText={(text) => setPetData(prev => ({ ...prev, cor: text }))}
                maxLength={30}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={petData.sexo}
                onValueChange={(value) => setPetData(prev => ({ ...prev, sexo: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o sexo" value="" />
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Fêmea" value="Fêmea" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Região *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={petData.regiao}
                onValueChange={(value) => setPetData(prev => ({ ...prev, regiao: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a região" value="" />
                {regioesDF.map((regiao) => (
                  <Picker.Item key={regiao} label={regiao} value={regiao} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Informações de Reprodução */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reprodução e Saúde</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status de Reprodução</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={petData.status_reproducao}
                onValueChange={(value) => setPetData(prev => ({ ...prev, status_reproducao: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Disponível" value="Disponível" />
                <Picker.Item label="Indisponível" value="Indisponível" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Displasia Coxofemural</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={petData.displasia_coxofemural}
                onValueChange={(value) => setPetData(prev => ({ ...prev, displasia_coxofemural: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Não Registrada" value="Não Registrada" />
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
                <Picker.Item label="C" value="C" />
                <Picker.Item label="D" value="D" />
                <Picker.Item label="E" value="E" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Consanguinidade</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={petData.consanguinidade}
                onValueChange={(value) => setPetData(prev => ({ ...prev, consanguinidade: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Não Registrada" value="Não Registrada" />
                <Picker.Item label="Cadastrada" value="Cadastrada" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setPetData(prev => ({ ...prev, pedigree: !prev.pedigree }))}
          >
            <View style={[styles.checkbox, petData.pedigree && styles.checkboxChecked]}>
              {petData.pedigree && (
                <LinearGradient
                  colors={["#ffab40", "#fb3415", "#a92419"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.checkboxGradient}
                >
                  <Text style={styles.checkboxIcon}>✓</Text>
                </LinearGradient>
              )}
            </View>
            <Text style={styles.checkboxLabel}>Possui Pedigree</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}