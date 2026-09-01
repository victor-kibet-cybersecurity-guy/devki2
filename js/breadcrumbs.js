/**
 * Dynamic Breadcrumb & JSON-LD BreadcrumbList Generator for Devki Group Platform
 * Automatically generates accessible navigation trails and SEO schema across internal pages.
 */

(function () {
  'use strict';

  // Base URL for schema.org absolute items
  const BASE_URL = 'https://victor-kibet-cybersecurity-guy.github.io/devki2';

  // Utility to determine relative root prefix (e.g., "", "../", "../../")
  function getRelativeRoot() {
    const path = window.location.pathname;
    if (path.includes('/locations/') || path.includes('/blog/') || path.includes('/calculators/') || path.includes('/counties/')) {
      return '../';
    }
    return '';
  }

  // Pre-defined mapping for standard internal pages and product categories
  const BREADCRUMB_MAP = {
    'index.html': null, // Home page: no breadcrumbs
    '': null,

    // Main hubs
    'about.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'About Us' }
    ],
    'products.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products' }
    ],
    'prices.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Master Price List' }
    ],
    'companies.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Group Companies' }
    ],
    'locations.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Commercial Locations' }
    ],
    'tools.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Calculators' }
    ],
    'resources.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Technical Resources' }
    ],
    'blog.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Blog Guides' }
    ],
    'contact.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Contact Us' }
    ],
    'sustainability.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Sustainability' }
    ],
    'gallery.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Gallery' }
    ],
    'careers.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Careers' }
    ],
    'privacy-policy.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Privacy Policy' }
    ],
    'terms.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Terms of Use' }
    ],
    'sitemap.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Sitemap' }
    ],
    'faq.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'FAQ' }
    ],

    // Product pages
    'products/devki-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products.html#steel' },
      { name: 'Devki Steel Bars' }
    ],
    'products/d8-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Devki D8 Steel Bar' }
    ],
    'products/d10-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Devki D10 Steel Bar' }
    ],
    'products/d12-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Devki D12 Steel Bar' }
    ],
    'products/d16-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Devki D16 Steel Bar' }
    ],
    'products/d20-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Devki D20 Steel Bar' }
    ],
    'products/devki-steel-tubes.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Tubes', url: 'products.html#tubes' },
      { name: 'Devki Steel Tubes' }
    ],
    'products/binding-wire.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products/devki-steel-bars.html' },
      { name: 'Binding Wire' }
    ],
    'simba-cement-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'products.html#cement' },
      { name: 'Simba Cement' }
    ],
    'products/simba-cement-32-5r.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'simba-cement-kenya.html' },
      { name: 'Simba Cement 32.5R' }
    ],
    'products/simba-cement-42-5n.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'simba-cement-kenya.html' },
      { name: 'Simba Cement 42.5N' }
    ],
    'products/rhino-cement.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'products.html#cement' },
      { name: 'Rhino Cement' }
    ],
    'maisha-mabati-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Roofing Mabati', url: 'products.html#roofing' },
      { name: 'Maisha Mabati' }
    ],
    'products/maisha-mabati-box-profile.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Roofing Mabati', url: 'maisha-mabati-kenya.html' },
      { name: 'Box Profile Sheet' }
    ],
    'products/maisha-mabati-corrugated.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Roofing Mabati', url: 'maisha-mabati-kenya.html' },
      { name: 'Corrugated Mabati' }
    ],
    'maisha-versatile-mabati.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Roofing Mabati', url: 'maisha-mabati-kenya.html' },
      { name: 'Versatile Tile' }
    ],
    'products/mavuno-fertilizer.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Fertilizer', url: 'products.html#fertilizer' },
      { name: 'Mavuno Fertilizer' }
    ]
  };

  function getPageFilename() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return 'index.html';
    return parts[parts.length - 1];
  }

  function getCleanPageTitle() {
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent) {
      return h1.textContent.split('|')[0].split('-')[0].trim();
    }
    const title = document.title;
    if (title) {
      return title.split('|')[0].split('-')[0].trim();
    }
    return 'Current Page';
  }

  function getTrail() {
    const path = window.location.pathname;
    const filename = getPageFilename();

    // Check if it's home page
    if (filename === 'index.html' || path === '/' || path.endsWith('/')) {
      return null; // No breadcrumbs on home
    }

    const relRoot = getRelativeRoot();

    // Check pre-defined map
    if (BREADCRUMB_MAP[filename]) {
      return BREADCRUMB_MAP[filename].map(item => ({
        name: item.name,
        url: item.url ? relRoot + item.url : null
      }));
    }

    // Dynamic folder-based matching
    if (path.includes('/locations/')) {
      const pageName = getCleanPageTitle().replace(/^Devki (Building Materials Distributor in )?/, '').replace(/ Distributor.*$/, '');
      return [
        { name: 'Home', url: '../index.html' },
        { name: 'Locations', url: '../locations.html' },
        { name: pageName || 'Location' }
      ];
    }

    if (path.includes('/counties/')) {
      const pageName = getCleanPageTitle().replace(/ County.*$/, '');
      return [
        { name: 'Home', url: '../index.html' },
        { name: 'Locations', url: '../locations.html' },
        { name: 'Counties', url: '../locations.html#counties' },
        { name: pageName || 'County' }
      ];
    }

    if (path.includes('/blog/')) {
      const pageName = getCleanPageTitle();
      return [
        { name: 'Home', url: '../index.html' },
        { name: 'Blog', url: '../blog.html' },
        { name: pageName || 'Article' }
      ];
    }

    if (path.includes('/calculators/')) {
      const pageName = getCleanPageTitle();
      return [
        { name: 'Home', url: '../index.html' },
        { name: 'Calculators', url: '../tools.html' },
        { name: pageName || 'Calculator' }
      ];
    }

    // Fallback default
    return [
      { name: 'Home', url: relRoot + 'index.html' },
      { name: getCleanPageTitle() }
    ];
  }

  function renderHTMLBreadcrumbs(trail) {
    if (!trail || trail.length === 0) return;

    // Find existing container
    let container = document.querySelector('.breadcrumb');
    if (!container) {
      // Find .page-hero .container or top of <main>
      const heroContainer = document.querySelector('.page-hero .container');
      if (heroContainer) {
        container = document.createElement('div');
        container.className = 'breadcrumb';
        heroContainer.insertBefore(container, heroContainer.firstChild);
      } else {
        const main = document.querySelector('main');
        if (main) {
          const wrapper = document.createElement('div');
          wrapper.className = 'container';
          container = document.createElement('div');
          container.className = 'breadcrumb';
          container.style.paddingTop = '20px';
          wrapper.appendChild(container);
          main.insertBefore(wrapper, main.firstChild);
        }
      }
    }

    if (!container) return;

    // Build accessible markup
    const olHTML = trail.map((item, index) => {
      const isLast = index === trail.length - 1;
      if (isLast || !item.url) {
        return `<li class="breadcrumb-item active" aria-current="page" style="color:#f87171;font-weight:700">${item.name}</li>`;
      }
      return `<li class="breadcrumb-item"><a href="${item.url}" style="color:#ffffff;text-decoration:none;transition:color 0.2s ease">${item.name}</a><span class="sep" style="margin:0 6px;color:#94a3b8">/</span></li>`;
    }).join('');

    container.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list" style="display:flex;flex-wrap:wrap;align-items:center;list-style:none;padding:0;margin:0 0 14px;font-size:0.88rem;color:#cbd5e1">
          ${olHTML}
        </ol>
      </nav>
    `;
  }

  function renderJSONLD(trail) {
    if (!trail || trail.length === 0) return;

    const currentOrigin = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : BASE_URL;

    const itemListElement = trail.map((item, index) => {
      let itemURL = '';
      if (item.url) {
        try {
          itemURL = new URL(item.url, window.location.href).href;
        } catch (e) {
          itemURL = currentOrigin + '/' + item.url.replace(/^\.\.\//, '');
        }
      } else {
        itemURL = window.location.href;
      }

      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': itemURL
      };
    });

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    };

    let scriptTag = document.getElementById('jsonld-breadcrumbs');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-breadcrumbs';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  }

  function init() {
    const trail = getTrail();
    if (trail) {
      renderHTMLBreadcrumbs(trail);
      renderJSONLD(trail);
    }
  }

  window.initBreadcrumbs = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
