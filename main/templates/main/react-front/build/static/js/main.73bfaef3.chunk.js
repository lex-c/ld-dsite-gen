(this["webpackJsonpreact-front"]=this["webpackJsonpreact-front"]||[]).push([[0],{43:function(t,e,n){},44:function(t,e,n){},56:function(t,e,n){},58:function(t,e,n){},59:function(t,e,n){},60:function(t,e,n){},81:function(t,e,n){},84:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(1),i=n.n(a),r=n(36),s=n.n(r),o=n(14),u=(n(43),n(3)),j=(n.p,n(44),n(11)),d=n(6);n(45);function l(){return fetch("".concat("/main/api","/get-pics"),{method:"GET"}).then((function(t){return t.json()})).then((function(t){return t.picsData}))}n(56),n(57),n(20);function b(){var t=Object(a.useState)([]),e=Object(d.a)(t,2),n=e[0],i=e[1],r=Object(a.useState)(!1),s=Object(d.a)(r,2),o=s[0],u=s[1];Object(a.useEffect)((function(){l().then((function(t){return console.log(t),t})).then((function(t){return i(t)}))}),[]),Object(a.useEffect)((function(){fetch("".concat("/main/api","/get-analysis"),{method:"GET"}).then((function(t){return t.json()})).then((function(t){return console.log(t)}));var t=setInterval((function(){u(!o)}),3e3);return function(){clearInterval(t)}}),[o]);return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"wrapper",children:Object(c.jsx)("div",{className:"scrolls",onScroll:function(t){var e,n=t.target.childNodes,c=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),a=Object(j.a)(n);try{for(a.s();!(e=a.n()).done;){var i=e.value,r=i.getBoundingClientRect().left,s=i.getBoundingClientRect().width;r>0&&r+s<c+50?i.className="scroll-pic active":r<-100|r+s>c+200&&(i.className="scroll-pic inactive")}}catch(o){a.e(o)}finally{a.f()}},children:n[0]?Object(c.jsx)(c.Fragment,{children:n.map((function(t){return Object(c.jsx)("img",{src:t[1],id:t[0],className:"scroll-pic inactive",alt:"pic"})}))}):Object(c.jsx)("h3",{children:"Loading..."})})})})}n(58);function f(){return Object(c.jsx)("h3",{id:"socialsTag",children:"socials component"})}n(59);function O(){return Object(c.jsx)("h3",{id:"introTag",children:"intro component"})}n(60);function h(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("h3",{id:"aboutTag",children:"about component"})})}var p=n(17),x=n.n(p),g=n(2),m=n(25),v=n(21),y=n(22),C=n.n(y),S=(n(79),"/main/api");n(81);function F(){var t=Object(a.useState)([]),e=Object(d.a)(t,2),n=e[0],i=e[1],r=Object(a.useState)([]),s=Object(d.a)(r,2),o=s[0],u=s[1],b=Object(a.useState)([]),f=Object(d.a)(b,2),O=f[0],h=f[1],p=Object(a.useState)(),y=Object(d.a)(p,2),F=y[0],E=y[1],N=Object(a.useState)({descriptions:{},tagslists:{}}),k=Object(d.a)(N,2),w=k[0],T=k[1],I=Object(a.useState)([]),D=Object(d.a)(I,2),U=D[0],P=D[1],B=Object(a.useState)(!1),G=Object(d.a)(B,2),L=G[0],R=G[1];Object(a.useEffect)((function(){l().then((function(t){return P(t)}))}),[L]),Object(a.useEffect)(Object(v.a)(x.a.mark((function t(){var e,c,a,i,r,s,o,d,l,b,f;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=Object(m.a)(n),c=e.map((function(t){return t.name})),a=Object(g.a)({},w),(i=Object.keys(a.descriptions)).length>0){r=Object(j.a)(i);try{for(r.s();!(s=r.n()).done;)o=s.value,console.log(c.indexOf(o)),c.indexOf(o)<0&&(delete a.descriptions[o],delete a.tagslists[o])}catch(O){r.e(O)}finally{r.f()}}for(u(c),T(a),d=new FormData,l=0;l<n.length;l++)d.append("file",n[l]);return E(d),t.next=12,d.getAll("file");case 12:b=t.sent,f=b.map((function(t){return URL.createObjectURL(t)})),h(f);case 15:case"end":return t.stop()}}),t)}))),[n]),Object(a.useEffect)((function(){var t,e=Object(g.a)({},w).tagslists,n=Object(j.a)(o);try{for(n.s();!(t=n.n()).done;){var c=t.value;e[c]||(e[c]=[["",""]])}}catch(a){n.e(a)}finally{n.f()}}));var A=function(t){(function(t){return C.a.post("".concat(S,"/remove-pic/"),{picName:t}).then((function(t){return t.data}))})(t.target.id).then((function(t){console.log(t),R(!L)}))},J=function(){var t=Object(v.a)(x.a.mark((function t(e){var n,c,a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=Object(g.a)({},w),c=JSON.stringify(n),a=new Blob([c],{type:"application/json"}),F.append("dbInfo",a),(e=F,C.a.post("".concat(S,"/add-pics/"),e).then((function(t){return console.log(t.data)}))).then((function(t){i([]),R(!L)}));case 5:case"end":return t.stop()}var e}),t)})));return function(e){return t.apply(this,arguments)}}(),H=function(t){var e=t.target.dataset.idx,c=Object(m.a)(n);c.splice(e,1);var a,r=new DataTransfer,s=Object(j.a)(c);try{for(s.s();!(a=s.n()).done;){var o=a.value;r.items.add(o)}}catch(u){s.e(u)}finally{s.f()}i(r.files)},M=function(t){var e=Object(g.a)({},w).descriptions;e[o[t.target.dataset.idx]]=t.target.value,T(Object(g.a)(Object(g.a)({},w),{},{descriptions:e}))},W=function(t){var e=Object(g.a)({},w).tagslists,n=t.target.dataset.idxs.split(",").map((function(t){return parseInt(t)})),c=o[n[0]],a=n[1];e[c][a][0]=t.target.value,T(Object(g.a)(Object(g.a)({},w),{},{tagslists:e}))},X=function(t){var e=Object(g.a)({},w).tagslists,n=t.target.dataset.idxs.split(",").map((function(t){return parseInt(t)})),c=o[n[0]],a=n[1];e[c][a][1]=t.target.value,T(Object(g.a)(Object(g.a)({},w),{},{tagslists:e}))},q=function(t){var e=Object(g.a)({},w).tagslists,n=t.target.dataset.idxs.split(",").map((function(t){return parseInt(t)})),c=o[n[0]],a=n[1];e[c].splice(a,1),T(Object(g.a)(Object(g.a)({},w),{},{tagslists:e}))},z=function(t){var e=Object(g.a)({},w).tagslists;e[o[t.target.dataset.idx]].push(["",""]),T(Object(g.a)(Object(g.a)({},w),{},{tagslists:e}))};return Object(c.jsxs)("div",{className:"admin-pics",children:[Object(c.jsx)("h3",{children:"hi"}),Object(c.jsx)("input",{id:"picsInp",type:"file",name:"picsInput",files:n,onChange:function(t){var e,n=new DataTransfer,c=Object(j.a)(t.target.files);try{for(c.s();!(e=c.n()).done;){var a=e.value;n.items.add(a)}}catch(r){c.e(r)}finally{c.f()}i(n.files)},multiple:!0}),Object(c.jsx)("button",{onClick:J,type:"submit",children:"ADD"}),O.map((function(t,e){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("button",{"data-idx":e,onClick:H,children:"Remove"}),Object(c.jsx)("img",{src:t,alt:""}),Object(c.jsx)("label",{children:"Description"}),Object(c.jsx)("input",{"data-idx":e,type:"text",name:"description",value:w.descriptions[o[e]],onChange:M}),Object(c.jsx)("label",{children:"Tags"}),w.tagslists[o[e]]?Object(c.jsx)(c.Fragment,{children:w.tagslists[o[e]].map((function(t,n){return Object(c.jsxs)("div",{className:"tags-info",children:[Object(c.jsx)("input",{type:"text","data-idxs":[e,n],value:w.tagslists[o[e]][n][0],onChange:W}),Object(c.jsx)("input",{type:"number","data-idxs":[e,n],value:w.tagslists[o[e]][n][1],onChange:X}),Object(c.jsx)("button",{"data-idxs":[e,n],onClick:q,children:"-"})]})}))}):Object(c.jsx)(c.Fragment,{}),Object(c.jsx)("button",{"data-idx":e,onClick:z,children:"+"})]})})),U.map((function(t){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("img",{src:t[1],id:t[0],alt:"old-pic"}),Object(c.jsx)("button",{id:t[0],className:"remove-pic-btn",onClick:A,children:"X"})]})}))]})}var E="/main/api";function N(){var t=Object(a.useState)([]),e=Object(d.a)(t,2),n=e[0],i=e[1],r=Object(a.useState)([]),s=Object(d.a)(r,2),o=s[0],u=s[1],l=Object(a.useState)({}),b=Object(d.a)(l,2),f=b[0],O=b[1],h=Object(a.useState)({}),p=Object(d.a)(h,2),x=p[0],m=p[1];Object(a.useEffect)((function(){fetch("".concat(E,"/get-all-users"),{method:"GET"}).then((function(t){return t.json()})).then((function(t){return t.allUsers})).then((function(t){i(t);var e={},n={};t.map((function(t){e["user*".concat(t)]=[["",""]],n["user*".concat(t)]=""})),O(e),m(n)}))}),[]),Object(a.useEffect)((function(){fetch("".concat(E,"/get-user-info"),{method:"GET"}).then((function(t){return t.json()})).then((function(t){return t.allUsers.map((function(t){return t[1]?[t[0],JSON.parse(t[1])]:t}))})).then((function(t){return u(t)}))}),[]);var v=function(t){var e=Object(g.a)({},f),n=t.target.dataset.userid,c=t.target.dataset.tagidx;e["user*".concat(n)][c][0]=t.target.value,O(e)},y=function(t){var e=Object(g.a)({},f),n=t.target.dataset.userid,c=t.target.dataset.tagidx;e["user*".concat(n)][c][1]=t.target.value,O(e)},C=function(t){var e=Object(g.a)({},f),n=t.target.dataset.userid,c=t.target.dataset.tagidx;e["user*".concat(n)].splice(c,1),O(e)},S=function(t){var e=Object(g.a)({},f),n=t.target.dataset.userid;e["user*".concat(n)].push(["",""]),O(e)},F=function(t){var e=Object(g.a)({},x),n=t.target.dataset.userid,c=f["user*".concat(n)];(function(t,e){var n,c="",a=Object(j.a)(e);try{for(a.s();!(n=a.n()).done;){var i=n.value;c+="dfg67dfg",i.forEach((function(t,e){c+=t,0===e&&(c+="rt45rt")}))}}catch(r){a.e(r)}finally{a.f()}return fetch("".concat(E,"/get-user-interest-prediction/").concat(t,"/").concat(c),{method:"GET"}).then((function(t){return t.json()})).then((function(t){return t.predictedInterest}))})(n,c).then((function(t){e["user*".concat(n)]=t,m(e)}))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h3",{children:"All Users"}),n.map((function(t){return Object(c.jsx)("h3",{children:t})})),Object(c.jsx)("h3",{children:"All Users Info"}),o.map((function(t){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("h3",{children:["User ID: ",t[0]]}),t[1]?Object(c.jsxs)(c.Fragment,{children:[Object.keys(t[1]).map((function(e){return Object(c.jsxs)("h3",{children:[e,": ",t[1][e]]})})),Object(c.jsx)("label",{children:"Predict Pic Tags"}),f["user*".concat(t[0])].map((function(e,n){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("input",{type:"text","data-userid":t[0],"data-tagidx":n,value:f["user*".concat(t[0])][n][0],onChange:v}),Object(c.jsx)("input",{type:"number","data-userid":t[0],"data-tagidx":n,value:f["user*".concat(t[0])][n][1],onChange:y}),Object(c.jsx)("button",{"data-userid":t[0],"data-tagidx":n,onClick:C,children:"-"})]})})),Object(c.jsx)("button",{"data-userid":t[0],onClick:S,children:"+"}),Object(c.jsx)("button",{"data-userid":t[0],onClick:F,children:"Submit"}),Object(c.jsx)("h3",{children:"prediction"}),Object(c.jsx)("h3",{children:x["user*".concat(t[0])]})]}):Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("h3",{children:"No interest data yet"})})]})}))]})}var k=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(o.b,{className:"nav-items",exact:!0,to:"/main",children:"Home"}),Object(c.jsx)(o.b,{className:"nav-items",exact:!0,to:"/main/edit-pics",children:"Edit Pics"}),Object(c.jsx)(o.b,{className:"nav-items",exact:!0,to:"/main/predictions",children:"Predictions"}),Object(c.jsx)(u.b,{exact:!0,path:"/",render:function(){return Object(c.jsx)(u.a,{to:"/main"})}}),Object(c.jsx)(u.b,{exact:!0,path:"/main",render:function(){return Object(c.jsxs)("div",{id:"appDiv",children:[Object(c.jsx)("h3",{children:"Hi"}),Object(c.jsx)(O,{}),Object(c.jsx)(b,{}),Object(c.jsx)(f,{}),Object(c.jsx)(h,{})]})}}),Object(c.jsx)(u.b,{exact:!0,path:"/main/edit-pics",render:function(){return Object(c.jsx)(F,{})}}),Object(c.jsx)(u.b,{exact:!0,path:"/main/predictions",render:function(){return Object(c.jsx)(N,{})}})]})},w=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,85)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),c(t),a(t),i(t),r(t)}))};s.a.render(Object(c.jsx)(o.a,{children:Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(k,{})})}),document.getElementById("root")),w()}},[[84,1,2]]]);
//# sourceMappingURL=main.73bfaef3.chunk.js.map