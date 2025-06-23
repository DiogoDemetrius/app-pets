import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header com gradiente
  header: {
    height: 120,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Logo da patinha (canto esquerdo)
  logoContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
  },
  
  // Nome do usuário (centralizado)
  userNameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  // Foto do usuário (canto direito)
  profilePictureContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  // Conteúdo principal
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 110, // Espaço ajustado para a nova barra
  },
  
  // Grid de botões
  buttonsGrid: {
    flex: 1,
  },
  contentButton: {
    width: '100%', // Ocupa toda a largura
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row', // Layout horizontal
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  buttonImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  
  // Barra de navegação inferior
  bottomNavigation: {
    position: 'absolute',
    bottom: 0, // Colada no fundo da tela
    left: 0,
    right: 0,
    height: 140, // Altura aumentada para compensar o espaço dos botões do sistema
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start', // Alinha os botões no topo da barra
    paddingTop: 10, // Espaço maior no topo da barra
    paddingBottom: 30, // Espaço no fundo para os botões do sistema
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    minWidth: 50,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  selectedNavIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconSelected: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  navLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
});