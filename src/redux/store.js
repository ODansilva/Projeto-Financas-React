import { configureStore } from '@reduxjs/toolkit'
import despesaSlice from './financas/despesaSlice'
import userSlice from './financas/userSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        despesas: despesaSlice,
    },
})