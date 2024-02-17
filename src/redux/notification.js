import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export let getAllNotifications = createAsyncThunk(
  'notifications/get',
  async (info) => {
    // let { rejectWithValue } = ThunkApi;
    // &page=${arg.page}
    let apiURL = `/notifications?per_page=5&page=${info.page}`
    try {
      let res = await defaultAPI.get(apiURL)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export let getNextNotifications = createAsyncThunk(
  'notifications/get',
  async (info) => {
    // let { rejectWithValue } = ThunkApi;
    // &page=${arg.page}
    let apiURL = `/notifications?per_page=5&page=${info.page}`
    try {
      let res = await defaultAPI.get(apiURL)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export let ReadAllNotifications = createAsyncThunk(
  'notifications/ReadAllNotifications',
  async (ThunkApi) => {
    let { rejectWithValue } = ThunkApi
    try {
      let res = await defaultAPI.patch(`/notifications`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// export let FirstNotifications = createAsyncThunk(
//     "notifications/FirstNotifications",
//     async (arg) => {
//         try {
//             let res = await defaultAPI.get(
//                 `/notifications?per_page=5&page=${arg.page}`
//             );
//             return res.data;
//         } catch (error) {
//             throw(error);
//         }
//     }
// );
export let DeleteAllNotifications = createAsyncThunk(
  'notifications/DeleteAllNotifications',
  async () => {
    try {
      let res = await defaultAPI.delete(`/notifications`)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  },
)
export let DeleteOneNotification = createAsyncThunk(
  'notifications/DeleteOneNotification',
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi
    try {
      let res = await defaultAPI.delete(`/notifications/${arg.id}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
export let UnReadNtfThunk = createAsyncThunk(
  'notifications/UnReadNtfThunk',
  async () => {
    let apiURL = `/notifications/unread_notifications_count`
    try {
      let res = await defaultAPI.get(apiURL)
      return res.data
    } catch (error) {}
  },
)
export let DeleteOneNotificationsThunk = createAsyncThunk(
  'notifications/DeleteOneNotificationsThunk',
  async (arg, ThunkApi) => {
    // console.log(arg);

    let { rejectWithValue } = ThunkApi
    try {
      let res = await defaultAPI.delete(`/notifications/${arg.id}`)
      // console.log(res.data);
      return res.data
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data)
    }
  },
)
export let OneReadNtfThunk = createAsyncThunk(
  'notifications',
  async (arg, ThunkApi) => {
    // console.log(arg);

    let { rejectWithValue } = ThunkApi
    try {
      let res = await defaultAPI.patch(`/notifications/${arg.id}`)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  },
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    allNotifications: [],
    loading: false,
    error: false,
    currentPage: 1,
    lastPage: null,
    unRead: null,
  },
  reducers: {
    closeNtf: (state, action) => {
      state.currentPage = 1
      state.lastPage = 1
      state.allNotifications = []
    },

    handlePushNtf: (state, action, data) => {
      console.log('data from redux', action.payload)
      state.allNotifications.unshift(action.payload)
    },
  },
  extraReducers: {
    [getAllNotifications.pending]: (state) => {
      state.loading = true
    },
    [getAllNotifications.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.allNotifications = action.payload.data
      state.lastPage = action.payload.meta.last_page
      state.currentPage = action.payload.meta.current_page
      console.log('getAllNotifications', action.payload)
    },
    [DeleteAllNotifications.pending]: (state) => {
      state.loading = true
    },
    [DeleteAllNotifications.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.allNotifications = []
      // state.lastPage = action.payload.meta.last_page;
      // state.currentPage = action.payload.meta.current_page;
    },
    [getNextNotifications.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.lastPage = action.payload.meta.last_page
      state.currentPage = action.payload.meta.current_page
      state.allNotifications.push(...action.payload.data)
    },
    [getAllNotifications.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [UnReadNtfThunk.pending]: (state) => {
      state.loading = true
      state.error = false
    },
    [UnReadNtfThunk.fulfilled]: (state, action) => {
      state.unRead = action.payload
      // console.log(action.payload)
    },
    [UnReadNtfThunk.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})
export default notificationsSlice.reducer
export let { handlePushNtf } = notificationsSlice.actions
