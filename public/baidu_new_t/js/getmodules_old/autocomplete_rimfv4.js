_jsload2&&_jsload2('autocomplete', 'x.lang.Ba.prototype.gi=ga(0,function(){delete window[x.ba]._instances[this.ba];for(var a in this)x.lang.it(this[a])||delete this[a]});x.D.getComputedStyle=function(a,b){var a=x.D.Qj(a),c=x.D.HD(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,p))?c[b]||c.getPropertyValue(b):""};x.D.remove=function(a){var a=x.D.Qj(a),b=a.parentNode;b&&b.removeChild(a)};x.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)}; x.event=x.event||{};x.event.stopPropagation=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=o};x.event.preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=q};x.event.stop=function(a){var b=x.event;b.stopPropagation(a);b.preventDefault(a)};x.jc.indexOf=function(a,b,c){var d=a.length,c=c|0;for(0>c&&(c=Math.max(0,d+c));c<d;c++)if(c in a&&a[c]===b)return c;return-1};x.jc.contains=function(a,b){return 0<=x.jc.indexOf(a,b)};x.Qb=x.Qb||{version:"1.3.9"}; x.Qb.LX=function(a){for(var a=a.split("-"),b=x.Qb,c=a.length,d=0;d<c;d++)b=b[a[d].charAt(0).toUpperCase()+a[d].slice(1)];return b};x.Qb.create=function(a,b){x.lang.ug(a)&&(a=x.Qb.LX(a));return new a(b)};x.event.NA=x.event.NA||[]; x.event.M=function(a,b,c){function d(b){c.call(a,b)}var b=b.replace(/^on/i,""),a=x.D.Qj(a),e=x.event.NA,f=x.event.H0,g=b,b=b.toLowerCase();f&&f[b]&&(f=f[b](a,b,d),g=f.type,d=f.c3);a&&a.addEventListener?a.addEventListener(g,d,q):a&&a.attachEvent&&a.attachEvent("on"+g,d);e[e.length]=[a,b,c,d,g];return a};x.M=x.event.M; x.event.cd=function(a,b,c){for(var a=x.D.Qj(a),b=b.replace(/^on/i,"").toLowerCase(),d=x.event.NA,e=d.length,f=!c,g,i;e--;)if(g=d[e],g[1]===b&&g[0]===a&&(f||g[2]===c))i=g[4],g=g[3],a.removeEventListener?a.removeEventListener(i,g,q):a.detachEvent&&a.detachEvent("on"+i,g),d.splice(e,1);return a};x.cd=x.event.cd; x.Qb.dG={id:"",Yb:function(a){var b;b="tangram-"+this.ku+"--"+(this.id?this.id:this.ba);return a?b+"-"+a:b},Ms:function(a){var b=this.fK,c=this.l_;a&&(b+="-"+a,c+="-"+a);this.l_&&(b+=" "+c);return b},li:function(){return x.$(this.CM)},UW:function(){return x.$(this.Yb())},ku:"",Uo:function(){return"window[\'$BAIDU$\']._instances[\'"+this.ba+"\']"},c2:function(a){for(var b=0,c=Array.prototype.slice.call(arguments,1),d=c.length;b<d;b++)"string"==typeof c[b]&&(c[b]="\'"+c[b]+"\'");return this.Uo()+"."+a+"("+ c.join(",")+");"},M:function(a,b,c){x.M(a,b,c);this.addEventListener("ondispose",function(){x.cd(a,b,c)})},rZ:function(a){if(!this.li())return a=x.$(a),a||(a=document.createElement("div"),document.body.appendChild(a),a.style.position="absolute",a.className=this.Ms("main")),a.id||(a.id=this.Yb("main")),this.CM=a.id,a.setAttribute("data-guid",this.ba),a},gi:function(){this.dispatchEvent("dispose");x.lang.Ba.prototype.gi.call(this)}}; x.Qb.TV=function(a){function b(){}function c(b,d){var m=this,b=b||{};e.call(m,!f?b:b.ba||"",o);x.object.extend(m,c.options);x.object.extend(m,b);m.fK=m.fK||"tangram-"+m.ku.toLowerCase();for(g in x.Qb.Xl)"undefined"!=typeof m[g]&&m[g]&&(x.object.extend(m,x.Qb.Xl[g]),x.lang.it(m[g])?m.addEventListener("onload",function(){x.Qb.Xl[g].call(m[g].apply(m))}):x.Qb.Xl[g].call(m));a.apply(m,arguments);g=0;for(i=c.mz.length;g<i;g++)c.mz[g](m);b.parent&&m.$Z&&m.$Z(b.parent);!d&&b.k1&&m.ua(b.element)}var d;d= d||{};var e=d.u_||x.lang.Ba,f=e==x.lang.Ba?1:0,g,i;b.prototype=e.prototype;d=c.prototype=new b;for(g in x.Qb.dG)d[g]=x.Qb.dG[g];c.extend=function(a){for(g in a)c.prototype[g]=a[g];return c};c.mz=[];c.Se=function(a){"function"==typeof a&&c.mz.push(a)};c.options={};return c};x.D.BD=function(a,b){a=x.D.$(a);if(a===p)return a;if("style"==b)return a.style.cssText;b=x.D.AG[b]||b;return a.getAttribute(b)};x.BD=x.D.BD; x.Qb.get=function(a){var b;if(x.lang.ug(a))return x.lang.Mc(a);do{if(!a||9==a.nodeType)return p;if(b=x.D.BD(a,"data-guid"))return x.lang.Mc(b)}while((a=a.parentNode)!=document.body)}; x.Qb.Hi=x.Qb.TV(function(){var a=this;a.addEventListener("onload",function(){eventName=G()?"touchstart":"mousedown";a.M(document,eventName,a.jW);a.M(window,"blur",a.d0)});a.jW=a.SR();a.d0=a.sS();a.rk=[];a.Yc=-1}).extend({ku:"suggestion",o3:new Function,s3:new Function,p3:new Function,r3:new Function,u3:new Function,q3:new Function,getData:function(){return[]},G3:"",i1:"",im:{},J_:"<div id=\'#{0}\' class=\'#{1}\' style=\'position:relative; top:0px; left:0px\'></div>",o4:"<div id=\'#{0}\' class=\'#{1}\'>#{2}</div>", I_:\'<div style="height:22px;line-height:22px;overflow:hidden;zoom:1;border-top:#E7E7E7 solid 1px;background:#F7F7F7;"><span style="float:right;color:#4B4B4B;border-left:1px solid #E7E7E7;padding:0 10px;font-size:14px;" onmousedown="#{0}">\\u5173\\u95ed</span></div>\',H_:\'<table cellspacing="0" cellpadding="2"><tbody>#{0}</tbody></table>\',K_:\'<tr><td id="#{0}" onmouseover="#{2}" onmouseout="#{3}" onmousedown="#{4}" onclick="#{5}" class="#{6}"><i class="route-icon">#{1}</i></td></tr>\',CX:function(){return x.Ro(this.J_, this.Yb(),this.Ms(),this.ba)},ua:function(a,b){var c,a=x.$(a);this.XB=b;!this.li()&&a&&(this.w_=a.id?a.id:a.id=this.Yb("input"),c=this.rZ(),c.style.display="none",c.innerHTML=this.CX(),this.dispatchEvent("onload"))},HA:function(){var a=this.li();return a&&"none"!=a.style.display},zj:function(a){var b=this.im,a={data:{item:(b&&"number"==typeof a&&"undefined"!=typeof b[a]?b[a].value:a)==a?{value:a,content:a}:b[a],index:a}};this.dispatchEvent("onbeforepick",a)&&this.dispatchEvent("onpick",a)},show:function(a, b,c){var a=0,d=b.length;this.rk=[];this.Yc=-1;if(0==d&&!c)this.U();else{for(this.im=[];a<d;a++)"undefined"!=typeof b[a].value?this.im.push(b[a]):this.im.push({value:b[a],content:b[a]}),("undefined"==typeof b[a].disable||b[a].disable==q)&&this.rk.push(a);this.UW().innerHTML=this.NR();this.li().style.display="block";this.dispatchEvent("onshow")}},U:function(){if(this.HA()){if(0<=this.Yc&&this.UX)for(var a=this.im,b=-1,c=0,d=a.length;c<d;c++)if("undefined"==typeof a[c].disable||a[c].disable==q)b++,b== this.Yc&&this.zj(c);this.li().style.display="none";this.dispatchEvent("onhide")}},at:function(a){var b=this.rk,c=p;this.er(a)&&(0<=this.Yc&&this.XG(),c=this.DH(a),x.Ta(c,this.Ms("current")),this.Yc=x.jc.indexOf(b,a),this.dispatchEvent("onhighlight",{index:a,data:this.pm(a)}))},jC:function(){var a=this.rk[this.Yc];this.XG()&&this.dispatchEvent("onclearhighlight",{index:a,data:this.pm(a)})},XG:function(){var a=this.Yc,b=this.rk,c=p;return 0<=a?(c=this.DH(b[a]),x.Rb(c,this.Ms("current")),this.Yc=-1, o):q},confirm:function(a,b){if("keyboard"==b||this.er(a))this.zj(a),this.dispatchEvent("onconfirm",{data:this.pm(a)||a,source:b}),this.Yc=-1,this.U()},pm:function(a){return{item:this.im[a],index:a}},WD:function(){return this.vm().value},vm:function(){return x.$(this.w_)},DH:function(a){return x.$(this.Yb("item"+a))},NR:function(){for(var a="",b=[],c=this.im,d=c.length,e=0;e<d;e++)b.push(x.Ro(this.K_,this.Yb("item"+e),c[e].content,this.Uo()+"._itemOver(event, "+e+")",this.Uo()+"._itemOut(event, "+ e+")",this.Uo()+"._itemDown(event, "+e+")",this.Uo()+"._itemClick(event, "+e+")","undefined"==typeof c[e].disable||c[e].disable==q?"":this.Ms("disable")));a+=x.Ro(this.H_,b.join(""));G()&&(a+=x.Ro(this.I_,this.Uo()+"._close(event)"));return a},_close:function(){this.U()},_itemOver:function(a,b){x.event.stop(a||window.event);this.er(b)&&this.at(b);this.dispatchEvent("onmouseoveritem",{index:b,data:this.pm(b)})},_itemOut:function(a,b){x.event.stop(a||window.event);this.UX||this.er(b)&&this.jC();this.dispatchEvent("onmouseoutitem", {index:b,data:this.pm(b)})},_itemDown:function(a,b){x.event.stop(a||window.event);this.dispatchEvent("onmousedownitem",{index:b,data:this.pm(b)})},_itemClick:function(a,b){x.event.stop(a||window.event);this.dispatchEvent("onitemclick",{index:b,data:this.pm(b)});this.er(b)&&this.confirm(b,"mouse")},er:function(a){return x.jc.contains(this.rk,a)},SR:function(){var a=this;return function(b){var b=b||window.event,b=b.target||b.srcElement,c=x.Qb.get(b);b==a.vm()||c&&c.ku==a.ku||a.U()}},sS:function(){var a= this;return function(){a.U()}},gi:function(){this.dispatchEvent("dispose");x.D.remove(this.CM);x.lang.Ba.prototype.gi.call(this)}});x.Qb.Xl=x.Qb.Xl||{};x.D.children=function(a){a=x.D.$(a);if(a===p)return a;for(var b=[],a=a.firstChild;a;a=a.nextSibling)1==a.nodeType&&b.push(a);return b};x.D.insertBefore=function(a,b){var c;c=x.D.Qj;a=c(a);b=c(b);(c=b.parentNode)&&c.insertBefore(a,b);return a}; x.D.Kd=function(a,b,c){var d=x.D,e,a=d.$(a),b=x.Sk.oO(b);if(e=d.Kl)c=e.filter(b,c,"set");(e=d.EB[b])&&e.set?e.set(a,c):a.style[e||b]=c;return a};x.Kd=x.D.Kd;x.D.yi=function(a,b){a=x.D.$(a);if(a===p)return a;for(var c in b)x.D.Kd(a,c,b[c]);return a};x.yi=x.D.yi;x.D.Kl[x.D.Kl.length]={set:function(a,b){b.constructor==Number&&!/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)&&(b+="px");return b}}; x.D.Jt=function(a,b){function c(a,b){return parseFloat(x.tj(a,b))||0}var d={};b.width&&(d.width=parseFloat(b.width));b.height&&(d.height=parseFloat(b.height));if(x.ea.uE&&(b.width&&(d.width=parseFloat(b.width)-c(a,"paddingLeft")-c(a,"paddingRight")-c(a,"borderLeftWidth")-c(a,"borderRightWidth"),0>d.width&&(d.width=0)),b.height))d.height=parseFloat(b.height)-c(a,"paddingTop")-c(a,"paddingBottom")-c(a,"borderTopWidth")-c(a,"borderBottomWidth"),0>d.height&&(d.height=0);return x.D.yi(a,d)}; (function(){var a=x.Qb.Xl.rK=s();a.Wy=q;a.$p;a.hG;a.iG;a.eP=function(){if(this.$p)this.fP(),x.Kd(this.$p,"display","block");else{var a=this.JV||{},c=this.hG=a.Ua||this.li(),d=a.opacity||"0",a=a.color||"",e=this.$p=document.createElement("iframe"),f=this.iG=document.createElement("div");0<x.D.children(c).length?x.D.insertBefore(f,c.firstChild):c.appendChild(f);x.yi(f,{position:"absolute",top:"0px",left:"0px"});x.D.Jt(f,{width:c.offsetWidth,height:c.offsetHeight});x.D.Jt(e,{width:f.offsetWidth});x.D.yi(e, {zIndex:-1,display:"block",border:0,backgroundColor:a,filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity="+d+")"});f.appendChild(e);e.src="javascript:void(0)";e.frameBorder="0";e.scrolling="no";e.height="97%";this.Wy=o}};a.dP=function(){var a=this.$p;this.Wy&&(x.Kd(a,"display","none"),this.Wy=q)};a.fP=function(){var a;a=a||{};var c=this.hG,d=this.iG,e=this.$p;x.D.Jt(d,{width:c.offsetWidth,height:c.offsetHeight});x.D.Jt(e,x.extend({width:x.tj(d,"width")},a))}})(); x.extend(x.Qb.Hi.prototype,{rK:o,JV:{}});x.Qb.Hi.Se(function(a){a.rK&&(a.addEventListener("onshow",function(){a.eP()}),a.addEventListener("onhide",function(){a.dP()}))});x.Qb.Hi.extend({setData:function(a,b,c){this.BC[a]=b;c||this.show(a,this.BC[a])}});x.Qb.Hi.Se(function(a){a.BC={};a.addEventListener("onneeddata",function(b,c){var d=a.BC;"undefined"==typeof d[c]?a.getData(c):a.show(c,d[c])})});x.D.YZ=x.D.U3=function(a,b){return x.D.Jt(a,{width:b})}; x.D.OX=function(a){a=x.D.$(a);if(a===p)return a;a=x.D.HD(a);return a.parentWindow||a.defaultView||p};x.D.sa=function(a,b){return x.D.yi(a,{left:b.left-(parseFloat(x.D.tj(a,"margin-left"))||0),top:b.top-(parseFloat(x.D.tj(a,"margin-top"))||0)})};x.page=x.page||{};x.page.$D=function(){var a=document;return("BackCompat"==a.compatMode?a.body:a.documentElement).clientWidth};x.page.ZD=function(){var a=document;return("BackCompat"==a.compatMode?a.body:a.documentElement).clientHeight}; x.page.AX=function(){var a=document;return window.pageYOffset||a.documentElement.scrollTop||a.body.scrollTop};x.page.zX=function(){var a=document;return window.pageXOffset||a.documentElement.scrollLeft||a.body.scrollLeft};x.mm=x.mm||{};x.mm.bind=function(a,b){var c=2<arguments.length?[].slice.call(arguments,2):p;return function(){var d=x.lang.ug(a)?b[a]:a,e=c?c.concat([].slice.call(arguments,0)):arguments;return d.apply(b||d,e)}}; (function(){function a(a){a.x=a[0]||a.x||a.left||0;a.y=a[1]||a.y||a.top||0;return a}var b=x.Qb.Xl.iZ=s();b.sa=function(a,b,e){b=x.$(b)||this.li();e=e||{};this.IP(b,e.VY,[b,a,e])};b._positionByCoordinate=function(b,d,e,f){var d=d||[0,0],e=e||{},g={},i=x.page.ZD(),k=x.page.$D(),l=x.page.zX(),m=x.page.AX(),n=b.offsetWidth,u=b.offsetHeight,v=b.offsetParent,v=!v||v==document.body?{left:0,top:0}:x.D.ha(v);e.position="undefined"!==typeof e.position?e.position.toLowerCase():"bottomright";d=a(d||[0,0]);e.ya= a(e.ya||[0,0]);d.x+=0<=e.position.indexOf("right")?d.width||0:0;d.y+=0<=e.position.indexOf("bottom")?d.height||0:0;g.left=d.x+e.ya.x-v.left;g.top=d.y+e.ya.y-v.top;switch(e.U2){case "surround":g.left+=g.left<l?n+(d.width||0):g.left+n>l+k?-n-(d.width||0):0;g.top+=g.top<m?u+(d.height||0):g.top+u>m+i?-u-(d.height||0):0;break;case "fix":g.left=Math.max(0-parseFloat(x.D.tj(b,"marginLeft"))||0,Math.min(g.left,x.page.$D()-n-v.left));g.top=Math.max(0-parseFloat(x.D.tj(b,"marginTop"))||0,Math.min(g.top,x.page.ZD()- u-v.top));break;case "verge":var w=-1<e.position.indexOf("right")?d.width:0,y=-1<e.position.indexOf("bottom")?d.height:0,C=-1<e.position.indexOf("bottom")?d.width:0,A=-1<e.position.indexOf("right")?d.height:0;g.left-=0<=e.position.indexOf("right")?d.width||0:0;g.top-=0<=e.position.indexOf("bottom")?d.height||0:0;g.left+=g.left+w+n-l>k-v.left?C-n:w;g.top+=g.top+y+u-m>i-v.top?A-u:y}x.D.sa(b,g);!f&&(i!=x.page.ZD()||k!=x.page.$D())&&this._positionByCoordinate(b,d,{},o);f||this.dispatchEvent("onpositionupdate")}; b.IP=function(a,b,e){("undefined"==typeof b||!b)&&x.event.M(x.D.OX(a),"resize",x.mm.bind.apply(this,["_positionByCoordinate",this].concat([].slice.call(e))));this._positionByCoordinate.apply(this,e)}})(); x.Qb.Hi.extend({iZ:o,EW:o,PX:function(){var a=this;return function(){a.rw(o)}},rw:function(a){var b=this.vm(),c=this.XB,d=this.li();if(this.HA()||!a)c&&(b=c),a=x.D.ha(b),b={top:a.top+b.offsetHeight-1,left:a.left,width:b.offsetWidth},b="function"==typeof this.view?this.view(b):b,this.sa([b.left,b.top],p,{VY:o}),x.D.YZ(d,b.width)}}); x.Qb.Hi.Se(function(a){a.e0=a.PX();a.addEventListener("onload",function(){a.rw();a.EW&&(a.FW=setInterval(function(){var b=a.li(),c=a.vm();0!=b.offsetWidth&&(c&&c.offsetWidth!=b.offsetWidth)&&(a.rw(),b.style.display="block")},100));a.M(window,"resize",a.e0)});a.addEventListener("onshow",function(){a.rw()});a.addEventListener("ondispose",function(){clearInterval(a.FW)})}); x.Qb.Hi.Se(function(a){function b(){setTimeout(function(){var b=a.vm();e=b===p?"":b.value},20)}var c,d="",e,f,g=q,i=q;a.addEventListener("onload",function(){c=this.vm();b();a.M(window,"onload",b);a.x_=a.GX();a.M(c,"keydown",a.x_);c.setAttribute("autocomplete","off");a.wV=setInterval(function(){if(!i){x.$(c)==p&&a.gi();var b=c.value;b==d&&""!=b&&b!=e&&b!=f?0==a.hF&&(a.hF=setTimeout(function(){a.dispatchEvent("onneeddata",b)},100)):(clearTimeout(a.hF),a.hF=0,""==b&&""!=d&&(f="",a.U()),d=b,b!=f&&(a.Sw= b),e!=c.value&&(e=""))}},10);a.M(c,"beforedeactivate",a.bV)});a.addEventListener("onitemclick",function(){i=q;a.Sw=d=a.WD()});a.addEventListener("onpick",function(a){g&&c.blur();c.value=f=a.data.item.value;g&&c.focus()});a.addEventListener("onmousedownitem",function(){i=g=o;setTimeout(function(){g=i=q},500)});a.addEventListener("ondispose",function(){clearInterval(a.wV)})}); x.Qb.Hi.extend({bV:function(){return function(){mousedownView&&(window.event.cancelBubble=o,window.event.returnValue=q)}},GX:function(){var a=this;return function(b){var c=q,b=b||window.event;switch(b.keyCode){case 9:case 27:a.U();break;case 13:x.event.stop(b);a.confirm(-1==a.Yc?a.vm().value:a.rk[a.Yc],"keyboard");break;case 38:c=o;case 40:x.event.stop(b);b=c;if(a.HA()){var c=a.rk,d=a.Yc;if(0!=c.length){if(b)switch(d){case -1:d=c.length-1;a.zj(c[d]);a.at(c[d]);break;case 0:d=-1;a.zj(a.Sw);a.jC(); break;default:d--,a.zj(c[d]),a.at(c[d])}else switch(d){case -1:d=0;a.zj(c[d]);a.at(c[d]);break;case c.length-1:d=-1;a.zj(a.Sw);a.jC();break;default:d++,a.zj(c[d]),a.at(c[d])}a.Yc=d}}else a.dispatchEvent("onneeddata",a.WD());break;default:a.Yc=-1}}},Sw:""});ha.s4=o;var Ph=q,Qh=z.Hc+"res/20/bmap_autocomplete.css",Rh={ALL:"0",CITY:"1"}; x.extend(Hd.prototype,{Od:function(){this.Ri()},Ri:function(){this.gl=-1;this.Ea=p;this.Wv=[];this.VG=0;this.ja=this.bv();this.oc.input&&(this.nS(),this.LT(),this.xy(this.VH));var a=p;this.cj&&(a={method:"search"},a.arguments=[this.cj]);this.MH();this.uH(a)},LT:function(){var a=this,b=new x.Qb.Hi({getData:function(b){a.SI(b)},onhide:function(){a.gl=-1;""===a.mg.WD()&&(a.cj="",a.ja=a.bv())},onhighlight:function(b){if(a.Ea){var d={},e={},e={index:b.data.index,value:a.Ea.Im[b.data.index].value},d={index:a.gl, value:0<=a.gl?a.Ea.Im[a.gl].value:{}},f=new N("onhighlight");f.fromitem=f.V1=d;f.toitem=f.l4=e;a.dispatchEvent(f);a.gl=b.data.index}},onbeforepick:function(b){if(a.Ea&&"number"===typeof b.data.index){var d=a.Ea.Im[b.data.index].value;b.data.item.content=b.data.item.value=d.province+d.city+d.district+d.street+d.business}},onconfirm:function(b){if(a.Ea){Pa(5012);var d={};"number"===typeof b.data.index&&(d={index:b.data.index,value:a.Ea.Im[b.data.index].value},b=new N("onconfirm"),b.item=b.item=d,a.dispatchEvent(b))}}}); b.ua(x.$(this.oc.input),x.$(this.oc.XB));this.mg=b},show:function(){this.mg&&(this.mg.li().style.display="block")},U:function(){this.mg&&this.mg.U();this.gl=-1},gi:function(){this.mg&&this.mg.gi();x.lang.Ba.prototype.gi.call(this)},xF:function(a){this.oc.types=a||[];this.MH()},gn:function(a){this.zd.src=a;this.uH()},search:function(a){this.SI(a)},xy:function(a){this.mg&&this.mg.zj(a)},SI:function(a){var b=this,c=(1E5*Math.random()).toFixed(0);z._rd["_cbk"+c]=function(a){x.$(b.oc.input)!==p&&b.LR(a); delete z._rd["_cbk"+c]};var d=z.url.proto+z.url.domain.baidumap+"/su?wd="+encodeURIComponent(a)+"&callback=BMap._rd._cbk"+c+"&cid="+b.VG+"&type="+b.Wv+"&t="+(new Date).getTime();b.cj=a;b.gl=-1;b.ja=this.bv();Pa(5010,{tp:b.Wv,wd:encodeURIComponent(a)});Qb(d)},LR:function(a){a&&a.q&&(this.cj=a.q);this.mU(this.zR(a));this.ja=this.bv(this.Ea);this.oc.by(this.ja)},zR:function(a){var b=[],c=a.s,d={};d.sb=a.q||"";d.count=a.s.length||0;d.status=0>a.e?7:0;d.Im=[];var e=0,f=c.length;for(G()&&6<f&&(f=6);e<f;e++){var g= this.WR(c[e],this.Wv);d.Im.push(g.value);b.push(g.QL)}this.Ea=d;return{data:b,D4:a.q}},mU:function(a){if(this.mg){var b=this.mg;b.show(a.word,a.data);1>a.data.length&&b.U()}},WR:function(a,b){switch(b.toString()){case "1":return this.XR(a);default:return this.YR(a)}},YR:function(a){for(var a=a.split("$"),b=this.cj,c=RegExp(b,"g"),d="<b>"+b+"</b>",e={province:"",city:a[0],district:a[1],street:a[2],streetNumber:"",business:a[3]},f="",g=3;0<=g;g--)if(f=a[g]+f,-1<f.indexOf(b)){for(var b=g-1,i="";-1<b;)i= a[b]+i,b--;f=f.replace(c,d);i&&(f+=\'&nbsp;<span class="tangram-suggestion-grey">\'+i+"</span>");break}if(!i)for(g=3;0<=g;g--)i+=a[g];return{value:{value:e},QL:f}},XR:function(a){var b=a.split("$"),c=this.cj,a={province:b[0],city:b[1],district:"",street:"",streetNumber:"",business:""},b=(b[0]+b[1]).replace(RegExp(c,"g"),"<b>"+c+"</b>");return{value:{value:a},QL:b}},MH:function(){var a=this.oc.types,b=[];if(x.ug(a))b.push(Rh[a.toUpperCase()]);else if(x.lang.isArray(a))for(var c=0,d=a.length;c<d;c++)b.push(Rh[a[c].toUpperCase()]); this.Wv=0<b.length?b.join(","):"0"},uH:function(a){var b=this;b.Lg(b.zd,function(c){b.VG=c;a&&b[a.method].apply(b,a.arguments)})},nS:function(){if(!Ph){var a=document,b=a.createElement("link");b.setAttribute("rel","stylesheet");b.setAttribute("type","text/css");b.setAttribute("href",Qh);var c=a.getElementsByTagName("head");c.length?c[0].appendChild(b):a.documentElement.appendChild(b);Ph=o}},bv:function(a){if(!a)return new Sh({sb:this.cj,total:0,Gk:[]});for(var b=[],c=0,d=a.Im.length;c<d;c++)b.push(a.Im[c].value); return new Sh({sb:a.sb,total:a.count,Gk:b})}});S(of,{show:of.show,hide:of.U,setTypes:of.xF,setLocation:of.gn,search:of.search,setInputValue:of.xy,dispose:of.gi});function Sh(a){this.keyword=a.sb||"";this.XA=a.total||0;this.wr=a.Gk&&a.Gk.slice(0)||[]}x.extend(Sh.prototype,{xk:function(a){if(this.wr[a])return this.wr[a]},Us:t("XA"),toString:ca("AutocompleteResult")});var Th=Sh.prototype;S(Th,{getPoi:Th.xk,getNumPois:Th.Us}); ');
