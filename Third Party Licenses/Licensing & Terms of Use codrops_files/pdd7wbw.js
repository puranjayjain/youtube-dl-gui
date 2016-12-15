/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * brandon-grotesque:
 *   - http://typekit.com/eulas/0000000000000000000132e3
 * proxima-nova:
 *   - http://typekit.com/eulas/00000000000000000001499c
 *   - http://typekit.com/eulas/0000000000000000000148a9
 *   - http://typekit.com/eulas/0000000000000000000148a4
 *   - http://typekit.com/eulas/0000000000000000000148a5
 *
 * © 2009-2016 Adobe Systems Incorporated. All Rights Reserved.
 */
if(!window.Typekit)window.Typekit={};window.Typekit.config={"a":"1494256","c":[".tk-proxima-nova","\"proxima-nova\",sans-serif",".tk-brandon-grotesque","\"brandon-grotesque\",sans-serif"],"dl":"AAAALAAAAAp3H26JAAADYA","f":"//use.typekit.net/c/8f5791/1w;brandon-grotesque,1,Y2q:R:n7;proxima-nova,fff1a989570eb474b8c22c57cc7199e63bfc7e911b750165d0199218f0b7e7cc,b5x:R:i4,b61:R:i7,b5w:R:n4,bBh:R:n7/{format}{/extras*}","fc":[{"id":139,"family":"proxima-nova","src":"{scheme}://{hostname}/af/590c05/00000000000000000001499c/23/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"normal","primer":"fff1a989570eb474b8c22c57cc7199e63bfc7e911b750165d0199218f0b7e7cc"}},{"id":140,"family":"proxima-nova","src":"{scheme}://{hostname}/af/1f2c3f/0000000000000000000148a9/23/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"italic","primer":"fff1a989570eb474b8c22c57cc7199e63bfc7e911b750165d0199218f0b7e7cc"}},{"id":175,"family":"proxima-nova","src":"{scheme}://{hostname}/af/810327/0000000000000000000148a4/23/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"normal","primer":"fff1a989570eb474b8c22c57cc7199e63bfc7e911b750165d0199218f0b7e7cc"}},{"id":176,"family":"proxima-nova","src":"{scheme}://{hostname}/af/8e5830/0000000000000000000148a5/23/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"italic","primer":"fff1a989570eb474b8c22c57cc7199e63bfc7e911b750165d0199218f0b7e7cc"}},{"id":10296,"family":"brandon-grotesque","src":"{scheme}://{hostname}/af/98e2c6/0000000000000000000132e3/23/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"normal","subset_id":1}}],"fi":[139,140,175,176,10296],"fn":["brandon-grotesque",["n7"],"proxima-nova",["i4","i7","n4","n7"]],"hn":"use.typekit.net","ht":"tk","js":"1.18.13","kt":"pdd7wbw","l":"typekit","p":"p.typekit.net","ps":1,"token":"sq9sKTXBeGFoWR2Ag5TcRhTaANhYQNFvveDt5vOD41afdeikESftk3QV1cU7lWQA","type":"configurable"};
/*{"k":"1.18.13","auto_updating":true}*/
;(function(window,document,undefined){if(!document.querySelector){document.documentElement.className+=" wf-inactive";return;}function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function k(a,b,c){k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return k.apply(null,arguments)}var m=Date.now||function(){return+new Date};function ca(a){this.g=a||"-"}ca.prototype.b=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.g)};function da(){var a=[{name:"font-family",value:n.c[p+1]}];this.g=[n.c[p]];this.b=a}function ea(a){for(var b=a.g.join(","),c=[],d=0;d<a.b.length;d++){var e=a.b[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"};function r(a,b){return(a&65535)*b+(((a>>>16)*b&65535)<<16)};function t(a,b){this.b=b||Array(Math.ceil(a/32));if(!b)for(var c=0;c<this.b.length;c++)this.b[c]=0}t.prototype.set=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);this.b[b]|=1<<a-32*b};t.prototype.has=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);return!!(this.b[b]&1<<a-32*b)};function fa(a,b,c){this.b=a;this.i=b;this.g=new t(a,c)}var ga=[2449897292,4218179547,2675077685,1031960064,1478620578,1386343184,3194259988,2656050674,3012733295,2193273665];
fa.prototype.has=function(a){if("string"!==typeof a&&"number"!==typeof a)throw Error("Value should be a string or number.");for(var b="number"===typeof a,c=0;c<this.i;c++){var d;if(b)d=r(a&4294967295,3432918353),d=d<<15|d>>>17,d=r(d,461845907),d^=ga[c]||0,d=d<<13|d>>>19,d=r(d,5)+3864292196,d^=4,d^=d>>>16,d=r(d,2246822507),d^=d>>>13,d=r(d,3266489909),d^=d>>>16,d=(d>>>0)%this.b;else{d=ga[c]||0;var e,f,g=a.length%4,h=a.length-g;for(f=0;f<h;f+=4)e=(a.charCodeAt(f+0)&4294967295)<<0|(a.charCodeAt(f+1)&
4294967295)<<8|(a.charCodeAt(f+2)&4294967295)<<16|(a.charCodeAt(f+3)&4294967295)<<24,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e,d=d<<13|d>>>19,d=r(d,5)+3864292196;e=0;switch(g){case 3:e^=(a.charCodeAt(f+2)&4294967295)<<16;case 2:e^=(a.charCodeAt(f+1)&4294967295)<<8;case 1:e^=(a.charCodeAt(f+0)&4294967295)<<0,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e}d^=a.length;d=r(d^d>>>16,2246822507);d=r(d^d>>>13,3266489909);d=((d^d>>>16)>>>0)%this.b}if(!this.g.has(d))return!1}return!0};function ha(a){a.length%4&&(a+=Array(5-a.length%4).join("="));a=a.replace(/\-/g,"+").replace(/\_/g,"/");if(window.atob)a=window.atob(a);else{a=a.replace(/=+$/,"");if(1==a.length%4)throw Error("'atob' failed: The string to be decoded is not correctly encoded.");for(var b=0,c,d,e=0,f="";d=a.charAt(e++);~d&&(c=b%4?64*c+d:d,b++%4)?f+=String.fromCharCode(255&c>>(-2*b&6)):0)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d);a=f}c=[];for(b=0;b<a.length;b+=4)c.push(a.charCodeAt(b)<<
24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|a.charCodeAt(b+3)<<0);a=c.shift();b=c.shift();this.b=new fa(a,b,c)}ha.prototype.has=function(a){if(""===a)return!0;for(a=a.split(".");a.length;){var b=a.join("."),c="*."+b;if(this.b.has(b)||this.b.has(c)||this.b.has(encodeURIComponent(b))||this.b.has(encodeURIComponent(c)))return!0;a.shift()}return!1};function u(a,b,c,d){b=a.b.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.b.createTextNode(d));return b}function v(a,b,c){a=a.b.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}
function ia(a,b){a.b.body?b():a.b.addEventListener?a.b.addEventListener("DOMContentLoaded",b):a.b.attachEvent("onreadystatechange",function(){"interactive"!=a.b.readyState&&"complete"!=a.b.readyState||b()})}function y(a){a.parentNode&&a.parentNode.removeChild(a)}
function z(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ja(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function A(a,b){var c=u(a,"style");c.setAttribute("type","text/css");c.styleSheet?(v(a,"head",c),c.styleSheet.cssText=b):(c.appendChild(document.createTextNode(b)),v(a,"head",c))}
function ka(a,b,c){var d=a.b.getElementsByTagName("head")[0];if(d){var e=u(a,"script",{src:b}),f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(f=!0,c&&c(null),e.onload=e.onreadystatechange=null,"HEAD"==e.parentNode.tagName&&d.removeChild(e))};d.appendChild(e);setTimeout(function(){f||(f=!0,c&&c(Error("Script load timeout")))},5E3)}};function la(a,b,c){this.g=a.g.document.documentElement;this.j=b;this.m=c;this.b=new ca("-");this.o=!1!==b.events;this.i=!1!==b.classes}function B(a){if(a.i){var b=ja(a.g,a.b.b("wf","active")),c=[],d=[a.b.b("wf","loading")];b||c.push(a.b.b("wf","inactive"));z(a.g,c,d)}C(a,"inactive")}function C(a,b,c){if(a.o&&a.j[b])try{if(c)a.j[b](c.b,D(c));else a.j[b]()}catch(d){console.error('Typekit: Error in "'+b+'" callback',d)}if(a.m[b])if(c)a.m[b](c.b,D(c));else a.m[b]()};function ma(a,b,c){c=c||{};this.b=a;this.g=b;this.weight=c.weight||"400";this.style=c.style||"normal";this.A=c.primer||void 0;this.B=c.subset_id||void 0}function E(a){return("tk-"+a.b).slice(0,26)+"-"+D(a)}function F(a,b){return new ma(b,a.g,{weight:a.weight,style:a.style,A:a.A,B:a.B})}function D(a){return a.style.charAt(0)+a.weight.charAt(0)};function na(){var a=document,b=navigator.userAgent;if(/MSIE|Trident/.test(b)&&(a.documentMode?9>a.documentMode:1))b="i";else{a:{if(/AppleWebKit/.test(b)&&/Android/.test(b)&&!/OPR|Chrome|CrMo|CriOS/.test(b)&&(a=/Android ([^;)]+)/.exec(b))&&a[1]){a=parseFloat(a[1]);a=3.1<=a&&4.1>a;break a}a=!1}if(!a)a:{if(/Silk/.test(b)&&/Linux|Ubuntu|Android/.test(b)&&(b=/Silk\/([\d\._]+)/.exec(b))&&b[1]){a=2<=parseFloat(b[1]);break a}a=!1}b=a?"j":"k"}return b};function G(a){this.b=a}function H(a,b){return a.b.replace(/\{([^\{\}]+)\}/g,function(a,d){if("?"==d.charAt(0)){for(var e=d.slice(1).split(","),f=[],g=0;g<e.length;g++)b[e[g]]&&f.push(e[g]+"="+encodeURIComponent(b[e[g]]));return f.length?"?"+f.join("&"):""}return encodeURIComponent(b[d]||"")})};function I(){this.b=[]}function oa(a,b){for(var c=0;c<b.length;c++)a.b.push(b[c])}function J(a,b){for(var c=0;c<a.b.length;c++)b(a.b[c],c,a)}
function qa(a,b){if("i"===b){var c={},d=new I;J(a,function(a){c[a.b]||(c[a.b]={});c[a.b][a.weight]||(c[a.b][a.weight]=[]);c[a.b][a.weight].push(a)});for(var e in c){for(var f=[400,300,200,100,500,600,700,800,900],g=0;g<f.length;g++){var h=f[g];if(c[e][h]){oa(d,c[e][h]);break}}f=[700,800,900,600,500,400,300,200,100];for(g=0;g<f.length;g++){var l=f[g];if(c[e][l]&&h!==l){oa(d,c[e][l]);break}}}J(a,function(a){a=F(a,a.b.replace(/(-1|-2)$/,"").slice(0,28)+"-"+D(a));d.b.push(a)});return d}return"x"===b?
new I:a}function ra(a,b,c,d){for(var e=[],f=0;f<b.length;f++){var g=b[f],h=H(new G(a.g),{scheme:"https",hostname:c,format:g,primer:a.A,subset_id:a.B,fvd:D(a),extension:sa(g),token:d});"i"===g?e.push("url("+h+")"):e.push("url("+h+') format("'+ta(g)+'")')}return e.join(",")}
function ua(a,b,c,d,e){if("x"===b)return"";var f=[];f.push("font-family:"+(e?E(a):a.b));b="k"===b?ra(a,["l","d","a"],c,d):ra(a,[b],c,d);f.push("src:"+b);f.push("font-weight:"+a.weight);f.push("font-style:"+a.style);return"@font-face{"+f.join(";")+";}"}function ta(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"opentype"}}function sa(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"otf"}}
function K(a,b,c,d,e){var f=[];J(a,function(a){f.push(ua(a,b,c,d,e))});return f.join("")};function L(a,b){this.g=a;this.i=b;this.b=u(this.g,"span",{"aria-hidden":"true"},this.i)}function M(a){v(a.g,"body",a.b)}
function N(a){return"display:block !important;position:absolute !important;top:-9999px !important;left:-9999px !important;font-size:300px !important;width:auto !important;height:auto !important;line-height:normal !important;margin:0 !important;padding:0 !important;font-variant:normal !important;white-space:nowrap !important;font-family:"+a.b+" !important;font-weight:"+a.weight+" !important;font-style:"+a.style+" !important;"};function va(a,b,c,d,e,f,g,h){this.C=a;this.G=b;this.u=c;this.b=d;this.v=g||"BESbswy";this.g={};this.H=e||3E3;this.F=h;this.w=f||null;this.i=new L(this.u,this.v);this.j=new L(this.u,this.v);this.m=new L(this.u,this.v);this.o=new L(this.u,this.v);a=this.F?E(this.b):this.b.b;this.i.b.style.cssText=N(F(this.b,a+",serif"));this.j.b.style.cssText=N(F(this.b,a+",sans-serif"));this.m.b.style.cssText=N(F(this.b,"serif"));this.o.b.style.cssText=N(F(this.b,"sans-serif"));M(this.i);M(this.j);M(this.m);M(this.o)}
var O={J:"serif",I:"sans-serif"},P=null;function wa(){if(null===P){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);P=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return P}va.prototype.start=function(){this.g.serif=this.m.b.offsetWidth;this.g["sans-serif"]=this.o.b.offsetWidth;this.D=m();xa(this)};function ya(a,b,c){for(var d in O)if(O.hasOwnProperty(d)&&b===a.g[O[d]]&&c===a.g[O[d]])return!0;return!1}
function xa(a){var b=a.i.b.offsetWidth,c=a.j.b.offsetWidth,d;(d=b===a.g.serif&&c===a.g["sans-serif"])||(d=wa()&&ya(a,b,c));d?m()-a.D>=a.H?wa()&&ya(a,b,c)&&(!a.w||a.w.hasOwnProperty(a.b.b))?Q(a,a.C):Q(a,a.G):za(a):Q(a,a.C)}function za(a){setTimeout(k(function(){xa(this)},a),50)}function Q(a,b){setTimeout(k(function(){y(this.i.b);y(this.j.b);y(this.m.b);y(this.o.b);b(this.b)},a),0)};function Aa(a,b,c,d,e,f,g){this.i=a;this.u=b;this.b=d;this.m=c;this.g=e||3E3;this.o=f||void 0;this.j=g}Aa.prototype.start=function(){var a=this.m.g.document,b=this,c=m(),d=new Promise(function(d,e){function h(){m()-c>=b.g?e():a.fonts.load(b.b.style+" "+b.b.weight+" 300px "+(b.j?E(b.b):b.b.b),b.o).then(function(a){1<=a.length?d():setTimeout(h,25)},function(){e()})}h()}),e=new Promise(function(a,c){setTimeout(c,b.g)});Promise.race([e,d]).then(function(){b.i(b.b)},function(){b.u(b.b)})};function R(a,b,c,d){this.v=a;this.b=b;this.g=0;this.o=this.m=!1;this.w=c;this.u=d}var S=null;
function Ba(a,b,c){var d={},e=b.b.length;if(!e&&c)B(a.b);else{a.g+=e;c&&(a.m=c);var f=[];J(b,function(b){var c=a.b;c.i&&z(c.g,[c.b.b("wf",b.b,D(b),"loading")]);C(c,"fontloading",b);c=null;if(null===S)if(window.FontFace){var e=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),q=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);S=e?42<parseInt(e[1],10):q?!1:!0}else S=!1;S?c=new Aa(k(a.i,a),k(a.j,a),a.v,b,a.w,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",
a.u):c=new va(k(a.i,a),k(a.j,a),a.v,b,a.w,d,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",a.u);f.push(c)});for(b=0;b<f.length;b++)f[b].start()}}R.prototype.i=function(a){var b=this.b;b.i&&z(b.g,[b.b.b("wf",a.b,D(a),"active")],[b.b.b("wf",a.b,D(a),"loading"),b.b.b("wf",a.b,D(a),"inactive")]);C(b,"fontactive",a);this.o=!0;Ca(this)};
R.prototype.j=function(a){var b=this.b;if(b.i){var c=ja(b.g,b.b.b("wf",a.b,D(a),"active")),d=[],e=[b.b.b("wf",a.b,D(a),"loading")];c||d.push(b.b.b("wf",a.b,D(a),"inactive"));z(b.g,d,e)}C(b,"fontinactive",a);Ca(this)};function Ca(a){!--a.g&&a.m&&(a.o?(a=a.b,a.i&&z(a.g,[a.b.b("wf","active")],[a.b.b("wf","loading"),a.b.b("wf","inactive")]),C(a,"active")):B(a.b))};function T(a,b){this.b=a;this.g=[];this.m=b;this.j=this.u=null;this.o=new I;this.i=null}T.prototype.supportsConfiguredBrowser=function(){return!0};T.prototype.init=function(){if(0<this.g.length){for(var a=[],b=0;b<this.g.length;b++)a.push(ea(this.g[b]));A(this.b,a.join(""))}};
T.prototype.load=function(a,b,c){var d=this;c=c||{};a=c.timeout;var e=!!c.async,f=na(),g=qa(this.o,f);c=new la(this.b,c,{active:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}if(d.v){var a=d.v,b=d.b,c=new G("{scheme}://{hostname}/p.gif{?s,k,app,ht,h,f,a,js,_}"),h=(window.__adobewebfontsappname__||a.app||"").toString().substr(0,20),b=b.g.location.hostname||b.i.location.hostname,l=[],w=[];window.Typekit?(window.Typekit.fonts||(window.Typekit.fonts=[]),w=window.Typekit.fonts):window.TypekitPreview&&
(window.TypekitPreview.fonts||(window.TypekitPreview.fonts=[]),w=window.TypekitPreview.fonts);for(var x=0;x<a.b.length;x++){for(var pa=!1,Y=0;Y<w.length;Y++)if(a.b[x]===w[Y]){pa=!0;break}pa||(l.push(a.b[x]),w.push(a.b[x]))}l.length&&Da(H(c,{scheme:"https",hostname:a.o,s:a.j,k:a.m,app:h,ht:a.i,h:b,f:l.join("."),a:a.g,js:a.version,_:(+new Date).toString()}))}},inactive:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}}});if(this.j){var h=location.hostname;if(!this.j.has(h)){console.error('Typekit: the domain "'+
h+'" isn\'t in the list of published domains for kit "'+this.u+'".');B(c);return}}if(g.b.length){h=K(g,f,this.m,this.i,e);A(this.b,h);var l=new R(this.b,c,a,e);ia(d.b,function(){Ba(l,g,b)})}else B(c)};function U(a,b){this.j=a;this.g=b;this.b=[]}U.prototype.i=function(a){this.b.push(a)};U.prototype.load=function(a,b){var c=a,d=b||{};"string"==typeof c?c=[c]:c&&c.length||(d=c||{},c=[]);if(c.length)for(var e=this,f=c.length,g=0;g<c.length;g++)Ea(this,c[g],function(){--f||Fa(e,d)});else Fa(this,d)};function Ea(a,b,c){b=H(a.j,{id:b});ka(a.g,b,c)}
function Fa(a,b){if(a.b.length){for(var c=new la(a.g,b,{}),d=0;d<a.b.length;d++)a.b[d].init();c.i&&z(c.g,[c.b.b("wf","loading")]);C(c,"loading");for(c=0;c<a.b.length;c++)a.b[c].load(null,c==a.b.length-1,b);a.b=[]}};function Da(a){var b=new Image(1,1),c=!1;b.src=a;b.onload=function(){c=!0;b.onload=null};setTimeout(function(){c||(b.src="about:blank",b.onload=null)},3E3)};var Ga=new function(){var a=window;this.g=this.i=a;this.b=this.g.document};window.Typekit||(window.Typekit={});if(!window.Typekit.load){var V=new U(new G("//"+(window.Typekit.config||{}).hn+"/{id}.js"),Ga);window.Typekit.load=function(){V.load.apply(V,arguments)};window.Typekit.addKit=function(){V.i.apply(V,arguments)}}var W,n=window.Typekit.config||{};W=new T(Ga,n.hn);
W.v=new function(){var a=n.ps,b=n.ht,c=n.fi,d=n.a,e=n.kt,f=n.js,g=n.l;this.o=n.p;this.j=a;this.i=b;this.b=c||[];this.g=d||null;this.m=e||null;this.version=f||null;this.app=g||null};if(n.fc)for(var X=n.fc,Z=0;Z<X.length;Z++)W.o.b.push(new ma(X[Z].family,X[Z].src,X[Z].descriptors));if(n.dl){var Ha=n.dl;try{W.j=new ha(Ha)}catch(a){}}n.kt&&(W.u=n.kt);n.token&&(W.i=n.token);if(n.c)for(var p=0;p<n.c.length;p+=2)W.g.push(new da);window.Typekit.addKit(W);
if(1===Math.round(30*Math.random())){var Ia=window.Typekit.load,Ja=[];window.Typekit.load=function(a){a=a||{};var b=a.active||function(){},c=a.fontactive||function(){},d=(new Date).getTime();a.active=function(){b();if(!window.XDomainRequest){var a=new Image,c=function(a){a=JSON.stringify({fonts:Ja,augmentations:[],font_loading:window.FontFace?"native":"non-native",active_duration:(new Date).getTime()-d,javascript_version:n.js,kit_type:"configurable",ad_blocker:a});if(!window.XDomainRequest){var b=
new XMLHttpRequest;b.open("POST","https://performance.typekit.net/");b.send(a)}};a.src="https://p.typekit.net/p.gif?";a.onload=function(){for(var a=!1,b=0;b<document.styleSheets.length;b++)if(null===document.styleSheets[b].href&&/ghostery-purple-box/.test(document.styleSheets[b].ownerNode.textContent)){a=!0;break}c(a)};a.onerror=function(){c(!0)}}};a.fontactive=function(a,b){var g,h;c(a,b);a:{g=b.charAt(0);h=b.charAt(1);/[1-9]/.test(h)||(h=4);g="i"===g?"italic":"o"===g?"oblique":"normal";h+="00";
for(var l=n.fc,q=0;q<l.length;q++)if(l[q].family===a&&l[q].descriptors.weight===h&&l[q].descriptors.style===g){g=l[q].id;break a}g=0}Ja.push({id:g,duration:(new Date).getTime()-d,dynamic:!1})};Ia(a)}}if(window.WebFont)try{window.Typekit.load()}catch(a){};}(this,document));

