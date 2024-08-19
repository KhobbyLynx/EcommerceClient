// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Firebaase Imports
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../../configs/firebase'

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
            (msg) => msg.feedback.isRead === false
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
        console.log('Notifications received:', snapshot.exists())

        if (snapshot.exists()) {
          const notificationsData = snapshot.data()
          console.log('Notifications Data received:', notificationsData)

          const notes = notificationsData.notifications || []

          const unseenNotes = notes.filter(
            (notes) => notes.isRead === false
          ).length

          console.log('Processed notes:', notes)

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
            feedback: {
              isRead: true,
              isDelivered: true,
              sent: true,
            },
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
    console.log('Note Ids Received:', noteIds) // Add this to ensure noteIds are passed correctly

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
      console.log('updatedNotifications:', updatedNotifications)
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

export const appMessagingSlice = createSlice({
  name: 'appMessaging',
  initialState: {
    // Messages
    messages: [],
    selectedMessages: [],
    unseenMsgs: 0,
    selectedMessage: {},

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
      console.log('selectedMessages', state.selectedMessages)
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
        feedback: {
          isRead: true,
          isDelivered: true,
          sent: true,
        },
      }

      state.messages = [...othersMsgs, updatedMsg]
    },
    updateNotificationsAsRead: (state, action) => {
      const noteIds = action.payload // Assuming this is an array of IDs

      state.notifications = state.notifications.map((note) =>
        noteIds.includes(note.id) ? { ...note, isRead: true } : note
      )
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
} = appMessagingSlice.actions

export default appMessagingSlice.reducer
