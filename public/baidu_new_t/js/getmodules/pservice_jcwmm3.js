_jsload2&&_jsload2('pservice', 'var Yh=5;bc.Hu=z.sg("pano")[0];bc.cl=bc.Hu+"?";bc.dG=z.sg("baidumap");bc.vP=z.sg("main_domain_nocdn");bc.Ud=new S;bc.bB=[]; x.extend(bc.prototype,{wQ:function(){var a=this,b;for(b in this.vd)if(0!==this.vd[b].length)switch(b){case "getPanoramaById":x.Gb(this.vd[b],function(b){a.cp.apply(a,b)});break;case "getPanoramaByLocation":x.Gb(this.vd[b],function(b){a.pj.apply(a,b)});break;case "getVisiblePOIs":x.Gb(this.vd[b],function(b){a.aE.apply(a,b)});break;case "getRecommendPanosById":x.Gb(this.vd[b],function(b){a.zx.apply(a,b)});break;case "getPanoramaVersions":x.Gb(this.vd[b],function(b){a.yx.apply(a,b)});break;case "checkPanoSupportByCityCode":x.Gb(this.vd[b], function(b){a.eC.apply(a,b)});break;case "getPanoramaByPOIId":x.Gb(this.vd[b],function(b){a.xx.apply(a,b)});break;case "getCopyrightProviders":x.Gb(this.vd[b],function(b){a.s2.apply(a,b)})}},cp:function(a,b,c){this.AH(bc.cl+"qt=sdata&l=17&sid="+a+"&fn=",b,c)},pj:function(a,b,c){"function"==typeof b&&(c=b,b=50);a=bc.Ud.lh(a);this.AH(bc.cl+"qt=qsdata&x="+a.x+"&y="+a.y+"&r="+b+"&action=1&fn=",c)},aE:function(a,b,c,d){a=bc.Ud.lh(a);this.Qg(bc.cl+"qt=search&x="+a.x+"&y="+a.y+"&radius="+b+"&tag="+c+"&fn=", function(a){for(var a=a.content,b=[],c=p,i=a.length-1;0<=i;i--)c=a[i],b.push({iconType:c.Type,title:c.name,altitude:c.Height,panoInfo:{panoId:c.PID,panoIId:c.IID,heading:c.Dir,pitch:c.Pitch},position:bc.Ud.zj(new R(c.X,c.Y))});d(b)})},zx:function(a,b){this.Qg(bc.cl+"qt=guide&sid="+a+"&fn=",function(a){if(a.content){for(var a=a.content,d=[],e=p,f=0,g=a.length;f<g;f++)e=a[f],d.push({panoId:e.PID,heading:e.Dir,name:e.Info,recoType:e.Type,pitch:e.Pitch,catlog:e.Catalog,floor:e.Floor});b(d)}})},nL:function(a){this.Qg(bc.dG+ "?qt=panoCMS&file=pano_copyright&callback=",function(b){a(b)})},yx:function(a){this.Qg(bc.dG+"?qt=pver&callback=",function(b){b?a&&a(b):a&&a(p)})},eC:function(a,b){function c(a){for(var b=bc.bB,c=0,g=b.length;c<g;c++)if(b[c]==a)return o;return q}0===bc.bB.length?this.Qg(bc.vP+"?qt=panoCityList&t="+(new Date).getTime()+"&callback=",function(d){d?(bc.bB=d,b(c(a))):b(q)}):b(c(a))},xx:function(a,b){var c=this;this.yx(function(d){d&&d.panoUdt&&c.Qg(bc.cl+"qt=poi&udt="+d.panoUdt.version+"&uid="+a+"&fn=", function(a){if(a&&a.content&&a.content[0]&&a.content[0].poiinfo){var a=a.content[0].poiinfo,d={id:a.IID||a.PID,pid:a.PID,type:1==a.hasinter?"inter":"street",description:a.name,links:p,position:bc.Ud.zj(new R(a.X,a.Y)),tiles:p,pov:1==a.hasinter?p:{heading:a.Dir,pitch:a.Pitch}};"inter"===d.type?c.gS(a.IID,function(a){if(a){for(var c=a.Defaultfloor,e=p,l=0,m=a.Floors.length;l<m;l++)if(a.Floors[l].Floor===c){e=a.Floors[l];break}e&&(d.interID=e.StartID)}b(d)}):b(d)}else b(p)})})},AH:function(a,b,c){var d= this;this.Qg(a,function(a){a&&a.result&&0==a.result.error?b&&b(d.WS(a,c)):b&&b(p)})},Qg:function(a,b){var c=(1E5*Math.random()).toFixed(0);z._rd=z._rd||{};z._rd["_cbk"+c]=function(a){b&&b(a);delete z._rd["_cbk"+c]};oa(a+("BMap._rd._cbk"+c))},WS:function(a,b){var c={},d=a.content[0];c.description=d.Rname||d.Info||"";c.id=d.ID;c.th=d.X/100;c.uh=d.Y/100;c.position=bc.Ud.zj(new R(c.th,c.uh));var e=this.XS(d,c.id,c.th,c.uh,d.NorthDir);c.links=e[0];c.roads=e[1];c.links.sort(function(a,b){return a.wh-b.wh}); c.mode=d.Mode;c.relevants=[];if(d.SwitchID)for(e=0;e<d.SwitchID.length;e++)c.relevants[e]={id:d.SwitchID[e].ID,mode:d.SwitchID[e].Time.toLowerCase()};c.tiles=new Zh({dirNorth:d.NorthDir,centerHeading:(180+d.NorthDir)%360,pitch:d.Pitch});if(d.Enters&&0<d.Enters.length){c.indoorPois=[];for(var e=0,f=d.Enters.length;e<f;e++)c.indoorPois.push({panoIId:d.Enters[e].IID,panoId:d.Enters[e].BreakID,title:d.Enters[e].Name,pointX:d.Enters[e].X/100,pointY:d.Enters[e].Y/100})}var f=[],g=d.VPoint;if(g)for(var i= g.length,e=0;e<i;e++){var k={};k.PID=g[e].PID;var l=bc.Ud.zj(new R(g[e].X/100,g[e].Y/100));k.X=6378137*-(l.lat-c.position.lat)/180*Math.PI;k.Z=6378137*(l.lng-c.position.lng)/180*Math.PI;f.push(k)}c.VPoint=f;d.Inters&&0<d.Inters.length&&(c.cm=d.Inters[0].BreakID,c.mV=d.Inters[0].IID,c.heading=d.MoveDir,c.pitch=d.Pitch);b&&(c.cm=b.cm);c.copyright={};c.copyright.admission=d.Admission;c.copyright.dataProviderIndex=d.Provider;c.copyright.photoDate=d.Date;c.copyright.roadName=d.Rname;c.copyright.username= d.Username||"";return c},XS:function(a,b,c,d,e){var f=[],g={};if(a.Links)for(var i=0;i<a.Links.length;i++)f.push({id:a.Links[i].PID,dir:a.Links[i].DIR,x:a.Links[i].X/100,y:a.Links[i].Y/100,heading:a.Links[i].DIR,wh:this.lA(a.Links[i].DIR,e)});if(!a.Roads)return[f,g];for(i=0;i<a.Roads.length;i++)if(a.Roads[i].Panos)for(var k=0;k<a.Roads[i].Panos.length;k++){if(a.Roads[i].Panos[k].PID==b){var l=a.Roads[i].Name;""==l&&(l=a.Rname||"\\u672a\\u77e5");for(var m=p,n=p,t,v,w=k-1;0<=w;w--){a.Roads[i].Panos[w]&& m===p&&(m=a.Roads[i].Panos[w],t=(m.DIR+180)%360,g[t]=[]);var y=a.Roads[i].Panos[w];g[t]&&g[t].push({id:y.PID,x:y.X/100,y:y.Y/100,distanceToCurrent:this.Wn(y.X/100,y.Y/100,c,d)})}m&&f.push({id:m.PID,dir:t,heading:t,description:l,x:m.X/100,y:m.Y/100,wh:this.lA(t,e)});for(w=k+1;w<a.Roads[i].Panos.length;w++)a.Roads[i].Panos[w]&&n===p&&(n=a.Roads[i].Panos[w],v=n.DIR,0==v&&(v=a.Roads[i].Panos[k].DIR),g[v]=[]),y=a.Roads[i].Panos[w],g[v]&&g[v].push({id:y.PID,x:y.X/100,y:y.Y/100,distanceToCurrent:this.Wn(y.X/ 100,y.Y/100,c,d)});n!=p&&f.push({id:n.PID,dir:v,heading:v,description:l,x:n.X/100,y:n.Y/100,wh:this.lA(v,e)})}for(w=0;w<f.length;w++)a.Roads[i].Panos[k].PID==f[w].id&&(f[w].description=a.Roads[i].Name,""==f[w].description&&(f[w].description=a.Rname||"\\u672a\\u77e5"))}for(i=0;i<f.length;i++){var a=f[i].dir,b=q,B;for(B in g)if(B==a){b=o;break}if(b)break;g[a]=[{id:f[i].id,x:f[i].x,y:f[i].y,distanceToCurrent:this.Wn(f[i].x,f[i].y,c,d)}]}return[f,g]},lA:function(a,b){var c=a+b;360<c&&(c%=360);return c= Math.round(100*c)/100},Wn:function(a,b,c,d){return Math.round(Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2)))},gS:function(a,b){this.Qg(bc.cl+"qt=idata&l=17&iid="+a+"&fn=",function(a){a&&a.result&&0===a.result.error?b(a.content[0].interinfo):b(p)})}});Yd=bc.prototype;T(Yd,{getPanoramaById:Yd.cp,getPanoramaByLocation:Yd.pj,getPanoramaByPOIId:Yd.xx});function Zh(a){this.tileSize=new L(512,512);this.worldSize=new L(512*this.hp(Yh),512*this.Bx(Yh));this.centerHeading=180;var a=a||{},b;for(b in a)this[b]=a[b]}var $h=z.sg("pano","scape/");x.extend(Zh.prototype,{getTilesUrl:function(a,b,c){return $h[(b.x+b.y)%$h.length]+"?qt=pdata&sid={sid}&pos={y}_{x}&z={zoom}".replace("{sid}",a).replace("{x}",b.x).replace("{y}",b.y).replace("{zoom}",c)},Bx:function(a){return Math.pow(2,a-2)},hp:function(a){return 2*this.Bx(a)}}); ');
