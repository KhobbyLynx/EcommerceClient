// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Firebaase Imports
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../../configs/firebase'

// GET ALL MESSAGES
export const getAllMessages = createAsyncThunk(
  'appMessaging/getAllMessages',
  async (_, { dispatch, getState }) => {
    // Get Login user id
    const userId = getState().auth.userData.id

    console.log('GETALLMESSAGES', userId)

    if (!userId) {
      console.log('No user is signed in - GETALLMESSAGES')
      return
    }

    try {
      const messagesRef = doc(db, 'messaging', userId)

      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.data()
          if (!messagesData || !messagesData.chat.length) {
            console.log('No messages found - GETALLMESSAGES')
            return
          }

          const unseenMsgs = messagesData.unseenMsgs
          const messagesArray = messagesData.chat

          const messages = messagesArray.sort(
            (a, b) => new Date(a.time) - new Date(b.time)
          )

          console.log('GETALLMESSAGES', messagesData)

          dispatch({
            type: 'appMessaging/getAllMessagesSuccess',
            payload: {
              messages,
              unseenMsgs,
              unsubscribe,
            },
          })
        } else {
          console.log('Messages Document does not exist -GETALLMESSAGES')
        }
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error fetching all Messages -GETALLMESSAGES', error)
    }
  }
)

// ACTION TO UPDATE MARKASREAD
export const updateMessageAsRead = (messageId) => ({
  type: 'appMessaging/updateMessageAsRead',
  payload: messageId,
})

// MARK AS READ
export const markAsRead = createAsyncThunk(
  'appMessaging/markAsRead',
  async (messageIds, { dispatch, getState }) => {
    try {
      const unseenMsgs = getState().messaging.unseenMsgs
      const userId = getState().auth.userData.id

      if (!Array.isArray(messageIds) || messageIds.length === 0) {
        throw new Error('No message IDs provided. Please provide valid IDs.')
      }

      const messagesRef = doc(db, 'messaging', userId)

      // // Retrieve current chat data from Firestore
      // const docSnapshot = await getDoc(messagesRef)
      // const chat = docSnapshot.data().chat || []

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

export const appMessagingSlice = createSlice({
  name: 'appMessaging',
  initialState: {
    messages: [],
    selectedMessages: [],
    unseenMsgs: 0,
    selectedMessage: {},

    // Unsubcribe for firebase onSnapshot
    unsubscribeMessages: null,
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
        console.log('selectAllMessagesArr', selectAllMessagesArr)
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
  },
  extraReducers: (builder) => {
    builder.addCase('appMessaging/getAllMessagesSuccess', (state, action) => {
      state.unseenMsgs = action.payload.unseenMsgs
      state.messages = action.payload.messages

      if (state.unsubscribeMessages) {
        state.unsubscribeMessages()
      }

      state.unsubscribeMessages = action.payload.unsubscribe
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
