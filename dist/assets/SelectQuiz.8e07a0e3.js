import{t as Oe,_ as M,f as K,c as W,r as o,a as D,e as ta,o as oe,v as na,w as qa,x as y,y as La,b as ra,u as be,z as de,A as je,D as ie,E as pe,G as R,I as Ba,J as Re,K as Aa,M as Be,N as Ta,O as ia,P as oa,h as Ma,Q as qe,R as ja,U as Ha,W as la,X as za,Y as He,Z as sa,$ as ca,a0 as Ka,k as $,l as Ee,V as Ga,H as Ne,B as Fe,a1 as ua,a2 as da,F as Wa,a3 as Va}from"./index.9f88a317.js";function ge(e,a){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(a.indexOf(n)>=0)&&(t[n]=e[n]);return t}function Z(){return Z=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Z.apply(this,arguments)}var Ua=["size","colorScheme","variant","className","spacing","isAttached","isDisabled"],va=Oe({strict:!1,name:"ButtonGroupContext"}),Xa=va[0],Za=va[1],Ya=K(function(e,a){var t=e.size,r=e.colorScheme,n=e.variant,i=e.className,l=e.spacing,s=l===void 0?"0.5rem":l,u=e.isAttached,v=e.isDisabled,c=ge(e,Ua),d=W("chakra-button__group",i),h=o.exports.useMemo(function(){return{size:t,colorScheme:r,variant:n,isDisabled:v}},[t,r,n,v]),f={display:"inline-flex"};return u?f=Z({},f,{"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}}):f=Z({},f,{"& > *:not(style) ~ *:not(style)":{marginStart:s}}),o.exports.createElement(Xa,{value:h},o.exports.createElement(D.div,Z({ref:a,role:"group",__css:f,className:d,"data-attached":u?"":void 0},c)))});M&&(Ya.displayName="ButtonGroup");var Ja=["label","placement","spacing","children","className","__css"],Ae=function(a){var t=a.label,r=a.placement,n=a.spacing,i=n===void 0?"0.5rem":n,l=a.children,s=l===void 0?o.exports.createElement(La,{color:"currentColor",width:"1em",height:"1em"}):l,u=a.className,v=a.__css,c=ge(a,Ja),d=W("chakra-button__spinner",u),h=r==="start"?"marginEnd":"marginStart",f=o.exports.useMemo(function(){var g;return Z((g={display:"flex",alignItems:"center",position:t?"relative":"absolute"},g[h]=t?i:0,g.fontSize="1em",g.lineHeight="normal",g),v)},[v,t,h,i]);return o.exports.createElement(D.div,Z({className:d},c,{__css:f}),s)};M&&(Ae.displayName="ButtonSpinner");var Qa=["children","className"],Te=function(a){var t=a.children,r=a.className,n=ge(a,Qa),i=o.exports.isValidElement(t)?o.exports.cloneElement(t,{"aria-hidden":!0,focusable:!1}):t,l=W("chakra-button__icon",r);return o.exports.createElement(D.span,Z({display:"inline-flex",alignSelf:"center",flexShrink:0},n,{className:l}),i)};M&&(Te.displayName="ButtonIcon");function et(e){var a=o.exports.useState(!e),t=a[0],r=a[1],n=o.exports.useCallback(function(l){!l||r(l.tagName==="BUTTON")},[]),i=t?"button":void 0;return{ref:n,type:i}}var at=["isDisabled","isLoading","isActive","children","leftIcon","rightIcon","loadingText","iconSpacing","type","spinner","spinnerPlacement","className","as"],ze=K(function(e,a){var t=Za(),r=ta("Button",Z({},t,e)),n=oe(e),i=n.isDisabled,l=i===void 0?t==null?void 0:t.isDisabled:i,s=n.isLoading,u=n.isActive,v=n.children,c=n.leftIcon,d=n.rightIcon,h=n.loadingText,f=n.iconSpacing,g=f===void 0?"0.5rem":f,x=n.type,P=n.spinner,C=n.spinnerPlacement,F=C===void 0?"start":C,O=n.className,N=n.as,q=ge(n,at),E=o.exports.useMemo(function(){var _,w=na({},(_=r==null?void 0:r._focus)!=null?_:{},{zIndex:1});return Z({display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none"},r,!!t&&{_focus:w})},[r,t]),m=et(N),k=m.ref,S=m.type,b={rightIcon:d,leftIcon:c,iconSpacing:g,children:v};return o.exports.createElement(D.button,Z({disabled:l||s,ref:qa(a,k),as:N,type:x!=null?x:S,"data-active":y(u),"data-loading":y(s),__css:E,className:W("chakra-button",O)},q),s&&F==="start"&&o.exports.createElement(Ae,{className:"chakra-button__spinner--start",label:h,placement:"start",spacing:g},P),s?h||o.exports.createElement(D.span,{opacity:0},o.exports.createElement(Xe,b)):o.exports.createElement(Xe,b),s&&F==="end"&&o.exports.createElement(Ae,{className:"chakra-button__spinner--end",label:h,placement:"end",spacing:g},P))});M&&(ze.displayName="Button");function Xe(e){var a=e.leftIcon,t=e.rightIcon,r=e.children,n=e.iconSpacing;return o.exports.createElement(o.exports.Fragment,null,a&&o.exports.createElement(Te,{marginEnd:n},a),r,t&&o.exports.createElement(Te,{marginStart:n},t))}var tt=["icon","children","isRound","aria-label"],nt=K(function(e,a){var t=e.icon,r=e.children,n=e.isRound,i=e["aria-label"],l=ge(e,tt),s=t||r,u=o.exports.isValidElement(s)?o.exports.cloneElement(s,{"aria-hidden":!0,focusable:!1}):null;return o.exports.createElement(ze,Z({padding:"0",borderRadius:n?"full":void 0,ref:a,"aria-label":i},l),u)});M&&(nt.displayName="IconButton");function T(){return T=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},T.apply(this,arguments)}function xe(e,a){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(a.indexOf(n)>=0)&&(t[n]=e[n]);return t}var rt=["id","isRequired","isInvalid","isDisabled","isReadOnly"],it=["getRootProps","htmlProps"],ha=ra("FormControl"),ot=ha[0],fa=ha[1],lt=fa,ma=Oe({strict:!1,name:"FormControlContext"}),st=ma[0],le=ma[1];function ct(e){var a=e.id,t=e.isRequired,r=e.isInvalid,n=e.isDisabled,i=e.isReadOnly,l=xe(e,rt),s=je(),u=a||"field-"+s,v=u+"-label",c=u+"-feedback",d=u+"-helptext",h=o.exports.useState(!1),f=h[0],g=h[1],x=o.exports.useState(!1),P=x[0],C=x[1],F=ie(),O=F[0],N=F[1],q=o.exports.useCallback(function(b,_){return b===void 0&&(b={}),_===void 0&&(_=null),T({id:d},b,{ref:pe(_,function(w){!w||C(!0)})})},[d]),E=o.exports.useCallback(function(b,_){var w,V;return b===void 0&&(b={}),_===void 0&&(_=null),T({},b,{ref:_,"data-focus":y(O),"data-disabled":y(n),"data-invalid":y(r),"data-readonly":y(i),id:(w=b.id)!=null?w:v,htmlFor:(V=b.htmlFor)!=null?V:u})},[u,n,O,r,i,v]),m=o.exports.useCallback(function(b,_){return b===void 0&&(b={}),_===void 0&&(_=null),T({id:c},b,{ref:pe(_,function(w){!w||g(!0)}),"aria-live":"polite"})},[c]),k=o.exports.useCallback(function(b,_){return b===void 0&&(b={}),_===void 0&&(_=null),T({},b,l,{ref:_,role:"group"})},[l]),S=o.exports.useCallback(function(b,_){return b===void 0&&(b={}),_===void 0&&(_=null),T({},b,{ref:_,role:"presentation","aria-hidden":!0,children:b.children||"*"})},[]);return{isRequired:!!t,isInvalid:!!r,isReadOnly:!!i,isDisabled:!!n,isFocused:!!O,onFocus:N.on,onBlur:N.off,hasFeedbackText:f,setHasFeedbackText:g,hasHelpText:P,setHasHelpText:C,id:u,labelId:v,feedbackId:c,helpTextId:d,htmlProps:l,getHelpTextProps:q,getErrorMessageProps:m,getRootProps:k,getLabelProps:E,getRequiredIndicatorProps:S}}var pa=K(function(e,a){var t=be("Form",e),r=oe(e),n=ct(r),i=n.getRootProps;n.htmlProps;var l=xe(n,it),s=W("chakra-form-control",e.className);return o.exports.createElement(st,{value:l},o.exports.createElement(ot,{value:t},o.exports.createElement(D.div,T({},i({},a),{className:s,__css:t.container}))))});M&&(pa.displayName="FormControl");var ut=K(function(e,a){var t=le(),r=fa(),n=W("chakra-form__helper-text",e.className);return o.exports.createElement(D.div,T({},t==null?void 0:t.getHelpTextProps(e,a),{__css:r.helperText,className:n}))});M&&(ut.displayName="FormHelperText");var dt=["isDisabled","isInvalid","isReadOnly","isRequired"],vt=["id","disabled","readOnly","required","isRequired","isInvalid","isReadOnly","isDisabled","onFocus","onBlur"];function ht(e){var a=ba(e),t=a.isDisabled,r=a.isInvalid,n=a.isReadOnly,i=a.isRequired,l=xe(a,dt);return T({},l,{disabled:t,readOnly:n,required:i,"aria-invalid":de(r),"aria-required":de(i),"aria-readonly":de(n)})}function ba(e){var a,t,r,n=le(),i=e.id,l=e.disabled,s=e.readOnly,u=e.required,v=e.isRequired,c=e.isInvalid,d=e.isReadOnly,h=e.isDisabled,f=e.onFocus,g=e.onBlur,x=xe(e,vt),P=e["aria-describedby"]?[e["aria-describedby"]]:[];return n!=null&&n.hasFeedbackText&&n!=null&&n.isInvalid&&P.push(n.feedbackId),n!=null&&n.hasHelpText&&P.push(n.helpTextId),T({},x,{"aria-describedby":P.join(" ")||void 0,id:i!=null?i:n==null?void 0:n.id,isDisabled:(a=l!=null?l:h)!=null?a:n==null?void 0:n.isDisabled,isReadOnly:(t=s!=null?s:d)!=null?t:n==null?void 0:n.isReadOnly,isRequired:(r=u!=null?u:v)!=null?r:n==null?void 0:n.isRequired,isInvalid:c!=null?c:n==null?void 0:n.isInvalid,onFocus:R(n==null?void 0:n.onFocus,f),onBlur:R(n==null?void 0:n.onBlur,g)})}var ga=ra("FormError"),ft=ga[0],mt=ga[1],pt=K(function(e,a){var t=be("FormError",e),r=oe(e),n=le();return n!=null&&n.isInvalid?o.exports.createElement(ft,{value:t},o.exports.createElement(D.div,T({},n==null?void 0:n.getErrorMessageProps(r,a),{className:W("chakra-form__error-message",e.className),__css:T({display:"flex",alignItems:"center"},t.text)}))):null});M&&(pt.displayName="FormErrorMessage");var bt=K(function(e,a){var t=mt(),r=le();if(!(r!=null&&r.isInvalid))return null;var n=W("chakra-form__error-icon",e.className);return o.exports.createElement(Ba,T({ref:a,"aria-hidden":!0},e,{__css:t.icon,className:n}),o.exports.createElement("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"}))});M&&(bt.displayName="FormErrorIcon");var gt=["className","children","requiredIndicator","optionalIndicator"],xt=K(function(e,a){var t,r=ta("FormLabel",e),n=oe(e);n.className;var i=n.children,l=n.requiredIndicator,s=l===void 0?o.exports.createElement(xa,null):l,u=n.optionalIndicator,v=u===void 0?null:u,c=xe(n,gt),d=le(),h=(t=d==null?void 0:d.getLabelProps(c,a))!=null?t:T({ref:a},c);return o.exports.createElement(D.label,T({},h,{className:W("chakra-form__label",n.className),__css:T({display:"block",textAlign:"start"},r)}),i,d!=null&&d.isRequired?s:v)});M&&(xt.displayName="FormLabel");var xa=K(function(e,a){var t=le(),r=lt();if(!(t!=null&&t.isRequired))return null;var n=W("chakra-form__required-indicator",e.className);return o.exports.createElement(D.span,T({},t==null?void 0:t.getRequiredIndicatorProps(e,a),{__css:r.requiredIndicator,className:n}))});M&&(xa.displayName="RequiredIndicator");var Ze=!1,we=null,ve=!1,Me=new Set,yt=typeof window!="undefined"&&window.navigator!=null?/^Mac/.test(window.navigator.platform):!1;function Ct(e){return!(e.metaKey||!yt&&e.altKey||e.ctrlKey)}function Ke(e,a){Me.forEach(t=>t(e,a))}function Ye(e){ve=!0,Ct(e)&&(we="keyboard",Ke("keyboard",e))}function ue(e){we="pointer",(e.type==="mousedown"||e.type==="pointerdown")&&(ve=!0,Ke("pointer",e))}function _t(e){e.target===window||e.target===document||(ve||(we="keyboard",Ke("keyboard",e)),ve=!1)}function kt(){ve=!1}function Je(){return we!=="pointer"}function Pt(){if(typeof window=="undefined"||Ze)return;const{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){ve=!0,e.apply(this,t)},document.addEventListener("keydown",Ye,!0),document.addEventListener("keyup",Ye,!0),window.addEventListener("focus",_t,!0),window.addEventListener("blur",kt,!1),typeof PointerEvent!="undefined"?(document.addEventListener("pointerdown",ue,!0),document.addEventListener("pointermove",ue,!0),document.addEventListener("pointerup",ue,!0)):(document.addEventListener("mousedown",ue,!0),document.addEventListener("mousemove",ue,!0),document.addEventListener("mouseup",ue,!0)),Ze=!0}function It(e){Pt(),e(Je());const a=()=>e(Je());return Me.add(a),()=>{Me.delete(a)}}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},j.apply(this,arguments)}function St(e){e===void 0&&(e={});var a=e,t=a.defaultValue,r=a.value,n=a.onChange,i=a.isDisabled,l=a.isNative,s=Re(n),u=Aa({value:r,defaultValue:t||[],onChange:s}),v=u[0],c=u[1],d=o.exports.useCallback(function(f){if(!!v){var g=Be(f)?f.target.checked:!v.includes(f),x=Be(f)?f.target.value:f,P=g?Ta(v,x):v.filter(function(C){return String(C)!==String(x)});c(P)}},[c,v]),h=o.exports.useCallback(function(f){var g;f===void 0&&(f={});var x=l?"checked":"isChecked";return j({},f,(g={},g[x]=v.some(function(P){return String(f.value)===String(P)}),g.onChange=d,g))},[d,l,v]);return{value:v,isDisabled:i,onChange:d,setValue:c,getCheckboxProps:h}}var ya=Oe({name:"CheckboxGroupContext",strict:!1}),Et=ya[0],Nt=ya[1],Rt=function(a){var t=a.colorScheme,r=a.size,n=a.variant,i=a.children,l=a.isDisabled,s=St(a),u=s.value,v=s.onChange,c=o.exports.useMemo(function(){return{size:r,onChange:v,colorScheme:t,value:u,variant:n,isDisabled:l}},[r,v,t,u,n,l]);return o.exports.createElement(Et,{value:c},i)};M&&(Rt.displayName="CheckboxGroup");function Ge(e,a){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(a.indexOf(n)>=0)&&(t[n]=e[n]);return t}var Ft=["isIndeterminate","isChecked"];function Dt(e){var a=oa;return"custom"in a&&typeof a.custom=="function"?a.custom(e):a(e)}var Ca=Dt(D.svg),Ot=function(a){return o.exports.createElement(Ca,j({width:"1.2em",viewBox:"0 0 12 10",variants:{unchecked:{opacity:0,strokeDashoffset:16},checked:{opacity:1,strokeDashoffset:0,transition:{duration:.2}}},style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16}},a),o.exports.createElement("polyline",{points:"1.5 6 4.5 9 10.5 1"}))},wt=function(a){return o.exports.createElement(Ca,j({width:"1.2em",viewBox:"0 0 24 24",variants:{unchecked:{scaleX:.65,opacity:0},checked:{scaleX:1,opacity:1,transition:{scaleX:{duration:0},opacity:{duration:.02}}}},style:{stroke:"currentColor",strokeWidth:4}},a),o.exports.createElement("line",{x1:"21",x2:"3",y1:"12",y2:"12"}))},$t=function(a){var t=a.open,r=a.children;return o.exports.createElement(za,{initial:!1},t&&o.exports.createElement(oa.div,{variants:{unchecked:{scale:.5},checked:{scale:1}},initial:"unchecked",animate:"checked",exit:"unchecked",style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}},r))},qt=function(a){var t=a.isIndeterminate,r=a.isChecked,n=Ge(a,Ft),i=t?wt:Ot;return o.exports.createElement($t,{open:r||t},o.exports.createElement(i,n))},Lt=["defaultChecked","isChecked","isFocusable","onChange","isIndeterminate","name","value","tabIndex","aria-label","aria-labelledby","aria-invalid"];function Bt(e){e===void 0&&(e={});var a=ba(e),t=a.isDisabled,r=a.isReadOnly,n=a.isRequired,i=a.isInvalid,l=a.id,s=a.onBlur,u=a.onFocus,v=a["aria-describedby"],c=e,d=c.defaultChecked,h=c.isChecked,f=c.isFocusable,g=c.onChange,x=c.isIndeterminate,P=c.name,C=c.value,F=c.tabIndex,O=F===void 0?void 0:F,N=c["aria-label"],q=c["aria-labelledby"],E=c["aria-invalid"],m=Ge(c,Lt),k=Ma(m,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),S=Re(g),b=Re(s),_=Re(u),w=o.exports.useState(!1),V=w[0],te=w[1],J=ie(),Q=J[0],U=J[1],G=ie(),ee=G[0],se=G[1],ye=ie(),ce=ye[0],Y=ye[1];o.exports.useEffect(function(){return It(te)},[]);var L=o.exports.useRef(null),he=o.exports.useState(!0),fe=he[0],Ce=he[1],_e=o.exports.useState(!!d),ke=_e[0],ne=_e[1],me=He(h,ke),Pe=me[0],z=me[1],Ie=o.exports.useCallback(function(p){if(r||t){p.preventDefault();return}Pe||ne(z?p.target.checked:x?!0:p.target.checked),S==null||S(p)},[r,t,z,Pe,x,S]);qe(function(){L.current&&(L.current.indeterminate=Boolean(x))},[x]),ja(function(){t&&U.off()},[t,U]),qe(function(){var p=L.current;!(p!=null&&p.form)||(p.form.onreset=function(){ne(!!d)})},[]);var Se=t&&!f,I=o.exports.useCallback(function(p){p.key===" "&&Y.on()},[Y]),B=o.exports.useCallback(function(p){p.key===" "&&Y.off()},[Y]);qe(function(){if(!!L.current){var p=L.current.checked!==z;p&&ne(L.current.checked)}},[L.current]);var X=o.exports.useCallback(function(p,H){p===void 0&&(p={}),H===void 0&&(H=null);var re=function($a){$a.preventDefault(),Y.on()};return j({},p,{ref:H,"data-active":y(ce),"data-hover":y(ee),"data-checked":y(z),"data-focus":y(Q),"data-focus-visible":y(Q&&V),"data-indeterminate":y(x),"data-disabled":y(t),"data-invalid":y(i),"data-readonly":y(r),"aria-hidden":!0,onMouseDown:R(p.onMouseDown,re),onMouseUp:R(p.onMouseUp,Y.off),onMouseEnter:R(p.onMouseEnter,se.on),onMouseLeave:R(p.onMouseLeave,se.off)})},[ce,z,t,Q,V,ee,x,i,r,Y,se.off,se.on]),Fa=o.exports.useCallback(function(p,H){return p===void 0&&(p={}),H===void 0&&(H=null),j({},k,p,{ref:pe(H,function(re){!re||Ce(re.tagName==="LABEL")}),onClick:R(p.onClick,function(){if(!fe){var re;(re=L.current)==null||re.click(),Ha(L.current,{nextTick:!0})}}),"data-disabled":y(t),"data-checked":y(z),"data-invalid":y(i)})},[k,t,z,i,fe]),Da=o.exports.useCallback(function(p,H){return p===void 0&&(p={}),H===void 0&&(H=null),j({},p,{ref:pe(L,H),type:"checkbox",name:P,value:C,id:l,tabIndex:O,onChange:R(p.onChange,Ie),onBlur:R(p.onBlur,b,U.off),onFocus:R(p.onFocus,_,U.on),onKeyDown:R(p.onKeyDown,I),onKeyUp:R(p.onKeyUp,B),required:n,checked:z,disabled:Se,readOnly:r,"aria-label":N,"aria-labelledby":q,"aria-invalid":E?Boolean(E):i,"aria-describedby":v,"aria-disabled":t,style:la})},[P,C,l,Ie,U.off,U.on,b,_,I,B,n,z,Se,r,N,q,E,i,v,t,O]),Oa=o.exports.useCallback(function(p,H){return p===void 0&&(p={}),H===void 0&&(H=null),j({},p,{ref:H,onMouseDown:R(p.onMouseDown,Qe),onTouchStart:R(p.onTouchStart,Qe),"data-disabled":y(t),"data-checked":y(z),"data-invalid":y(i)})},[z,t,i]),wa={isInvalid:i,isFocused:Q,isChecked:z,isActive:ce,isHovered:ee,isIndeterminate:x,isDisabled:t,isReadOnly:r,isRequired:n};return{state:wa,getRootProps:Fa,getCheckboxProps:X,getInputProps:Da,getLabelProps:Oa,htmlProps:k}}function Qe(e){e.preventDefault(),e.stopPropagation()}var At=["spacing","className","children","iconColor","iconSize","icon","isChecked","isDisabled","onChange","inputProps"],Tt=D("span",{baseStyle:{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0}}),Mt=D("label",{baseStyle:{cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative"}}),_a=K(function(e,a){var t=Nt(),r=j({},t,e),n=be("Checkbox",r),i=oe(e),l=i.spacing,s=l===void 0?"0.5rem":l,u=i.className,v=i.children,c=i.iconColor,d=i.iconSize,h=i.icon,f=h===void 0?o.exports.createElement(qt,null):h,g=i.isChecked,x=i.isDisabled,P=x===void 0?t==null?void 0:t.isDisabled:x,C=i.onChange,F=i.inputProps,O=Ge(i,At),N=g;t!=null&&t.value&&i.value&&(N=t.value.includes(i.value));var q=C;t!=null&&t.onChange&&i.value&&(q=ia(t.onChange,C));var E=Bt(j({},O,{isDisabled:P,isChecked:N,onChange:q})),m=E.state,k=E.getInputProps,S=E.getCheckboxProps,b=E.getLabelProps,_=E.getRootProps,w=o.exports.useMemo(function(){return j({opacity:m.isChecked||m.isIndeterminate?1:0,transform:m.isChecked||m.isIndeterminate?"scale(1)":"scale(0.95)",fontSize:d,color:c},n.icon)},[c,d,m.isChecked,m.isIndeterminate,n.icon]),V=o.exports.cloneElement(f,{__css:w,isIndeterminate:m.isIndeterminate,isChecked:m.isChecked});return o.exports.createElement(Mt,j({__css:n.container,className:W("chakra-checkbox",u)},_()),o.exports.createElement("input",j({className:"chakra-checkbox__input"},k(F,a))),o.exports.createElement(Tt,j({__css:n.control,className:"chakra-checkbox__control"},S()),V),v&&o.exports.createElement(D.span,j({className:"chakra-checkbox__label"},b(),{__css:j({marginStart:s},n.label)}),v))});M&&(_a.displayName="Checkbox");function $e(e,a){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(a.indexOf(n)>=0)&&(t[n]=e[n]);return t}function A(){return A=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},A.apply(this,arguments)}var jt=["onChange","value","defaultValue","name","isDisabled","isFocusable","isNative"];function Ht(e){e===void 0&&(e={});var a=e,t=a.onChange,r=a.value,n=a.defaultValue,i=a.name,l=a.isDisabled,s=a.isFocusable,u=a.isNative,v=$e(a,jt),c=o.exports.useState(n||""),d=c[0],h=c[1],f=He(r,d),g=f[0],x=f[1],P=o.exports.useRef(null),C=o.exports.useCallback(function(){var m=P.current;if(!!m){var k="input:not(:disabled):checked",S=m.querySelector(k);if(S){S.focus();return}k="input:not(:disabled)";var b=m.querySelector(k);b==null||b.focus()}},[]),F=je(void 0,"radio"),O=i||F,N=o.exports.useCallback(function(m){var k=Be(m)?m.target.value:m;g||h(k),t==null||t(String(k))},[t,g]),q=o.exports.useCallback(function(m,k){return m===void 0&&(m={}),k===void 0&&(k=null),A({},m,{ref:pe(k,P),role:"radiogroup"})},[]),E=o.exports.useCallback(function(m,k){var S;m===void 0&&(m={}),k===void 0&&(k=null);var b=u?"checked":"isChecked";return A({},m,(S={ref:k,name:O},S[b]=x!=null?m.value===x:void 0,S.onChange=N,S["data-radiogroup"]=!0,S))},[u,O,N,x]);return{getRootProps:q,getRadioProps:E,name:O,ref:P,focus:C,setValue:h,value:x,onChange:N,isDisabled:l,isFocusable:s,htmlProps:v}}var zt=["colorScheme","size","variant","children","className","isDisabled","isFocusable"],ka=Oe({name:"RadioGroupContext",strict:!1}),Kt=ka[0],Pa=ka[1],Ia=K(function(e,a){var t=e.colorScheme,r=e.size,n=e.variant,i=e.children,l=e.className,s=e.isDisabled,u=e.isFocusable,v=$e(e,zt),c=Ht(v),d=c.value,h=c.onChange,f=c.getRootProps,g=c.name,x=c.htmlProps,P=o.exports.useMemo(function(){return{name:g,size:r,onChange:h,colorScheme:t,value:d,variant:n,isDisabled:s,isFocusable:u}},[g,r,h,t,d,n,s,u]),C=f(x,a),F=W("chakra-radio-group",l);return o.exports.createElement(Kt,{value:P},o.exports.createElement(D.div,A({},C,{className:F}),i))});M&&(Ia.displayName="RadioGroup");var Gt=["defaultChecked","isChecked","isFocusable","isDisabled","isReadOnly","isRequired","onChange","isInvalid","name","value","id","data-radiogroup","aria-describedby"];function Wt(e){e===void 0&&(e={});var a=e,t=a.defaultChecked,r=a.isChecked,n=a.isFocusable,i=a.isDisabled,l=a.isReadOnly,s=a.isRequired,u=a.onChange,v=a.isInvalid,c=a.name,d=a.value,h=a.id,f=a["data-radiogroup"],g=a["aria-describedby"],x=$e(a,Gt),P=je(void 0,"radio"),C=le(),F=Pa(),O=!!F||!!f,N=!!C,q=N&&!O?C.id:P;q=h!=null?h:q;var E=i!=null?i:C==null?void 0:C.isDisabled,m=l!=null?l:C==null?void 0:C.isReadOnly,k=s!=null?s:C==null?void 0:C.isRequired,S=v!=null?v:C==null?void 0:C.isInvalid,b=ie(),_=b[0],w=b[1],V=ie(),te=V[0],J=V[1],Q=ie(),U=Q[0],G=Q[1],ee=o.exports.useState(Boolean(t)),se=ee[0],ye=ee[1],ce=He(r,se),Y=ce[0],L=ce[1],he=o.exports.useCallback(function(I){if(m||E){I.preventDefault();return}Y||ye(I.target.checked),u==null||u(I)},[Y,E,m,u]),fe=o.exports.useCallback(function(I){I.key===" "&&G.on()},[G]),Ce=o.exports.useCallback(function(I){I.key===" "&&G.off()},[G]),_e=o.exports.useCallback(function(I,B){return I===void 0&&(I={}),B===void 0&&(B=null),A({},I,{ref:B,"data-active":y(U),"data-hover":y(te),"data-disabled":y(E),"data-invalid":y(S),"data-checked":y(L),"data-focus":y(_),"data-readonly":y(m),"aria-hidden":!0,onMouseDown:R(I.onMouseDown,G.on),onMouseUp:R(I.onMouseUp,G.off),onMouseEnter:R(I.onMouseEnter,J.on),onMouseLeave:R(I.onMouseLeave,J.off)})},[U,te,E,S,L,_,m,G.on,G.off,J.on,J.off]),ke=C!=null?C:{},ne=ke.onFocus,me=ke.onBlur,Pe=o.exports.useCallback(function(I,B){I===void 0&&(I={}),B===void 0&&(B=null);var X=E&&!n;return A({},I,{id:q,ref:B,type:"radio",name:c,value:d,onChange:R(I.onChange,he),onBlur:R(me,I.onBlur,w.off),onFocus:R(ne,I.onFocus,w.on),onKeyDown:R(I.onKeyDown,fe),onKeyUp:R(I.onKeyUp,Ce),checked:L,disabled:X,readOnly:m,required:k,"aria-invalid":de(S),"aria-disabled":de(X),"aria-required":de(k),"data-readonly":y(m),"aria-describedby":g,style:la})},[E,n,q,c,d,he,me,w,ne,fe,Ce,L,m,k,S,g]),z=function(B,X){return B===void 0&&(B={}),X===void 0&&(X=null),A({},B,{ref:X,onMouseDown:R(B.onMouseDown,ea),onTouchStart:R(B.onTouchStart,ea),"data-disabled":y(E),"data-checked":y(L),"data-invalid":y(S)})},Ie=function(B,X){return X===void 0&&(X=null),A({},B,{ref:X,"data-disabled":y(E),"data-checked":y(L),"data-invalid":y(S)})},Se={isInvalid:S,isFocused:_,isChecked:L,isActive:U,isHovered:te,isDisabled:E,isReadOnly:m,isRequired:k};return{state:Se,getCheckboxProps:_e,getInputProps:Pe,getLabelProps:z,getRootProps:Ie,htmlProps:x}}function ea(e){e.preventDefault(),e.stopPropagation()}var Vt=["spacing","children","isDisabled","isFocusable","inputProps"],Sa=K(function(e,a){var t,r=Pa(),n=e.onChange,i=e.value,l=be("Radio",A({},r,e)),s=oe(e),u=s.spacing,v=u===void 0?"0.5rem":u,c=s.children,d=s.isDisabled,h=d===void 0?r==null?void 0:r.isDisabled:d,f=s.isFocusable,g=f===void 0?r==null?void 0:r.isFocusable:f,x=s.inputProps,P=$e(s,Vt),C=e.isChecked;(r==null?void 0:r.value)!=null&&i!=null&&(C=r.value===i);var F=n;r!=null&&r.onChange&&i!=null&&(F=ia(r.onChange,n));var O=(t=e==null?void 0:e.name)!=null?t:r==null?void 0:r.name,N=Wt(A({},P,{isChecked:C,isFocusable:g,isDisabled:h,onChange:F,name:O})),q=N.getInputProps,E=N.getCheckboxProps,m=N.getLabelProps,k=N.getRootProps,S=N.htmlProps,b=sa(S,ca),_=b[0],w=b[1],V=E(w),te=q(x,a),J=m(),Q=Object.assign({},_,k()),U=A({display:"inline-flex",alignItems:"center",verticalAlign:"top",cursor:"pointer",position:"relative"},l.container),G=A({display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},l.control),ee=A({userSelect:"none",marginStart:v},l.label);return o.exports.createElement(D.label,A({className:"chakra-radio"},Q,{__css:U}),o.exports.createElement("input",A({className:"chakra-radio__input"},te)),o.exports.createElement(D.span,A({className:"chakra-radio__control"},V,{__css:G})),c&&o.exports.createElement(D.span,A({className:"chakra-radio__label"},J,{__css:ee}),c))});M&&(Sa.displayName="Radio");function ae(){return ae=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},ae.apply(this,arguments)}function We(e,a){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(a.indexOf(n)>=0)&&(t[n]=e[n]);return t}var Ut=["children","placeholder","className"],Xt=["rootProps","placeholder","icon","color","height","h","minH","minHeight","iconColor","iconSize"],Zt=["children"],Ea=K(function(e,a){var t=e.children,r=e.placeholder,n=e.className,i=We(e,Ut);return o.exports.createElement(D.select,ae({},i,{ref:a,className:W("chakra-select",n)}),r&&o.exports.createElement("option",{value:""},r),t)});M&&(Ea.displayName="SelectField");var Na=K(function(e,a){var t=be("Select",e),r=oe(e),n=r.rootProps,i=r.placeholder,l=r.icon,s=r.color,u=r.height,v=r.h,c=r.minH,d=r.minHeight,h=r.iconColor,f=r.iconSize,g=We(r,Xt),x=sa(g,ca),P=x[0],C=x[1],F=ht(C),O={width:"100%",height:"fit-content",position:"relative",color:s},N=na({paddingEnd:"2rem"},t.field,{_focus:{zIndex:"unset"}});return o.exports.createElement(D.div,ae({className:"chakra-select__wrapper",__css:O},P,n),o.exports.createElement(Ea,ae({ref:a,height:v!=null?v:u,minH:c!=null?c:d,placeholder:i},F,{__css:N}),e.children),o.exports.createElement(Ra,ae({"data-disabled":y(F.disabled)},(h||s)&&{color:h||s},{__css:t.icon},f&&{fontSize:f}),l))});M&&(Na.displayName="Select");var Yt=function(a){return o.exports.createElement("svg",ae({viewBox:"0 0 24 24"},a),o.exports.createElement("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}))},Jt=D("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),Ra=function(a){var t=a.children,r=t===void 0?o.exports.createElement(Yt,null):t,n=We(a,Zt),i=o.exports.cloneElement(r,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return o.exports.createElement(Jt,ae({},n,{className:"chakra-select__icon-wrapper"}),o.exports.isValidElement(r)?i:null)};M&&(Ra.displayName="SelectIcon");var Le=[{filename:"siecitel.json",name:"Sieci telekomunikacyjne",urlName:"1"}],De=(e=>(e.OPEN_SHORT="Short open question",e.OPEN_LONG="Long open question",e.MULTI="Multiple choice question",e.ONE_CHOICE="Single choice question",e))(De||{}),Ve=(e=>(e.RANDOM_ORDER="Random order of the questions",e.SAVE_IN_LS="Save current progress in the local storage",e.RUN_ALL="Display all question once and show ending message at the end",e.ALLOW_PARTIAL_CORRECT="Allow partial correctness",e.CHECK_OPEN="Check correctness of open type questions",e.ALLOW_SKIP="Allow skipping questions",e.TIMER="Show quiz timer",e))(Ve||{}),Ue=(e=>(e.FIVE="5",e.FIFTEEN="15",e.TWENTY="20",e.ALL="All",e))(Ue||{});const aa=({options:e,chosenOptions:a,setChosenOptions:t})=>{const r=n=>{const i=n.target.value.toString(),l=n.target.checked;if(a.includes(i)&&!l){const s=[...a];s.splice(s.indexOf(i),1),t(s)}else if(!a.includes(i)&&l){const s=[...a];s.push(i),t(s)}};return $(ua,{mt:"15px",mx:"30px",spacing:"13px",children:e.map((n,i)=>$(da,{children:$(_a,{value:i,onChange:r,isChecked:a.includes(i.toString()),children:$(Fe,{color:"whiteAlpha.800",children:n})})},i))})},Qt=e=>{const a=Ka(),[t,r]=o.exports.useState([]),[n,i]=o.exports.useState(Object.values(De).map((d,h)=>h.toString())),[l,s]=o.exports.useState(""),[u,v]=o.exports.useState("All");document.title="Configure quiz";const c=d=>{const h={conf:t,qtype:n};console.log(n),u!=="All"&&(h.amount=u),a({pathname:`/quizes/${l}`,search:Va(h).toString()})};return $(pa,{onSubmit:c,children:Ee(Ga,{mx:"30px",spacing:7,ml:"auto",mr:"auto",children:[$(Ne,{size:"lg",textColor:"whiteAlpha.600",children:"Create your quiz"}),$(Na,{bgColor:"whiteAlpha.800",size:"lg",placeholder:"Choose available quiz",maxW:"min(80%, 500px)",onChange:d=>s(d.target.value),children:Le==null?void 0:Le.map((d,h)=>$("option",{value:d.urlName,children:d.name},h))}),Ee(Fe,{width:"80%",children:[$(Ne,{textColor:"whiteAlpha.600",size:"md",children:"Configure quiz"}),$(aa,{options:Object.values(Ve),setChosenOptions:r,chosenOptions:t})]}),Ee(Fe,{width:"80%",children:[$(Ne,{textColor:"whiteAlpha.600",size:"md",children:"Show question types"}),$(aa,{options:Object.values(De),setChosenOptions:i,chosenOptions:n})]}),Ee(Fe,{width:"80%",children:[$(Ne,{textColor:"whiteAlpha.600",size:"md",children:"Select numer of questions"}),$(Ia,{width:"100%",onChange:v,defaultValue:u,children:$(ua,{mt:"15px",mx:"30px",spacing:"13px",children:Object.values(Ue).map((d,h)=>$(da,{children:$(Wa,{as:"label",color:"whiteAlpha.800",children:$(Sa,{value:d,children:d})})},h))})})]}),$(ze,{disabled:!l,onClick:c,size:"lg",children:"Generate quiz!"})]})})};var tn=Object.freeze(Object.defineProperty({__proto__:null,QuestionTypes:De,QuizOptions:Ve,QuizQuestionAmounts:Ue,default:Qt},Symbol.toStringTag,{value:"Module"}));export{ze as B,Rt as C,Ve as Q,Ia as R,tn as S,_a as a,Sa as b,De as c,Ue as d,Le as q,ht as u};
