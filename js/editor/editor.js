var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};var console_script='var console=function(o){return{log:function(n){o.log(n);const r=JSON.stringify({type:"log",msg:n});parent.postMessage(r,"*")},info:function(n){o.info(n);const r=JSON.stringify({type:"info",msg:n});parent.postMessage(r,"*")},warn:function(n){o.warn(n);const r=JSON.stringify({type:"warn",msg:n});parent.postMessage(r,"*")},error:function(o){const n=JSON.stringify({type:"error",msg:o});parent.postMessage(n,"*")}}}(window.console);window.console=console,window.onerror=function(o,n,r,e,s){if(o.toLowerCase().indexOf("script error")>-1)alert("Script Error: See Browser Console for Detail");else{const t=JSON.stringify({message:o,url:n,line:r,column:e,error_obj:s});console.error(t)}return!1};',result=document.getElementById("result"),htmltext=document.getElementById("html"),csstext=document.getElementById("css"),jstext=document.getElementById("js"),code_array=[{elem:htmltext,pre:"html"},{elem:csstext,pre:"css"},{elem:jstext,pre:"js"}];function display(){var a=htmltext.value,b=csstext.value,d=jstext.value;result.setAttribute("srcdoc","<!DOCTYPE html><html><head><style>"+b+"</style><script>"+console_script+d+"\x3c/script></head><body>"+a+"</body></html>");return{h:a,c:b,j:d}}
code_array.forEach(function(a){var b=a.elem,d=a.pre;update(b,d);b.addEventListener("paste",function(e){handlePaste(e);update(this,d)});b.addEventListener("input",function(e){update(this,d)});b.addEventListener("keydown",function(e){check_tab(this,e);update(this,d)});b.addEventListener("scroll",function(e){sync_scroll(this,d)});closeTag(d)});function update(a,b){updateCode(a.value,b);sync_scroll(a,b)}
function updateCode(a,b){b=document.querySelector("#"+b+"-highlighting-content");"\n"==a[a.length-1]&&(a+=" ");b.innerText=a;hljs.highlightBlock(b)}function sync_scroll(a,b){b=document.querySelector("#"+b+"-highlighting-content");b.scrollTop=a.scrollTop;b.scrollLeft=a.scrollLeft;a.scrollTop=b.scrollTop;a.scrollLeft=b.scrollLeft}function handlePaste(a){return(a.clipboardData||window.clipboardData).getData("text").split("\n").join("")}
function check_tab(a,b){var d=a.value;if("Tab"==b.key){b.preventDefault();b=d.slice(0,a.selectionStart);d=d.slice(a.selectionEnd,a.value.length);var e=a.selectionEnd+1;a.value=b+"\t"+d;a.selectionStart=e;a.selectionEnd=e}}var wrapper=document.querySelector(".editor-block"),htmlbar=document.getElementById("html-bar"),cssbar=document.getElementById("css-bar"),jsbar=document.getElementById("js-bar"),current_select=null,bar_array=[cssbar,jsbar];bar_array.forEach(function(a){a.addEventListener("mousedown",initResize,!1)});function initResize(a){767<window.innerWidth?(current_select=a.target,window.addEventListener("mousemove",verticalResize,!1),window.addEventListener("mouseup",stopResize,!1)):stopResize(a)}
function verticalResize(a){if(current_select){var b=current_select,d=wrapper.offsetTop,e=wrapper.offsetTop+wrapper.clientHeight,f=e-108;if("css-bar"===b.id&&0<a.clientY-b.parentNode.offsetTop){var g=a.clientY-d,k=jsbar.parentNode.clientHeight,h=e-g-k;htmlbar.parentNode.style.height=Math.max(36,Math.min(f,g))+"px";b.parentNode.style.height=Math.max(36,Math.min(f,h))+"px";jsbar.parentNode.style.height=Math.max(36,Math.min(f,e-g-h))+"px"}"js-bar"===b.id&&0<a.clientY-b.parentNode.offsetTop&&(g=htmlbar.parentNode.clientHeight,h=a.clientY-d-g,k=e-g-h,htmlbar.parentNode.style.height=Math.max(36,Math.min(f,e-k-h))+"px",b.parentNode.style.height=Math.max(36,Math.min(f,k))+"px",cssbar.parentNode.style.height=Math.max(36,Math.min(f,h))+"px")}}function stopResize(a){current_select=null;window.removeEventListener("mousemove",verticalResize,!1);window.removeEventListener("mouseup",stopResize,!1)}
var resizer=document.getElementById("dragMe"),rightSide=resizer.previousElementSibling,leftSide=resizer.nextElementSibling,x=0,y=0,leftWidth=0,mouseDownHandler=function(a){x=a.clientX;y=a.clientY;leftWidth=leftSide.getBoundingClientRect().width;document.addEventListener("mousemove",mouseMoveHandler);document.addEventListener("mouseup",mouseUpHandler)};resizer.addEventListener("mousedown",mouseDownHandler);var mouseMoveHandler=function(a){a=100*(leftWidth+(a.clientX-x))/resizer.parentNode.getBoundingClientRect().width;leftSide.style.width=a+"%";resizer.style.cursor="col-resize";document.body.style.cursor="col-resize";leftSide.style.userSelect="none";leftSide.style.pointerEvents="none";rightSide.style.userSelect="none";rightSide.style.pointerEvents="none"},mouseUpHandler=function(){resizer.style.removeProperty("cursor");document.body.style.removeProperty("cursor");leftSide.style.removeProperty("user-select");leftSide.style.removeProperty("pointer-events");rightSide.style.removeProperty("user-select");rightSide.style.removeProperty("pointer-events");document.removeEventListener("mousemove",mouseMoveHandler);document.removeEventListener("mouseup",mouseUpHandler)},default_tabs={code:"html",result:!0},setting_info=default_tabs,saved_setting=JSON.parse(localStorage.getItem("editor-setting"));saved_setting&&(setting_info=saved_setting);var resButton=document.querySelector(".editor-setting-item.setting-res"),editorBlock=document.querySelector(".editor-block"),htmlBlock=document.getElementById("html-block"),cssBlock=document.getElementById("css-block"),jsBlock=document.getElementById("js-block"),resBlock=document.querySelector(".editor-result");displayResult(setting_info.result);displayCode(setting_info.code,load=!0);function displayResult(a){a||!setting_info.code?(resButton.classList.add("active"),resBlock.classList.remove("hide-block"),editorBlock.classList.remove("full-height"),setting_info.result=!0):(resButton.classList.remove("active"),resBlock.classList.add("hide-block"),editorBlock.classList.add("full-height"),setting_info.result=!1);localStorage.setItem("editor-setting",JSON.stringify(setting_info))}
function displayCode(a,b){b=void 0===b?!1:b;removeItemFromArray(["html","css","js"],a).forEach(function(d){document.getElementById(d+"-block").classList.add("hide-block");document.querySelector(".editor-setting-item.setting-"+d).classList.remove("active")});setting_info.code=b?a:a===setting_info.code?null:a;setting_info.code?(b=document.getElementById(a+"-block"),a=document.querySelector(".editor-setting-item.setting-"+a),b.classList.remove("hide-block"),a.classList.add("active"),editorBlock.classList.remove("min-height")):(["html","css","js"].forEach(function(d){document.getElementById(d+"-block").classList.add("hide-block");document.querySelector(".editor-setting-item.setting-"+d).classList.remove("active")}),resBlock.classList.add("full-height"),editorBlock.classList.add("min-height"),displayResult(!0));localStorage.setItem("editor-setting",JSON.stringify(setting_info))}function chooseTab(a){"res"===a?displayResult(!setting_info.result):displayCode(a)}
function removeItemFromArray(a,b){b=a.indexOf(b);-1<b&&a.splice(b,1);return a}document.addEventListener("DOMContentLoaded",function(){document.querySelector("#play-svg").addEventListener("click",display);TLN.append_line_numbers("html");TLN.append_line_numbers("css");TLN.append_line_numbers("js")});function closeTag(a){var b={34:'"',39:"'",40:")",91:"]",96:"`",123:"}"};$("#"+a).keypress(function(d){if(c=b[d.which]){d=c;var e=this.value,f=this.selectionStart,g=this.selectionEnd;this.value=e.slice(0,g)+d+e.slice(g);g==f&&(this.selectionStart+=d.length-1);this.selectionEnd=g+d.length-1}})}
(function(){var a={60:">"};$("#html").keypress(function(b){if(c=a[b.which]){b=c;var d=this.value,e=this.selectionStart,f=this.selectionEnd;this.value=d.slice(0,f)+b+d.slice(f);this.value+="</>";f==e&&(this.selectionStart+=b.length-1);this.selectionEnd=f+b.length-1}display()})})();