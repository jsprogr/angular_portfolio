module.exports = [
  {
    context: ["/api", "/uploads"],
    target: "http:/localhost:3000/",
    secure: false,
    logLevel: "debug",
    // bypass: function (req, res, proxyOptions) {
    //   res.setHeader('Access-Control-Allow-Origin', 'http:/express:3000');
    // },
  },
];

// const PROXY_CONFIG = {
//   "/api/*": {
//       target: "http:/express:3000/",
//       router: function (req) {
//           var target = 'http:/express:3000/'; // or some custom code
//           return target;
//       },
//       changeOrigin: true,
//       secure: false
//   },
//   "/uploads/*": {
//     target: "http:/express:3000/",
//     router: function (req) {
//         var target = 'http:/express:3000/'; // or some custom code
//         return target;
//     },
//     changeOrigin: true,
//     secure: false
// },
// };

// module.exports = PROXY_CONFIG;


// const PROXY_CONFIG = [
//   {
//       context: [
//           "/my",
//           "/many",
//           "/endpoints",
//           "/i",
//           "/need",
//           "/to",
//           "/proxy"
//       ],
//       target: "http://localhost:3000",
//       secure: false
//   }
// ]

// module.exports = PROXY_CONFIG;

// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyConfig = [{
//   context: '/api',
//   target: 'http://your-remote-server.com:3000',
//   secure: false
// }];

// function setupForCorporateProxy(proxyConfig) {
//   var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//   if (proxyServer) {
//     var agent = new HttpsProxyAgent(proxyServer);
//     console.log('Using corporate proxy server: ' + proxyServer);
//     proxyConfig.forEach(function(entry) {
//       entry.agent = agent;
//     });
//   }
//   return proxyConfig;
// }

// module.exports = setupForCorporateProxy(proxyConfig);
