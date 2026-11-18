# Simply Apps website

Plain static HTML and CSS for [simplyapps.com.au](https://simplyapps.com.au), served by GitHub Pages from this repository (custom domain in `CNAME`, HTTPS enforced). No build step, no tracking or analytics.

Pages (clean URLs, each folder has an `index.html`):

- `/` Home
- `/about/` About Simply Apps (QA Advisers Pty Ltd, ABN, address, director)
- `/simply-receipts/` Simply Receipts app page
- `/support/` Support, contact and FAQ
- `/simply-receipts/privacy/` Simply Receipts privacy policy
- `/terms/` Terms of use
- `404.html`, `robots.txt`, `sitemap.xml`

Redirects kept so old links still work: `/rk/` → `/simply-receipts/`, `/rk/privacy/` → `/simply-receipts/privacy/`, `/rk/support/` → `/support/`, plus `/privacy/`, `/contact/` and `/simply-receipts/support/`.

Preview locally: `python3 -m http.server 8080` in this folder, then open http://127.0.0.1:8080/.

DNS (VentraIP): apex A/AAAA records to GitHub Pages, `www` CNAME to `simplyappsau.github.io`. Leave the Google Workspace MX, SPF and DKIM records untouched.
