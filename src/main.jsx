import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import App from './App'
import Musica from './components/Musica'
import { AuthProvider } from './AuthContext'
import { GameProvider } from './GameContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GameProvider>
        <App />
        <Musica />
      </GameProvider>
    </AuthProvider>
  </StrictMode>,
)
