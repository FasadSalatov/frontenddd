import{aB as v,ah as L,c2 as P,c,aq as b,av as g,I as A}from"./index-XZA1-3MU.js";import{u as y,j as E}from"./page-eb81Un_i.js";const M=24,a=!P;let u,m;a?(u=n=>requestAnimationFrame(n),m=n=>cancelAnimationFrame(n)):(u=n=>window.setTimeout(n,M),m=n=>window.clearTimeout(n));class S{constructor(t,e="",s=document.createElement("div")){this.el=t,this.container=s,this.onScrollMeasure=0,this.lastScrollPosition=0,this.lastScrollDirection=0,this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation=!1,this.onScroll=()=>{if(this.isHeavyAnimationInProgress){this.cancelMeasure(),this.needCheckAfterAnimation=!0;return}!this.onScrolledTop&&!this.onScrolledBottom&&!this.splitUp&&!this.onAdditionalScroll||this.onScrollMeasure||(this.onScrollMeasure=u(()=>{this.onScrollMeasure=0;const i=this.scrollPosition;this.lastScrollDirection=this.lastScrollPosition===i?0:this.lastScrollPosition<i?1:-1,this.lastScrollPosition=i,this.updateThumb(i),this.onAdditionalScroll&&this.onAdditionalScroll(),this.checkForTriggers&&this.checkForTriggers()}))},this.onMouseMove=i=>{c(i);const r=this.scrollSize,l=this.clientSize,o=this.thumb.offsetHeight,h=r-l,d=l-o,p=(i[this.clientAxis]-this.startMousePosition)/d*h,f=this.startScrollPosition+p;this.scrollPosition=f},this.onMouseDown=i=>{c(i),this.startMousePosition=i[this.clientAxis],this.startScrollPosition=this.scrollPosition,this.thumb.classList.add("is-focused"),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp,{once:!0})},this.onMouseUp=i=>{window.removeEventListener("mousemove",this.onMouseMove),this.thumb.classList.remove("is-focused")},this.container.classList.add("scrollable"),this.log=b("SCROLL"+(e?"-"+e:""),g.Error),t&&(Array.from(t.children).forEach(i=>this.container.append(i)),t.append(this.container))}addScrollListener(){this.addedScrollListener||(this.addedScrollListener=!0,this.container.addEventListener("scroll",this.onScroll,{passive:!0,capture:!0}))}removeScrollListener(){this.addedScrollListener&&(this.addedScrollListener=!1,this.container.removeEventListener("scroll",this.onScroll,{capture:!0}))}setListeners(){this.removeHeavyAnimationListener||(window.addEventListener("resize",this.onScroll,{passive:!0}),this.addScrollListener(),this.removeHeavyAnimationListener=y(()=>{this.isHeavyAnimationInProgress=!0,this.onScrollMeasure&&(this.cancelMeasure(),this.needCheckAfterAnimation=!0)},()=>{this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation&&(this.onScroll(),this.needCheckAfterAnimation=!1)}))}removeListeners(){this.removeHeavyAnimationListener&&(window.removeEventListener("resize",this.onScroll),this.thumb&&(this.thumb.removeEventListener("mousedown",this.onMouseMove),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)),this.removeScrollListener(),this.removeHeavyAnimationListener(),this.removeHeavyAnimationListener=void 0)}destroy(){this.removeListeners(),this.onAdditionalScroll=void 0,this.onScrolledTop=void 0,this.onScrolledBottom=void 0}prepend(...t){const e=this.splitUp||this.padding||this.container;this.thumb&&e!==this.container&&t.unshift(this.thumbContainer),e.prepend(...t),this.onSizeChange()}append(...t){(this.splitUp||this.padding||this.container).append(...t),this.onSizeChange()}scrollIntoViewNew(t){return E({...t,container:this.container})}updateThumb(t=this.scrollPosition){if(!a||!this.thumb)return;const e=this.container[this.scrollSizeProperty],s=this.container[this.clientSizeProperty],i=e/s/.75,r=Math.max(20,s/i),l=t/(e-s)*s,o=t/(e-s),h=s-r;s<e?(this.thumb.style.height=r+"px",this.thumb.style.transform=`translateY(${Math.min(h,l-r*o)}px)`):this.thumb.style.height="0px"}cancelMeasure(){this.onScrollMeasure&&(m(this.onScrollMeasure),this.onScrollMeasure=0)}onSizeChange(){a&&this.thumb&&this.onScroll()}getDistanceToEnd(){return this.scrollSize-Math.round(this.scrollPosition+this.offsetSize)}get isScrolledToEnd(){return this.getDistanceToEnd()<=1}get scrollPosition(){return this.container[this.scrollPositionProperty]}set scrollPosition(t){this.container[this.scrollPositionProperty]=t}get scrollSize(){return this.container[this.scrollSizeProperty]}get clientSize(){return this.container[this.clientSizeProperty]}get offsetSize(){return this.container[this.offsetSizeProperty]}get firstElementChild(){return this.thumb?this.thumbContainer.nextElementSibling:this.container.firstElementChild}setScrollPositionSilently(t){this.lastScrollPosition=t,this.ignoreNextScrollEvent(),this.scrollPosition=t}ignoreNextScrollEvent(){this.removeHeavyAnimationListener&&(this.removeScrollListener(),this.container.addEventListener("scroll",t=>{c(t),this.addScrollListener()},{capture:!0,passive:!1,once:!0}))}replaceChildren(...t){this.thumb&&t.unshift(this.thumbContainer),this.container.replaceChildren(...t)}}class T extends S{constructor(t,e="",s=300,i,r){super(t,e,r),this.onScrollOffset=s,this.loadedAll={top:!0,bottom:!1},this.checkForTriggers=()=>{if(!this.onScrolledTop&&!this.onScrolledBottom)return;if(this.isHeavyAnimationInProgress){this.onScroll();return}const{scrollSize:l,scrollPosition:o,clientSize:h}=this;if(!l)return;const d=l-h;this.onScrolledTop&&o<=this.onScrollOffset&&this.lastScrollDirection<=0&&this.onScrolledTop(),this.onScrolledBottom&&d-o<=this.onScrollOffset&&this.lastScrollDirection>=0&&this.onScrolledBottom()},this.scrollPositionProperty="scrollTop",this.scrollSizeProperty="scrollHeight",this.clientSizeProperty="clientHeight",this.offsetSizeProperty="offsetHeight",this.clientAxis="clientY",a&&(this.thumbContainer=document.createElement("div"),this.thumbContainer.classList.add("scrollable-thumb-container"),this.thumb=document.createElement("div"),this.thumb.classList.add("scrollable-thumb"),this.thumbContainer.append(this.thumb),this.container.prepend(this.thumbContainer),this.thumb.addEventListener("mousedown",this.onMouseDown)),this.container.classList.add("scrollable-y"),v&&!L&&this.container.classList.add("no-scrollbar"),this.setListeners()}attachBorderListeners(t=this.container){const e=this.onAdditionalScroll;this.onAdditionalScroll=()=>{e?.(),t.classList.toggle("scrolled-top",!this.scrollPosition),t.classList.toggle("scrolled-bottom",this.isScrolledToEnd)},t.classList.add("scrolled-top","scrolled-bottom","scrollable-y-bordered")}setVirtualContainer(t){this.splitUp=t,this.log("setVirtualContainer:",t,this)}}class H extends S{constructor(t,e="",s=300,i=15,r=document.createElement("div")){if(super(t,e,r),this.onScrollOffset=s,this.splitCount=i,this.container=r,this.container.classList.add("scrollable-x"),!A){const l=o=>{o.stopPropagation(),!o.deltaX&&this.container.scrollWidth>this.container.clientWidth&&(this.container.scrollLeft+=o.deltaY/4,c(o))};this.container.addEventListener("wheel",l,{passive:!1})}this.scrollPositionProperty="scrollLeft",this.scrollSizeProperty="scrollWidth",this.clientSizeProperty="clientWidth",this.offsetSizeProperty="offsetWidth"}}export{T as S,H as a};
//# sourceMappingURL=scrollable-OU41biYL.js.map
