
"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const menu=$(".menu-btn"), nav=$("#siteNav");

if(menu&&nav){
  let prevActiveEl=null;

  // Create or retrieve Backdrop element
  let backdrop = $(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  // Create Mobile Drawer Header inside nav if not present
  let drawerHeader = nav.querySelector(".nav-drawer-header");
  if (!drawerHeader) {
    drawerHeader = document.createElement("div");
    drawerHeader.className = "nav-drawer-header";
    drawerHeader.innerHTML = `
      <span class="nav-drawer-brand">Navigation Menu</span>
      <button type="button" class="nav-drawer-close" aria-label="Close navigation menu">×</button>
    `;
    nav.insertBefore(drawerHeader, nav.firstChild);
  }

  const drawerCloseBtn = drawerHeader.querySelector(".nav-drawer-close");
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", () => closeMenu(true));
  }

  const getFocusables=()=>{
    const sel="a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const items=[...nav.querySelectorAll(sel)];
    if(menu && isMobileMenuVisible()) {
      // Include drawer close button and menu toggle button if visible
      if(!items.includes(menu)) items.push(menu);
    }
    return items.filter(el=>{
      const style=window.getComputedStyle(el);
      return style.display!=="none" && style.visibility!=="hidden" && (el.offsetWidth>0||el.offsetHeight>0||el.getClientRects().length>0);
    });
  };

  const isMobileMenuVisible=()=>window.getComputedStyle(menu).display!=="none";

  const closeMenu=(returnFocus=true)=>{
    if(!nav.classList.contains("open"))return;

    nav.classList.remove("open");
    if(backdrop) backdrop.classList.remove("open");
    document.body.classList.remove("nav-open");

    menu.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-label","Open navigation menu");
    menu.textContent="☰";

    if(isMobileMenuVisible()){
      nav.setAttribute("aria-hidden","true");
      nav.removeAttribute("aria-modal");
      nav.setAttribute("role","navigation");
    } else {
      nav.removeAttribute("aria-hidden");
      nav.removeAttribute("aria-modal");
    }

    document.removeEventListener("keydown",handleKeydown);
    document.removeEventListener("click",handleOutsideClick);
    document.removeEventListener("focusin",handleFocusIn);

    if(returnFocus&&isMobileMenuVisible()){
      const target=prevActiveEl&&document.body.contains(prevActiveEl)?prevActiveEl:menu;
      setTimeout(()=>{
        try{ target.focus(); }catch(e){}
      },50);
    }
  };

  const openMenu=()=>{
    prevActiveEl=document.activeElement;

    nav.classList.add("open");
    if(backdrop) backdrop.classList.add("open");
    document.body.classList.add("nav-open");

    menu.setAttribute("aria-expanded","true");
    menu.setAttribute("aria-label","Close navigation menu");
    menu.textContent="×";

    nav.setAttribute("aria-hidden","false");
    nav.setAttribute("role","dialog");
    nav.setAttribute("aria-modal","true");

    const focusables=getFocusables();
    const firstFocusable=drawerCloseBtn||focusables.find(el=>el!==menu)||menu;

    if(firstFocusable){
      setTimeout(()=>{
        try{ firstFocusable.focus(); }catch(e){}
      },60);
    }

    document.addEventListener("keydown",handleKeydown);
    document.addEventListener("click",handleOutsideClick);
    document.addEventListener("focusin",handleFocusIn);
  };

  const handleKeydown=(e)=>{
    if(!nav.classList.contains("open"))return;

    if(e.key==="Escape"){
      e.preventDefault();
      closeMenu(true);
      return;
    }

    if(e.key==="Tab"){
      const focusables=getFocusables();
      if(!focusables.length)return;

      const first=focusables[0];
      const last=focusables[focusables.length-1];

      if(e.shiftKey){
        if(document.activeElement===first){
          e.preventDefault();
          last.focus();
        }
      }else{
        if(document.activeElement===last){
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const handleFocusIn=(e)=>{
    if(!nav.classList.contains("open")||!isMobileMenuVisible())return;
    if(!nav.contains(e.target)&&!menu.contains(e.target)){
      e.preventDefault();
      const focusables=getFocusables();
      if(focusables.length)focusables[0].focus();
    }
  };

  const handleOutsideClick=(e)=>{
    if(!nav.classList.contains("open"))return;
    if(backdrop && e.target === backdrop){
      closeMenu(false);
      return;
    }
    if(!nav.contains(e.target)&&!menu.contains(e.target)){
      closeMenu(false);
    }
  };

  menu.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(nav.classList.contains("open"))closeMenu(true);
    else openMenu();
  });

  if(backdrop){
    backdrop.addEventListener("click",()=>closeMenu(false));
  }

  $$("a",nav).forEach(a=>a.addEventListener("click",()=>closeMenu(false)));

  window.addEventListener("resize",()=>{
    if(!isMobileMenuVisible()){
      if(nav.classList.contains("open")){
        closeMenu(false);
      }
      nav.removeAttribute("aria-hidden");
      nav.removeAttribute("aria-modal");
      nav.setAttribute("role","navigation");
    } else {
      if(!nav.classList.contains("open")){
        nav.setAttribute("aria-hidden","true");
      }
    }
  },{passive:true});

  if(isMobileMenuVisible()){
    nav.setAttribute("aria-hidden","true");
  }
}
const observer="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}}),{threshold:.08}):null;
$$(".reveal").forEach(el=>observer?observer.observe(el):el.classList.add("visible"));
const topBtn=$(".backtop");window.addEventListener("scroll",()=>topBtn?.classList.toggle("show",scrollY>700),{passive:true});topBtn?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
$$(".faq-q").forEach(q=>q.addEventListener("click",()=>{const item=q.closest(".faq-item");item.classList.toggle("open");q.setAttribute("aria-expanded",String(item.classList.contains("open")));}));
const form=$("#waForm"); if(form)form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form),get=k=>(fd.get(k)||"").toString().trim(),msg=$("#formMsg");if(!get("name")||!get("phone")||!get("county")||!get("product")||!get("message")){msg.textContent="Please complete all required fields.";return;}const text=`Hello DEVKI GROUP OF COMPANIES.\n\nName: ${get("name")}\nPhone: ${get("phone")}\nEmail: ${get("email")}\nCompany: ${get("company")}\nCounty: ${get("county")}\nProduct: ${get("product")}\nQuantity: ${get("quantity")}\n\nEnquiry:\n${get("message")}\n\nPlease assist me with my enquiry.`;window.open("https://wa.me/254735361747?text="+encodeURIComponent(text),"_blank","noopener,noreferrer");msg.textContent="Your WhatsApp enquiry is ready.";});

const cfb=document.getElementById("countyFindBtn");cfb?.addEventListener("click",()=>{const county=document.getElementById("countyFinder").value,product=document.getElementById("countyProduct").value,out=document.getElementById("countyFindResult");if(!county){out.textContent="Select a county first.";return;}const url="https://wa.me/254735361747?text="+encodeURIComponent(`Hello DEVKI GROUP OF COMPANIES. I am in ${county} County and I am looking for ${product}. Please advise on current supply options and quotation.`);out.innerHTML=`Product availability differs by location. <a class="link" target="_blank" rel="noopener noreferrer" href="${url}">Ask about ${product} supply to ${county} County →</a>`;});

/* Dynamic Breadcrumb & JSON-LD BreadcrumbList Generator */
(function generateDynamicBreadcrumbs() {
  const BASE_URL = 'https://devkigroup.co.ke';

  function getRelativeRoot() {
    const path = window.location.pathname;
    if (path.includes('/locations/') || path.includes('/blog/') || path.includes('/calculators/') || path.includes('/counties/')) {
      return '../';
    }
    return '';
  }

  const BREADCRUMB_MAP = {
    'index.html': null,
    '': null,

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

    // Individual Product Pages
    'devki-steel-bars-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'products.html#steel' },
      { name: 'Devki Steel Bars' }
    ],
    'devki-d8-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Devki D8 Steel Bar' }
    ],
    'devki-d10-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Devki D10 Steel Bar' }
    ],
    'devki-d12-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Devki D12 Steel Bar' }
    ],
    'devki-d16-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Devki D16 Steel Bar' }
    ],
    'devki-d20-steel-bars.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Devki D20 Steel Bar' }
    ],
    'devki-steel-tubes-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Tubes', url: 'products.html#tubes' },
      { name: 'Devki Steel Tubes' }
    ],
    'devki-binding-wire-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Steel Rebar', url: 'devki-steel-bars-kenya.html' },
      { name: 'Binding Wire' }
    ],
    'simba-cement-kenya.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'products.html#cement' },
      { name: 'Simba Cement' }
    ],
    'simba-cement-32-5r.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'simba-cement-kenya.html' },
      { name: 'Simba Cement 32.5R' }
    ],
    'simba-cement-42-5n.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Cement', url: 'simba-cement-kenya.html' },
      { name: 'Simba Cement 42.5N' }
    ],
    'rhino-cement-kenya.html': [
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
    'maisha-box-profile.html': [
      { name: 'Home', url: 'index.html' },
      { name: 'Products', url: 'products.html' },
      { name: 'Roofing Mabati', url: 'maisha-mabati-kenya.html' },
      { name: 'Box Profile Sheet' }
    ],
    'maisha-corrugated-mabati.html': [
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
    'mavuno-fertilizer-kenya.html': [
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

    if (filename === 'index.html' || path === '/' || path.endsWith('/')) {
      return null;
    }

    const relRoot = getRelativeRoot();

    if (BREADCRUMB_MAP[filename]) {
      return BREADCRUMB_MAP[filename].map(item => ({
        name: item.name,
        url: item.url ? relRoot + item.url : null
      }));
    }

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

    return [
      { name: 'Home', url: relRoot + 'index.html' },
      { name: getCleanPageTitle() }
    ];
  }

  function renderHTMLBreadcrumbs(trail) {
    if (!trail || trail.length === 0) return;

    let container = document.querySelector('.breadcrumb');
    if (!container) {
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
    init();
  }
})();
