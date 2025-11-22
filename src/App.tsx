import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './context/StoryContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { StoryEditor } from './pages/StoryEditor';
import { StoryDetails } from './pages/StoryDetails';
import { ChapterEditor } from './pages/ChapterEditor';

function App() {
  return (
    <StoryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<StoryEditor />} />
            <Route path="/edit/:id" element={<StoryEditor />} />
            <Route path="/story/:id" element={<StoryDetails />} />
            <Route path="/story/:storyId/chapter/:chapterId" element={<ChapterEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoryProvider>
  );
}

export default App;
