# Barae El-Ghannouchi - Portfolio Website

A modern, responsive portfolio website showcasing backend engineering projects and experience.

## Features

- 🎨 Modern dark theme with accent colors
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🚀 Single-page application built with React
- 💼 Professional sections: About, Experience, Projects, Contact

## Tech Stack

- React 18
- Space Grotesk & JetBrains Mono fonts
- Vanilla CSS with CSS variables for theming
- No build tools required - uses CDN resources

## Local Development

Simply open `index.html` in your browser. No build process needed!

```bash
# Option 1: Direct file
open index.html

# Option 2: Local server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment Options

### 1. Netlify (Recommended - Free)

**Via Netlify Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your portfolio folder
3. Done! You'll get a live URL instantly

**Via Git:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### 2. Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or use the [Vercel web dashboard](https://vercel.com/new):
1. Import your Git repository
2. Deploy automatically

### 3. GitHub Pages (Free)

1. Create a new repository named `username.github.io`
2. Push your code:
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/baraegh/baraegh.github.io.git
git push -u origin main
```
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://baraegh.github.io`

### 4. Cloudflare Pages (Free)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your Git repository
3. Configure build settings (none needed for static HTML)
4. Deploy

### 5. Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Customization

### Colors
Edit CSS variables in the `<style>` section:
```css
:root {
    --bg-primary: #0a0a0a;
    --accent-primary: #00ff88;
    --accent-secondary: #0088ff;
    /* ... more variables */
}
```

### Content
Update content directly in the React components:
- **Hero section**: Line ~180
- **About section**: Line ~300
- **Experience section**: Line ~430
- **Projects section**: Line ~600
- **Contact section**: Line ~780

### Fonts
Change fonts in the Google Fonts import (line 9) and CSS font-family declarations.

## Performance

- Uses CDN resources for fast loading
- Minimal dependencies (React only)
- Optimized animations with CSS
- Grain texture via inline SVG
- No external image assets

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - Feel free to use this as a template for your own portfolio!

## Contact

- Email: barae.gh@gmail.com
- GitHub: [@baraegh](https://github.com/baraegh)
- LinkedIn: [baraegh](https://linkedin.com/in/baraegh)
- Location: Casablanca, Morocco

---

Built with ❤️ by Barae El-Ghannouchi
