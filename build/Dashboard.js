(()=>{const e={totalTools:2702,toolsMissingInfo:2701,missingByCount:{0:1,1:1,2:0,3:7,4:6,5:10,6:23,7:32,8:68,9:91,10:108,11:759,12:450,13:1146},missingByType:{tool_type:1671,repository:1893,user_docs_url:1958,available_ui_languages:2363,bugtracker_url:2419,developer_docs_url:2587,for_wikis:2636,api_url:2647,feedback_url:2653,icon:2669,wikidata_qid:2679,translate_url:2681,privacy_policy_url:2692}};!function(){let t=0;for(let o=1;o<=10;o++)t+=e.missingByCount[o];e.missingByCount.oneToTen=t}();const t={user:"NicoleLBee",contributions:{recent:1,total:4},latestActivity:[{toolName:"pywikibot",toolTitle:"Pywikibot",fieldEdited:"available_ui_languages",dateModified:1666214747862},{toolName:"mm_wikidata_todo",toolTitle:"Wikidata Todo",fieldEdited:"for_wikis",dateModified:16582272e5},{toolName:"mm_find_duplicate_items",toolTitle:"Find duplicate items",fieldEdited:"repository",dateModified:16554496e5},{toolName:"pywikibot",toolTitle:"Pywikibot",fieldEdited:"icon",dateModified:16514472e5}]},o={contributions:{recent:73,total:226},latestActivity:[{user:"DannyBoyyy77",link:"https://en.wikipedia.org/wiki/User:DannyBoyyy77",toolName:"xtools-ec",toolTitle:"XTools Edit Counter",fieldEdited:"icon",dateModified:1666514747862},{user:"Ellenello",link:"https://en.wikipedia.org/wiki/User:Ellenello",toolName:"metawiki-jon-harald-søby-diffedit",toolTitle:"diffedit",fieldEdited:"repository",dateModified:1666505047862},{user:"DannyBoyyy77",link:"https://en.wikipedia.org/wiki/User:DannyBoyyy77",toolName:"xtools-ec",toolTitle:"XTools Edit Counter",fieldEdited:"privacy_policy_url",dateModified:1666500047862},{user:"Javier Alejandro Herrera Carvajal",link:"https://en.wikipedia.org/wiki/User:Javier%20Alejandro%20Herrera%20Carvajal",toolName:"toolforge-croptool",toolTitle:"CropTool",fieldEdited:"available_ui_languages",dateModified:1666410745862},{user:"Tabby578",link:"https://en.wikipedia.org/wiki/User:Tabby578",toolName:"pywikibot",toolTitle:"Pywikibot",fieldEdited:"tool_type",dateModified:1666304737862}]};function i(e,t){const o=e.latestActivity;sortedContributions=o.sort(((e,t)=>t.dateModified-e.dateModified));const i=document.getElementById(t);for(let e of sortedContributions){let o=document.createElement("tr");i.appendChild(o);let l=document.createElement("td"),d=new Date(e.dateModified);if(l.innerText=d.toLocaleDateString(),o.appendChild(l),"global-contributions"===t){let t=document.createElement("td");e.user.link?t.appendChild(n(e,"user")):t.innerText=e.user,o.appendChild(t)}let a=document.createElement("td");a.innerText=`Added ${e.fieldEdited} to `;let r=n(e,"tool");a.appendChild(r),o.appendChild(a)}}function n(e,t){let o=document.createElement("a");return"tool"===t?(o.setAttribute("href",`https://toolhub.wikimedia.org/tools/${e.toolName}`),o.innerText=e.toolTitle):(o.setAttribute("href",e.link),o.innerText=e.user),o.setAttribute("target","_blank"),o}const l=document.getElementById("missing-values-count");var d,a,r,s;new Chart(l,{type:"pie",data:{labels:["1-10","11","12","13"],datasets:[{label:"# of missing values",data:[e.missingByCount.oneToTen,e.missingByCount[11],e.missingByCount[12],e.missingByCount[13]],backgroundColor:["#7698ff","#ff7062","#5ee7be","#ffff6e"],borderColor:["#567fe9","#fd524a","#3ccba3","#ffe852"],borderWidth:2}]},options:{plugins:{title:{display:!0,text:"# of Tools That Are Missing Values",align:"center"}}}}),d=t.user,document.querySelector(".user-name").innerText=`Welcome back, ${d}!`,i(t,"user-contributions"),i(o,"global-contributions"),a=e,r=t,s=o,document.getElementById("tool-num-total").innerText=a.totalTools,document.getElementById("tool-missing-data-total").innerText=a.toolsMissingInfo,missingPercent=(a.toolsMissingInfo/a.totalTools*100).toFixed(2),document.getElementById("tool-missing-data-percent").innerText=`${missingPercent}%`,document.getElementById("user-contributions-recent").innerText=r.contributions.recent,document.getElementById("user-contributions-total").innerText=r.contributions.total,document.getElementById("global-contributions-recent").innerText=s.contributions.recent,document.getElementById("global-contributions-total").innerText=s.contributions.total,document.getElementById("one-to-ten").innerText=(347/a.totalTools*100).toFixed(2),document.getElementById("eleven").innerText=(a.missingByCount[11]/a.totalTools*100).toFixed(2),document.getElementById("twelve").innerText=(a.missingByCount[12]/a.totalTools*100).toFixed(2),document.getElementById("thirteen").innerText=(a.missingByCount[13]/a.totalTools*100).toFixed(2)})();