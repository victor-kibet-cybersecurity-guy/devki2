
"use strict";
const lb=document.getElementById("lightbox"),lbi=document.getElementById("lightboxImg");
document.querySelectorAll("[data-lightbox] img").forEach(img=>img.addEventListener("click",()=>{lbi.src=img.src;lbi.alt=img.alt;lb.classList.add("open");lb.setAttribute("aria-hidden","false");}));
document.querySelector("[data-lightbox-close]")?.addEventListener("click",()=>{lb.classList.remove("open");lb.setAttribute("aria-hidden","true");});
