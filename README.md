# Kenguva Madhav Naidu - Developer Portfolio

A professional, cinematic 3D developer portfolio built with React 18, TypeScript, Three.js, and Tailwind CSS.

## Features

- **Cinematic 3D Background**: Wireframe icosahedron core, orbiting torus rings, floating cubes, and 1500-particle starfield
- **Interactive 3D**: Mouse parallax, scroll-based camera movement and scene rotation
- **Glassmorphism UI**: Dark theme with violet-to-teal gradient accents
- **Smooth Animations**: Framer Motion scroll reveals and hover effects
- **3D Tilt Cards**: Interactive cards that respond to mouse movement
- **Responsive Design**: Mobile-optimized with reduced particle count and disabled tilt effects
- **Accessibility**: WCAG AA contrast, semantic HTML, keyboard navigation, respects `prefers-reduced-motion`
- **Performance**: Lazy-loaded 3D canvas, optimized Three.js scene, Lighthouse 90+ ready

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3 for styling
- Three.js via @react-three/fiber and @react-three/drei
- Framer Motion for animations
- Oxlint with type-aware rules for linting
- Strict TypeScript (no `any`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

Runs Oxlint with type-aware rules.

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx       # Sticky navigation with scroll progress
│   ├── Hero.tsx         # Hero section with 3D profile photo
│   ├── About.tsx        # About section with animated stats
│   ├── Skills.tsx       # Skills grouped in glass cards
│   ├── Projects.tsx     # Project showcase cards
│   ├── Journey.tsx      # Timeline of education/certifications/leadership
│   ├── Contact.tsx      # Contact form and info
│   ├── Footer.tsx       # Site footer
│   ├── Scene3D.tsx      # Three.js 3D background scene
│   ├── TiltCard.tsx     # 3D tilt hover effect component
│   └── SectionHeading.tsx # Reusable section header
├── data/
│   └── portfolio.ts     # All content as typed constants
├── hooks/
│   ├── useScrollProgress.ts  # Scroll progress tracker
│   └── useMousePosition.ts   # Normalized mouse position
├── assets/
│   └── profile.jpg      # Profile photo
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Customization

All content is centralized in `src/data/portfolio.ts`. Edit this file to update:
- Personal information
- Skills and technologies
- Project details
- Journey timeline
- Contact information

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy!

### Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Manual Deployment

```bash
npm run build
# Upload the `dist` folder to any static hosting service
```

## Performance Optimization

- 3D canvas is lazy-loaded with React.lazy and Suspense
- Particle count reduces from 1500 to 600 on mobile
- Tilt effects disabled on mobile and when `prefers-reduced-motion` is set
- Three.js scene uses minimal geometries and materials
- Framer Motion animations use `transform` and `opacity` for GPU acceleration

## Accessibility

- Semantic HTML5 elements
- Alt text for all images
- Focus visible states for keyboard navigation
- WCAG AA contrast ratios
- Respects `prefers-reduced-motion`
- ARIA labels where needed

## License

MIT License - feel free to use this as a template for your own portfolio!