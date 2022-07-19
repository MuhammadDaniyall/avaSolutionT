import { CHAT_USERS, CHAT_CONVERSATION_DATA, RECEIVE_DATA } from '../../constants/ActionTypes';

const INIT_STATE = {
  chatUsers: [],
  conversationList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHAT_USERS: {
      return {
        ...state,
        chatUsers: action.payload,
      };
    }
    case CHAT_CONVERSATION_DATA: {
      let filterRes,
        conversation = state.conversationList.find((item) => item.id === action.payload.id);
      if (action.payload.conversationData.length) {
        if (filterRes) {
          filterRes.conversationData = action.payload.conversationData;
        } else {
          filterRes = action.payload;
        }
      } else {
        filterRes = action.payload;
      }
      return {
        ...state,
        conversationList: conversation
          ? state.conversationList.map((item) => (item.id === filterRes.id ? { ...filterRes } : { ...item }))
          : [...state.conversationList, filterRes],
      };
    }
    case RECEIVE_DATA: {
      var tempConversationList = [...state.conversationList];
      tempConversationList.forEach((conversation) => {
        if (conversation.id == action.payload.sender_id || conversation.id == action.payload.receiver_id) {
          conversation.conversationData.push(action.payload);
        }
      });
      return {
        ...state,
        conversationList: tempConversationList,
      };
      // return {
      //   ...state,
      //   conversationList: { id: conversationList.id,  }
      // }
    }
    default:
      return state;
  }
};
