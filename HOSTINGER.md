# Publish The Skin Edit on Hostinger (skin-edit.ca)

## 1. Upload the website
**Option A: File Manager (easiest)**
1. Log in to Hostinger → **Websites** → **skin-edit.ca** → **Dashboard** → **File Manager**.
2. Open the **public_html** folder. Delete the default `default.php` or `index.php` if there is one.
3. Click **Upload** and upload `skin-edit-website.zip`. Right-click it → **Extract** into `public_html`.
4. Check that `index.html`, `css/`, `js/`, `images/` and `.htaccess` are directly inside `public_html`, not inside another folder. Then delete the zip.

**Option B: Connect GitHub (updates automatically)**
1. hPanel → **Advanced** → **Git**.
2. Repository: `https://github.com/shumailamuqdasprofessional-art/website-portfolio.git`
   Branch: `main` (or `claude/brave-johnson-e3ad3k` until it is merged). Directory: leave empty (`public_html`).
3. Click **Create**, then **Deploy**. Turn on **Auto deployment** if you want every GitHub change to go live.

## 2. Connect the domain
- If **skin-edit.ca** was bought at Hostinger: nothing to do.
- If it was bought somewhere else: at that company, change the nameservers to
  `ns1.dns-parking.com` and `ns2.dns-parking.com` (Hostinger shows the exact ones under **Domains → DNS / Nameservers**).
  Changes can take a few hours to 24 hours.

## 3. Turn on security (HTTPS / SSL)
1. hPanel → **Security** → **SSL** → install the **free SSL** for `skin-edit.ca` (and `www.skin-edit.ca`).
2. Wait until it says **Active**. The included `.htaccess` then forces every visitor to `https://skin-edit.ca`.

## What `.htaccess` does
- Always uses `https://skin-edit.ca` (no `http`, no `www`).
- Adds security headers (HSTS, CSP, no-sniff, frame protection, referrer and permissions policies).
- Blocks folder listing and hidden files (like `.git`).
- Compresses and caches files so the site loads faster.

## Check it
Open https://skin-edit.ca — you should see the lock icon. You can test the security headers at https://securityheaders.com.
