import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Videos from './pages/Videos.jsx'
import VideoDetail from './pages/VideoDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: 'videos', element: <Videos /> },
      { path: 'videos/:keyword', element: <Videos /> },
      { path: 'videos/watch/:videoId', element: <VideoDetail /> },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
