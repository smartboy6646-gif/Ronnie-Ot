// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// नोटिफिकेसनमा क्लिक गर्दा एप खुल्ने
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // यदि एप पहिले नै खुला छ भने त्यसमै जाने
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // नत्र नयाँ विन्डो खोल्ने
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
