ARHAM PORTFOLIO — START HERE

Folder structure
Portfolio/
  index.html            single-page site (SEO tags, structured data, content)
  css/style.css         design system, layout, responsive rules, 404 styles
  js/script.js          GSAP animations, role slot text, cursor, mobile nav
  404.html              custom "page not found" page
  robots.txt, sitemap.xml, site.webmanifest, favicon.ico
  vercel.json           Vercel settings: security headers, caching, clean URLs
  .vercelignore         files Vercel should not publish (README, tools, original JFIF)
  _headers              same headers for Netlify / Cloudflare Pages (not used on Vercel)
  tools/set-domain.js   one-command helper to set your real domain (see below)
  assets/               images (WebP), share image (og-image.jpg), favicon/
                        hero-section-img.jfif is your original avatar (kept, not published)

Run locally
Open Portfolio/index.html with VS Code + Live Server (internet needed for GSAP and fonts).

DEPLOY ON VERCEL
1. Push the Portfolio folder to GitHub (the folder itself is the project root).
2. On vercel.com: Add New > Project > import the repo.
3. Framework Preset: "Other". Leave Build Command and Output Directory empty. Deploy.
4. Copy your live address (for example https://your-site.vercel.app).
5. Set your domain in the SEO tags. From the Portfolio folder run:
       node tools/set-domain.js https://your-site.vercel.app
   (or search for https://YOUR-DOMAIN.com and replace it by hand in index.html, robots.txt, sitemap.xml)
6. Commit and push again. Vercel redeploys automatically.
7. Add the site in Google Search Console and submit  your-site.vercel.app/sitemap.xml.

Other notes
- Contact: "Start a conversation" opens WhatsApp (03152136621) with a prefilled message. Edit the href in index.html to change the number or message. The number is still the temporary test one.
- FoodMania links go to https://project-foodmania.vercel.app/
- Hero layout: animated role text on the LEFT, avatar in the CENTER, name on the RIGHT (desktop). On phones: text on the left, avatar on the right.
- Role text pause time: ROLE_HOLD in js/script.js.
- Content-Security-Policy in vercel.json only allows scripts from your site and cdnjs.cloudflare.com; add any new script source there.
- Replaced images are cached for a week; keep file names or update index.html.
- No backend or contact form is connected.
