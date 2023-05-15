import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import VideoDownloading from './components/VideoDownloading';
import LinkCreation from './components/LinkCreation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<LinkCreation />} />
      <Route path="*" element={<VideoDownloading />} />
    </Routes>
  </BrowserRouter>
);
