_jsload2&&_jsload2('vector', 'x.extend(Oc.prototype,{ra:function(a,b){Gc.prototype.ra.call(this,a,b);this.Bg={};this.ir(a);this.vq();this.Qq()},remove:function(){var a=this.C;Gc.prototype.remove.call(this);a&&(a.removeEventListener("zoomend",this.Zk),a.removeEventListener("moveend",this.Dk),a.removeEventListener("resize",this.Kk),a.removeEventListener("hotspotclick",this.RL),a.em(this.k.Bk))},ir:function(a){this.C=a;this.KB=this.Rb;this.Ac=this.C.K.devicePixelRatio;this.nn=62;a.em(this.k.Bk);for(var b in this.lp)delete this.lp[b]}, vq:function(){var a=this,b=this.C;a.Zk=function(b){a.Qq(b)};a.Dk=function(b){a.Qq(b)};a.Kk=function(b){a.Qq(b)};a.RL=function(b){0<b.spots.length&&a.ST(b.spots[0].getUserData().uid)};b.addEventListener("zoomend",a.Zk);b.addEventListener("moveend",a.Dk);b.addEventListener("resize",a.Kk);b.addEventListener("hotspotclick",a.RL)},ST:function(a){var b=this,c=(1E5*Math.random()).toFixed(0);!z._rd&&(z._rd={});z._rd["_cbk"+c]=function(a){b.bR(a);delete z._rd["_cbk"+c]};var d=b.cW;this.k.dh&&(d=b.dW);a=d+ a+"?scope=2&ak="+this.k.Vl+"&callback=BMap._rd._cbk"+c;this.k.dh&&(a+="&geotable_id="+this.k.dh);oa(a)},bR:function(a){var b=a.content;this.k.dh&&(b=a.contents[0]);if(a&&0==a.status&&b){var a={poiId:b.uid||"",databoxId:b.databox_id||"",title:this.k.dh?b.title:b.name,address:this.k.dh?b.address:b.addr,phoneNumber:b.tel||"",postcode:b.zip||"",provinceCode:1*b.province_id||-1,province:b.province||"",cityCode:1*b.city_id||-1,city:b.city||"",districtCode:1*b.district_id||-1,district:b.district||"",point:this.k.dh? new H(b.location[0],b.location[1]):new H(b.longitude,b.latitude),tags:b.tag&&b.tag.replace(/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,"").split(/\\s+/),typeId:1*b.cla||-1,extendedData:b.ext||{}},c=new M("onhotspotclick");c.customPoi=a;c.content=b;this.IF&&this.IF.dispatchEvent(c);this.dispatchEvent(c)}},Qq:function(){var a=this.C,b=a.fa(),c=a.eb.Cm(this.KB,"yun",this.nn);if(a.Wb()){this.Lm||(this.Lm=o,0<c.length&&(this.Qb=a.oa().k.Qb));this.bn=Math.pow(2,18-b);this.qh=c.length;a=0;for(b=c.length;a<b;a++)this.xr(c[a][0], c[a][1],c[a][2])}},xr:function(a,b,c){var d=this,e=d.map,f=e.Ha(),g=new H(f.lng,f.lat),i=e.fa(),e=Rc[Math.abs(a+b)%Rc.length]+"/data?grids="+a+"_"+b+"_"+i+"&q="+this.k.Zm+"&tags="+this.k.ju+"&filter="+this.k.filter+"&sortby="+this.k.Jy+"&ak="+this.k.Vl+"&age="+this.k.ww,e=this.k.dh?e+("&geotable_id="+this.k.dh):e+("&databox_id="+this.k.zK);c.af=q;oa(e,function(e){var e=0==e.status?e.content[0].data:[],f=d.map,m=f.Ha(),f=f.fa();m.nb(g)&&f==i&&(d.Sn(e,c,a,b,i),d.qh--,0==d.qh&&d.IF.dispatchEvent("oncustomlayerloaded"))})}, Sn:function(a,b,c,d,e){var f=b.getContext("2d");1<this.Ac&&!b.lg&&(f.scale(this.Ac,this.Ac),b.lg=o);b.JB||(b.JB=o,f.translate(this.nn/2,this.nn/2));for(var e="hotSpotTile_"+c+"_"+d+"_"+e,g=0,i=a.length;g<i;g++)this.sW(f,a[g],c,d,e,b)},sW:function(a,b,c,d,e,f){var g=this,i=b[0],k=b[1],l=b[2],m=b[3],g=this,n=this.Qb,b=this.bn,c=c*b*n,d=(d+1)*b*n;/^POINT\\((.*)\\)$/.test(l);var l=RegExp.$1.split(","),t=l[0],v=l[1],w=(t-c)/b,y=(d-v)/b,B=new Image;B.onload=function(){var b=this.width,c=this.height;a.drawImage(this, w-b/2,y-c);g.lp[e]||(b={userData:{name:i,uid:k},offsets:[c,b/2,0,b/2]},b=new gb(S.Ab(new H(t,v)),b),g.C.sw(b,g.k.Bk));setTimeout(function(){g.lp[e]=o;f.af=o},1E3);delete this.onload};this.HX(m,function(a){""==m&&(m="sid1");B.src=a&&a.content&&a.content[m]&&""!=a.content[m]?"data:image/png;base64,"+a.content[m]:F.qa+"madian.png"})},Y3:function(){if(this.Rb){for(var a=this.Rb,b=0,c=a.childNodes.length;b<c;b++)a.childNodes[b].af=q;this.C.em(this.k.Bk);for(var d in this.lp)delete this.lp[d];this.Qq()}}, HX:function(a,b){var c=this,d=this.k.zK,e=this.k.s_,f=this.k.Vl;""==a&&(a="sid1");if(this.Bg[a]&&this.Bg[a].data)b(this.Bg[a].data);else{this.Bg[a]||(this.Bg[a]={},this.Bg[a].bC=[]);this.Bg[a].bC.push(b);var g=z.wc+"style/poi/rangestyle?method=getstyle";this.k.dh&&(d=this.k.dh);g+="&databox="+d+"&sid="+a+"&ak="+f;e&&(g+="&self_id="+e);this.Bg[a].qY||(setTimeout(function(){oa(g,function(b){var d=c.Bg[a].bC;c.Bg[a].data=b;for(var e=0;e<d.length;e++)d[e](b);c.Bg[a].bC.length=0})},10),c.Bg[a].qY=o)}}});x.extend(Pc.prototype,{ra:function(a,b){Gc.prototype.ra.call(this,a,b);this.ir(a);this.vq();this.bv()},remove:function(){var a=this.C;Gc.prototype.remove.call(this);a.removeEventListener("zoomend",this.Zk);a.removeEventListener("moveend",this.Dk);a.removeEventListener("resize",this.Kk)},ir:function(a){this.C=a;this.KB=this.Rb;this.Ac=this.C.K.devicePixelRatio;this.nn=0},vq:function(){var a=this,b=this.C;a.Zk=function(b){a.bv(b)};a.Dk=function(b){a.bv(b)};a.Kk=function(b){a.bv(b)};b.addEventListener("zoomend", a.Zk);b.addEventListener("moveend",a.Dk);b.addEventListener("resize",a.Kk)},bv:function(){var a=this.C,b=a.eb.Cm(this.KB,"traffic",this.nn);this.Lm||(this.Lm=o,0<b.length&&(this.Qb=a.oa().k.Qb));for(var a=0,c=b.length;a<c;a++)this.xr(b[a][0],b[a][1],b[a][2])},xr:function(a,b,c){var d=this,e=d.map,f=e.Ha(),g=new H(f.lng,f.lat),i=e.fa(),k="_t"+parseInt(a+""+b+""+i).toString(36),e=this.P_+"&x="+a+"&y="+b+"&z="+i+"&fn=BMap."+k+"&t="+(new Date).getTime();c.af=q;z[k]=function(e){var f=d.map,n=f.Ha(),f= f.fa();n.nb(g)&&f==i&&e.content&&e.content.tf&&d.Sn(e.content.tf,c,a,b);delete z[k]};oa(e,q)},Sn:function(a,b){var c=b.getContext("2d"),d=this.ue,e=this.ox,f=this.px;1<this.Ac&&!b.lg&&(c.scale(this.Ac,this.Ac),b.lg=o);b.JB||(b.JB=o,c.translate(this.nn/2,this.nn/2));for(var g=0,i=a.length;g<i;g++){var k=a[g],l=k[1],m=this.Fb[k[3]],k=this.Fb[k[4]],n=l[0]/10,t=l[1]/10;c.beginPath();c.moveTo(n,t);for(var v=2,w=l.length;v<w;v+=2)n+=l[v]/10,t+=l[v+1]/10,c.lineTo(n,t);c.strokeStyle=d(m[1]);c.lineWidth=m[2]; c.lineCap=e(m[3]);c.lineJoin=f(m[4]);c.stroke();c.strokeStyle=d(k[1]);c.lineWidth=k[2];c.lineCap=e(k[3]);c.lineJoin=f(k[4]);c.stroke()}b.af=o},ue:function(a){a>>>=0;return"rgba("+(a>>24&255)+","+(a>>16&255)+","+(a>>8&255)+","+(a&255)/256+")"},ox:function(a){return["butt","square","round"][a]},px:function(a){return["miter","bevel","round"][a]}});x.extend(bb.prototype,{Ce:function(){this.ra(this.C,this.B)},ra:function(a,b){this.C=a;this.B=b;this.C&&this.B&&(this.ir(),this.ES(),this.vq(),this.Pq())},remove:function(){var a=this.C;this.B.removeChild(this.Xa);a.removeEventListener("zoomend",this.Zk);a.removeEventListener("moving",this.VM);a.removeEventListener("moveend",this.Dk);a.removeEventListener("resize",this.Kk)},ir:function(){var a=this.C,b=a.K.devicePixelRatio,c=a.oa().k.Qb,d=a.Bb(),a=d.width,d=d.height;this.Yh={};this.Qb=c;this.Ac=b; this.FE=a;this.EE=d;this.uC=a*b;this.tC=d*b},ES:function(){var a=this.C,b=this.B,c=document.createElement("canvas"),d=c.style;d.position="absolute";d.zIndex=5;d.left=-a.offsetX+"px";d.top=-a.offsetY+"px";d.width=this.FE+"px";d.height=this.EE+"px";c.setAttribute("width",this.uC);c.setAttribute("height",this.tC);b.appendChild(c);this.Xa=c;this.Ih=c.getContext("2d");a=this.Ac;1<a&&!c.lg&&(this.Ih.scale(a,a),c.lg=o)},vq:function(){function a(){b.Xa.style.left=-c.offsetX+"px";b.Xa.style.top=-c.offsetY+ "px"}var b=this,c=b.C,d=b.Ac;b.Zk=function(c){b.Xa.style.display=18>this.fa()?"none":"block";a();b.Pq(c)};b.VM=function(c){var d=(new Date).getTime();100>d-b.qM||(b.qM=d,a(),b.Pq(c))};b.Dk=function(c){a();b.Pq(c)};b.Kk=function(e){var f=c.Bb(),g=f.width,f=f.height,i=g*d,k=f*d;b.Xa.style.width=g+"px";b.Xa.style.height=f+"px";b.Xa.setAttribute("width",i);b.Xa.setAttribute("height",k);b.FE=g;b.EE=f;b.uC=i;b.tC=k;a();b.Pq(e)};c.addEventListener("zoomend",b.Zk);c.addEventListener("moving",b.VM);c.addEventListener("moveend", b.Dk);c.addEventListener("resize",b.Kk)},Pq:function(a){var b=this.C,c=b.fa();if(!(18>c)){var d=b.eb.oL(),e=d[0],b=d[1],f=d[2],d=d[3],a=a?q:o,g;for(g in this.Yh)for(var i=e;i<f;i++)for(var k=b;k<d;k++)g==i+"_"+k+"_"+c&&(this.Yh[g].WH=o);for(g in this.Yh)this.Yh[g].WH?delete this.Yh[g].WH:(this.Yh[g]=p,delete this.Yh[g]);this.Ih.clearRect(0,0,this.uC,this.tC);for(i=e;i<f;i++)for(k=b;k<d;k++)(g=this.Yh[i+"_"+k+"_"+c])?this.Sn(g,i,k,c,a):this.xr(i,k,c,a)}},xr:function(a,b,c,d){var e=this,f=e.C,g=e.oV, i=(a+b)%g.length,k="x="+a+"&y="+b+"&z="+c,l=f.ba.replace(/^TANGRAM_/,"")+"building"+parseInt(a+""+b+""+c).toString(36),g=g[i]+"qt=hjpgvd&"+k+"&styles=pl&layers=bg&features=bd&f=mwebapp&v=001&udt=20130501&fn=BMap."+l,i=f.Ha(),m=new H(i.lng,i.lat),n=f.fa();z[l]=function(g){if(g=g.content){var i=f.Ha(),k=f.fa();if(!i.nb(m)||k!=n){delete z[l];return}if(g=window.bZ(g))e.Sn(g,a,b,c,d),e.Yh[a+"_"+b+"_"+c]=g}delete z[l]};oa(g)},Sn:function(a,b,c,d,e){e&&this.k.aL?this.iR(a,b,c,d):this.kH(a,b,c,d,1)},iR:function(a, b,c,d){var e=this;a.VP=new qb({Gc:50,duration:200,va:function(f){e.kH(a,b,c,d,f)},finish:function(){a.VP=p}})},kH:function(a,b,c,d,e){var f=this.C,g=this.FE,i=this.EE,d=f.oa().yc(d),f=f.mc,k=this.Qb,b=b*k-f.lng/d,c=(-1-c)*k+f.lat/d,d=this.Ih,f=a.length,k=0,l=window.Fb;d.save();for(d.translate(b+g/2,c+i/2);k<f;k++){var m=a[k],n=l[m[3]];if(4==n[0]){var t=m[7];window.VectorDrawUtils.YC(d,m[1],6*(m[2]*n[3])*e,90*((b+(t[0]+t[2])/2)/(g/2)),90*((c+(t[1]+t[3])/2)/(i/2)),"rgba(212,205,197,1)","rgba(235,233,228,1)", "rgba(170,170,170,1)",1)}}d.restore()}}); ');