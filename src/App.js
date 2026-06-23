import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Pages - to be created
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="p-8"><h1>ProfesorApp - Coming Soon</h1><p>Build the app by following SETUP.md</p></div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
