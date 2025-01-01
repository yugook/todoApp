import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Amplifyのインポート
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Amplifyの初期化
Amplify.configure(awsExports);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
