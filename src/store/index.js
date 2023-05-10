import { configureStore } from '@reduxjs/toolkit'
import nameTrainerSlice from './slices/nameTrainer.slice'

export default configureStore({
  reducer: {
    nameTrainerSlice
    
	}
})