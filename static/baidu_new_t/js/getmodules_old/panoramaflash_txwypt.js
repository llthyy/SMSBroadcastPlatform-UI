_jsload2&&_jsload2('panoramaflash', 'x.extend(Na.prototype,{Ri:function(){for(var a=0;a<z.rr.length;a++)z.rr[a](this);this.Jf!=p&&this.dispatchEvent(new N("onvisible_poi_type_changed"),{visiblePOIType:this.Jf});this.bl=this.gh();this.Fr=this.hd=q;this.Aq={};this.gd=new Xi(this);this.uS();this.cQ();this.eQ();if(this.Xa||this.Kb)this.Xa?this.rc(this.Xa,this.Ge):this.sa(this.Kb)},eQ:function(){var a=this;setInterval(function(){if(a.Yb()){var b=a.gh();b.mb(a.bl)||(a.gd.set("size",{width:b.width,height:b.height}),a.bl=b,a.dispatchEvent(new N("size_changed")))}}, 80)},uS:function(){var a=this.gd,b=this;a.addEventListener("clicked_position",function(a){b.dispatchEvent(new N("onclicked_position"),a)});a.addEventListener("thumbnail_complete",function(){b.dispatchEvent(new N("onthumbnail_complete"))});a.addEventListener("indoor_enter",function(a){a.data.x3===p?b.Lk({haveBreakId:q}):b.Lk({haveBreakId:o});b.dispatchEvent(new N("onhaveBreakId_changed"))});a.addEventListener("first_thumb_complete",function(){var a,d;if(b.hd!==o){b.hd=o;a=this;b.Xa=a.get("id");"street"!= b.Ge&&(b.Ge="street",b.zy("inter"));b.Zn=a.get("links");d=a.get("position");b.Kb=d;d=a.get("pov");!b.Ca.heading&&!b.Ca.pitch?b.Ca=d:(d.heading!=b.Ca.heading||d.pitch!=b.Ca.pitch)&&a.set("pov",b.Ca);d=a.get("zoom");1==!b.Lc&&1!=d?b.Lc==d:b.Lc!=d&&a.set("zoom",b.Lc);d=p;for(var e in b.Fe)d=b.Fe[e],delete b.Fe[e],b.Ia(d);b.k.navigationControl===q&&a.set("navigationControlVisible",q);var f=function(b){a.vs("toggleUI",{topo:b.linksControl,wellLid:b.clickOnRoad,innerExit:q,innerFloor:b.indoorFloorControl})}; f(b.k);b.addEventListener("clickonroad_changed",function(){f(b.k)});b.addEventListener("links_visible_changed",function(){f(b.k)});b.addEventListener("onindoorfloor_options_changed",function(){f(b.k)});b.addEventListener("navigation_visible_changed",function(){a.set("navigationControlVisible",b.k.navigationControl)});if(0<b.Rg.length){e=0;for(d=b.Rg.length;e<d;e++)b.Rg[e].register(b.B,b,b.gd);var g="",i=[];e=0;for(d=b.ur.length;e<d;e++)g=b.ur[e].JM,i=b.ur[e].IM,b[g].apply(b,i)}b.k.visible?b.show(): b.U()}});a.addEventListener("pano_error",function(){b.dispatchEvent(new N("error"))});a.addEventListener("id_changed",function(a){if(b.hd||b.Xa==p||"inter"==b.Ge)b.Xa=a.data;b.dispatchEvent(new N("onid_changed"))});a.addEventListener("position_changed",function(a){b.hd?b.Kb=b.gd.get("position"):b.Kb==p&&(b.Kb=a.data);b.dispatchEvent(new N("onposition_changed"))});a.addEventListener("pov_changed",function(a){if(b.hd||b.Ca.heading==p)b.Ca=a.data;b.dispatchEvent(new N("onpov_changed"))});a.addEventListener("links_changed", function(a){if(b.hd||0==b.Zn.length)b.Zn=a.data;b.dispatchEvent(new N("onlinks_changed"))});a.addEventListener("zoom_changed",function(a){if(b.hd||b.Lc==p)b.Lc=a.data;b.dispatchEvent(new N("onzoom_changed"))});a.addEventListener("sdata_loaded",function(a){b.zy(a.data.panoType);b.dispatchEvent(new N("oncopyright_changed"),{copyright:a.data.copyright});if(b.Fr){for(var d in b.Aq)b[d](b.Aq[d]);b.Fr=q;b.Aq={}}});a.addEventListener("overlay_mouseclick",function(a){a=b.Fe[a.data.markerId];a.dispatchEvent(new N("onclick"), {type:"click",target:a})});a.addEventListener("overlay_mouseover",function(a){a=b.Fe[a.data.markerId];a.dispatchEvent(new N("onmouseover"),{type:"mouseover",target:a})});a.addEventListener("overlay_mouseout",function(a){a=b.Fe[a.data.markerId];a.dispatchEvent(new N("onmouseout"),{type:"mouseout",target:a})})},cQ:function(){var a=this;x.M(this.B,ha.ea.rg?"DOMMouseScroll":"onmousewheel",function(b){if(a.k.enableScrollWheelZoom&&a.k.visible){var c=-b.detail/3||b.wheelDelta/120,c=a.fa()+c;a.Oc(c);Bb(b)}})}, rc:function(a,b,c){"object"===typeof b&&(c=b,b=j);if(!this.hd||a&&a!=this.Xa)this.hd||(this.Xa=a,this.Ge=b||"street",this.Kb=p),this.gd.set("id",{id:a,type:b||"street"}),this.Fr=o,c&&c.pov&&this.Nc(c.pov)},sa:function(a){if(!this.hd||a&&!this.Kb.mb(a))this.hd||(this.Kb=a,this.Xa=p),this.gd.set("position",a),this.Fr=o},Nc:function(a){a&&(90<a.pitch&&(a.pitch=90),-90>a.pitch&&(a.pitch=-90),this.hd?this.Fr?this.Aq.setPov=a:this.gd.set("pov",a):this.Ca=a)},Oc:function(a){a!=this.Lc&&(a>Jd&&(a=Jd),a<Kd&& (a=Kd),this.hd?this.gd.set("zoom",a):this.Lc=a,this.Aq.setZoom=a)},show:function(){this.k.visible=o;this.wf&&(this.C&&this.C.Na()===this.B)&&x.D.show(this.wf);this.gd&&this.gd.qr&&(this.gd.qr.style.left="0");this.hd&&(this.ol===this.Yb()&&this.gd.set("id",{id:this.ol,type:this.JS||"street"}),this.dispatchEvent(new N("onvisible_changed")))},U:function(){this.k.visible=q;this.hd&&(this.ol=this.Xa,this.JS=this.Ge,this.gd.vs("closePano"));this.Xa=p;this.gd&&this.gd.qr&&(this.gd.qr.style.left="-9999px"); this.dispatchEvent(new N("onvisible_changed"))},RB:function(a){function b(a,b){return function(){a.ur.push({JM:b,IM:arguments})}}if(this.hd)a.register(this.B,this,this.gd);else for(var c=a.getPanoMethodList(),d="",e=0,f=c.length;e<f;e++)d=c[e],this[d]=b(this,d);this.Rg.push(a)},dF:function(a){this.hd&&a.dispose();for(var b=this.Rg.length;b--;)this.Rg[b]===a&&this.Rg.splice(b,1)},Pt:function(a){this.Jf=a||"none";this.dispatchEvent(new N("onvisible_poi_type_changed"),{visiblePOIType:this.Jf})},Ia:function(a){this.Fe[a.jd]= a;this.hd&&this.dispatchEvent(new N("onadd_overlay"),{overlay:a})},Sb:function(a){var b=a.jd;this.hd&&this.dispatchEvent(new N("onremove_overlay"),{overlay:a});delete this.Fe[b]},Qo:function(){var a=this.gd.get("indoorData");a&&a.pid&&this.rc(a.pid)},sF:function(a){this.gd.set("interactiveState",a)}});hi=Na.prototype; S(hi,{setId:hi.rc,setPosition:hi.sa,setPov:hi.Nc,setZoom:hi.Oc,show:hi.show,hide:hi.U,addPlugin:hi.RB,removePlugin:hi.dF,addOverlay:hi.Ia,removeOverlay:hi.Sb,setPanoramaPOIType:hi.Pt,exitInter:hi.Qo,setInteractiveState:hi.sF});function Yi(){this.fT=(this.qA=window.ActiveXObject&&!(window.opera&&!window.opera.nodeType))?\' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"\':\' type="application/x-shockwave-flash"\';this.qI=["id","width","height","align","data"];this.rI="wmode movie flashvars scale quality play loop menu salign bgcolor base allowscriptaccess allownetworking allowfullscreen seamlesstabbing devicefont swliveconnect".split(" ")} x.extend(Yi.prototype,{create:function(a,b){var c=this.BR(a);b&&"string"===typeof b&&(b=document.getElementById(b));b?b.innerHTML=c:document.write(c)},remove:function(a){if((a=this.DL(a))&&this.qA){a.style.display="none";for(var b in a)"function"===typeof a[b]&&(a[b]=p);window.cP&&setTimeout(window.cP,0)}a.parentNode.removeChild(a)},bX:function(){function a(){var c=function(){var a=navigator;if(a.plugins&&a.mimeTypes.length){if((a=a.plugins["Shockwave Flash"])&&a.description)return a.description.replace(/([a-zA-Z]|\\s)+/, "").replace(/(\\s)+r/,".")+".0"}else if(b.qA)try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(c)return c.GetVariable("$version").replace(/WIN/g,"").replace(/,/g,".")}catch(f){}}();a=function(){return c};return c}var b=this;return a()},DL:function(a){return document.getElementById(a)},ZG:function(a,b){for(var a=a.split("."),b=b.split("."),c=Math.max(a.length,b.length),d=0;d<c;d++){var e=a[d],f=b[d];if(!e||!f)return!e&&!f?0:e?1:-1;e=Number(e);f=Number(f);if(e<f)return-1;if(e>f)return 1}return 0}, BR:function(a){a=a||{};a.movie=a.url||"";a.altHtml=a.errorMessage||"";if(a.vars){var b=a.vars,c=[],d=p,e=p;for(d in b)e=b[d],c.push(d+"="+encodeURIComponent(e));a.flashvars=c.join("&")}a.minVer=a.ver;b=a.minVer;c=a.maxVer;if(b||c)if(d=this.bX(),!d||b&&0>this.ZG(d,b)||c&&0<this.ZG(d,c))return a.altHtml||"";d=["<object",this.fT];a.data=a.movie;for(b=0;b<this.qI.length;b++)c=this.qI[b],a.hasOwnProperty(c)&&d.push(" ",c,\'="\',a[c],\'"\');d.push(">");for(b=0;b<this.rI.length;b++)c=this.rI[b],a.hasOwnProperty(c)&& d.push(\'<param name="\',c,\'" value="\',a[c],\'"/>\');d.push("</object>");return d.join("")}});function Zi(a,b){this.P=a;this.yR=b;this.Rh={};this.uz()}x.extend(Zi.prototype,{uz:function(){var a=this,b=a.P;b.addEventListener("add_overlay",function(b){b=b.overlay;b.qa(a.P,a.yR);a.Rh[b.jd]=b});b.addEventListener("remove_overlay",function(b){b=b.overlay;b.remove();delete a.Rh[b.jd]})}});x.extend(Nd.prototype,{qa:function(a,b){this.P=a;this.ha()||this.sa(this.P.ha());this.za=b;this.wb()},wb:function(){var a=this.ha(),a=bc.Sd.nh(a),a={markerId:this.jd,catalog:"FD01",name:this.uk(),rank:this.To(),x:a.x,y:a.y,color:this.wm(),hoverColor:this.PL,backgroundHoverColor:this.UJ,borderColor:this.borderColor,borderHoverColor:this.YJ,backgroundColor:this.backgroundColor,padding:this.padding,fontSize:this.fontSize,borderWidth:this.borderWidth};if(this.gE||this.getImageData())a.imageUrl=this.gE, a.imageData=this.getImageData(),a.size=this.yb(),a.image=this.jx(),a.catalog="FD02",this.yb()&&(a.width=this.yb()[0],a.height=this.yb()[1]);this.za.zN(a)},hide:function(){this.Pa=q;this.za&&this.za.Fo(this.jd,"visible",q)},show:function(){this.Pa=o;this.za&&this.za.Fo(this.jd,"visible",o)},isVisible:t("Pa"),If:function(a,b){this.za&&("position"==a&&(b=bc.Sd.nh(b),b={lng:b.x,lat:b.y}),this.za.Fo(this.jd,a,b))},remove:function(){this.dispatchEvent(new N("onremove"),{type:"remove",target:this});this.za.BK([this.jd])}});var $i={none:"",transit:"FE0A",hotel:"FE02",catering:"FE01",movie:"FE06",indoor_scene:"FEFE"},aj={none:["-1",""],transit:["0","m_transit.png"],hotel:["1","m_hotel.png"],catering:["2","m_catering.png"],movie:["3","m_movie.png"],transit:["4","m_transit.png"],indoor_scene:["5","m_indoor_scene.png"]}; x.extend(Qd.prototype,{qa:function(a,b){this.P=a;this.za=b;this.wb()},wb:function(){var a=this.ha(),a=bc.Sd.nh(a),b=this.UR(),c=this.SD();this.za.zN({markerId:this.jd,catalog:b,name:this.dp(),rank:this.To(),x:a.x,y:a.y,heading:c.heading,pitch:c.pitch,pid:c.panoId,panoIId:c.panoIId})},UR:function(){var a=this.Wo().match(/.*\\/(.*)/)[1],b;for(b in aj)if(aj[b][1]==a)return $i[b]},hide:function(){this.Pa=q;this.za.Fo(this.jd,"visible",q)},show:function(){this.Pa=o;this.za.Fo(this.jd,"visible",o)},isVisible:t("Pa"), If:function(a,b){"position"==a&&(b=bc.Sd.nh(b),b={lng:b.x,lat:b.y});this.za.Fo(this.jd,a,b)},remove:function(){this.dispatchEvent(new N("onremove"),{type:"remove",target:this});this.za.BK([this.jd])}});Xi.fo=new bc(p,{Of:"api"});function Xi(a){x.lang.Ba.call(this);a&&(this.P=a,this.Kg=p,this.mH=a.B.clientWidth,this.lH=a.B.clientHeight,new Zi(a,this))}Xi.BP=z.tg("pano");x.lang.ta(Xi,x.lang.Ba,"PanoramaFlashWraper"); x.extend(Xi.prototype,{zN:function(a){this.vs("addMarkers",[a])},BK:function(a){this.vs("removeMarkers",[a])},Fo:function(a,b,c){var d={};d.markerId=a;d[b]=c;this.set("markerProperty",d)},get:function(a){var b=p;"position"==a?(b=this.Kg.get("mercatorPosition"),b=bc.Sd.wi(new Q(b.mercatorX,b.mercatorY))):b=this.Kg.get(a);return b},set:function(a,b){var c=this;"position"==a?Xi.fo.qj(b,function(a){a&&a.id?c.P.rc(a.id):c.dispatchEvent(new N("pano_error"))}):"id"==a?c.Kg==p?c.BS(c.P):c.Kg.set&&c.Kg.set("panoOptions", {id:b.id,panoType:b.type,width:c.mH,height:c.lH}):c.Kg&&c.Kg.set&&c.Kg.set(a,b)},vs:function(a,b){return this.Kg.doAction(a,b)},l2:t("qr"),BS:function(a){var b=this,c=a.k.swfSrc.match(/.*\\//)[0]+"BDStreetScape.swf";b.Kg=o;Xi.fo.vx(function(d){var e="",f="";"inter"===a.Ge?f=a.Xa:e=a.Xa;e={pid:e,iid:f,panoType:a.Ge,heading:a.Ca.heading,pitch:a.Ca.pitch,width:b.mH,height:b.lH,panoUrl:c,panoTileUrl:Xi.BP.join("|"),domain:bc.Du,jsInterfaceNamespace:"BMap.PanoramaFlashInterface",swfIndex:b.ba};f=a.k.swfSrc; d&&(d.panoUdt&&d.panoUdt.version&&e)&&(e.udtVersion=d.panoUdt.version);d&&(d.panoSwfAPI&&d.panoSwfAPI.version&&e)&&(e.panoUrl=e.panoUrl+"?version="+d.panoSwfAPI.version,f=f+"?version="+d.panoSwfAPI.version);b.Kg=b.QQ(a.B,e,f)})},QQ:function(a,b,c){var d=new Yi,e="PanoramaFlash"+this.ba,f=p,f=K("div");f.style.position="absolute";f.id="PanoramaFlashWraper"+this.ba;f.style.top="0";f.style.left="0";f.style.height="100%";f.style.width="100%";f.style.zIndex=1200;this.qr=f;a.appendChild(f);d.create({id:e, width:"100%",height:"100%",allowscriptaccess:"always",scale:"showall",wmode:"opaque",quality:"best",url:c,ver:"10.2",errorMessage:"\\u60a8\\u672a\\u5b89\\u88c5Flash Player\\u64ad\\u653e\\u5668\\u6216\\u8005\\u7248\\u672c\\u8fc7\\u4f4e",vars:b},f);return d.DL(e)}});var bj=Xi.prototype;S(bj,{get:bj.get,set:bj.set,doAction:bj.vs}); ');
