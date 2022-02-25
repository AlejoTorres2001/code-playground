const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/src/App.jsx",
  "/src/main.jsx",
  "/src/index.css",
  "/src/assets/layout1.svg",
  "/src/assets/layout2.svg",
  "/src/assets/layout3.svg",
  "/src/assets/skypack.svg",
  "manifest.json",
];
//install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      //console.log("caching shell assets");
      cache.addAll(assets);
    })
  );

  //console.log("SW installed")
});
//activate event
self.addEventListener("activate", (event) => {
  //console.log("SW activated")
});
//fecth event
self.addEventListener("fetch", (event) => {
  //console.log("SW fetching",event)
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
