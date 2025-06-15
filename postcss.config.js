
// coomonjs supported
// module.exports = {
//   plugins: {
    // tailwindcss: {},    
    // '@tailwindcss/postcss': {},
//     autoprefixer: {},
//   },
// }


// es6 supported since project has this set : "type": "module" in root file => index.jsx
// postcss.config.js
export default {
  plugins: {
    // tailwindcss: {},
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
