# Pritam Dhara | Portfolio

A modern, cyberpunk-themed developer portfolio built with React, TypeScript, and GSAP animations.

🔗 **Live Demo:** [pritam1813.github.io/portfolio](https://pritam1813.github.io/portfolio/)

![Portfolio Preview](./public/preview.png) <!-- TODO: Add a screenshot -->

## ✨ Features

- **Cyberpunk Design** - Neon gradients, glassmorphism, and dark theme
- **Smooth Animations** - GSAP ScrollTrigger, Framer Motion, and Lenis smooth scroll
- **Horizontal Project Gallery** - Scroll-triggered horizontal carousel
- **Optimized Images** - Auto-converted to WebP using vite-imagetools
- **Responsive** - Works on all screen sizes
- **Contact Form** - Formspree integration

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 19, TypeScript |
| Build Tool | Vite 7, Bun |
| Animations | GSAP, Framer Motion, Lenis |
| Styling | CSS Variables, Glassmorphism |
| Deployment | GitHub Pages |

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/pritam1813/portfolio.git
cd portfolio

# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── Header/
│   ├── Hero/
│   ├── Projects/
│   ├── Experience/
│   ├── Academics/
│   ├── Contact/
│   └── Footer/
├── assets/           # Optimized images
├── styles/           # Global CSS & design tokens
└── App.tsx           # Main app component
```

## 🔧 Configuration

### Customize Content
- **Projects:** Edit `src/components/Projects/Projects.tsx`
- **Experience:** Edit `src/components/Experience/Experience.tsx`
- **Contact Info:** Edit `src/components/Contact/Contact.tsx`
- **Social Links:** Edit `src/components/Footer/Footer.tsx`

### Formspree Setup
1. Create a form at [formspree.io](https://formspree.io)
2. Replace the form ID in `src/components/Contact/Contact.tsx`:
   ```tsx
   await fetch('https://formspree.io/f/YOUR_FORM_ID', ...)
   ```
3. Disable reCAPTCHA in Formspree settings for AJAX submissions

## 🌐 Deployment

The site auto-deploys to GitHub Pages on push to `main` branch.

### Manual Setup
1. Push to GitHub
2. Go to repo **Settings → Pages**
3. Set Source to **GitHub Actions**
4. Wait for build to complete

### Custom Domain
Add a `CNAME` file in `public/` with your domain, then update `vite.config.ts`:
```ts
base: '/',
```

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

Built with ❤️ by [Pritam Dhara](https://github.com/pritam1813)
