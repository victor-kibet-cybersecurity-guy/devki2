# DEVKI GROUP OF COMPANIES Official Distributor Frontend

Static frontend project built with HTML5, CSS3 and vanilla JavaScript.

## Distributor identity

The customer enquiry number used throughout the project is +254 735 361 747.  
WhatsApp: https://wa.me/254735361747

The site identifies itself as an Official Distributor customer enquiry platform. It does not claim to be the Devki Group corporate headquarters.

## Run locally

Open `index.html` in a browser.

For the best JSON/local-development behaviour, use a simple local server such as VS Code Live Server. The current product and location pages embed their core data in JavaScript/HTML, so the site remains functional when opened directly.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the project contents.
3. Open Repository Settings > Pages.
4. Choose Deploy from a branch.
5. Select `main` and `/root`.
6. Save.
7. Replace every `https://example.com/` canonical and sitemap URL with your final domain.

## Update phone number

Search the project for:
- `+254 735 361 747`
- `254735361747`
- `https://wa.me/254735361747`

Update visible text, `tel:` links and `wa.me` links together.

## Add products

1. Update `data/products.json`.
2. Update the `productData` array in `js/products.js` if you want products to work when opening files directly without a local server.
3. Add the corresponding optimized image under `images/products/`.

## Update locations

1. Update `data/locations.json`.
2. Update location cards in `locations.html`.
3. Add or update SEO landing pages under `locations/`.
4. Update `sitemap.xml`.

## Replace images

The current project uses lightweight original SVG placeholders so there are no broken image references. Replace them with authorized WebP or AVIF photography. Preserve descriptive filenames, `alt` text, width and height attributes.

## SEO metadata

Every page contains a unique title and meta description. Replace:
`https://example.com/`
with your production domain in canonical tags, Open Graph URLs and `sitemap.xml`.

## Custom domain

For GitHub Pages:
1. Add the domain under Settings > Pages > Custom domain.
2. Configure DNS with your domain provider using GitHub Pages records.
3. Enable HTTPS after DNS validation succeeds.
4. Update canonical URLs and sitemap URLs to the custom domain.

## Content Security Policy guidance

No secrets or API keys are needed. For production, prefer an HTTP `Content-Security-Policy` header at the CDN/domain layer. If using a meta policy on GitHub Pages, test it carefully before enforcing. The project avoids `eval()` and authenticated third-party APIs.

## Accuracy

Verify corporate ownership, executives, production figures, certifications, prices, delivery terms and facility classifications before publishing changes. Do not label every location as a warehouse unless an authoritative source does so.

## Performance

- No frameworks or large libraries.
- Responsive SVG placeholders.
- Deferred JavaScript.
- Lazy-loaded non-critical images.
- Explicit image dimensions.
- Reduced-motion support.
- Mobile-first responsive CSS.

Run Lighthouse/PageSpeed after replacing images because final media size strongly affects LCP and performance.


## Added interactive features

- Product comparison using localStorage
- Recently viewed products
- Roof sheet estimator
- Steel weight calculator
- Cement quantity calculator
- Basic building materials estimator
- County-based product finder
- 47 county SEO service pages
- Technical brochure/specification download area
- Expanded location guide
- Advanced existing search/autocomplete
- Related product enquiry workflow through WhatsApp

### Calculator disclaimer
All calculator outputs are planning estimates. Structural quantities, mix designs, roof geometry and final material schedules should be confirmed by a qualified engineer, architect, quantity surveyor or contractor where appropriate.

### County pages
County pages live under `/counties/`. They are written as service-area enquiry pages and do not claim a physical Devki facility exists in every county.
