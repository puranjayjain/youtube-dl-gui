var Hogan={};(function(j,h){j.Template=function(o,p,n,m){this.r=o||this.r;this.c=n;this.options=m;this.text=p||"";this.buf=(h)?[]:""};j.Template.prototype={r:function(o,n,m){return""},v:c,t:e,render:function b(o,n,m){return this.ri([o],n||{},m)},ri:function(o,n,m){return this.r(o,n,m)},rp:function(o,q,p,m){var n=p[o];if(!n){return""}if(this.c&&typeof n=="string"){n=this.c.compile(n,this.options)}return n.ri(q,p,m)},rs:function(p,o,q){var m=p[p.length-1];if(!g(m)){q(p,o,this);return}for(var n=0;n<m.length;n++){p.push(m[n]);q(p,o,this);p.pop()}},s:function(s,n,q,o,t,m,p){var r;if(g(s)&&s.length===0){return false}if(typeof s=="function"){s=this.ls(s,n,q,o,t,m,p)}r=(s==="")||!!s;if(!o&&r&&n){n.push((typeof s=="object")?s:n[n.length-1])}return r},d:function(q,n,p,r){var s=q.split("."),t=this.f(s[0],n,p,r),m=null;if(q==="."&&g(n[n.length-2])){return n[n.length-1]}for(var o=1;o<s.length;o++){if(t&&typeof t=="object"&&s[o] in t){m=t;t=t[s[o]]}else{t=""}}if(r&&!t){return false}if(!r&&typeof t=="function"){n.push(m);t=this.lv(t,n,p);n.pop()}return t},f:function(q,m,p,r){var t=false,n=null,s=false;for(var o=m.length-1;o>=0;o--){n=m[o];if(n&&typeof n=="object"&&q in n){t=n[q];s=true;break}}if(!s){return(r)?false:""}if(!r&&typeof t=="function"){t=this.lv(t,m,p)}return t},ho:function(s,m,p,r,o){var q=this.c;var n=this.options;n.delimiters=o;var r=s.call(m,r);r=(r==null)?String(r):r.toString();this.b(q.compile(r,n).render(m,p));return false},b:(h)?function(m){this.buf.push(m)}:function(m){this.buf+=m},fl:(h)?function(){var m=this.buf.join("");this.buf=[];return m}:function(){var m=this.buf;this.buf="";return m},ls:function(n,u,r,o,m,p,v){var q=u[u.length-1],s=null;if(!o&&this.c&&n.length>0){return this.ho(n,q,r,this.text.substring(m,p),v)}s=n.call(q);if(typeof s=="function"){if(o){return true}else{if(this.c){return this.ho(s,q,r,this.text.substring(m,p),v)}}}return s},lv:function(q,o,p){var n=o[o.length-1];var m=q.call(n);if(typeof m=="function"){m=e(m.call(n));if(this.c&&~m.indexOf("{\u007B")){return this.c.compile(m,this.options).render(n,p)}}return e(m)}};var i=/&/g,d=/</g,a=/>/g,l=/\'/g,k=/\"/g,f=/[&<>\"\']/;function e(m){return String((m===null||m===undefined)?"":m)}function c(m){m=e(m);return f.test(m)?m.replace(i,"&amp;").replace(d,"&lt;").replace(a,"&gt;").replace(l,"&#39;").replace(k,"&quot;"):m}var g=Array.isArray||function(m){return Object.prototype.toString.call(m)==="[object Array]"}})(typeof exports!=="undefined"?exports:Hogan);(function(n){var f=/\S/,j=/\"/g,o=/\n/g,k=/\r/g,u=/\\/g,a={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};n.scan=function m(G,B){var O=G.length,y=0,D=1,x=2,z=y,C=null,Q=null,P="",J=[],F=false,N=0,K=0,H="{{",M="}}";function L(){if(P.length>0){J.push(new String(P));P=""}}function A(){var S=true;for(var R=K;R<J.length;R++){S=(J[R].tag&&a[J[R].tag]<a._v)||(!J[R].tag&&J[R].match(f)===null);if(!S){return false}}return S}function I(U,R){L();if(U&&A()){for(var S=K,T;S<J.length;S++){if(!J[S].tag){if((T=J[S+1])&&T.tag==">"){T.indent=J[S].toString()}J.splice(S,1)}}}else{if(!R){J.push({tag:"\n"})}}F=false;K=J.length}function E(V,S){var U="="+M,R=V.indexOf(U,S),T=q(V.substring(V.indexOf("=",S)+1,R)).split(" ");H=T[0];M=T[1];return R+U.length-1}if(B){B=B.split(" ");H=B[0];M=B[1]}for(N=0;N<O;N++){if(z==y){if(w(H,G,N)){--N;L();z=D}else{if(G.charAt(N)=="\n"){I(F)}else{P+=G.charAt(N)}}}else{if(z==D){N+=H.length-1;Q=a[G.charAt(N+1)];C=Q?G.charAt(N+1):"_v";if(C=="="){N=E(G,N);z=y}else{if(Q){N++}z=x}F=N}else{if(w(M,G,N)){J.push({tag:C,n:q(P),otag:H,ctag:M,i:(C=="/")?F-M.length:N+H.length});P="";N+=M.length-1;z=y;if(C=="{"){if(M=="}}"){N++}else{r(J[J.length-1])}}}else{P+=G.charAt(N)}}}}I(F,true);return J};function r(x){if(x.n.substr(x.n.length-1)==="}"){x.n=x.n.substring(0,x.n.length-1)}}function q(x){if(x.trim){return x.trim()}return x.replace(/^\s*|\s*$/g,"")}function w(x,B,z){if(B.charAt(z)!=x.charAt(0)){return false}for(var A=1,y=x.length;A<y;A++){if(B.charAt(z+A)!=x.charAt(A)){return false}}return true}function b(D,A,y,C){var x=[],B=null,z=null;while(D.length>0){z=D.shift();if(z.tag=="#"||z.tag=="^"||e(z,C)){y.push(z);z.nodes=b(D,z.tag,y,C);x.push(z)}else{if(z.tag=="/"){if(y.length===0){throw new Error("Closing tag without opener: /"+z.n)}B=y.pop();if(z.n!=B.n&&!g(z.n,B.n,C)){throw new Error("Nesting error: "+B.n+" vs. "+z.n)}B.end=z.i;return x}else{x.push(z)}}}if(y.length>0){throw new Error("missing closing tag: "+y.pop().n)}return x}function e(A,y){for(var z=0,x=y.length;z<x;z++){if(y[z].o==A.n){A.tag="#";return true}}}function g(B,z,y){for(var A=0,x=y.length;A<x;A++){if(y[A].c==B&&y[A].o==z){return true}}}n.generate=function(x,A,y){var z='var _=this;_.b(i=i||"");'+t(x)+"return _.fl();";if(y.asString){return"function(c,p,i){"+z+";}"}return new n.Template(new Function("c","p","i",z),A,n,y)};function v(x){return x.replace(u,"\\\\").replace(j,'\\"').replace(o,"\\n").replace(k,"\\r")}function i(x){return(~x.indexOf("."))?"d":"f"}function t(y){var B="";for(var A=0,z=y.length;A<z;A++){var x=y[A].tag;if(x=="#"){B+=h(y[A].nodes,y[A].n,i(y[A].n),y[A].i,y[A].end,y[A].otag+" "+y[A].ctag)}else{if(x=="^"){B+=s(y[A].nodes,y[A].n,i(y[A].n))}else{if(x=="<"||x==">"){B+=d(y[A])}else{if(x=="{"||x=="&"){B+=c(y[A].n,i(y[A].n))}else{if(x=="\n"){B+=l('"\\n"'+(y.length-1==A?"":" + i"))}else{if(x=="_v"){B+=p(y[A].n,i(y[A].n))}else{if(x===undefined){B+=l('"'+v(y[A])+'"')}}}}}}}}return B}function h(y,C,B,A,x,z){return"if(_.s(_."+B+'("'+v(C)+'",c,p,1),c,p,0,'+A+","+x+',"'+z+'")){_.rs(c,p,function(c,p,_){'+t(y)+"});c.pop();}"}function s(x,z,y){return"if(!_.s(_."+y+'("'+v(z)+'",c,p,1),c,p,1,0,0,"")){'+t(x)+"};"}function d(x){return'_.b(_.rp("'+v(x.n)+'",c,p,"'+(x.indent||"")+'"));'}function c(y,x){return"_.b(_.t(_."+x+'("'+v(y)+'",c,p,0)));'}function p(y,x){return"_.b(_.v(_."+x+'("'+v(y)+'",c,p,0)));'}function l(x){return"_.b("+x+");"}n.parse=function(y,z,x){x=x||{};return b(y,"",[],x.sectionTags||[])},n.cache={};n.compile=function(A,x){x=x||{};var z=A+"||"+!!x.asString;var y=this.cache[z];if(y){return y}y=this.generate(this.parse(this.scan(A,x.delimiters),A,x),A,x);return this.cache[z]=y}})(typeof exports!=="undefined"?exports:Hogan);