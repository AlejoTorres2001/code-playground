//install service worker
self.addEventListener('install', event => {
    console.log("SW installed")
})
//activate event
self.addEventListener('activate', event => {
    console.log("SW activated")
})
//fecth event
self.addEventListener('fetch', event => {
    console.log("SW fetching",event)
})