import React from 'react';
import { createRoot } from 'react-dom/client';
import MaleApp from './MaleApp.jsx';
// मुख्य वेबसाइट की तरह ही design tokens + shared layout primitives
// (container, section, btn, section-head आदि) यहाँ ज़रूर लोड होने चाहिए,
// वरना बटन और layout बिना style के दिखते हैं।
import '../index.css';
import '../App.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MaleApp />
  </React.StrictMode>
);
