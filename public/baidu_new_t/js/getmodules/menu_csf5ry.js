_jsload2&&_jsload2('menu', 'x.object.extend(cc.prototype,{ra:function(a,b){if(this.B)return q;this.C=a;this.zl=b||p;this.Aa();var c=this,d=a.K.Yb;b&&b.z.jf&&(d="pointer");this.B.style.cursor=d;this.Ad&&(this.Ad.style.cursor=d);x.M(document,"mousedown",function(){c.B&&c.U()});x.M(this.B,"click",function(a){c.U();ma(a)});d=this.k.Va;d||(d=a.Va);this.zl?this.zl.addEventListener("rightclick",function(a){c.B&&c.fJ(a)}):a.addEventListener("rightclickex",function(a){c.B&&(!a.bb&&!a.Cb)&&c.fJ(a)});for(var d=0,e=this.ya.length;d<e;d++)"menuitem"== this.ya[d].Nb&&this.ya[d].ra(a,this),"divider"==this.ya[d].Nb&&(this.Ee[this.ya[d].Nj].D=xb(this.B,"<div class=\'BMap_cmDivider\'></div>"));this.Zr()},yb:function(){this.C&&(this.ra(this.C,this.zl),this.Ph&&(this.Ph=q,this.show()))},remove:function(){this.B&&(this.B.parentNode.removeChild(this.B),this.B=p);this.Ad&&(this.Ad.parentNode.removeChild(this.Ad),this.Ad=p);for(var a=0,b=this.ya.length;a<b;a++)"menuitem"==this.ya[a].Nb&&(this.ya[a].B=p);this.C=this.zl=p},Aa:function(){this.B=xb(this.C.Va,"<div unselectable=\'on\'></div>"); this.B.className="BMap_contextMenu";var a=this.B.style;a.font="12px "+F.fontFamily;9>x.da.la?this.Ad=xb(this.C.Va,"<div class=\'BMap_cmShadow\'></div>"):a.lV=a.sP=a.WebkitBoxShadow="1px 2px 6px #666";return this.B},tw:function(a){if(a&&!("menuitem"!=a.Nb||""==a.Tg||0>=a.Zi)){for(var b=0,c=this.ya.length;b<c;b++)if(this.ya[b]===a)return;this.ya.push(a);this.If.push(a);this.C&&(a.ra(this.C,this),x.D.Ua(a.Id(),"BMap_cmLstItem"),1<this.ya.length?"menuitem"==this.ya[this.ya.length-2].Nb&&x.D.Tb(this.ya[this.ya.length- 2].Id(),"BMap_cmLstItem"):"menuitem"==this.ya[0].Nb&&x.D.Ua(this.ya[0].Id(),"BMap_cmFstItem"),this.Zr())}},removeItem:function(a){if(a&&"menuitem"==a.Nb){for(var b=0,c=this.ya.length;b<c;b++)this.ya[b]===a&&(this.ya[b].remove(),this.ya.splice(b,1),c--);b=0;for(c=this.If.length;b<c;b++)this.If[b]===a&&(this.If[b].remove(),this.If.splice(b,1),c--);this.B&&(0<this.ya.length&&"menuitem"==this.ya[this.ya.length-1].Nb&&x.D.Ua(this.ya[this.ya.length-1].Id(),"BMap_cmLstItem"),this.Zr())}},SB:function(){this.ya.push({Nb:"divider", Nj:this.Ee.length});this.Ee.push({D:p});this.B&&(this.Ee[this.Ee.length-1].D=xb(this.B,"<div class=\'BMap_cmDivider\'></div>"),this.Zr())},dF:function(a){if(this.Ee[a]){this.Ee[a].D&&this.Ee[a].D.parentNode&&this.Ee[a].D.parentNode.removeChild(this.Ee[a].D);for(var b=0,c=this.ya.length;b<c;b++)this.ya[b]&&("divider"==this.ya[b].Nb&&this.ya[b].Nj==a)&&(this.ya.splice(b,1),c--),this.ya[b]&&("divider"==this.ya[b].Nb&&this.ya[b].Nj>a)&&this.ya[b].Nj--;this.Ee.splice(a,1);this.Zr()}},ta:function(a,b){this.B.style.left= a+"px";this.B.style.top=b+"px";this.Ad&&(this.Ad.style.left=a+1+"px",this.Ad.style.top=b+2+"px")},show:function(){if(this.Ph!=o&&0!=this.If.length){this.Ph=o;this.B&&(this.B.style.visibility="visible");this.Ad&&(this.Ad.style.visibility="visible");var a=new M("onopen");a.point=this.Tw;a.pixel=this.ls;this.dispatchEvent(a)}},U:function(){if(this.Ph!=q){this.Ph=q;this.B&&(this.B.style.visibility="hidden");this.Ad&&(this.Ad.style.visibility="hidden");var a=new M("onclose");a.point=this.Tw;a.pixel=this.ls; this.dispatchEvent(a)}},PZ:function(a){if(a&&(this.k.cursor=a,this.B&&(this.B.style.cursor=this.k.cursor),this.Ad))this.Ad.style.cursor=this.k.cursor},Zr:function(){this.B&&this.Ad&&(this.Ad.style.width=this.B.offsetWidth+"px",this.Ad.style.height=this.B.offsetHeight+"px")},fJ:function(a){if(0!=this.If.length){this.ls=a.jb;this.Tw=this.C.wb(this.ls);var b=this.Id().offsetHeight,c=this.Id().offsetWidth,d=a.jb.x,e=a.jb.y;a.jb.x+c>this.C.width&&(d=a.jb.x-c);a.jb.y+b>this.C.height&&(e=a.jb.y-b);this.ta(d, e);this.show()}}});T(pf,{addItem:pf.tw,removeItem:pf.removeItem,addSeparator:pf.SB,removeSeparator:pf.dF});x.object.extend(fc.prototype,{ra:function(a,b){if(this.B)return q;this.C=a;this.Hh=b;b.Id()&&(this.Aa(),this.ca(),this.Lh||(this.Lh=o,this.disable()));return o},remove:function(){this.B&&(this.B.parentNode.removeChild(this.B),this.B=p);this.C=this.Hh=p},yb:function(){this.Hh&&this.C&&this.ra(this.C,this.Hh)},Aa:function(){var a=this.k.Hm?"<div"+(this.k.id?" id=\'"+this.k.id+"\'":"")+" unselectable=\'on\'><div style=\'width: 17px;height: 17px;margin-right: 3px;display: inline-block;zoom: 1;*display: inline;vertical-align: middle;background: url("+ this.k.Hm+") no-repeat;\'></div><span style=\'vertical-align: middle;\'>"+this.Tg+"</span></div>":"<div"+(this.k.id?" id=\'"+this.k.id+"\'":"")+" unselectable=\'on\'><span>"+this.Tg+"</span></div>";this.B=xb(this.Hh.Id(),a);this.k.Hm?(this.ov=this.B.firstChild,this.Vr=this.B.lastChild):this.Vr=this.B;a=this.B.style;a.padding="2px 6px";a.margin="0 2px";a.fontSize="14px";a.MozUserSelect="none";a.lineHeight="17px";a.width=this.k.width+"px";this.Lh?(a.color="#000",a.cursor="pointer"):(a.color="#aaa",a.cursor= this.C.K.Yb);return this.B},ca:function(){var a=this;x.M(this.B,"click",function(b){a.Lh?a.Az&&a.Az.call&&a.Az.call(a,a.Hh.Tw,a.Hh.ls,a.Hh.zl):ma(b)});x.M(this.B,"mousedown",function(a){ma(a)});x.M(this.B,"mouseover",function(){a.Lh&&(a.B.style.color="#6688cc")});x.M(this.B,"mouseout",function(){a.Lh&&(a.B.style.color="#000")})},Xt:function(a){a&&(this.Tg=a+"",this.Vr&&(this.Vr.innerHTML="<span>"+this.Tg+"</span>"))},Vb:function(a){a&&(this.k.Hm=a,this.ov?this.ov.style.background="url("+a+")":(this.B.innerHTML= "<div"+(this.k.id?" id=\'"+this.k.id+"\'":"")+" unselectable=\'on\'><div style=\'width: 17px;height: 17px;margin-right: 3px;display: inline-block;zoom: 1;*display: inline;vertical-align: middle;background: url("+this.k.Hm+") no-repeat;\'></div><span style=\'vertical-align: middle;\'>"+this.Tg+"</span></div>",this.ov=this.B.firstChild,this.Vr=this.B.lastChild))},enable:function(){this.Lh=o;this.B&&(this.B.style.color="#000",this.B.style.cursor="pointer")},disable:function(){this.Lh=q;this.B&&(this.B.style.color= "#aaa",this.B.style.cursor=this.C.K.Yb)}});T(qf,{setIcon:qf.Vb,setText:qf.Xt,enable:qf.enable,disable:qf.disable}); ');