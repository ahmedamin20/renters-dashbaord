
import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import defaultAPI from '../axiosInstance';


const initialState = {
    data:[],
    loading: true,
    error : false,
}

export const getAccountingStatistics = createAsyncThunk(
    '/getaccountingStatistics',
    async ({from='',to=''}) => {
        if (from ===''){
            from ='2000-01-01'
          }
          if (to ===''){
            to ='2100-01-01'
          }
          
        const res = await defaultAPI.get(`/api/accounting?from=${from || ''}&to=${to || ''}`);
        return res.data;
    }
)


const accountingStatisticsSlice= createSlice(
    {
        name:'accountiingStatistics',
        initialState,
        reducers:{},
        extraReducers: (builder)=>{
            builder
            .addCase(getAccountingStatistics.fulfilled,(state,action)=>{
                state.data= action.payload.data;

                state.loading = false
            })
            .addCase(getAccountingStatistics.rejected,(state,action)=>{
                console.log('rejected',action)
                state.error = true;
                state.loading = false;
            })
            .addCase(getAccountingStatistics.pending,(state,action)=>{
                state.loading = true;
                console.log('pending',action)

            })
        }
    }
)

export default accountingStatisticsSlice.reducer;