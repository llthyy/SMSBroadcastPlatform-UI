_jsload2&&_jsload2('opmb', 'var Lg=q,Mg=p; z.We(function(a){function b(){e&&(e=q,f=p,g||a.dispatchEvent(k))}function c(c){e=o;k=la(new M("ontouch"),c);f=new R(c.changedTouches[0].clientX,c.changedTouches[0].clientY);var g=d("onclickex",c);setTimeout(function(){b();a.dispatchEvent(g)},a.K.nW);Lg||a.dispatchEvent(d("onclick",c))}function d(b,c){for(var d=new M(b),e=c.target,f=p,g=p;e&&e!==a.Va;){if(e.ba){var i=x.lang.Kc(e.ba);i instanceof eb&&"canvas"!==e.nodeName.toLowerCase()&&(f=i);i instanceof sc&&(g=i)}e=e.offsetParent}for(var e=c.changedTouches[0].pageX, i=c.changedTouches[0].pageY,k=a.Va;k&&k!=document.body;)e-=k.offsetLeft,i-=k.offsetTop,k=k.offsetParent;d.offsetX=e;d.offsetY=i;d.pixel=d.jb=new R(d.offsetX,d.offsetY);d.point=d.point=a.wb(d.jb);d.overlay=d.bb=f;d.infoWindow=g;return d}a.K.nW=500;var e=q,f,g=q,i=q,k;x.M(a.La(),"touchmove",function(b){a.K.Hb&&b.preventDefault()});x.M(a.platform,"touchstart",function(b){Lg=q;Mg=setTimeout(function(){Lg=o;a.dispatchEvent(la(d("onlongpress",b),b))},1E3);a.K.Hb&&na(b);i=q;a.dispatchEvent(la(d("ontouchstart", b),b));a.K.Hb&&zb(b)});x.M(a.platform,"touchmove",function(b){a.K.Hb&&na(b);i=o;a.dispatchEvent(la(d("ontouchmove",b),b))});x.M(a.platform,"touchend",function(k){clearTimeout(Mg);a.K.Hb&&zb(k);i||(e?(g=o,Lg||a.dispatchEvent(d("onclick",k)),20>Bb(f,new R(k.changedTouches[0].clientX,k.changedTouches[0].clientY))?(a.dispatchEvent(d("ondblclick",k)),a.dispatchEvent(la(new M("ondbltouch"),k))):a.dispatchEvent(la(d("ontouchend",k),k)),b(),g=q):c(k));a.dispatchEvent(la(d("ontouchend",k),k))});x.M(a.platform, "gesturestart",function(b){b.preventDefault();a.dispatchEvent(la(new M("ongesturestart"),b))});x.M(a.platform,"gesturechange",function(b){b.preventDefault();a.dispatchEvent(la(new M("ongesturechange"),b))});x.M(a.platform,"gestureend",function(b){b.preventDefault();a.dispatchEvent(la(new M("ongestureend"),b))})}); z.We(function(a){function b(a){a&&(D.WebkitTransform="");k=i=0;l=1;m[0].x=m[0].y=m[1].x=m[1].y=0;B=q}function c(){if(x.platform.Km)if(/Nexus/.test(navigator.userAgent))a.K.Hb&&(D.left=a.offsetX+i+"px",D.top=a.offsetY+k+"px");else if(1!==l&&a.K.rk&&a.K.om)D.WebkitTransform="scale("+l+")";else{if(a.K.Hb&&(D.left=a.offsetX+i*l+"px",D.top=a.offsetY+k*l+"px"),1!=l)D.WebkitTransform=a.K.om?"scale("+l+") ":""}else D.WebkitTransform=1!==l&&a.K.rk&&a.K.om?"scale("+l+")":(a.K.Hb?"translate("+i*l+"px, "+k*l+ "px) ":"")+(a.K.om?"scale("+l+") ":"")}function d(b){var c=0,d=0;Ng&&(d=c=0);"end"===b&&a.K.Hb&&a.K.rk?(D.WebkitTransformOrigin=Math.round(a.width/2)-i-a.offsetX+"px "+(Math.round(a.height/2)-k-a.offsetY)+"px",n=D.WebkitTransformOrigin):"end"!==b&&a.K.Hb&&a.K.rk||(D.WebkitTransformOrigin=a.K.Hb?(m[0].x+m[1].x)/2-a.offsetX-c+"px "+((m[0].y+m[1].y)/2-a.offsetY-d)+"px":Math.round(a.width/2)+"px "+Math.round(a.height/2)+"px")}function e(b,c){var d=new M(b),e=f(c.changedTouches[0].pageX,c.changedTouches[0].pageY); d.offsetX=e.x;d.offsetY=e.y;d.jb=new R(d.offsetX,d.offsetY);d.point=a.wb(d.jb);return d}function f(b,c){for(var d=a.Va;d&&d!=document.body;)b-=d.offsetLeft,c-=d.offsetTop,d=d.offsetParent;return new R(b,c)}function g(a){for(var b=[],c,d=0,e=a.touches.length;d<e;d++)c=a.touches[d],b.push({x:c.pageX,y:c.pageY});return b}var i=0,k=0,l=1,m=[{x:0,y:0},{x:0,y:0}],n=Math.round(a.width/2)+"px "+Math.round(a.height/2)+"px",t=0,v=0,w=q,y=q,B=q,A=p,E,C,D=a.platform.style;a.K.rk&&(D.WebkitTransformOrigin=n); a.addEventListener("touchstart",function(b){if(!(b.bb instanceof U)){E=g(b);var c=b.targetTouches.length;t=t+c;t>2&&(t=2);var d=a.R;if(c==2)d.eI=o;d.mb&&d.mb.stop();if(t==1){this.R.sU=i;this.R.tU=k;b=f(b.targetTouches[0].pageX,b.targetTouches[0].pageY);m[0].x=b.x;m[0].y=b.y}else if(t==2){b=f(b.touches[c-1].pageX,b.touches[c-1].pageY);m[1].x=b.x;m[1].y=b.y}}});a.addEventListener("touchmove",function(b){if(x.QJ>=4&&b.changedTouches.length>=2){C=g(b);var n=E.length==2&&C.length==2?Bb(C[0],C[1])/Bb(E[0], E[1]):1;if(Math.abs(1-n)>0){l=n;y=o;clearTimeout(Mg);d()}}if(y&&!(b.changedTouches.length<2)){for(n=b.target;n&&n!=a.Va;){n.Dx&&x.lang.Kc(n.Dx);n=n.offsetParent}for(var n=[],D=0;D<2;D++){for(var Q=b.changedTouches[D].pageX,Z=b.changedTouches[D].pageY,aa=a.Va;aa&&aa!=document.body;){Q=Q-aa.offsetLeft;Z=Z-aa.offsetTop;aa=aa.offsetParent}n[D]={x:Q,y:Z}}A=new R((n[0].x+n[1].x)/2,(n[0].y+n[1].y)/2)}n=b.targetTouches.length;Q=f(b.touches[0].pageX,b.touches[0].pageY);if(t==1&&v!=2){i=i+(Q.x-m[0].x);k=k+ (Q.y-m[0].y);m[0].x=Q.x;m[0].y=Q.y;c();B=o}if(t==2){var Z=m[0].x,aa=m[0].y,Ja=m[1].x,Oa=m[1].y;if(B){for(Q=0;Q<n;Q++){D=f(b.touches[Q].pageX,b.touches[Q].pageY);if(Bb(D,new R(m[0].x,m[0].y))<Bb(D,new R(m[1].x,m[1].y))){m[0].x=D.x;m[0].y=D.y}else{m[1].x=D.x;m[1].y=D.y}}i=i+(m[0].x-Z+m[1].x-Ja)/2;k=k+(m[0].y-aa+m[1].y-Oa)/2;c()}else{D=new R(m[0].x,m[0].y);if(n==1)if(Bb(D,Q)<30){m[0].x=Q.x;m[0].y=Q.y}else{B=o;m[1].x=Q.x;m[1].y=Q.y}if(n==2){Z=f(b.touches[1].pageX,b.touches[1].pageY);if(Bb(Q,Z)<30){m[0].x= Z.x;m[0].y=Z.y}else{if(Bb(D,Q)<Bb(D,Z)){m[0].x=Q.x;m[0].y=Q.y;m[1].x=Z.x;m[1].y=Z.y}else{m[1].x=Q.x;m[1].y=Q.y;m[0].x=Z.x;m[0].y=Z.y}B=o}}}}if(t==1&&v==2){for(Q=0;Q<n;Q++){D=f(b.touches[Q].pageX,b.touches[Q].pageY);if(Bb(D,new R(m[0].x,m[0].y))<Bb(D,new R(m[1].x,m[1].y))){i=i+(D.x-m[0].x);k=k+(D.y-m[0].y);m[0].x=D.x;m[0].y=D.y}else{i=i+(D.x-m[1].x);k=k+(D.y-m[1].y);m[1].x=D.x;m[1].y=D.y}}c()}if(t==1&&this.K.Hb){n=this.R;if(!n.Yj){n.Yj=o;b=e("ondragstart",b);a.dispatchEvent(b);a.dispatchEvent(new M("onmovestart")); n.SC=b.jb;n.TC=$a();w=o}n.up=$a();a.dispatchEvent(new M("ondragging"))}});a.addEventListener("touchend",function(c){d("end");v=t;if(this.R.eI){t=c.targetTouches.length;delete this.R.eI}else t--;t==-1&&(t=0);x.platform.Km&&(t=0);if(t==0){if(y){var f=0,g=a.fa();a.Lc=a.Oa;if(this.K.om){f=Math.round(Math.log(l)/Math.log(2));g=Math.max(Math.min(a.fa()+f,a.K.$b),a.K.gc)}var n=a.oa().yc(g),B=A;B||(B=new R((m[0].x+m[1].x)/2,(m[0].y+m[1].y)/2));var C;C=B;var D=a.mc,E=a.oa().yc(a.Lc);C=new H(D.lng+E*(C.x-a.width/ 2),D.lat-E*(C.y-a.height/2));n=new H(C.lng+(a.width/2-B.x)*n,C.lat-(a.height/2-B.y)*n);n=S.Ab(n);n=a.bc(n);f=new R(n.x-i*l/Math.pow(2,f),n.y-k*l/Math.pow(2,f));n=a.K.Hb?a.wb(f):a.Ha();a.K.Hb&&a.K.rk&&(n=a.Ha());if(f=a.hh())if(f=f.ha()){f=a.bc(f,a.Lc);a.hk(a.width/2-f.x,a.height/2-f.y,a.wb(f,a.Lc),o)}a.Dd(n,g)}if(i!=this.R.sU||k!=this.R.tU){if(w&&!y){c=e("ondragend",c);Og(a,c,c.jb,{x:i,y:k});w=q}y?b(o):b(q)}y=a.R.Yj=q;v=0}});a.addEventListener("gesturechange",function(a){l=a.scale;y=o;clearTimeout(Mg); d()})}); function Og(a,b,c,d){var e=a.platform.style;if(a.K.ax){var f=a.R,g=$a();if(140<g-f.up)setTimeout(function(){e.WebkitTransform=""},0),setTimeout(function(){a.Ke(a.offsetX+d.x,a.offsetY+d.y)},0),window.setTimeout(function(){a.dispatchEvent(new M("onmoveend"));f.Yj=q},0),window.setTimeout(function(){a.dispatchEvent(b)},0);else{var i=f.SC,k=[0<c.x-i.x?1:-1,0<c.y-i.y?1:-1],g=Bb(i,c)/((g-f.TC)/1E3)/2,l=g/1.6,m=0.5*l*g/1E3,n=Math.abs(i.x-c.x),t=0,v=0;0==Math.abs(i.y-c.y)?t=n:(c=Math.abs(i.x-c.x)/Math.abs(i.y- c.y),v=Math.round(Math.sqrt(m*m/(1+c*c))),t=Math.round(c*v));-1==k[0]&&(t=-t);-1==k[1]&&(v=-v);f.mb&&f.mb.stop();var w=g/1E3,y=a.offsetX,B=a.offsetY;f.mb=new qb({duration:l,Gc:25,jc:function(a){a=a*w/1.6;return w*a-0.8*a*a},va:function(b){b=b*3.2/(w*w);if(x.platform.Km){e.left=a.offsetX+d.x+Math.round(b*t)+"px";e.top=a.offsetY+d.y+Math.round(b*v)+"px"}else e.WebkitTransform="translate("+(d.x+Math.round(b*t))+"px ,"+(d.y+Math.round(b*v))+"px)"},finish:function(){f.mb=p;setTimeout(function(){e.WebkitTransform= ""},0);setTimeout(function(){a.Ke(y+d.x+Math.round(t),B+d.y+Math.round(v));if(a.K.rk)e.WebkitTransformOrigin=Math.round(map.width/2)-(y+d.x+Math.round(t))+"px "+(Math.round(map.height/2)-(B+d.y+Math.round(v)))+"px"},0);setTimeout(function(){a.dispatchEvent(new M("onmoveend"))},0);setTimeout(function(){var b=new M("oninertialdraggingfinish");b.time=$a()-f.up;a.dispatchEvent(b)},0);window.setTimeout(function(){a.dispatchEvent(b)},0)},Et:function(b){f.mb=p;b=b*3.2/(w*w);setTimeout(function(){e.WebkitTransform= ""},0);setTimeout(function(){a.Ke(y+d.x+Math.round(b*t),B+d.y+Math.round(b*v));if(a.K.rk)e.WebkitTransformOrigin=Math.round(map.width/2)-(y+d.x+Math.round(t))+"px "+(Math.round(map.height/2)-(B+d.y+Math.round(v)))+"px"},0);setTimeout(function(){a.dispatchEvent(new M("onmoveend"))},0)}})}}else window.setTimeout(function(){e.WebkitTransform=""},0),window.setTimeout(function(){a.Ke(a.offsetX+d.x,a.offsetY+d.y)},0),window.setTimeout(function(){a.dispatchEvent(new M("onmoveend"))},0)} var Ng=-1<navigator.userAgent.indexOf("iPhone OS 5_")?o:q; ');
