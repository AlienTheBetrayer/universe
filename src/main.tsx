import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StoreWatcher } from './zustand/StoreWatcher'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreWatcher/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
