// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Firebaase Imports
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../../configs/firebase'
import {
  generateRandomId,
  ToastContentError,
  ToastContentSuccess,
} from '../../../../utility/Utils'
import toast from 'react-hot-toast'

// GET ALL MESSAGES
export const getAllMessages = createAsyncThunk(
  'appMessaging/getAllMessages',
  async (_, { dispatch, getState }) => {
    // Get Login user id
    const userId = getState().auth.userData.id

    if (!userId) {
      console.log('No user is signed in - GETALLMESSAGES')
      return
    }

    try {
      const messagesRef = doc(db, 'messaging', userId)

      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.data()

          const messages = messagesData.chat || []

          const unseenMsgs = messages.filter(
            (msg) => msg.isRead === false
          ).length

          dispatch({
            type: 'appMessaging/getAllMessagesSuccess',
            payload: {
              messages,
              unseenMsgs,
              unsubscribe,
            },
          })
        } else {
          console.log('Messages Document does not exist - GETALLMESSAGES')
        }
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error fetching all Messages -GETALLMESSAGES', error)
    }
  }
)
// GET ALL NOTIFICATIONS
export const getNotifications = createAsyncThunk(
  'appMessaging/getNotifications',
  async (_, { dispatch, getState }) => {
    // Get Login user id
    const userId = getState().auth.userData.id

    if (!userId) {
      console.log('No user is signed in - GETALLMESSAGES')
      return
    }

    try {
      const notificationsRef = doc(db, 'notifications', userId)

      const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
        if (snapshot.exists()) {
          const notificationsData = snapshot.data()

          const notes = notificationsData.notifications || []

          const unseenNotes = notes.filter(
            (notes) => notes.isRead === false
          ).length

          dispatch({
            type: 'appMessaging/getNotificationsSuccess',
            payload: {
              notes,
              unseenNotes,
              unsubscribe,
            },
          })
        } else {
          console.log(
            'Notifications Document does not exist - GETNOTIFICATIONS'
          )
        }
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error fetching all notifications -GETNOTIFICATIONS', error)
    }
  }
)

// ACTION TO UPDATE MARKASREAD
export const updateMessageAsRead = (messageId) => ({
  type: 'appMessaging/updateMessageAsRead',
  payload: messageId,
})

// ACTION TO UPDATE MARKASREAD - NOTIFICATIONS
export const updateNotificationsAsRead = (noteIds) => ({
  type: 'appMessaging/updateNotificationsAsRead',
  payload: noteIds, // Passing an array of IDs
})

// ACTION TO CREATE MESSAGE
export const createMessageSuccess = (msgs) => ({
  type: 'appMessaging/createMessageSuccess',
  payload: msgs, // Passing an array of IDs
})

// ACTION TO CREATE NOTIFICATION
export const createNotificationSuccess = (notes) => ({
  type: 'appMessaging/createNotificationSuccess',
  payload: notes, // Passing an array of IDs
})

// MARK AS READ
export const markAsRead = createAsyncThunk(
  'appMessaging/markAsRead',
  async (messageIds, { dispatch, getState }) => {
    try {
      const unseenMsgs = getState().messaging.unseenMsgs
      const userId = getState().auth.userData.id

      if (!Array.isArray(messageIds) || messageIds.length === 0) {
        throw new Error(
          'No message IDs provided. Please select message - MARKASREAD.'
        )
      }

      const messagesRef = doc(db, 'messaging', userId)

      const messages = getState().messaging.messages

      // Update the relevant messages
      const updatedChat = messages.map((msg) => {
        if (messageIds.includes(msg.id)) {
          return {
            ...msg,
            isRead: true,
          }
        }
        return msg
      })

      // Write the updated chat array back to Firestore
      await updateDoc(messagesRef, {
        unseenMsgs: unseenMsgs - messageIds.length,
        chat: updatedChat,
      })

      // Dispatch the update for each messageId
      messageIds.forEach((messageId) => {
        dispatch(updateMessageAsRead(messageId))
      })
    } catch (error) {
      console.log('Error - MARKASREAD', error)
    }
  }
)

// MARK AS READ - NOTIFICATIONS
export const markNotificationAsRead = createAsyncThunk(
  'appMessaging/markNotificationAsRead',
  async (noteIds, { dispatch, getState }) => {
    try {
      const userId = getState().auth.userData.id

      if (!Array.isArray(noteIds) || noteIds.length === 0) {
        throw new Error('No notifications selected - MARKASREAD NOTIFICATIONS.')
      }

      const notesRef = doc(db, 'notifications', userId)

      const notifications = getState().messaging.notifications

      // Update the relevant notifications
      const updatedNotifications = notifications.map((note) => {
        if (noteIds.includes(note.id)) {
          return {
            ...note,
            isRead: true,
          }
        }
        return note
      })
      // Write the updated notification array back to Firestore
      await updateDoc(notesRef, {
        notifications: updatedNotifications,
      })

      // Dispatch the update noteIds
      dispatch(updateNotificationsAsRead(noteIds))
    } catch (error) {
      console.log('Error - MARKASREAD NOTIFICATION', error)
    }
  }
)

// CREATE NOTIFICATION
export const createNotification = createAsyncThunk(
  'appMessaging/createNotification',
  async (data, { dispatch, getState }) => {
    try {
      // Data from Input
      const {
        subtitle,
        title,
        avatarContent = '',
        img = '',
        avatarIcon = '',
      } = data

      // Generate Id for new notification
      const noteId = generateRandomId()

      // UserId from Redux State
      const userId = getState().auth.userData.id

      // Notifcations Ref in Firebase
      const NotifcationsRef = doc(db, 'notifications', userId)

      // All Notifcations from Redux State
      const notifications = getState().messaging.notifications

      const newNotification = {
        id: noteId,
        subtitle,
        title,
        avatarIcon,
        avatarContent,
        img,
        time: new Date(),
        isRead: false,
      }

      const allNotifications = [...notifications, newNotification]

      await updateDoc(NotifcationsRef, {
        notifications: allNotifications,
      })

      dispatch(createNotificationSuccess(allNotifications))
      dispatch(getNotifications())
    } catch (error) {
      console.log('Error creating notification- CREATENOTE')
    }
  }
)

// SEND MESSAGE
export const createMessage = createAsyncThunk(
  'appMessaging/createMessage',
  async (data, { dispatch, getState }) => {
    try {
      // Data from Input
      const { message, title } = data

      // Generate Id for new message
      const messageId = generateRandomId()

      // UserId from Redux State
      const userId = getState().auth.userData.id

      console.log('@Create Msg', userId, messageId, data)

      // Messages Ref in Firebase
      const messagesRef = doc(db, 'messaging', userId)

      // All Messages from Redux State
      const messages = getState().messaging.messages

      const newMessage = {
        id: messageId,
        message,
        title,
        reply: [],
        time: new Date(),
        respond: true,
        type: 'client',
        sendId: userId,
        isReadAdmin: false,
        isRead: true,
      }

      const allMessages = [...messages, newMessage]

      await updateDoc(messagesRef, {
        chat: allMessages,
      })

      dispatch(
        createNotification({
          title: 'Message',
          subtitle: 'Your message was sent successfully',
          avatarIcon: 'done',
        })
      )

      toast((t) => (
        <ToastContentSuccess
          t={t}
          title='Success'
          msg='Message sent successfully!'
        />
      ))

      dispatch(createMessageSuccess(allMessages))
      dispatch(getAllMessages())
    } catch (error) {
      console.log('Error creating message- CREATEMESSAGE', error)

      toast((t) => (
        <ToastContentError
          t={t}
          title='Not Sent'
          msg='Error sending message!'
        />
      ))
    }
  }
)

// REPLY MESSAGE
export const replyMessage = createAsyncThunk(
  'appMessaging/replyMessage',
  async (data, { dispatch, getState }) => {
    try {
      // Data from Input
      const { message, title, msgId } = data

      // Generate Id for new message
      const messageId = generateRandomId()

      // UserId from Redux State
      const userId = getState().auth.userData.id

      // Messages Ref in Firebase
      const messagesRef = doc(db, 'messaging', userId)

      // All Messages from Redux State
      const messages = getState().messaging.messages

      const newMessage = {
        id: messageId,
        message,
        title,
        time: new Date(),
        respond: true,
        type: 'client',
        sendId: userId,
        isReadAdmin: false,
        isRead: true,
      }

      const updatedMsgs = messages.map((msg) => {
        if (msg.id === msgId) {
          return {
            ...msg,
            reply: [...msg.reply, newMessage],
          }
        }
        return msg
      })

      await updateDoc(messagesRef, {
        chat: updatedMsgs,
      })

      dispatch(getAllMessages())

      toast((t) => (
        <ToastContentSuccess
          t={t}
          title='Success'
          msg='Reply sent successfully!'
        />
      ))

      dispatch(createMessageSuccess(updatedMsgs))
    } catch (error) {
      console.log('Error replying message- REPLYMESSAGE')

      toast((t) => (
        <ToastContentError t={t} title='Not Sent' msg='Error sending reply!' />
      ))
    }
  }
)

export const appMessagingSlice = createSlice({
  name: 'appMessaging',
  initialState: {
    // Messages
    messages: [],
    selectedMessages: [],
    unseenMsgs: 0,
    selectedMessage: {},
    isReply: false,
    msgToReplyId: '',

    // Notifications
    notifications: [],
    unseenNotes: 0,

    // Unsubcribe for firebase onSnapshot
    unsubscribeMessages: null,
    unsubscribeNotifications: null,
  },
  reducers: {
    selectMessage: (state, action) => {
      const selectedMsg = state.messages.find(
        (msg) => msg.id === action.payload
      )
      state.selectedMessage = selectedMsg
    },
    checkMessage: (state, action) => {
      const selectedMessages = state.selectedMessages
      if (!selectedMessages.includes(action.payload)) {
        selectedMessages.push(action.payload)
      } else {
        selectedMessages.splice(selectedMessages.indexOf(action.payload), 1)
      }
    },
    selectAllMessage: (state, action) => {
      const selectAllMessagesArr = []
      if (action.payload) {
        selectAllMessagesArr.length = 0
        state.messages.forEach((msg) => selectAllMessagesArr.push(msg.id))
      } else {
        selectAllMessagesArr.length = 0
      }
      state.selectedMessages = selectAllMessagesArr
    },
    resetSelectedMessage: (state) => {
      state.selectedMessages = []
    },

    updateMessageAsRead: (state, action) => {
      const msgToUpdate = state.messages.find(
        (msg) => msg.id === action.payload
      )
      const othersMsgs = state.messages.filter(
        (msg) => msg.id !== action.payload
      )

      const updatedMsg = {
        ...msgToUpdate,
        isRead: true,
      }

      state.messages = [...othersMsgs, updatedMsg]
    },
    updateNotificationsAsRead: (state, action) => {
      const noteIds = action.payload // Assuming this is an array of IDs

      state.notifications = state.notifications.map((note) =>
        noteIds.includes(note.id) ? { ...note, isRead: true } : note
      )
    },
    createMessageSuccess: (state, action) => {
      state.messages = action.payload
    },
    isMessageReply: (state, action) => {
      state.msgToReplyId = action.payload
      state.isReply = !!action.payload
    },
    createNotificationSuccess: (state, action) => {
      state.notifications = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase('appMessaging/getAllMessagesSuccess', (state, action) => {
        state.unseenMsgs = action.payload.unseenMsgs
        const messages = action.payload.messages
        state.messages = messages

        if (state.unsubscribeMessages) {
          state.unsubscribeMessages()
        }

        state.unsubscribeMessages = action.payload.unsubscribe
      })
      .addCase('appMessaging/getNotificationsSuccess', (state, action) => {
        const notifications = action.payload.notes
        state.notifications = notifications
        state.unseenNotes = action.payload.unseenNotes

        if (state.unsubscribeNotifications) {
          state.unsubscribeNotifications()
        }

        state.unsubscribeNotifications = action.payload.unsubscribe
      })
  },
})

export const {
  selectMessage,
  selectAllMessage,
  resetSelectedMessage,
  checkMessage,
  isMessageReply,
} = appMessagingSlice.actions

export default appMessagingSlice.reducer
