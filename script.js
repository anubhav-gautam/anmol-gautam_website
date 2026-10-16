const SKY = `<div class="skyline" aria-hidden="true"><svg viewBox="0 0 1200 90" preserveAspectRatio="xMidYMax slice"><defs><g id="ta"><path d="M22 90V58Q50 52 78 58V90Z"/><path d="M28 58Q38 30 50 8Q62 30 72 58Z"/><path d="M50 8V1"/><circle cx="50" cy="3" r="2.5"/></g><g id="tb"><path d="M10 90V62H90V90Z"/><path d="M20 62A30 30 0 0 1 80 62Z"/><path d="M50 32V20"/><circle cx="50" cy="18" r="2.5"/><rect x="5" y="48" width="8" height="42"/><rect x="87" y="48" width="8" height="42"/></g></defs><g fill="#d6ad55" stroke="#d6ad55" stroke-width="2">${Array.from({length:12},(_,i)=>`<use href="#${i%2?"tb":"ta"}" x="${i*100}" y="${[0,12,6][i%3]}"/>`).join("")}</g></svg></div>`;
// ---- EDIT THESE: contact details shown on the Contact page (leave "" to hide) ----
const CONFIG = { phone: "+91 97201 69985", email: "", whatsapp: "", address: { en: "Vrinda Novelty (Kurta Pajama Ka Raja), Vrindavan, Uttar Pradesh", hi: "वृंदा नोवेल्टी (कुर्ता पायजामा का राजा), वृंदावन, उत्तर प्रदेश" } };
const PAGES = [["about.html","About","परिचय"],["organizations.html","Organizations","संस्थाएँ"],["foundation.html","Foundation","फाउंडेशन"],["contact.html","Contact","संपर्क"]];
const here = location.pathname.split("/").pop() || "index.html";
const store = { get(){ try{return localStorage.getItem("lang")}catch(e){return null} }, set(v){ try{localStorage.setItem("lang",v)}catch(e){} } };
let lang = store.get() === "hi" ? "hi" : "en"; // English is the default; visitors can switch to Hindi
document.body.insertAdjacentHTML("afterbegin", `<div class="shri-bar">॥ श्री ॥</div><header class="site-header"><a class="brand" href="index.html" aria-label="Anmol Gautam home"><span class="brand-mark">AG</span><span class="brand-copy"><strong>ANMOL GAUTAM</strong><small data-en="LEADERSHIP&nbsp; | &nbsp;BUSINESS&nbsp; | &nbsp;SEVA" data-hi="नेतृत्व &nbsp;|&nbsp; व्यवसाय &nbsp;|&nbsp; सेवा">LEADERSHIP&nbsp; | &nbsp;BUSINESS&nbsp; | &nbsp;SEVA</small></span></a><button class="menu-toggle" id="menuToggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="navigation" id="navigation">${PAGES.map(([h,e,i])=>`<a href="${h}" class="${h===here?"active":""}" data-en="${e}" data-hi="${i}">${e}</a>`).join("")}<button class="language-switch" id="languageSwitch" type="button" aria-label="Switch language">हिन्दी</button></nav></header>`);
document.body.insertAdjacentHTML("beforeend", `<footer class="site-footer">${SKY}<div class="footer-top"><a class="brand" href="index.html"><span class="brand-mark">AG</span><span class="brand-copy"><strong>ANMOL GAUTAM</strong><small>ANMOL KAUSHAL KISHORE</small></span></a><p data-en="Leadership · Business · Education · Seva" data-hi="नेतृत्व · व्यवसाय · शिक्षा · सेवा">Leadership · Business · Education · Seva</p><div class="footer-location">VRINDAVAN<br>UTTAR PRADESH, INDIA</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Anmol Gautam. <span data-en="All rights reserved." data-hi="सर्वाधिकार सुरक्षित।">All rights reserved.</span></span><a href="#top" data-en="BACK TO TOP ↑" data-hi="ऊपर जाएँ ↑">BACK TO TOP ↑</a></div></footer>`);
const nav = document.getElementById("navigation"), toggle = document.getElementById("menuToggle"), sw = document.getElementById("languageSwitch");
toggle.addEventListener("click", () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(o)); });
function applyLang(){ document.documentElement.lang = lang; document.querySelectorAll("[data-en][data-hi]").forEach(el => { el.innerHTML = el.dataset[lang]; }); sw.textContent = lang === "en" ? "हिन्दी" : "English"; }
sw.addEventListener("click", () => { lang = lang === "en" ? "hi" : "en"; store.set(lang); applyLang(); });
// Contact page
const cc = document.getElementById("contactCards");
if (cc) {
  const item = (l, v, href) => `<div class="contact-card"><small data-en="${l}" data-hi="${({ADDRESS:"पता",PHONE:"फोन",EMAIL:"ईमेल",WHATSAPP:"व्हाट्सऐप"})[l]}">${l}</small>${href ? `<a href="${href}">${v}</a>` : `<span>${v}</span>`}</div>`;
  cc.innerHTML = item("ADDRESS", CONFIG.address.en, "").replace(CONFIG.address.en, `<span data-en="${CONFIG.address.en}" data-hi="${CONFIG.address.hi}">${CONFIG.address.en}</span>`)
    + (CONFIG.phone ? item("PHONE", CONFIG.phone, "tel:" + CONFIG.phone.replace(/\s/g, "")) : "")
    + (CONFIG.email ? item("EMAIL", CONFIG.email, "mailto:" + CONFIG.email) : "")
    + (CONFIG.whatsapp ? item("WHATSAPP", CONFIG.whatsapp, "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "")) : "");
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const n = form.name.value, m = form.message.value;
    if (CONFIG.email) location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Message from " + n)}&body=${encodeURIComponent(m)}`;
    else if (CONFIG.whatsapp) location.href = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(n + ": " + m)}`;
    else document.getElementById("formNote").textContent = lang === "hi" ? "संपर्क विवरण अभी जोड़ा नहीं गया है।" : "Contact details are not set up yet.";
  });
}
// Auto-translate names/roles that had no Hindi text
const TR = {"director":"निदेशक","proprietor":"प्रोपराइटर","owner":"मालिक","deputy president":"उपाध्यक्ष","chairman":"चेयरमैन","founder":"संस्थापक","president · अध्यक्ष":"अध्यक्ष","s.n.g public school":"एस.एन.जी पब्लिक स्कूल","vrinda novelty":"वृंदा नोवेल्टी","hotel brij kaushal":"होटल ब्रज कौशल","hotel shri ram yatri niwas":"होटल श्री राम यात्री निवास","vrinda enterprises":"वृंदा एंटरप्राइजेज","gautam farm house, maant":"गौतम फार्म हाउस, मांट","gautam farm house":"गौतम फार्म हाउस","maant":"मांट","vidyapeeth inter college, vrindavan":"विद्यापीठ इंटर कॉलेज, वृंदावन","vrinda group of real estate":"वृंदा ग्रुप ऑफ रियल एस्टेट","vrinda group":"वृंदा ग्रुप","anmol gautam foundation":"अनमोल गौतम फाउंडेशन","maharishi gautam seva samiti, vrindavan":"महर्षि गौतम सेवा समिति, वृंदावन","jal vitran seva":"जल वितरण सेवा","pankha seva":"पंखा सेवा","sadhu seva":"साधु सेवा","gau seva":"गौ सेवा","manav seva":"मानव सेवा","kanya vivah":"कन्या विवाह"};
document.querySelectorAll(".role-row b,.role-row em,.venture-row h3,.venture-role,.venture-row p,.organization-strip>span:not(.strip-label),.seva-grid h3").forEach(el => {
  if (el.dataset.en) return;
  const t = el.textContent.trim(), h = TR[t.toLowerCase()];
  if (!h) return;
  el.dataset.en = el.innerHTML; el.dataset.hi = h;
  const p = el.matches(".seva-grid h3") && el.nextElementSibling;
  if (p && p.tagName === "P" && !p.children.length && !p.dataset.en) { p.dataset.en = p.textContent; p.dataset.hi = t; }
});
applyLang();

// Scroll progress line + floating call button
document.body.insertAdjacentHTML("beforeend", `<div class="scroll-progress" id="sp"></div>${CONFIG.phone ? `<a class="fab-call" href="tel:${CONFIG.phone.replace(/\s/g, "")}" aria-label="Call"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg></a>` : ""}`);
const sp = document.getElementById("sp");
addEventListener("scroll", () => { const h = document.documentElement; sp.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; }, { passive: true });
