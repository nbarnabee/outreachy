(()=>{const e=[{user:"DannyBoyyy77",link:"https://en.wikipedia.org/wiki/User:DannyBoyyy77",latest:23,allTime:56},{user:"Tabby578",link:"https://en.wikipedia.org/wiki/User:Tabby578",latest:19,allTime:19},{user:"Ellenello",link:"https://en.wikipedia.org/wiki/User:Ellenello",latest:11,allTime:39},{user:"Poppa shark",link:"https://en.wikipedia.org/wiki/User:Poppa%20shark",latest:9,allTime:12},{user:"Javier Alejandro Herrera Carvajal",link:"https://en.wikipedia.org/wiki/User:Javier%20Alejandro%20Herrera%20Carvajal",latest:7,allTime:21}];function t(e,t){sortedArray=e.sort(((e,r)=>r[t]-e[t]));const l=document.getElementById(t);for(let e of sortedArray){let a=document.createElement("tr");l.appendChild(a),a.appendChild(r(e)),a.appendChild(n(e[t]))}}function r(e){let t=document.createElement("td"),r=function(e){let t=document.createElement("a");return t.setAttribute("href",e),t.setAttribute("target","_blank"),t}(e.link);t.appendChild(r);let n=document.createElement("span");return n.innerText=e.user,r.appendChild(n),t}function n(e){let t=document.createElement("td");return t.innerText=e,t}t(e,"latest"),t(e,"allTime")})();