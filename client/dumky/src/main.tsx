import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from './pages/MainPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegistrationPage } from './pages/RegistrationPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { UpdateProfilePage } from './pages/UpdateProfilePage.tsx'
import { AdminPanelPage } from './pages/AdminPanelPage.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <MainPage/>
  },
  {
    path: '/auth',
    element: <LoginPage/>
  },
  {
    path: '/auth/registration',
    element: <RegistrationPage/>
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/profile/update',
    element: <UpdateProfilePage/>
  },
  {
    path: '/adminPanel',
    element: <AdminPanelPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
