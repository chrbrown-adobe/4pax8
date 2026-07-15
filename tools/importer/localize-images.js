#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * localize-images.js
 *
 * Post-import content fix: downloads externally-hotlinked <img> URLs referenced
 * in an imported *.plain.html into a local media folder and rewrites the src
 * attributes to relative paths, so images render regardless of origin (external
 * hotlinks are blocked cross-origin by the source site's WordPress hotlink
 * protection).
 *
 * Usage:
 *   node tools/importer/localize-images.js <path-to.plain.html> [host-allowlist]
 *
 * Example:
 *   node tools/importer/localize-images.js \
 *     content/en-us/marketplace/cybersecurity.plain.html www.pax8.com
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const [, , pageArg, hostArg] = process.argv;
if (!pageArg) {
  console.error('Usage: node tools/importer/localize-images.js <path-to.plain.html> [host]');
  process.exit(1);
}

const pagePath = path.resolve(pageArg);
const allowHost = hostArg || 'www.pax8.com';
const pageDir = path.dirname(pagePath);
const mediaDir = path.join(pageDir, 'media');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const out = fs.createWriteStream(dest);
        res.pipe(out);
        out.on('finish', () => out.close(() => resolve()));
      },
    );
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error(`timeout ${url}`)));
  });
}

function fileNameFor(url) {
  const clean = url.split('?')[0].split('#')[0];
  let base = path.basename(clean);
  // strip elementor thumb hash suffix: name-r<hash>.ext -> name.ext
  base = base.replace(/-r[0-9a-z]{20,}(\.[a-z0-9]+)$/i, '$1');
  return base;
}

async function main() {
  let html = fs.readFileSync(pagePath, 'utf8');
  const re = new RegExp(`(src|srcset)="(https://${allowHost.replace(/\./g, '\\.')}/[^"]+?\\.(?:jpg|jpeg|png|svg|webp|gif))"`, 'gi');
  const urls = new Set();
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(html)) !== null) urls.add(m[2]);

  if (urls.size === 0) {
    console.log('No external images to localize.');
    return;
  }

  fs.mkdirSync(mediaDir, { recursive: true });
  const mapping = {};
  const usedNames = new Set();

  for (const url of urls) {
    let fn = fileNameFor(url);
    // de-dupe filename collisions
    while (usedNames.has(fn) && mapping[url] === undefined) {
      const ext = path.extname(fn);
      fn = `${path.basename(fn, ext)}-${Math.random().toString(36).slice(2, 6)}${ext}`;
    }
    const dest = path.join(mediaDir, fn);
    try {
      // eslint-disable-next-line no-await-in-loop
      await download(url, dest);
      const size = fs.statSync(dest).size;
      if (size === 0) throw new Error('0 bytes');
      usedNames.add(fn);
      mapping[url] = `./media/${fn}`;
      console.log(`✓ ${fn} (${size} bytes)`);
    } catch (e) {
      console.error(`✗ ${url} — ${e.message}`);
    }
  }

  // rewrite src references (exact URL match, all occurrences)
  let count = 0;
  for (const [url, rel] of Object.entries(mapping)) {
    const before = html;
    html = html.split(`"${url}"`).join(`"${rel}"`);
    if (html !== before) count += 1;
  }

  fs.writeFileSync(pagePath, html);
  console.log(`\nLocalized ${Object.keys(mapping).length} image(s); rewrote ${count} URL(s) in ${pageArg}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
