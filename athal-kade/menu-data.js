/* Athal Kade menu: one place for the customer site and the owner's edit page.
   Demo: changes are kept in this browser only (localStorage), so anyone can try the edit page.
   A real shop sets API to its Google Apps Script web-app URL; the menu and photos then live in the
   shop's Google Sheet and Drive, and every customer sees the owner's changes. */
(() => {
const API = "";                       // real shop: "https://script.google.com/macros/s/…/exec"
const KEY = "rs-demo-menu-athal-kade-v1";
const it = (id, n, si, d, p, tag = "") => ({ id, n, si, d, p, tag, img: "", sold: false });
const DEFAULT = { shop: "Athal Kade", cats: [
  { id: "tea", name: "Tea & coffee", si: "තේ සහ කෝපි", items: [
    it("plain-tea", "Plain tea", "කහට", "Strong Ceylon tea, sugar on the side", 80),
    it("milk-tea", "Milk tea", "කිරි තේ", "Pulled tea with full cream milk", 180, "Popular"),
    it("ginger-tea", "Ginger tea", "ඉඟුරු තේ", "Plain tea with fresh ginger", 150),
    it("kopi", "Kopi", "කෝපි", "Filter coffee with jaggery", 250),
    it("iced-coffee", "Iced coffee", "අයිස් කෝපි", "Cold coffee with milk", 550)] },
  { id: "short", name: "Short eats", si: "කෙටි කෑම", items: [
    it("fish-bun", "Fish bun", "මාළු පාන්", "Soft bun with spicy fish and potato", 120, "Popular"),
    it("vadai", "Parippu vadai", "පරිප්පු වඩේ", "Crispy dhal fritter with green chilli", 90),
    it("chicken-roll", "Chicken roll", "චිකන් රෝල්", "Crumbed roll with curried chicken", 150),
    it("egg-patty", "Egg patty", "බිත්තර පැටිස්", "Flaky patty with egg and vegetables", 130),
    it("veg-roti", "Vegetable roti", "එළවළු රොටී", "Folded roti with potato and leek", 110)] },
  { id: "kottu", name: "Kottu & rice", si: "කොත්තු සහ බත්", items: [
    it("chicken-kottu", "Chicken kottu", "චිකන් කොත්තු", "Chopped godamba roti, chicken, egg and gravy", 1100, "Popular"),
    it("egg-kottu", "Egg kottu", "බිත්තර කොත්තු", "Two eggs, leeks and carrot", 850),
    it("cheese-kottu", "Cheese kottu", "චීස් කොත්තු", "Chicken kottu finished with melted cheese", 1450),
    it("rice-curry", "Rice & curry", "බත් සහ කරි", "Red rice with four vegetable curries and papadam", 650)] },
  { id: "sweets", name: "Sweets", si: "රසකැවිලි", items: [
    it("watalappan", "Watalappan", "වටලප්පන්", "Jaggery and coconut custard, spiced with cardamom", 300),
    it("love-cake", "Love cake", "ලව් කේක්", "Semolina and cashew cake, one slice", 280),
    it("curd", "Curd & treacle", "මී කිරි සහ පැණි", "Buffalo curd with kithul treacle", 450)] }]};

const clone = o => JSON.parse(JSON.stringify(o));
const ok = m => m && Array.isArray(m.cats) && m.cats.every(c => Array.isArray(c.items));

async function load() {
  if (API) {
    const r = await fetch(API + "?menu=1", { cache: "no-store" });
    const m = await r.json(); if (ok(m)) return m;
    throw new Error("menu");
  }
  try { const s = localStorage.getItem(KEY); if (s) { const m = JSON.parse(s); if (ok(m)) return m; } } catch (e) {}
  return clone(DEFAULT);
}

async function save(menu, pin) {
  if (API) {
    const r = await fetch(API, { method: "POST", body: JSON.stringify({ action: "save", pin, menu }) });
    const j = await r.json(); if (!j.ok) throw new Error(j.error || "save"); return;
  }
  localStorage.setItem(KEY, JSON.stringify(menu));      // throws if the phone's storage is full
}

/* photos are made small on the phone before they're kept (about 700 px, JPEG) */
function shrink(file, max = 720, q = .8) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL("image/jpeg", q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("image")); };
    img.src = url;
  });
}
async function photo(file, pin) {
  const data = await shrink(file);
  if (!API) return data;
  const r = await fetch(API, { method: "POST", body: JSON.stringify({ action: "photo", pin, data }) });
  const j = await r.json(); if (!j.ok) throw new Error(j.error || "photo"); return j.url;
}
async function checkPin(pin) {
  if (!API) return pin === "1234";      // demo PIN
  const r = await fetch(API, { method: "POST", body: JSON.stringify({ action: "pin", pin }) });
  return (await r.json()).ok === true;
}
function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }

window.RSMenu = { load, save, photo, checkPin, reset, demo: !API, KEY, DEFAULT: () => clone(DEFAULT) };
})();
