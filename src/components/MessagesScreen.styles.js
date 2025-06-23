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

  // Botão de voltar (canto esquerdo)
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Título do header (centralizado)
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  // Seção de conversas
  conversationsSection: {
    flex: 1,
  },
  conversationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  conversationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileContainer: {
    position: 'relative',
    marginRight: 15,
  },
  conversationProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationTextContainer: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  conversationRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#fb3415',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Estado vazio
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },

  // Barra de navegação inferior
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 30,
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