
"use strict";
const input=document.getElementById("locationSearch"),cards=[...document.querySelectorAll("[data-location]")];let lf="all";
function run(){const q=(input?.value||"").toLowerCase();cards.forEach(c=>{const t=c.dataset.location; c.hidden=!(t.includes(q)&&t.includes(lf));});}
input?.addEventListener("input",run);
document.querySelectorAll("[data-location-filter]").forEach((b,i)=>{if(i===0)b.classList.add("active");b.addEventListener("click",()=>{lf=b.dataset.locationFilter.toLowerCase();document.querySelectorAll("[data-location-filter]").forEach(x=>x.classList.toggle("active",x===b));run();});});
