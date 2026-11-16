# Simply Apps website

Plain static HTML and CSS for [simplyapps.com.au](https://simplyapps.com.au). There is no build step and no tracking or analytics.

This folder is the site root. Clean URLs use folders with `index.html` (`/`, `/rk/`, `/rk/privacy/`, `/rk/support/`). `404.html` is at the root for hosts that serve it on unknown paths (Cloudflare Pages and GitHub Pages both do).

To preview locally (from this directory):

```bash
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080/. Root-relative links (`/css/styles.css`, `/rk/`) need a local server; they will not work if you open the files directly in a browser.

**Do not deploy, buy, or sign up from this document.** The steps below are for Jack to do himself when he is ready.

## Hosting recommendation

**Prefer GitHub Pages (Free)** for the first publish, because Google Workspace mail is already live on `simplyapps.com.au` and GitHub Pages can be pointed from VentraIP with ordinary `A` / `AAAA` / `CNAME` records. That means you can leave existing **MX, SPF and DKIM records untouched**, and you do not have to move the domain’s nameservers.

GitHub Pages is free for a public repository on GitHub Free (this is a public marketing site). It serves `404.html`, supports HTTPS, and official apex and `www` records are documented. See [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) and [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

**Cloudflare Pages (Free)** is a good alternative (unlimited static requests, `404.html`, HTTPS, and the repo can stay private). Official docs say a **custom apex** domain (`simplyapps.com.au`, not only `www`) must be a Cloudflare zone, which means pointing nameservers at Cloudflare. If you choose that path, **copy every existing Google Workspace MX, SPF and DKIM record into the Cloudflare zone before changing nameservers at VentraIP**, or mail will break. See [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Both options are $0 for a static site like this.

### Deploy steps (Jack only)

**GitHub Pages**

1. Create a GitHub repository under the QA Advisers organisation (public is required on GitHub Free). Do not put secrets in the repo.
2. Upload the contents of this `site` folder to the repository (the folder contents, so `index.html` is at the repository root, or set Pages to serve this folder).
3. In the repository: Settings → Pages → publish from the default branch (or the folder you used).
4. Under Custom domain, enter `simplyapps.com.au` and save, then enable “Enforce HTTPS” when it becomes available (it can take up to 24 hours).
5. Add the DNS records below at VentraIP. Do not add a wildcard (`*.simplyapps.com.au`) record.
6. Wait for DNS (up to 24 hours) and confirm HTTPS.

**Cloudflare Pages (alternative)**

1. Create a Cloudflare account and a Pages project, and upload this `site` folder (direct upload) or connect the GitHub repo.
2. Add the custom domain `simplyapps.com.au` in the Pages project. Follow the records Cloudflare shows.
3. For the apex, add `simplyapps.com.au` as a Cloudflare zone and point VentraIP nameservers to Cloudflare **only after** MX, SPF and DKIM have been recreated in that zone. Then add `www` as well.
4. Confirm HTTPS and that mail still flows to Google Workspace.

## DNS records at VentraIP

Google Workspace is already live (`admin@simplyapps.com.au`). **Do not edit or delete existing MX, SPF (`TXT`) or DKIM records.** Those keep mail working. Live records were not reliably read from the environment that built this site, so check them in the VentraIP DNS panel (and Google Admin) before making changes.

If SPF is missing, add a `TXT` record on the apex following [Google’s SPF guidance](https://support.google.com/a/answer/10684623) (typically a value that includes `include:_spf.google.com`). If DMARC is missing, add a `TXT` record on `_dmarc.simplyapps.com.au` following [Google’s DMARC guidance](https://support.google.com/a/answer/2466580), starting with a monitoring policy such as `p=none` until you are confident.

### If you use GitHub Pages (recommended)

Add the following at VentraIP, after the custom domain is set in the GitHub repository. Replace `ORGANIZATION` with the GitHub organisation name. Official values: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

| Type | Name / host | Value |
| --- | --- | --- |
| `A` | `@` (apex, `simplyapps.com.au`) | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `simplyappsau.github.io` |

If VentraIP offers `ALIAS` or `ANAME` for the apex, you may use that pointed at `simplyappsau.github.io` instead of the `A` / `AAAA` set, as described on the same GitHub page. Do not point `www` at a `*.pages.github.io` hostname.

Remove any default parking or old `A` / `CNAME` records on `@` or `www` that would conflict, but **leave mail records alone**.

### If you use Cloudflare Pages

| Type | Name / host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `<YOUR_SITE>.pages.dev` (the hostname shown in the Pages dashboard after you add the custom domain) |

The apex is handled by a Cloudflare zone CNAME once nameservers point at Cloudflare (see the warning above). Do not invent IP addresses. Do not create these records until you have added the domain in the Pages dashboard, or the hostname will not resolve correctly.

## Open items for Jack

- **ABN.** Confirmed by Jack on 16 Nov 2026: QA Advisers Pty Ltd, ABN 58 674 800 518 (in footer and privacy policy).
- **Final privacy wording.** `/rk/privacy/` is a draft. The draft status is recorded in an HTML comment only, not in visible text, apart from the “Last updated” / effective date line (16 November 2026).
- **Legal review.** Have the privacy policy reviewed by a lawyer before RK is submitted to the App Store or Google Play.
- **Alias inboxes.** `admin@simplyapps.com.au` is live. Confirm that `support@`, `privacy@` and `dev@` are receiving mail before this site is public, because the support and privacy pages give those addresses to users.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/rk/` | `rk/index.html` |
| `/rk/privacy/` | `rk/privacy/index.html` |
| `/rk/support/` | `rk/support/index.html` |
| (unknown paths) | `404.html` |
