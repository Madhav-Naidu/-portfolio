import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './index.css';

const Scene3D = lazy(() => import('./components/Scene3D').then((module) => ({ default: module.Scene3D })));

function App() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-[#07070f] z-[-1]" aria-hidden="true" />}>
        <Scene3D />
      </Suspense>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;