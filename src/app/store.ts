import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginApi } from '../features/login/LoginApi';
import { registerApi } from '../features/register/RegisterApi';
import { usersAPI } from '../features/user_management/UsersApi';
import { PurchaseAPI } from '../features/purchase/PurchaseApi';
import { PaymentsAPI } from '../features/payments/PaymentsApi';
import { PaymentsInfoAPI } from '../features/payments/PaymentsInfoAPI';
import {customerReviewAPI} from '../features/reviews/CustomerReviewsApi';
import {ReviewsAPI} from '../features/reviews/ReviewsApi';
import {VehicleAPI} from '../features/purchase/VehicleApi';
import {LandAPI} from '../features/purchase/LandApi';
import{HouseAPI} from '../features/purchase/HouseApi';
import { LocationAPI } from '../features/location/LocationApi';
//auth persist config
const persistConfig = {
  key: 'auth',
  storage,
}

//combine all reducers
const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]:registerApi.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,[PurchaseAPI.reducerPath]:PurchaseAPI.reducer,
  [PaymentsAPI.reducerPath]:PaymentsAPI.reducer,[PaymentsInfoAPI.reducerPath]:PaymentsInfoAPI.reducer,
  [customerReviewAPI.reducerPath]:customerReviewAPI.reducer,
  [ReviewsAPI.reducerPath]:ReviewsAPI.reducer,
  [VehicleAPI.reducerPath]:VehicleAPI.reducer,[HouseAPI.reducerPath]:HouseAPI.reducer,
  [LandAPI.reducerPath]:LandAPI.reducer,[LocationAPI.reducerPath]:LocationAPI.reducer
});

//apply pesist Reducer to only counter reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:['persist/PERSIST','persist/REHYDRATE'],
      },
    }).concat(loginApi.middleware).concat(registerApi.middleware)
    .concat(usersAPI.middleware).concat(PurchaseAPI.middleware)
    .concat(PaymentsAPI.middleware).concat(PaymentsInfoAPI.middleware)
    .concat(customerReviewAPI.middleware).concat(ReviewsAPI.middleware).
    concat(VehicleAPI.middleware).concat(HouseAPI.middleware).concat(LandAPI.middleware).
    concat(LocationAPI.middleware)
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;