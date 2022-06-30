import { createSlice } from '@reduxjs/toolkit'

export const despesaSlice = createSlice({
    name: 'despesas',
    initialState: [],
    reducers: {
        setDispesa(state, {payload}){
            return {state, despesa: payload};
        },
        updateDespesa(state, {payload}){
            const IsDespesa = (state.despesa === payload)
            if(IsDespesa){
                return state
            };
            state.push(payload)
        },

    }
})


export const { setDispesa } = despesaSlice.actions;
export const UseDespesas = state => state.despesas;
export default despesaSlice.reducer;

