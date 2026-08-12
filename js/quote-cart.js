/**
 * Universal Quote Cart & Order Builder for Devki Group Products
 * Handles adding products (steel, cement, mabati, fertilizer) to a floating quote basket
 * and generating formatted WhatsApp orders with county selection.
 */

(function () {
  const STORAGE_KEY = 'devki_quote_cart_v1';
  const WHATSAPP_NUMBER = '254735361747';

  const KENYA_COUNTIES = [
    "Nairobi", "Kiambu", "Mombasa", "Nakuru", "Kisumu", "Uasin Gishu (Eldoret)",
    "Machakos", "Kajiado", "Kilifi", "Meru", "Kakamega", "Nyeri", "Murang'a",
    "Kericho", "Bungoma", "Laikipia", "Embu", "Trans Nzoia (Kitale)", "Narok",
    "Makueni", "Nyandarua", "Nandi", "Kisii", "Homa Bay", "Siaya", "Busia",
    "Bomet", "Migori", "Kwale", "Taita-Taveta", "Garissa", "Wajir", "Mandera",
    "Marsabit", "Isiolo", "Kitui", "Tharaka-Nithi", "Kirinyaga", "Turkana",
    "West Pokot", "Samburu", "Elgeyo-Marakwet", "Baringo", "Vihiga", "Nyamira",
    "Tana River", "Lamu"
  ];

  let cart = [];

  function loadCart() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) cart = JSON.parse(stored);
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateUI();
  }

  function addToCart(item) {
    // item: { id, name, price, unit, qty }
    const existingIndex = cart.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += (item.qty || 1);
    } else {
      cart.push({
        id: item.id || item.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: item.name,
        price: Number(item.price) || 0,
        unit: item.unit || 'pcs',
        qty: item.qty || 1
      });
    }
    saveCart();
    showToast(`Added "${item.name}" to Quote Basket!`);
  }

  function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function showToast(msg) {
    let toast = document.getElementById('quoteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'quoteToast';
      toast.className = 'quote-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function buildUI() {
    // Inject floating quote drawer trigger & panel if not present
    if (document.getElementById('quoteDrawer')) return;

    const drawerHTML = `
      <button id="quoteTrigger" class="quote-trigger" aria-label="Open Quote Basket">
        <span class="quote-icon">📋</span>
        <span class="quote-text">Quote Basket</span>
        <span id="quoteBadge" class="quote-badge">0</span>
      </button>

      <div id="quoteDrawer" class="quote-drawer-backdrop" aria-hidden="true">
        <div class="quote-drawer">
          <div class="quote-drawer-header">
            <h3>Your Material Quotation Basket</h3>
            <button id="closeQuoteDrawer" class="quote-close-btn" aria-label="Close basket">✕</button>
          </div>

          <div class="quote-drawer-body">
            <div id="quoteItemsList" class="quote-items-list"></div>

            <div class="quote-order-meta">
              <div class="field" style="margin-top:16px">
                <label for="quoteCountySelect">Select County for Delivery (All 47 Counties):</label>
                <select id="quoteCountySelect" class="quote-select">
                  <option value="">-- Choose Destination County --</option>
                  ${KENYA_COUNTIES.map(c => `<option value="${c}">${c} County</option>`).join('')}
                </select>
              </div>

              <div class="field" style="margin-top:12px">
                <label for="quoteProjectNote">Project / Delivery Notes (Optional):</label>
                <input id="quoteProjectNote" type="text" placeholder="e.g. Need delivery to site in Ruiru near Kamiti road..." />
              </div>

              <div class="quote-total-box">
                <span>Estimated Total:</span>
                <strong id="quoteTotalVal">KSh 0</strong>
              </div>
            </div>
          </div>

          <div class="quote-drawer-footer">
            <button id="sendWhatsappQuote" class="btn btn-primary" style="width:100%;min-height:50px;font-size:1.05rem">
              Send Quotation Request on WhatsApp 💬
            </button>
            <button id="clearQuoteCart" class="quote-clear-btn">Clear Basket</button>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = drawerHTML;
    document.body.appendChild(wrapper);

    // Event listeners
    document.getElementById('quoteTrigger').addEventListener('click', toggleDrawer);
    document.getElementById('closeQuoteDrawer').addEventListener('click', toggleDrawer);
    document.getElementById('quoteDrawer').addEventListener('click', (e) => {
      if (e.target.id === 'quoteDrawer') toggleDrawer();
    });
    document.getElementById('clearQuoteCart').addEventListener('click', clearCart);
    document.getElementById('sendWhatsappQuote').addEventListener('click', sendWhatsappOrder);
  }

  function toggleDrawer() {
    const drawer = document.getElementById('quoteDrawer');
    if (!drawer) return;
    const isHidden = drawer.getAttribute('aria-hidden') === 'true';
    drawer.setAttribute('aria-hidden', !isHidden ? 'true' : 'false');
    if (isHidden) drawer.classList.add('open');
    else drawer.classList.remove('open');
  }

  function updateUI() {
    buildUI();
    const badge = document.getElementById('quoteBadge');
    const itemsList = document.getElementById('quoteItemsList');
    const totalVal = document.getElementById('quoteTotalVal');

    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    if (badge) badge.textContent = totalQty;

    let subtotal = 0;

    if (itemsList) {
      if (cart.length === 0) {
        itemsList.innerHTML = `
          <div class="quote-empty">
            <p>Your quote basket is currently empty.</p>
            <p style="font-size:0.88rem;color:var(--muted)">Browse steel, cement, mabati, or fertilizer pages and click <strong>"+ Add to Quote Basket"</strong> to combine items into a single WhatsApp enquiry.</p>
          </div>
        `;
      } else {
        itemsList.innerHTML = cart.map(item => {
          const itemTotal = item.price * item.qty;
          subtotal += itemTotal;
          return `
            <div class="quote-item">
              <div class="quote-item-info">
                <strong>${item.name}</strong>
                <span>${item.price > 0 ? 'KSh ' + item.price.toLocaleString() + ' / ' + item.unit : 'Custom Quote'}</span>
              </div>
              <div class="quote-item-controls">
                <button class="quote-qty-btn" data-action="minus" data-id="${item.id}">-</button>
                <span class="quote-qty-num">${item.qty} ${item.unit}</span>
                <button class="quote-qty-btn" data-action="plus" data-id="${item.id}">+</button>
                <button class="quote-del-btn" data-action="delete" data-id="${item.id}">✕</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (totalVal) {
      totalVal.textContent = subtotal > 0 ? `KSh ${subtotal.toLocaleString()}` : 'Custom Quote Required';
    }

    // Attach delegates for qty buttons
    if (itemsList) {
      itemsList.querySelectorAll('button[data-action]').forEach(btn => {
        btn.onclick = (e) => {
          const action = btn.getAttribute('data-action');
          const id = btn.getAttribute('data-id');
          if (action === 'plus') updateQty(id, 1);
          if (action === 'minus') updateQty(id, -1);
          if (action === 'delete') removeItem(id);
        };
      });
    }
  }

  function sendWhatsappOrder() {
    if (cart.length === 0) {
      alert('Your quote basket is empty. Please add items first.');
      return;
    }

    const county = document.getElementById('quoteCountySelect').value || 'Unspecified County';
    const note = document.getElementById('quoteProjectNote').value || 'None';

    let msg = `*NEW DISTRIBUTOR QUOTATION REQUEST*\n`;
    msg += `-----------------------------------\n`;
    msg += `📍 *Delivery Destination:* ${county}\n`;
    if (note !== 'None') msg += `📝 *Notes:* ${note}\n`;
    msg += `-----------------------------------\n\n`;
    msg += `*Requested Materials:*\n`;

    let totalEstimate = 0;
    cart.forEach((item, index) => {
      const lineTotal = item.price * item.qty;
      totalEstimate += lineTotal;
      const priceText = item.price > 0 ? `@ KSh ${item.price.toLocaleString()}/${item.unit} = KSh ${lineTotal.toLocaleString()}` : `(Quote Needed)`;
      msg += `${index + 1}. *${item.name}* x ${item.qty} ${item.unit} ${priceText}\n`;
    });

    msg += `\n-----------------------------------\n`;
    if (totalEstimate > 0) {
      msg += `💰 *Est. Subtotal:* KSh ${totalEstimate.toLocaleString()}\n`;
    }
    msg += `Please verify current factory inventory, wholesale discount options, and delivery timeline.`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank');
  }

  // Global listener for click on any [data-quote-add] element
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-quote-add]');
    if (!btn) return;
    e.preventDefault();
    const name = btn.getAttribute('data-name') || btn.getAttribute('data-product') || 'Building Material';
    const price = btn.getAttribute('data-price') || 0;
    const unit = btn.getAttribute('data-unit') || 'pcs';
    const qty = Number(btn.getAttribute('data-qty')) || 1;
    const id = btn.getAttribute('data-id') || name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    addToCart({ id, name, price, unit, qty });
  });

  // Init on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateUI();
  });

  // Expose global API
  window.QuoteCart = {
    add: addToCart,
    open: toggleDrawer,
    clear: clearCart
  };
})();
