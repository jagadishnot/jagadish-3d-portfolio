# Jagadish V — 3D Animated Portfolio

A dark, cinematic, responsive portfolio built with React, Vite, Three.js / React Three Fiber, Framer Motion, GSAP + ScrollTrigger, and Lucide icons.

## Features
- Animated 3D orb with floating particles and orbital rings
- Motion-based page entrances and scroll reveals
- Responsive sidebar navigation and mobile menu
- Expanded project showcase, skills, education, experience, and contact sections
- Certificate gallery with direct Google Drive links from your resume
- 10 custom local 3D-style SVG project illustrations and 13 certificate plaque illustrations
- Scroll progress indicator, floating section navigation, and back-to-top button
- Scroll-triggered 3D certificate reveals and hover tilt
- GSAP ScrollTrigger scene-style reveals and gentle hero parallax
- Reduced-motion support and optimized, non-hijacking scroll motion
- Resume download button
- Copy-email interaction
- Reduced-motion accessibility support

## Run locally
1. Install Node.js LTS.
2. Extract this folder and open it in VS Code.
3. Open the VS Code terminal in this folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Add your resume
Copy your latest PDF into `public/` and name it exactly:

`Jagadish-V-Resume.pdf`

The download button uses `/Jagadish-V-Resume.pdf`.

## Customize links and content
- Update `PROFILE` at the top of `src/main.jsx` for your contact and social links.
- Update the `projects` array to change project titles, descriptions, tags, and URLs.
- Update `skills` to change your skills.
- Replace the visual abstract 3D orb with a model later if you have a `.glb` file.

## Deploy to Vercel
1. Push the extracted project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite** (Vercel usually detects this automatically).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**.

No API keys or backend service are required.


## Visual direction
Premium graphite/steel-teal palette with restrained warm brass accents, GSAP ScrollTrigger reveals, subtle hero parallax, pointer tilt on project cards, and reduced-motion support.


## Theme
Reference-inspired black/charcoal background, white typography, and crimson-pink accents. The design keeps restrained motion and the existing project/certificate artwork.


Hero visual: custom AI researcher illustration stored locally at `public/images/hero-ai-researcher.png`.


## Contact and motion update
- Direct phone link and WhatsApp chat CTA (India country code +91).
- Email conversation link with a prefilled subject/body.
- Animated data-analysis and model-training HUD panels around the hero researcher.
- Expanded skill groups for programming, analytics, ML, GenAI, computer vision, full stack, databases, cloud, big data, and tools.
