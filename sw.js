const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/src/App.jsx",
  "/src/main.jsx",
  "/src/components/CodeContainer.jsx",
  "/src/components/Display.jsx",
  "/src/components/NavBar.jsx",
  "/src/components/MobileNavBar.jsx",
  "/src/components/Footer.jsx",
  "/src/components/PrivateRoute.jsx",
  "/src/index.css",
];
//install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
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
});
