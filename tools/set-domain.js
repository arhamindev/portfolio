// Replaces the placeholder domain with your real live address.
// Usage (from the Portfolio folder):  node tools/set-domain.js https://your-site.vercel.app
const fs = require("fs");
const path = require("path");

const PLACEHOLDER = "https://YOUR-DOMAIN.com";
const input = process.argv[2];

if (!input || !/^https:\/\/[^\s/]+$/.test(input.replace(/\/$/, ""))) {
  console.error("Please pass your full address, e.g.  node tools/set-domain.js https://your-site.vercel.app");
  process.exit(1);
}
const domain = input.replace(/\/$/, "");
const root = path.join(__dirname, "..");
let changed = 0;

for (const file of ["index.html", "robots.txt", "sitemap.xml"]) {
  const full = path.join(root, file);
  const text = fs.readFileSync(full, "utf8");
  if (text.includes(PLACEHOLDER)) {
    fs.writeFileSync(full, text.split(PLACEHOLDER).join(domain));
    changed++;
    console.log("Updated " + file);
  }
}
console.log(changed ? "Done. Domain set to " + domain : "Nothing to change (placeholder not found).");
