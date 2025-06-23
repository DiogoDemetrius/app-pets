import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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

  // Centro do header (foto + nome + status)
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  chatProfileContainer: {
    position: 'relative',
    marginRight: 12,
  },
  chatProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatHeaderTextContainer: {
    flex: 1,
  },
  chatUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  onlineStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Botão de mais opções (canto direito)
  moreButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Container das mensagens
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },

  // Itens de mensagem
  messageItem: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },

  // Bolhas de mensagem
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myMessageBubble: {
    backgroundColor: '#ffab40',
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // Texto das mensagens
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#333333',
  },

  // Timestamp das mensagens
  messageTimestamp: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  myMessageTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  otherMessageTimestamp: {
    color: '#999999',
  },

  // Container do input
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 15,
    color: '#333333',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});