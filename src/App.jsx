import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TreeBackground from './components/TreeBackground';
import LoadingScreen from './components/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import ParticleEffects from './components/ParticleEffects';
import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import Home from './pages/Home';
import PhotoboothImages from './pages/PhotoboothImages';
import PhotoboothVideos from './pages/PhotoboothVideos';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router basename="/GFBD">
      <div className="relative min-h-screen">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Tree and purple background */}
        <TreeBackground />

        {/* Falling particles */}
        <ParticleEffects />

        {/* Header navigation */}
        <Header />

        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* Music Player */}
        <MusicPlayer />

        {/* Main content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photobooth-images" element={<PhotoboothImages />} />
          <Route path="/photobooth-videos" element={<PhotoboothVideos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
