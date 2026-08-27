"use strict";
const productGrid=document.getElementById("productGrid");
const productSearch=document.getElementById("productSearch");
const productCards=[...(productGrid?.querySelectorAll("[data-product-card]")||[])];
const productFilters=[...document.querySelectorAll("[data-product-filter]")];
let productCategory="All";
function filterStaticProducts(){
  const query=(productSearch?.value||"").trim().toLowerCase();
  let visible=0;
  for(const card of productCards){
    const category=card.dataset.category||"";
    const search=card.dataset.search||card.textContent.toLowerCase();
    const match=(productCategory==="All"||category===productCategory)&&(!query||search.includes(query));
    card.hidden=!match;if(match)visible++;
  }
  const count=document.getElementById("productResultCount");
  if(count)count.textContent=visible+" product"+(visible===1?"":"s")+" shown";
}
for(const button of productFilters)button.addEventListener("click",()=>{productCategory=button.dataset.productFilter||"All";for(const item of productFilters)item.classList.toggle("active",item===button);filterStaticProducts()});
productSearch?.addEventListener("input",filterStaticProducts);
filterStaticProducts();
