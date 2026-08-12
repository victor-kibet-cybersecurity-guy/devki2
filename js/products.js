
"use strict";
const productData=[
  {"id": "steel-bars", "name": "Steel Reinforcement Bars", "company": "Devki Steel Mills Limited", "category": "Steel", "uses": "Reinforced concrete construction", "image": "images/products/steel-bars.svg", "url": "devki-steel-bars-kenya.html", "sku": "DEVKI-REBAR-SERIES", "mpn": "DEVKI-REBAR", "lowPrice": 490, "highPrice": 3200},
  {"id": "steel-tubes", "name": "Steel Tubes", "company": "Devki Steel Mills Limited", "category": "Steel", "uses": "Fabrication and structural applications", "image": "images/products/steel-tubes.svg", "url": "devki-steel-tubes-kenya.html", "sku": "DEVKI-TUBES-SERIES", "mpn": "DEVKI-TUBES", "price": 1450},
  {"id": "steel-wires", "name": "Steel Wires", "company": "Devki Steel Mills Limited", "category": "Steel", "uses": "Construction and industrial applications", "image": "images/products/steel-wires.svg", "url": "devki-binding-wire-kenya.html", "sku": "DEVKI-BINDWIRE-G16", "mpn": "DEVKI-WIRE", "price": 3800},
  {"id": "simba-cement", "name": "Simba Cement", "company": "National Cement Company Limited", "category": "Cement", "uses": "General building and construction", "image": "images/products/simba-cement.svg", "url": "simba-cement-kenya.html", "sku": "SIMBA-CEM-KENYA", "mpn": "SIMBA-CEMENT", "lowPrice": 680, "highPrice": 750},
  {"id": "rhino-cement", "name": "Rhino Cement", "company": "National Cement Company Limited", "category": "Cement", "uses": "Building and construction", "image": "images/products/rhino-cement.svg", "url": "rhino-cement-kenya.html", "sku": "RHINO-CEM-50KG", "mpn": "RHINO-CEMENT", "price": 670},
  {"id": "maisha-roofing", "name": "Maisha Roofing Sheets", "company": "Maisha Mabati Mills Limited", "category": "Roofing", "uses": "Residential, commercial and institutional roofing", "image": "images/products/roofing-sheets.svg", "url": "maisha-mabati-kenya.html", "sku": "MAISHA-ROOFING-SERIES", "mpn": "MAISHA-MABATI", "lowPrice": 480, "highPrice": 850},
  {"id": "fertilizers", "name": "Agricultural Fertilizers", "company": "Maisha Minerals & Fertilizers Limited", "category": "Agriculture", "uses": "Crop nutrition applications", "image": "images/products/fertilizer.svg", "url": "mavuno-fertilizer-kenya.html", "sku": "MAVUNO-FERT-50KG", "mpn": "MAVUNO-FERT", "price": 4200},
  {"id": "industrial-packaging", "name": "Industrial Packaging", "company": "Maisha Packaging Company Limited", "category": "Packaging", "uses": "Cement, fertilizer and industrial packaging", "image": "images/products/packaging.svg", "url": "products.html", "sku": "MAISHA-PKG-SERIES", "mpn": "MAISHA-PACK", "price": 50}
];

const grid=document.getElementById("productGrid"), search=document.getElementById("productSearch");let filter="All";

function updateProductListJsonLd(list) {
  let script = document.getElementById("jsonld-product-list");
  if (!script) {
    script = document.createElement("script");
    script.id = "jsonld-product-list";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Devki Group Building Materials & Industrial Products",
    "numberOfItems": list.length,
    "itemListElement": list.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "image": `https://example.com/${p.image}`,
        "description": `${p.name} manufactured by ${p.company} for ${p.uses}.`,
        "sku": p.sku,
        "mpn": p.mpn,
        "category": p.category,
        "brand": { "@type": "Brand", "name": p.company },
        "offers": p.lowPrice ? {
          "@type": "AggregateOffer",
          "priceCurrency": "KES",
          "lowPrice": p.lowPrice,
          "highPrice": p.highPrice,
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "DEVKI GROUP OF COMPANIES Official Distributor" }
        } : {
          "@type": "Offer",
          "priceCurrency": "KES",
          "price": p.price,
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "DEVKI GROUP OF COMPANIES Official Distributor" }
        }
      }
    }))
  };
  script.textContent = JSON.stringify(jsonLdData, null, 2);
}

function renderProducts(){
  if(!grid)return;
  const q=(search?.value||"").toLowerCase();
  const list=productData.filter(p=>(filter==="All"||p.category===filter)&&(`${p.name} ${p.company} ${p.category} ${p.uses}`.toLowerCase().includes(q)));
  
  updateProductListJsonLd(list);

  grid.innerHTML=list.map(p=>`
    <article class="card" itemscope itemtype="https://schema.org/Product">
      <img class="card-img" src="${p.image}" alt="${p.name}" itemprop="image" width="1600" height="900" loading="lazy">
      <div class="card-body">
        <span class="eyebrow" itemprop="category">${p.category}</span>
        <h2 itemprop="name">${p.name}</h2>
        <p itemprop="brand" itemscope itemtype="https://schema.org/Brand"><span itemprop="name">${p.company}</span></p>
        <meta itemprop="description" content="${p.name} manufactured by ${p.company} for ${p.uses}">
        <meta itemprop="sku" content="${p.sku}">
        <meta itemprop="mpn" content="${p.mpn}">
        <div itemprop="offers" itemscope itemtype="${p.lowPrice ? 'https://schema.org/AggregateOffer' : 'https://schema.org/Offer'}">
          <meta itemprop="priceCurrency" content="KES">
          ${p.lowPrice ? `<meta itemprop="lowPrice" content="${p.lowPrice}"><meta itemprop="highPrice" content="${p.highPrice}">` : `<meta itemprop="price" content="${p.price}">`}
          <link itemprop="availability" href="https://schema.org/InStock">
          <div class="tags">
            <span class="tag">Request Price</span>
            <span class="tag">${p.uses}</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-light" data-product="${p.id}">Details</button>
          ${p.url ? `<a class="btn btn-dark" href="${p.url}">Page →</a>` : ''}
          <a class="btn btn-primary" href="https://wa.me/254735361747?text=${encodeURIComponent("Hello DEVKI GROUP OF COMPANIES, I am interested in "+p.name+". Please send me more information.")}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </article>
  `).join("")||"<p>No matching products found.</p>";
  
  grid.querySelectorAll("[data-product]").forEach(b=>b.addEventListener("click",()=>openProduct(b.dataset.product)));
}
document.querySelectorAll("[data-product-filter]").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.productFilter;document.querySelectorAll("[data-product-filter]").forEach(x=>x.classList.toggle("active",x===b));renderProducts();}));search?.addEventListener("input",renderProducts);
function openProduct(id){const p=productData.find(x=>x.id===id),m=document.getElementById("productModal"),c=document.getElementById("productModalContent");if(!p||!m||!c)return;c.innerHTML=`<img class="card-img" src="${p.image}" alt="${p.name}"><div class="modal-content"><span class="eyebrow">${p.category}</span><h2>${p.name}</h2><p><strong>Company:</strong> ${p.company}</p><p><strong>Main uses:</strong> ${p.uses}</p><p>Contact us for current specifications, availability and price.</p><a class="btn btn-primary" href="https://wa.me/254735361747?text=${encodeURIComponent("Hello, I am interested in "+p.name)}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></div>`;m.classList.add("open");m.setAttribute("aria-hidden","false");}
document.querySelector("[data-product-close]")?.addEventListener("click",()=>{const m=document.getElementById("productModal");m.classList.remove("open");m.setAttribute("aria-hidden","true");});renderProducts();


const compareKey="devkiCompare", recentKey="devkiRecent";
function getStore(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch{return[]}}
function setStore(k,v){localStorage.setItem(k,JSON.stringify(v))}
function addRecent(id){let a=getStore(recentKey).filter(x=>x!==id);a.unshift(id);setStore(recentKey,a.slice(0,6));renderRecent()}
function toggleCompare(id){let a=getStore(compareKey);a=a.includes(id)?a.filter(x=>x!==id):[...a,id].slice(-3);setStore(compareKey,a);renderCompare()}
function renderRecent(){const box=document.getElementById("recentProducts");if(!box)return;const ids=getStore(recentKey),list=ids.map(id=>productData.find(p=>p.id===id)).filter(Boolean);box.innerHTML=list.length?list.map(p=>`<a class="tag" href="#productGrid" data-open-recent="${p.id}">${p.name}</a>`).join(""):"<span class='tag'>No recently viewed products yet</span>";box.querySelectorAll("[data-open-recent]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();openProduct(a.dataset.openRecent)}))}
function renderCompare(){const box=document.getElementById("compareBar");if(!box)return;const ids=getStore(compareKey),list=ids.map(id=>productData.find(p=>p.id===id)).filter(Boolean);box.innerHTML=`<strong>Compare:</strong> ${list.map(p=>`<span class="tag">${p.name}</span>`).join("")} ${list.length>1?'<button class="btn btn-dark" id="showCompare">Compare selected</button>':''}`;document.getElementById("showCompare")?.addEventListener("click",()=>{const m=document.getElementById("productModal"),c=document.getElementById("productModalContent");c.innerHTML=`<div class="modal-content"><h2>Product comparison</h2><div class="table-wrap"><table class="table"><thead><tr><th>Product</th><th>Company</th><th>Category</th><th>Main uses</th></tr></thead><tbody>${list.map(p=>`<tr><td>${p.name}</td><td>${p.company}</td><td>${p.category}</td><td>${p.uses}</td></tr>`).join("")}</tbody></table></div></div>`;m.classList.add("open");m.setAttribute("aria-hidden","false")})}
const oldOpen=openProduct; openProduct=function(id){addRecent(id);oldOpen(id)};
document.addEventListener("click",e=>{const b=e.target.closest("[data-compare]");if(b)toggleCompare(b.dataset.compare)});
const originalRender=renderProducts;
renderProducts=function(){originalRender();document.querySelectorAll("[data-product]").forEach(b=>{if(!b.parentElement.querySelector("[data-compare]")){const c=document.createElement("button");c.className="btn btn-light";c.dataset.compare=b.dataset.product;c.textContent="Compare";b.parentElement.appendChild(c)}})};
renderProducts();renderRecent();renderCompare();
