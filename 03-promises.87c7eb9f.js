var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var i=o("7Y9D8");const r={fisrtStep:document.querySelector('input[name="delay"]'),delayStep:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]'),form:document.querySelector(".form")};function l(e,t){const n=Math.random()>.3;return new Promise(((o,i)=>{n?o({position:e,timeDelay:t}):i({position:e,timeDelay:t})}))}r.form.addEventListener("submit",(function(e){e.preventDefault();const t=r.fisrtStep.value,n=r.delayStep.value,o=r.amount.value;let u=1,a=Number(t);setTimeout((()=>{l(u,a).then((({position:e,timeDelay:t})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,timeDelay:t})=>{i.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)}));const e=setInterval((()=>{u+=1,a+=Number(n),l(u,a).then((({position:e,timeDelay:t})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,timeDelay:t})=>{i.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),function(e,t,n){e==t&&clearInterval(n)}(u,o,e)}),n)}),t)}));
//# sourceMappingURL=03-promises.87c7eb9f.js.map