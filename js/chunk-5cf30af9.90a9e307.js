(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cf30af9"],{"0cb2":function(e,t,n){var r=n("e330"),a=n("7b0b"),o=Math.floor,c=r("".charAt),i=r("".replace),s=r("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,l=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,n,r,d,f){var p=n+e.length,v=r.length,h=l;return void 0!==d&&(d=a(d),h=u),i(f,h,(function(a,i){var u;switch(c(i,0)){case"$":return"$";case"&":return e;case"`":return s(t,0,n);case"'":return s(t,p);case"<":u=d[s(i,1,-1)];break;default:var l=+i;if(0===l)return a;if(l>v){var f=o(l/10);return 0===f?a:f<=v?void 0===r[f-1]?c(i,1):r[f-1]+c(i,1):a}u=r[l-1]}return void 0===u?"":u}))}},"107c":function(e,t,n){var r=n("d039"),a=n("da84"),o=a.RegExp;e.exports=r((function(){var e=o("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},"14c3":function(e,t,n){var r=n("da84"),a=n("c65b"),o=n("825a"),c=n("1626"),i=n("c6b6"),s=n("9263"),u=r.TypeError;e.exports=function(e,t){var n=e.exec;if(c(n)){var r=a(n,e,t);return null!==r&&o(r),r}if("RegExp"===i(e))return a(s,e,t);throw u("RegExp#exec called on incompatible receiver")}},"3bea":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a=function(e){return Object(r["pushScopeId"])("data-v-35f9dc67"),e=e(),Object(r["popScopeId"])(),e},o={class:"container"},c={class:"row justify-content-center"},i=a((function(){return Object(r["createElementVNode"])("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1)})),s={class:"col-8"},u={class:"form-floating mb-3"},l=a((function(){return Object(r["createElementVNode"])("label",{for:"username"},"Email address",-1)})),d={class:"form-floating"},f=a((function(){return Object(r["createElementVNode"])("label",{for:"password"},"Password",-1)})),p=a((function(){return Object(r["createElementVNode"])("button",{class:"btn btn-lg btn-primary w-100 mt-3"}," 登入 ",-1)})),v=a((function(){return Object(r["createElementVNode"])("p",{class:"mt-5 mb-3 text-muted"},"© 2021~∞ - 六角學院",-1)}));function h(e,t,n,a,h,x){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",o,[Object(r["createElementVNode"])("div",c,[i,Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("form",{id:"form",class:"form-signin",onSubmit:t[2]||(t[2]=Object(r["withModifiers"])((function(){return x.login&&x.login.apply(x,arguments)}),["prevent"]))},[Object(r["createElementVNode"])("div",u,[Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{"onUpdate:modelValue":t[0]||(t[0]=function(e){return h.email=e}),type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[r["vModelText"],h.email,void 0,{lazy:!0}]]),l]),Object(r["createElementVNode"])("div",d,[Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return h.password=e}),type:"password",class:"form-control",id:"password",placeholder:"Password",required:""},null,512),[[r["vModelText"],h.password,void 0,{lazy:!0}]]),f]),p],32)])]),v])}n("99af"),n("ac1f"),n("5319");var x=n("3d20"),g=n.n(x),m={data:function(){return{apiUrl:"https://vue3-course-api.hexschool.io/v2",apiPath:"https://vue3-course-api.hexschool.io/v2",email:"",password:""}},methods:{login:function(){var e=this;this.email&&this.password?this.axios.post("".concat(this.apiUrl,"/admin/signin"),{username:this.email,password:this.password}).then((function(t){e.getToken(t.data),e.enterProductsPage()})).catch((function(t){console.log(t.response),g.a.fire(t.response.data.message),e.email="",e.password=""})):g.a.fire("請輸入帳號密碼")},getToken:function(e){var t=e.token,n=e.expired;document.cookie="hextoken=".concat(t,"; expired=").concat(new Date(n),"; path=/;")},checkUser:function(){var e=this,t=document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=t,this.axios.post("".concat(this.apiUrl,"/api/user/check")).then((function(){e.enterProductsPage()})).catch((function(e){console.log(e.response)}))},enterProductsPage:function(){this.$router.push("/admin/products")}},mounted:function(){this.checkUser()}},b=(n("d6fd"),n("d959")),w=n.n(b);const E=w()(m,[["render",h],["__scopeId","data-v-35f9dc67"]]);t["default"]=E},5319:function(e,t,n){"use strict";var r=n("2ba4"),a=n("c65b"),o=n("e330"),c=n("d784"),i=n("d039"),s=n("825a"),u=n("1626"),l=n("5926"),d=n("50c4"),f=n("577e"),p=n("1d80"),v=n("8aa5"),h=n("dc4a"),x=n("0cb2"),g=n("14c3"),m=n("b622"),b=m("replace"),w=Math.max,E=Math.min,I=o([].concat),O=o([].push),k=o("".indexOf),y=o("".slice),j=function(e){return void 0===e?e:String(e)},$=function(){return"$0"==="a".replace(/./,"$0")}(),N=function(){return!!/./[b]&&""===/./[b]("a","$0")}(),R=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));c("replace",(function(e,t,n){var o=N?"$":"$0";return[function(e,n){var r=p(this),o=void 0==e?void 0:h(e,b);return o?a(o,e,r,n):a(t,f(r),e,n)},function(e,a){var c=s(this),i=f(e);if("string"==typeof a&&-1===k(a,o)&&-1===k(a,"$<")){var p=n(t,c,i,a);if(p.done)return p.value}var h=u(a);h||(a=f(a));var m=c.global;if(m){var b=c.unicode;c.lastIndex=0}var $=[];while(1){var N=g(c,i);if(null===N)break;if(O($,N),!m)break;var R=f(N[0]);""===R&&(c.lastIndex=v(i,d(c.lastIndex),b))}for(var V="",P=0,S=0;S<$.length;S++){N=$[S];for(var T=f(N[0]),U=w(E(l(N.index),i.length),0),A=[],M=1;M<N.length;M++)O(A,j(N[M]));var _=N.groups;if(h){var D=I([T],A,U,i);void 0!==_&&O(D,_);var B=f(r(a,void 0,D))}else B=x(T,i,U,A,_,a);U>=P&&(V+=y(i,P,U)+B,P=U+T.length)}return V+y(i,P)}]}),!R||!$||N)},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"8c1f":function(e,t,n){},9263:function(e,t,n){"use strict";var r=n("c65b"),a=n("e330"),o=n("577e"),c=n("ad6d"),i=n("9f7f"),s=n("5692"),u=n("7c73"),l=n("69f3").get,d=n("fce3"),f=n("107c"),p=s("native-string-replace",String.prototype.replace),v=RegExp.prototype.exec,h=v,x=a("".charAt),g=a("".indexOf),m=a("".replace),b=a("".slice),w=function(){var e=/a/,t=/b*/g;return r(v,e,"a"),r(v,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),E=i.BROKEN_CARET,I=void 0!==/()??/.exec("")[1],O=w||I||E||d||f;O&&(h=function(e){var t,n,a,i,s,d,f,O=this,k=l(O),y=o(e),j=k.raw;if(j)return j.lastIndex=O.lastIndex,t=r(h,j,y),O.lastIndex=j.lastIndex,t;var $=k.groups,N=E&&O.sticky,R=r(c,O),V=O.source,P=0,S=y;if(N&&(R=m(R,"y",""),-1===g(R,"g")&&(R+="g"),S=b(y,O.lastIndex),O.lastIndex>0&&(!O.multiline||O.multiline&&"\n"!==x(y,O.lastIndex-1))&&(V="(?: "+V+")",S=" "+S,P++),n=new RegExp("^(?:"+V+")",R)),I&&(n=new RegExp("^"+V+"$(?!\\s)",R)),w&&(a=O.lastIndex),i=r(v,N?n:O,S),N?i?(i.input=b(i.input,P),i[0]=b(i[0],P),i.index=O.lastIndex,O.lastIndex+=i[0].length):O.lastIndex=0:w&&i&&(O.lastIndex=O.global?i.index+i[0].length:a),I&&i&&i.length>1&&r(p,i[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(i[s]=void 0)})),i&&$)for(i.groups=d=u(null),s=0;s<$.length;s++)f=$[s],d[f[0]]=i[f[1]];return i}),e.exports=h},"9f7f":function(e,t,n){var r=n("d039"),a=n("da84"),o=a.RegExp,c=r((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),i=c||r((function(){return!o("a","y").sticky})),s=c||r((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:s,MISSED_STICKY:i,UNSUPPORTED_Y:c}},ac1f:function(e,t,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},d6fd:function(e,t,n){"use strict";n("8c1f")},d784:function(e,t,n){"use strict";n("ac1f");var r=n("e330"),a=n("6eeb"),o=n("9263"),c=n("d039"),i=n("b622"),s=n("9112"),u=i("species"),l=RegExp.prototype;e.exports=function(e,t,n,d){var f=i(e),p=!c((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),v=p&&!c((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[f]=/./[f]),n.exec=function(){return t=!0,null},n[f](""),!t}));if(!p||!v||n){var h=r(/./[f]),x=t(f,""[e],(function(e,t,n,a,c){var i=r(e),s=t.exec;return s===o||s===l.exec?p&&!c?{done:!0,value:h(t,n,a)}:{done:!0,value:i(n,t,a)}:{done:!1}}));a(String.prototype,e,x[0]),a(l,f,x[1])}d&&s(l[f],"sham",!0)}},fce3:function(e,t,n){var r=n("d039"),a=n("da84"),o=a.RegExp;e.exports=r((function(){var e=o(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-5cf30af9.90a9e307.js.map