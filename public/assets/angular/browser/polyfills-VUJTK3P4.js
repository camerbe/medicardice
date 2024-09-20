(function(e){e.ng??={},e.ng.common??={},e.ng.common.locales??={};let t=void 0;function i(n){let s=n,a=Math.floor(Math.abs(n)),m=n.toString().replace(/^[^.]*\.?/,"").length,_=parseInt(n.toString().replace(/^[^e]*(e([-+]?\d+))?/,"$2"))||0;return a===0||a===1?1:_===0&&a!==0&&a%1e6===0&&m===0||!(_>=0&&_<=5)?4:5}e.ng.common.locales["fr-be"]=["fr-BE",[["AM","PM"],t,t],t,[["D","L","M","M","J","V","S"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["di","lu","ma","me","je","ve","sa"]],t,[["J","F","M","A","M","J","J","A","S","O","N","D"],["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"]],t,[["av. J.-C.","ap. J.-C."],t,["avant J\xE9sus-Christ","apr\xE8s J\xE9sus-Christ"]],1,[6,0],["d/MM/yy","d MMM y","d MMMM y","EEEE d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","H 'h' mm 'min' ss 's' zzzz"],["{1} {0}","{1}, {0}","{1} '\xE0' {0}",t],[",","\u202F",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"EUR","\u20AC","euro",{ARS:["$AR","$"],AUD:["$AU","$"],BEF:["FB"],BMD:["$BM","$"],BND:["$BN","$"],BYN:[t,"\u0440."],BZD:["$BZ","$"],CAD:["$CA","$"],CLP:["$CL","$"],CNY:[t,"\xA5"],COP:["$CO","$"],CYP:["\xA3CY"],EGP:[t,"\xA3E"],FJD:["$FJ","$"],FKP:["\xA3FK","\xA3"],FRF:["F"],GBP:["\xA3GB","\xA3"],GIP:["\xA3GI","\xA3"],HKD:[t,"$"],IEP:["\xA3IE"],ILP:["\xA3IL"],ITL:["\u20A4IT"],JPY:[t,"\xA5"],KMF:[t,"FC"],LBP:["\xA3LB","\xA3L"],MTP:["\xA3MT"],MXN:["$MX","$"],NAD:["$NA","$"],NIO:[t,"$C"],NZD:["$NZ","$"],PHP:[t,"\u20B1"],RHD:["$RH"],RON:[t,"L"],RWF:[t,"FR"],SBD:["$SB","$"],SGD:["$SG","$"],SRD:["$SR","$"],TOP:[t,"$T"],TTD:["$TT","$"],TWD:[t,"NT$"],USD:["$US","$"],UYU:["$UY","$"],WST:["$WS"],XCD:[t,"$"],XPF:["FCFP"],ZMW:[t,"Kw"]},"ltr",i,[[["minuit","midi","mat.","ap.m.","soir","nuit"],t,["minuit","midi","du matin","de l\u2019apr\xE8s-midi","du soir","du matin"]],[["minuit","midi","mat.","ap.m.","soir","nuit"],t,["minuit","midi","matin","apr\xE8s-midi","soir","nuit"]],["00:00","12:00",["04:00","12:00"],["12:00","18:00"],["18:00","24:00"],["00:00","04:00"]]]]})(globalThis);var ce=globalThis;function ee(e){return(ce.__Zone_symbol_prefix||"__zone_symbol__")+e}function _t(){let e=ce.performance;function t($){e&&e.mark&&e.mark($)}function i($,T){e&&e.measure&&e.measure($,T)}t("Zone");let n=(()=>{let T=class T{static assertZonePatched(){if(ce.Promise!==O.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let r=T.current;for(;r.parent;)r=r.parent;return r}static get current(){return b.zone}static get currentTask(){return C}static __load_patch(r,d,D=!1){if(O.hasOwnProperty(r)){let I=ce[ee("forceDuplicateZoneCheck")]===!0;if(!D&&I)throw Error("Already loaded patch: "+r)}else if(!ce["__Zone_disable_"+r]){let I="Zone:"+r;t(I),O[r]=d(ce,T,R),i(I,I)}}get parent(){return this._parent}get name(){return this._name}constructor(r,d){this._parent=r,this._name=d?d.name||"unnamed":"<root>",this._properties=d&&d.properties||{},this._zoneDelegate=new a(this,this._parent&&this._parent._zoneDelegate,d)}get(r){let d=this.getZoneWith(r);if(d)return d._properties[r]}getZoneWith(r){let d=this;for(;d;){if(d._properties.hasOwnProperty(r))return d;d=d._parent}return null}fork(r){if(!r)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,r)}wrap(r,d){if(typeof r!="function")throw new Error("Expecting function got: "+r);let D=this._zoneDelegate.intercept(this,r,d),I=this;return function(){return I.runGuarded(D,this,arguments,d)}}run(r,d,D,I){b={parent:b,zone:this};try{return this._zoneDelegate.invoke(this,r,d,D,I)}finally{b=b.parent}}runGuarded(r,d=null,D,I){b={parent:b,zone:this};try{try{return this._zoneDelegate.invoke(this,r,d,D,I)}catch(S){if(this._zoneDelegate.handleError(this,S))throw S}}finally{b=b.parent}}runTask(r,d,D){if(r.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(r.zone||K).name+"; Execution: "+this.name+")");let I=r,{type:S,data:{isPeriodic:Te=!1,isRefreshable:ae=!1}={}}=r;if(r.state===X&&(S===V||S===E))return;let ne=r.state!=Z;ne&&I._transitionTo(Z,h);let _e=C;C=I,b={parent:b,zone:this};try{S==E&&r.data&&!Te&&!ae&&(r.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,I,d,D)}catch(u){if(this._zoneDelegate.handleError(this,u))throw u}}finally{let u=r.state;if(u!==X&&u!==Y)if(S==V||Te||ae&&u===k)ne&&I._transitionTo(h,Z,k);else{let l=I._zoneDelegates;this._updateTaskCount(I,-1),ne&&I._transitionTo(X,Z,X),ae&&(I._zoneDelegates=l)}b=b.parent,C=_e}}scheduleTask(r){if(r.zone&&r.zone!==this){let D=this;for(;D;){if(D===r.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${r.zone.name}`);D=D.parent}}r._transitionTo(k,X);let d=[];r._zoneDelegates=d,r._zone=this;try{r=this._zoneDelegate.scheduleTask(this,r)}catch(D){throw r._transitionTo(Y,k,X),this._zoneDelegate.handleError(this,D),D}return r._zoneDelegates===d&&this._updateTaskCount(r,1),r.state==k&&r._transitionTo(h,k),r}scheduleMicroTask(r,d,D,I){return this.scheduleTask(new m(U,r,d,D,I,void 0))}scheduleMacroTask(r,d,D,I,S){return this.scheduleTask(new m(E,r,d,D,I,S))}scheduleEventTask(r,d,D,I,S){return this.scheduleTask(new m(V,r,d,D,I,S))}cancelTask(r){if(r.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(r.zone||K).name+"; Execution: "+this.name+")");if(!(r.state!==h&&r.state!==Z)){r._transitionTo(B,h,Z);try{this._zoneDelegate.cancelTask(this,r)}catch(d){throw r._transitionTo(Y,B),this._zoneDelegate.handleError(this,d),d}return this._updateTaskCount(r,-1),r._transitionTo(X,B),r.runCount=-1,r}}_updateTaskCount(r,d){let D=r._zoneDelegates;d==-1&&(r._zoneDelegates=null);for(let I=0;I<D.length;I++)D[I]._updateTaskCount(r.type,d)}};T.__symbol__=ee;let $=T;return $})(),s={name:"",onHasTask:($,T,c,r)=>$.hasTask(c,r),onScheduleTask:($,T,c,r)=>$.scheduleTask(c,r),onInvokeTask:($,T,c,r,d,D)=>$.invokeTask(c,r,d,D),onCancelTask:($,T,c,r)=>$.cancelTask(c,r)};class a{get zone(){return this._zone}constructor(T,c,r){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=T,this._parentDelegate=c,this._forkZS=r&&(r&&r.onFork?r:c._forkZS),this._forkDlgt=r&&(r.onFork?c:c._forkDlgt),this._forkCurrZone=r&&(r.onFork?this._zone:c._forkCurrZone),this._interceptZS=r&&(r.onIntercept?r:c._interceptZS),this._interceptDlgt=r&&(r.onIntercept?c:c._interceptDlgt),this._interceptCurrZone=r&&(r.onIntercept?this._zone:c._interceptCurrZone),this._invokeZS=r&&(r.onInvoke?r:c._invokeZS),this._invokeDlgt=r&&(r.onInvoke?c:c._invokeDlgt),this._invokeCurrZone=r&&(r.onInvoke?this._zone:c._invokeCurrZone),this._handleErrorZS=r&&(r.onHandleError?r:c._handleErrorZS),this._handleErrorDlgt=r&&(r.onHandleError?c:c._handleErrorDlgt),this._handleErrorCurrZone=r&&(r.onHandleError?this._zone:c._handleErrorCurrZone),this._scheduleTaskZS=r&&(r.onScheduleTask?r:c._scheduleTaskZS),this._scheduleTaskDlgt=r&&(r.onScheduleTask?c:c._scheduleTaskDlgt),this._scheduleTaskCurrZone=r&&(r.onScheduleTask?this._zone:c._scheduleTaskCurrZone),this._invokeTaskZS=r&&(r.onInvokeTask?r:c._invokeTaskZS),this._invokeTaskDlgt=r&&(r.onInvokeTask?c:c._invokeTaskDlgt),this._invokeTaskCurrZone=r&&(r.onInvokeTask?this._zone:c._invokeTaskCurrZone),this._cancelTaskZS=r&&(r.onCancelTask?r:c._cancelTaskZS),this._cancelTaskDlgt=r&&(r.onCancelTask?c:c._cancelTaskDlgt),this._cancelTaskCurrZone=r&&(r.onCancelTask?this._zone:c._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let d=r&&r.onHasTask,D=c&&c._hasTaskZS;(d||D)&&(this._hasTaskZS=d?r:s,this._hasTaskDlgt=c,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,r.onScheduleTask||(this._scheduleTaskZS=s,this._scheduleTaskDlgt=c,this._scheduleTaskCurrZone=this._zone),r.onInvokeTask||(this._invokeTaskZS=s,this._invokeTaskDlgt=c,this._invokeTaskCurrZone=this._zone),r.onCancelTask||(this._cancelTaskZS=s,this._cancelTaskDlgt=c,this._cancelTaskCurrZone=this._zone))}fork(T,c){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,T,c):new n(T,c)}intercept(T,c,r){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,T,c,r):c}invoke(T,c,r,d,D){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,T,c,r,d,D):c.apply(r,d)}handleError(T,c){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,T,c):!0}scheduleTask(T,c){let r=c;if(this._scheduleTaskZS)this._hasTaskZS&&r._zoneDelegates.push(this._hasTaskDlgtOwner),r=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,T,c),r||(r=c);else if(c.scheduleFn)c.scheduleFn(c);else if(c.type==U)G(c);else throw new Error("Task is missing scheduleFn.");return r}invokeTask(T,c,r,d){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,T,c,r,d):c.callback.apply(r,d)}cancelTask(T,c){let r;if(this._cancelTaskZS)r=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,T,c);else{if(!c.cancelFn)throw Error("Task is not cancelable");r=c.cancelFn(c)}return r}hasTask(T,c){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,T,c)}catch(r){this.handleError(T,r)}}_updateTaskCount(T,c){let r=this._taskCounts,d=r[T],D=r[T]=d+c;if(D<0)throw new Error("More tasks executed then were scheduled.");if(d==0||D==0){let I={microTask:r.microTask>0,macroTask:r.macroTask>0,eventTask:r.eventTask>0,change:T};this.hasTask(this._zone,I)}}}class m{constructor(T,c,r,d,D,I){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=T,this.source=c,this.data=d,this.scheduleFn=D,this.cancelFn=I,!r)throw new Error("callback is not defined");this.callback=r;let S=this;T===V&&d&&d.useG?this.invoke=m.invokeTask:this.invoke=function(){return m.invokeTask.call(ce,S,this,arguments)}}static invokeTask(T,c,r){T||(T=this),Q++;try{return T.runCount++,T.zone.runTask(T,c,r)}finally{Q==1&&J(),Q--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(X,k)}_transitionTo(T,c,r){if(this._state===c||this._state===r)this._state=T,T==X&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${T}', expecting state '${c}'${r?" or '"+r+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let _=ee("setTimeout"),y=ee("Promise"),N=ee("then"),g=[],P=!1,j;function H($){if(j||ce[y]&&(j=ce[y].resolve(0)),j){let T=j[N];T||(T=j.then),T.call(j,$)}else ce[_]($,0)}function G($){Q===0&&g.length===0&&H(J),$&&g.push($)}function J(){if(!P){for(P=!0;g.length;){let $=g;g=[];for(let T=0;T<$.length;T++){let c=$[T];try{c.zone.runTask(c,null,null)}catch(r){R.onUnhandledError(r)}}}R.microtaskDrainDone(),P=!1}}let K={name:"NO ZONE"},X="notScheduled",k="scheduling",h="scheduled",Z="running",B="canceling",Y="unknown",U="microTask",E="macroTask",V="eventTask",O={},R={symbol:ee,currentZoneFrame:()=>b,onUnhandledError:W,microtaskDrainDone:W,scheduleMicroTask:G,showUncaughtError:()=>!n[ee("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:W,patchMethod:()=>W,bindArguments:()=>[],patchThen:()=>W,patchMacroTask:()=>W,patchEventPrototype:()=>W,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>W,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>W,wrapWithCurrentZone:()=>W,filterProperties:()=>[],attachOriginToPatched:()=>W,_redefineProperty:()=>W,patchCallbacks:()=>W,nativeScheduleMicroTask:H},b={parent:null,zone:new n(null,null)},C=null,Q=0;function W(){}return i("Zone","Zone"),n}function mt(){let e=globalThis,t=e[ee("forceDuplicateZoneCheck")]===!0;if(e.Zone&&(t||typeof e.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return e.Zone??=_t(),e.Zone}var be=Object.getOwnPropertyDescriptor,je=Object.defineProperty,Ze=Object.getPrototypeOf,gt=Object.create,Et=Array.prototype.slice,xe="addEventListener",He="removeEventListener",Me=ee(xe),$e=ee(He),le="true",ue="false",Pe=ee("");function Be(e,t){return Zone.current.wrap(e,t)}function Ue(e,t,i,n,s){return Zone.current.scheduleMacroTask(e,t,i,n,s)}var x=ee,Se=typeof window<"u",ye=Se?window:void 0,q=Se&&ye||globalThis,pt="removeAttribute";function Fe(e,t){for(let i=e.length-1;i>=0;i--)typeof e[i]=="function"&&(e[i]=Be(e[i],t+"_"+i));return e}function yt(e,t){let i=e.constructor.name;for(let n=0;n<t.length;n++){let s=t[n],a=e[s];if(a){let m=be(e,s);if(!nt(m))continue;e[s]=(_=>{let y=function(){return _.apply(this,Fe(arguments,i+"."+s))};return he(y,_),y})(a)}}}function nt(e){return e?e.writable===!1?!1:!(typeof e.get=="function"&&typeof e.set>"u"):!0}var rt=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Ce=!("nw"in q)&&typeof q.process<"u"&&q.process.toString()==="[object process]",ze=!Ce&&!rt&&!!(Se&&ye.HTMLElement),ot=typeof q.process<"u"&&q.process.toString()==="[object process]"&&!rt&&!!(Se&&ye.HTMLElement),Ne={},kt=x("enable_beforeunload"),qe=function(e){if(e=e||q.event,!e)return;let t=Ne[e.type];t||(t=Ne[e.type]=x("ON_PROPERTY"+e.type));let i=this||e.target||q,n=i[t],s;if(ze&&i===ye&&e.type==="error"){let a=e;s=n&&n.call(this,a.message,a.filename,a.lineno,a.colno,a.error),s===!0&&e.preventDefault()}else s=n&&n.apply(this,arguments),e.type==="beforeunload"&&q[kt]&&typeof s=="string"?e.returnValue=s:s!=null&&!s&&e.preventDefault();return s};function Je(e,t,i){let n=be(e,t);if(!n&&i&&be(i,t)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;let s=x("on"+t+"patched");if(e.hasOwnProperty(s)&&e[s])return;delete n.writable,delete n.value;let a=n.get,m=n.set,_=t.slice(2),y=Ne[_];y||(y=Ne[_]=x("ON_PROPERTY"+_)),n.set=function(N){let g=this;if(!g&&e===q&&(g=q),!g)return;typeof g[y]=="function"&&g.removeEventListener(_,qe),m&&m.call(g,null),g[y]=N,typeof N=="function"&&g.addEventListener(_,qe,!1)},n.get=function(){let N=this;if(!N&&e===q&&(N=q),!N)return null;let g=N[y];if(g)return g;if(a){let P=a.call(this);if(P)return n.set.call(this,P),typeof N[pt]=="function"&&N.removeAttribute(t),P}return null},je(e,t,n),e[s]=!0}function st(e,t,i){if(t)for(let n=0;n<t.length;n++)Je(e,"on"+t[n],i);else{let n=[];for(let s in e)s.slice(0,2)=="on"&&n.push(s);for(let s=0;s<n.length;s++)Je(e,n[s],i)}}var oe=x("originalInstance");function ve(e){let t=q[e];if(!t)return;q[x(e)]=t,q[e]=function(){let s=Fe(arguments,e);switch(s.length){case 0:this[oe]=new t;break;case 1:this[oe]=new t(s[0]);break;case 2:this[oe]=new t(s[0],s[1]);break;case 3:this[oe]=new t(s[0],s[1],s[2]);break;case 4:this[oe]=new t(s[0],s[1],s[2],s[3]);break;default:throw new Error("Arg list too long.")}},he(q[e],t);let i=new t(function(){}),n;for(n in i)e==="XMLHttpRequest"&&n==="responseBlob"||function(s){typeof i[s]=="function"?q[e].prototype[s]=function(){return this[oe][s].apply(this[oe],arguments)}:je(q[e].prototype,s,{set:function(a){typeof a=="function"?(this[oe][s]=Be(a,e+"."+s),he(this[oe][s],a)):this[oe][s]=a},get:function(){return this[oe][s]}})}(n);for(n in t)n!=="prototype"&&t.hasOwnProperty(n)&&(q[e][n]=t[n])}function fe(e,t,i){let n=e;for(;n&&!n.hasOwnProperty(t);)n=Ze(n);!n&&e[t]&&(n=e);let s=x(t),a=null;if(n&&(!(a=n[s])||!n.hasOwnProperty(s))){a=n[s]=n[t];let m=n&&be(n,t);if(nt(m)){let _=i(a,s,t);n[t]=function(){return _(this,arguments)},he(n[t],a)}}return a}function vt(e,t,i){let n=null;function s(a){let m=a.data;return m.args[m.cbIdx]=function(){a.invoke.apply(this,arguments)},n.apply(m.target,m.args),a}n=fe(e,t,a=>function(m,_){let y=i(m,_);return y.cbIdx>=0&&typeof _[y.cbIdx]=="function"?Ue(y.name,_[y.cbIdx],y,s):a.apply(m,_)})}function he(e,t){e[x("OriginalDelegate")]=t}var Ke=!1,Le=!1;function bt(){try{let e=ye.navigator.userAgent;if(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1)return!0}catch{}return!1}function Pt(){if(Ke)return Le;Ke=!0;try{let e=ye.navigator.userAgent;(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1||e.indexOf("Edge/")!==-1)&&(Le=!0)}catch{}return Le}function Qe(e){return typeof e=="function"}function et(e){return typeof e=="number"}var pe=!1;if(typeof window<"u")try{let e=Object.defineProperty({},"passive",{get:function(){pe=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch{pe=!1}var Rt={useG:!0},te={},it={},ct=new RegExp("^"+Pe+"(\\w+)(true|false)$"),at=x("propagationStopped");function lt(e,t){let i=(t?t(e):e)+ue,n=(t?t(e):e)+le,s=Pe+i,a=Pe+n;te[e]={},te[e][ue]=s,te[e][le]=a}function wt(e,t,i,n){let s=n&&n.add||xe,a=n&&n.rm||He,m=n&&n.listeners||"eventListeners",_=n&&n.rmAll||"removeAllListeners",y=x(s),N="."+s+":",g="prependListener",P="."+g+":",j=function(k,h,Z){if(k.isRemoved)return;let B=k.callback;typeof B=="object"&&B.handleEvent&&(k.callback=E=>B.handleEvent(E),k.originalDelegate=B);let Y;try{k.invoke(k,h,[Z])}catch(E){Y=E}let U=k.options;if(U&&typeof U=="object"&&U.once){let E=k.originalDelegate?k.originalDelegate:k.callback;h[a].call(h,Z.type,E,U)}return Y};function H(k,h,Z){if(h=h||e.event,!h)return;let B=k||h.target||e,Y=B[te[h.type][Z?le:ue]];if(Y){let U=[];if(Y.length===1){let E=j(Y[0],B,h);E&&U.push(E)}else{let E=Y.slice();for(let V=0;V<E.length&&!(h&&h[at]===!0);V++){let O=j(E[V],B,h);O&&U.push(O)}}if(U.length===1)throw U[0];for(let E=0;E<U.length;E++){let V=U[E];t.nativeScheduleMicroTask(()=>{throw V})}}}let G=function(k){return H(this,k,!1)},J=function(k){return H(this,k,!0)};function K(k,h){if(!k)return!1;let Z=!0;h&&h.useG!==void 0&&(Z=h.useG);let B=h&&h.vh,Y=!0;h&&h.chkDup!==void 0&&(Y=h.chkDup);let U=!1;h&&h.rt!==void 0&&(U=h.rt);let E=k;for(;E&&!E.hasOwnProperty(s);)E=Ze(E);if(!E&&k[s]&&(E=k),!E||E[y])return!1;let V=h&&h.eventNameToString,O={},R=E[y]=E[s],b=E[x(a)]=E[a],C=E[x(m)]=E[m],Q=E[x(_)]=E[_],W;h&&h.prepend&&(W=E[x(h.prepend)]=E[h.prepend]);function $(o,f){return!pe&&typeof o=="object"&&o?!!o.capture:!pe||!f?o:typeof o=="boolean"?{capture:o,passive:!0}:o?typeof o=="object"&&o.passive!==!1?{...o,passive:!0}:o:{passive:!0}}let T=function(o){if(!O.isExisting)return R.call(O.target,O.eventName,O.capture?J:G,O.options)},c=function(o){if(!o.isRemoved){let f=te[o.eventName],v;f&&(v=f[o.capture?le:ue]);let w=v&&o.target[v];if(w){for(let p=0;p<w.length;p++)if(w[p]===o){w.splice(p,1),o.isRemoved=!0,o.removeAbortListener&&(o.removeAbortListener(),o.removeAbortListener=null),w.length===0&&(o.allRemoved=!0,o.target[v]=null);break}}}if(o.allRemoved)return b.call(o.target,o.eventName,o.capture?J:G,o.options)},r=function(o){return R.call(O.target,O.eventName,o.invoke,O.options)},d=function(o){return W.call(O.target,O.eventName,o.invoke,O.options)},D=function(o){return b.call(o.target,o.eventName,o.invoke,o.options)},I=Z?T:r,S=Z?c:D,Te=function(o,f){let v=typeof f;return v==="function"&&o.callback===f||v==="object"&&o.originalDelegate===f},ae=h&&h.diff?h.diff:Te,ne=Zone[x("UNPATCHED_EVENTS")],_e=e[x("PASSIVE_EVENTS")];function u(o){if(typeof o=="object"&&o!==null){let f={...o};return o.signal&&(f.signal=o.signal),f}return o}let l=function(o,f,v,w,p=!1,M=!1){return function(){let L=this||e,A=arguments[0];h&&h.transferEventName&&(A=h.transferEventName(A));let F=arguments[1];if(!F)return o.apply(this,arguments);if(Ce&&A==="uncaughtException")return o.apply(this,arguments);let z=!1;if(typeof F!="function"){if(!F.handleEvent)return o.apply(this,arguments);z=!0}if(B&&!B(o,F,L,arguments))return;let de=pe&&!!_e&&_e.indexOf(A)!==-1,se=u($(arguments[2],de)),me=se?.signal;if(me?.aborted)return;if(ne){for(let ie=0;ie<ne.length;ie++)if(A===ne[ie])return de?o.call(L,A,F,se):o.apply(this,arguments)}let Ie=se?typeof se=="boolean"?!0:se.capture:!1,Ge=se&&typeof se=="object"?se.once:!1,Tt=Zone.current,Oe=te[A];Oe||(lt(A,V),Oe=te[A]);let Ve=Oe[Ie?le:ue],ge=L[Ve],We=!1;if(ge){if(We=!0,Y){for(let ie=0;ie<ge.length;ie++)if(ae(ge[ie],F))return}}else ge=L[Ve]=[];let Re,Xe=L.constructor.name,Ye=it[Xe];Ye&&(Re=Ye[A]),Re||(Re=Xe+f+(V?V(A):A)),O.options=se,Ge&&(O.options.once=!1),O.target=L,O.capture=Ie,O.eventName=A,O.isExisting=We;let ke=Z?Rt:void 0;ke&&(ke.taskData=O),me&&(O.options.signal=void 0);let re=Tt.scheduleEventTask(Re,F,ke,v,w);if(me){O.options.signal=me;let ie=()=>re.zone.cancelTask(re);o.call(me,"abort",ie,{once:!0}),re.removeAbortListener=()=>me.removeEventListener("abort",ie)}if(O.target=null,ke&&(ke.taskData=null),Ge&&(O.options.once=!0),!pe&&typeof re.options=="boolean"||(re.options=se),re.target=L,re.capture=Ie,re.eventName=A,z&&(re.originalDelegate=F),M?ge.unshift(re):ge.push(re),p)return L}};return E[s]=l(R,N,I,S,U),W&&(E[g]=l(W,P,d,S,U,!0)),E[a]=function(){let o=this||e,f=arguments[0];h&&h.transferEventName&&(f=h.transferEventName(f));let v=arguments[2],w=v?typeof v=="boolean"?!0:v.capture:!1,p=arguments[1];if(!p)return b.apply(this,arguments);if(B&&!B(b,p,o,arguments))return;let M=te[f],L;M&&(L=M[w?le:ue]);let A=L&&o[L];if(A)for(let F=0;F<A.length;F++){let z=A[F];if(ae(z,p)){if(A.splice(F,1),z.isRemoved=!0,A.length===0&&(z.allRemoved=!0,o[L]=null,!w&&typeof f=="string")){let de=Pe+"ON_PROPERTY"+f;o[de]=null}return z.zone.cancelTask(z),U?o:void 0}}return b.apply(this,arguments)},E[m]=function(){let o=this||e,f=arguments[0];h&&h.transferEventName&&(f=h.transferEventName(f));let v=[],w=ut(o,V?V(f):f);for(let p=0;p<w.length;p++){let M=w[p],L=M.originalDelegate?M.originalDelegate:M.callback;v.push(L)}return v},E[_]=function(){let o=this||e,f=arguments[0];if(f){h&&h.transferEventName&&(f=h.transferEventName(f));let v=te[f];if(v){let w=v[ue],p=v[le],M=o[w],L=o[p];if(M){let A=M.slice();for(let F=0;F<A.length;F++){let z=A[F],de=z.originalDelegate?z.originalDelegate:z.callback;this[a].call(this,f,de,z.options)}}if(L){let A=L.slice();for(let F=0;F<A.length;F++){let z=A[F],de=z.originalDelegate?z.originalDelegate:z.callback;this[a].call(this,f,de,z.options)}}}}else{let v=Object.keys(o);for(let w=0;w<v.length;w++){let p=v[w],M=ct.exec(p),L=M&&M[1];L&&L!=="removeListener"&&this[_].call(this,L)}this[_].call(this,"removeListener")}if(U)return this},he(E[s],R),he(E[a],b),Q&&he(E[_],Q),C&&he(E[m],C),!0}let X=[];for(let k=0;k<i.length;k++)X[k]=K(i[k],n);return X}function ut(e,t){if(!t){let a=[];for(let m in e){let _=ct.exec(m),y=_&&_[1];if(y&&(!t||y===t)){let N=e[m];if(N)for(let g=0;g<N.length;g++)a.push(N[g])}}return a}let i=te[t];i||(lt(t),i=te[t]);let n=e[i[ue]],s=e[i[le]];return n?s?n.concat(s):n.slice():s?s.slice():[]}function Nt(e,t){let i=e.Event;i&&i.prototype&&t.patchMethod(i.prototype,"stopImmediatePropagation",n=>function(s,a){s[at]=!0,n&&n.apply(s,a)})}function St(e,t){t.patchMethod(e,"queueMicrotask",i=>function(n,s){Zone.current.scheduleMicroTask("queueMicrotask",s[0])})}var we=x("zoneTask");function Ee(e,t,i,n){let s=null,a=null;t+=n,i+=n;let m={};function _(N){let g=N.data;g.args[0]=function(){return N.invoke.apply(this,arguments)};let P=s.apply(e,g.args);return et(P)?g.handleId=P:(g.handle=P,g.isRefreshable=Qe(P.refresh)),N}function y(N){let{handle:g,handleId:P}=N.data;return a.call(e,g??P)}s=fe(e,t,N=>function(g,P){if(Qe(P[0])){let j={isRefreshable:!1,isPeriodic:n==="Interval",delay:n==="Timeout"||n==="Interval"?P[1]||0:void 0,args:P},H=P[0];P[0]=function(){try{return H.apply(this,arguments)}finally{let{handle:Z,handleId:B,isPeriodic:Y,isRefreshable:U}=j;!Y&&!U&&(B?delete m[B]:Z&&(Z[we]=null))}};let G=Ue(t,P[0],j,_,y);if(!G)return G;let{handleId:J,handle:K,isRefreshable:X,isPeriodic:k}=G.data;if(J)m[J]=G;else if(K&&(K[we]=G,X&&!k)){let h=K.refresh;K.refresh=function(){let{zone:Z,state:B}=G;return B==="notScheduled"?(G._state="scheduled",Z._updateTaskCount(G,1)):B==="running"&&(G._state="scheduling"),h.call(this)}}return K??J??G}else return N.apply(e,P)}),a=fe(e,i,N=>function(g,P){let j=P[0],H;et(j)?(H=m[j],delete m[j]):(H=j?.[we],H?j[we]=null:H=j),H?.type?H.cancelFn&&H.zone.cancelTask(H):N.apply(e,P)})}function Ct(e,t){let{isBrowser:i,isMix:n}=t.getGlobalObjects();if(!i&&!n||!e.customElements||!("customElements"in e))return;let s=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];t.patchCallbacks(t,e.customElements,"customElements","define",s)}function Dt(e,t){if(Zone[t.symbol("patchEventTarget")])return;let{eventNames:i,zoneSymbolEventNames:n,TRUE_STR:s,FALSE_STR:a,ZONE_SYMBOL_PREFIX:m}=t.getGlobalObjects();for(let y=0;y<i.length;y++){let N=i[y],g=N+a,P=N+s,j=m+g,H=m+P;n[N]={},n[N][a]=j,n[N][s]=H}let _=e.EventTarget;if(!(!_||!_.prototype))return t.patchEventTarget(e,t,[_&&_.prototype]),!0}function It(e,t){t.patchEventPrototype(e,t)}function ft(e,t,i){if(!i||i.length===0)return t;let n=i.filter(a=>a.target===e);if(!n||n.length===0)return t;let s=n[0].ignoreProperties;return t.filter(a=>s.indexOf(a)===-1)}function tt(e,t,i,n){if(!e)return;let s=ft(e,t,i);st(e,s,n)}function Ae(e){return Object.getOwnPropertyNames(e).filter(t=>t.startsWith("on")&&t.length>2).map(t=>t.substring(2))}function Ot(e,t){if(Ce&&!ot||Zone[e.symbol("patchEvents")])return;let i=t.__Zone_ignore_on_properties,n=[];if(ze){let s=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let a=bt()?[{target:s,ignoreProperties:["error"]}]:[];tt(s,Ae(s),i&&i.concat(a),Ze(s))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let s=0;s<n.length;s++){let a=t[n[s]];a&&a.prototype&&tt(a.prototype,Ae(a.prototype),i)}}function Mt(e){e.__load_patch("legacy",t=>{let i=t[e.__symbol__("legacyPatch")];i&&i()}),e.__load_patch("timers",t=>{let i="set",n="clear";Ee(t,i,n,"Timeout"),Ee(t,i,n,"Interval"),Ee(t,i,n,"Immediate")}),e.__load_patch("requestAnimationFrame",t=>{Ee(t,"request","cancel","AnimationFrame"),Ee(t,"mozRequest","mozCancel","AnimationFrame"),Ee(t,"webkitRequest","webkitCancel","AnimationFrame")}),e.__load_patch("blocking",(t,i)=>{let n=["alert","prompt","confirm"];for(let s=0;s<n.length;s++){let a=n[s];fe(t,a,(m,_,y)=>function(N,g){return i.current.run(m,t,g,y)})}}),e.__load_patch("EventTarget",(t,i,n)=>{It(t,n),Dt(t,n);let s=t.XMLHttpRequestEventTarget;s&&s.prototype&&n.patchEventTarget(t,n,[s.prototype])}),e.__load_patch("MutationObserver",(t,i,n)=>{ve("MutationObserver"),ve("WebKitMutationObserver")}),e.__load_patch("IntersectionObserver",(t,i,n)=>{ve("IntersectionObserver")}),e.__load_patch("FileReader",(t,i,n)=>{ve("FileReader")}),e.__load_patch("on_property",(t,i,n)=>{Ot(n,t)}),e.__load_patch("customElements",(t,i,n)=>{Ct(t,n)}),e.__load_patch("XHR",(t,i)=>{N(t);let n=x("xhrTask"),s=x("xhrSync"),a=x("xhrListener"),m=x("xhrScheduled"),_=x("xhrURL"),y=x("xhrErrorBeforeScheduled");function N(g){let P=g.XMLHttpRequest;if(!P)return;let j=P.prototype;function H(R){return R[n]}let G=j[Me],J=j[$e];if(!G){let R=g.XMLHttpRequestEventTarget;if(R){let b=R.prototype;G=b[Me],J=b[$e]}}let K="readystatechange",X="scheduled";function k(R){let b=R.data,C=b.target;C[m]=!1,C[y]=!1;let Q=C[a];G||(G=C[Me],J=C[$e]),Q&&J.call(C,K,Q);let W=C[a]=()=>{if(C.readyState===C.DONE)if(!b.aborted&&C[m]&&R.state===X){let T=C[i.__symbol__("loadfalse")];if(C.status!==0&&T&&T.length>0){let c=R.invoke;R.invoke=function(){let r=C[i.__symbol__("loadfalse")];for(let d=0;d<r.length;d++)r[d]===R&&r.splice(d,1);!b.aborted&&R.state===X&&c.call(R)},T.push(R)}else R.invoke()}else!b.aborted&&C[m]===!1&&(C[y]=!0)};return G.call(C,K,W),C[n]||(C[n]=R),V.apply(C,b.args),C[m]=!0,R}function h(){}function Z(R){let b=R.data;return b.aborted=!0,O.apply(b.target,b.args)}let B=fe(j,"open",()=>function(R,b){return R[s]=b[2]==!1,R[_]=b[1],B.apply(R,b)}),Y="XMLHttpRequest.send",U=x("fetchTaskAborting"),E=x("fetchTaskScheduling"),V=fe(j,"send",()=>function(R,b){if(i.current[E]===!0||R[s])return V.apply(R,b);{let C={target:R,url:R[_],isPeriodic:!1,args:b,aborted:!1},Q=Ue(Y,h,C,k,Z);R&&R[y]===!0&&!C.aborted&&Q.state===X&&Q.invoke()}}),O=fe(j,"abort",()=>function(R,b){let C=H(R);if(C&&typeof C.type=="string"){if(C.cancelFn==null||C.data&&C.data.aborted)return;C.zone.cancelTask(C)}else if(i.current[U]===!0)return O.apply(R,b)})}}),e.__load_patch("geolocation",t=>{t.navigator&&t.navigator.geolocation&&yt(t.navigator.geolocation,["getCurrentPosition","watchPosition"])}),e.__load_patch("PromiseRejectionEvent",(t,i)=>{function n(s){return function(a){ut(t,s).forEach(_=>{let y=t.PromiseRejectionEvent;if(y){let N=new y(s,{promise:a.promise,reason:a.rejection});_.invoke(N)}})}}t.PromiseRejectionEvent&&(i[x("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),i[x("rejectionHandledHandler")]=n("rejectionhandled"))}),e.__load_patch("queueMicrotask",(t,i,n)=>{St(t,n)})}function $t(e){e.__load_patch("ZoneAwarePromise",(t,i,n)=>{let s=Object.getOwnPropertyDescriptor,a=Object.defineProperty;function m(u){if(u&&u.toString===Object.prototype.toString){let l=u.constructor&&u.constructor.name;return(l||"")+": "+JSON.stringify(u)}return u?u.toString():Object.prototype.toString.call(u)}let _=n.symbol,y=[],N=t[_("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,g=_("Promise"),P=_("then"),j="__creationTrace__";n.onUnhandledError=u=>{if(n.showUncaughtError()){let l=u&&u.rejection;l?console.error("Unhandled Promise rejection:",l instanceof Error?l.message:l,"; Zone:",u.zone.name,"; Task:",u.task&&u.task.source,"; Value:",l,l instanceof Error?l.stack:void 0):console.error(u)}},n.microtaskDrainDone=()=>{for(;y.length;){let u=y.shift();try{u.zone.runGuarded(()=>{throw u.throwOriginal?u.rejection:u})}catch(l){G(l)}}};let H=_("unhandledPromiseRejectionHandler");function G(u){n.onUnhandledError(u);try{let l=i[H];typeof l=="function"&&l.call(this,u)}catch{}}function J(u){return u&&u.then}function K(u){return u}function X(u){return S.reject(u)}let k=_("state"),h=_("value"),Z=_("finally"),B=_("parentPromiseValue"),Y=_("parentPromiseState"),U="Promise.then",E=null,V=!0,O=!1,R=0;function b(u,l){return o=>{try{$(u,l,o)}catch(f){$(u,!1,f)}}}let C=function(){let u=!1;return function(o){return function(){u||(u=!0,o.apply(null,arguments))}}},Q="Promise resolved with itself",W=_("currentTaskTrace");function $(u,l,o){let f=C();if(u===o)throw new TypeError(Q);if(u[k]===E){let v=null;try{(typeof o=="object"||typeof o=="function")&&(v=o&&o.then)}catch(w){return f(()=>{$(u,!1,w)})(),u}if(l!==O&&o instanceof S&&o.hasOwnProperty(k)&&o.hasOwnProperty(h)&&o[k]!==E)c(o),$(u,o[k],o[h]);else if(l!==O&&typeof v=="function")try{v.call(o,f(b(u,l)),f(b(u,!1)))}catch(w){f(()=>{$(u,!1,w)})()}else{u[k]=l;let w=u[h];if(u[h]=o,u[Z]===Z&&l===V&&(u[k]=u[Y],u[h]=u[B]),l===O&&o instanceof Error){let p=i.currentTask&&i.currentTask.data&&i.currentTask.data[j];p&&a(o,W,{configurable:!0,enumerable:!1,writable:!0,value:p})}for(let p=0;p<w.length;)r(u,w[p++],w[p++],w[p++],w[p++]);if(w.length==0&&l==O){u[k]=R;let p=o;try{throw new Error("Uncaught (in promise): "+m(o)+(o&&o.stack?`
`+o.stack:""))}catch(M){p=M}N&&(p.throwOriginal=!0),p.rejection=o,p.promise=u,p.zone=i.current,p.task=i.currentTask,y.push(p),n.scheduleMicroTask()}}}return u}let T=_("rejectionHandledHandler");function c(u){if(u[k]===R){try{let l=i[T];l&&typeof l=="function"&&l.call(this,{rejection:u[h],promise:u})}catch{}u[k]=O;for(let l=0;l<y.length;l++)u===y[l].promise&&y.splice(l,1)}}function r(u,l,o,f,v){c(u);let w=u[k],p=w?typeof f=="function"?f:K:typeof v=="function"?v:X;l.scheduleMicroTask(U,()=>{try{let M=u[h],L=!!o&&Z===o[Z];L&&(o[B]=M,o[Y]=w);let A=l.run(p,void 0,L&&p!==X&&p!==K?[]:[M]);$(o,!0,A)}catch(M){$(o,!1,M)}},o)}let d="function ZoneAwarePromise() { [native code] }",D=function(){},I=t.AggregateError;class S{static toString(){return d}static resolve(l){return l instanceof S?l:$(new this(null),V,l)}static reject(l){return $(new this(null),O,l)}static withResolvers(){let l={};return l.promise=new S((o,f)=>{l.resolve=o,l.reject=f}),l}static any(l){if(!l||typeof l[Symbol.iterator]!="function")return Promise.reject(new I([],"All promises were rejected"));let o=[],f=0;try{for(let p of l)f++,o.push(S.resolve(p))}catch{return Promise.reject(new I([],"All promises were rejected"))}if(f===0)return Promise.reject(new I([],"All promises were rejected"));let v=!1,w=[];return new S((p,M)=>{for(let L=0;L<o.length;L++)o[L].then(A=>{v||(v=!0,p(A))},A=>{w.push(A),f--,f===0&&(v=!0,M(new I(w,"All promises were rejected")))})})}static race(l){let o,f,v=new this((M,L)=>{o=M,f=L});function w(M){o(M)}function p(M){f(M)}for(let M of l)J(M)||(M=this.resolve(M)),M.then(w,p);return v}static all(l){return S.allWithCallback(l)}static allSettled(l){return(this&&this.prototype instanceof S?this:S).allWithCallback(l,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(l,o){let f,v,w=new this((A,F)=>{f=A,v=F}),p=2,M=0,L=[];for(let A of l){J(A)||(A=this.resolve(A));let F=M;try{A.then(z=>{L[F]=o?o.thenCallback(z):z,p--,p===0&&f(L)},z=>{o?(L[F]=o.errorCallback(z),p--,p===0&&f(L)):v(z)})}catch(z){v(z)}p++,M++}return p-=2,p===0&&f(L),w}constructor(l){let o=this;if(!(o instanceof S))throw new Error("Must be an instanceof Promise.");o[k]=E,o[h]=[];try{let f=C();l&&l(f(b(o,V)),f(b(o,O)))}catch(f){$(o,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return S}then(l,o){let f=this.constructor?.[Symbol.species];(!f||typeof f!="function")&&(f=this.constructor||S);let v=new f(D),w=i.current;return this[k]==E?this[h].push(w,v,l,o):r(this,w,v,l,o),v}catch(l){return this.then(null,l)}finally(l){let o=this.constructor?.[Symbol.species];(!o||typeof o!="function")&&(o=S);let f=new o(D);f[Z]=Z;let v=i.current;return this[k]==E?this[h].push(v,f,l,l):r(this,v,f,l,l),f}}S.resolve=S.resolve,S.reject=S.reject,S.race=S.race,S.all=S.all;let Te=t[g]=t.Promise;t.Promise=S;let ae=_("thenPatched");function ne(u){let l=u.prototype,o=s(l,"then");if(o&&(o.writable===!1||!o.configurable))return;let f=l.then;l[P]=f,u.prototype.then=function(v,w){return new S((M,L)=>{f.call(this,M,L)}).then(v,w)},u[ae]=!0}n.patchThen=ne;function _e(u){return function(l,o){let f=u.apply(l,o);if(f instanceof S)return f;let v=f.constructor;return v[ae]||ne(v),f}}return Te&&(ne(Te),fe(t,"fetch",u=>_e(u))),Promise[i.__symbol__("uncaughtPromiseErrors")]=y,S})}function Lt(e){e.__load_patch("toString",t=>{let i=Function.prototype.toString,n=x("OriginalDelegate"),s=x("Promise"),a=x("Error"),m=function(){if(typeof this=="function"){let g=this[n];if(g)return typeof g=="function"?i.call(g):Object.prototype.toString.call(g);if(this===Promise){let P=t[s];if(P)return i.call(P)}if(this===Error){let P=t[a];if(P)return i.call(P)}}return i.call(this)};m[n]=i,Function.prototype.toString=m;let _=Object.prototype.toString,y="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?y:_.call(this)}})}function At(e,t,i,n,s){let a=Zone.__symbol__(n);if(t[a])return;let m=t[a]=t[n];t[n]=function(_,y,N){return y&&y.prototype&&s.forEach(function(g){let P=`${i}.${n}::`+g,j=y.prototype;try{if(j.hasOwnProperty(g)){let H=e.ObjectGetOwnPropertyDescriptor(j,g);H&&H.value?(H.value=e.wrapWithCurrentZone(H.value,P),e._redefineProperty(y.prototype,g,H)):j[g]&&(j[g]=e.wrapWithCurrentZone(j[g],P))}else j[g]&&(j[g]=e.wrapWithCurrentZone(j[g],P))}catch{}}),m.call(t,_,y,N)},e.attachOriginToPatched(t[n],m)}function jt(e){e.__load_patch("util",(t,i,n)=>{let s=Ae(t);n.patchOnProperties=st,n.patchMethod=fe,n.bindArguments=Fe,n.patchMacroTask=vt;let a=i.__symbol__("BLACK_LISTED_EVENTS"),m=i.__symbol__("UNPATCHED_EVENTS");t[m]&&(t[a]=t[m]),t[a]&&(i[a]=i[m]=t[a]),n.patchEventPrototype=Nt,n.patchEventTarget=wt,n.isIEOrEdge=Pt,n.ObjectDefineProperty=je,n.ObjectGetOwnPropertyDescriptor=be,n.ObjectCreate=gt,n.ArraySlice=Et,n.patchClass=ve,n.wrapWithCurrentZone=Be,n.filterProperties=ft,n.attachOriginToPatched=he,n._redefineProperty=Object.defineProperty,n.patchCallbacks=At,n.getGlobalObjects=()=>({globalSources:it,zoneSymbolEventNames:te,eventNames:s,isBrowser:ze,isMix:ot,isNode:Ce,TRUE_STR:le,FALSE_STR:ue,ZONE_SYMBOL_PREFIX:Pe,ADD_EVENT_LISTENER_STR:xe,REMOVE_EVENT_LISTENER_STR:He})})}function Zt(e){$t(e),Lt(e),jt(e)}var ht=mt();Zt(ht);Mt(ht);var xt=":";function Ht(e,t){for(let i=1,n=1;i<e.length;i++,n++)if(t[n]==="\\")n++;else if(e[i]===xt)return i;throw new Error(`Unterminated $localize metadata block in "${t}".`)}var De=function(e,...t){if(De.translate){let n=De.translate(e,t);e=n[0],t=n[1]}let i=dt(e[0],e.raw[0]);for(let n=1;n<e.length;n++)i+=t[n-1]+dt(e[n],e.raw[n]);return i},Bt=":";function dt(e,t){return t.charAt(0)===Bt?e.substring(Ht(e,t)+1):e}globalThis.$localize=De;(globalThis.$localize??={}).locale="fr-BE";
