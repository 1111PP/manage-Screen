import{d as E,x as b,D as N,m as _,c as q,g as o,w as a,u as B,a as C,r as n,o as S,q as f,E as T,G as U,B as D,H as F,I as R,J as G,p as L,k as P,f as g}from"./index-DiapZNiM.js";import{g as A}from"./time-BeQm9r1_.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x=r=>(L("data-v-f687e7f9"),r=r(),P(),r),J={class:"login_container"},K=x(()=>g("h1",null,"欢迎来到",-1)),M=x(()=>g("h2",null,"商城运营管理系统",-1)),O=E({__name:"index",setup(r){const w=B(),h=C(),d=b(),t=N({username:"admin",password:"111111"}),v={username:[{trigger:"change",validator:(u,e,s)=>{e.length>=2&&e.length<=10?s():s(new Error("账号长度为2-10个字符"))}}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:6,max:14,message:"密码长度为6-14个字符",trigger:"blur"}]},l=_(!1),p=_(),y=async()=>{p.value.validate(async u=>{if(u){l.value=!0;const e=await F(t);if(e.code===200){d.token=e.data,localStorage.setItem("TOKEN",e.data),d.ReGetUserInfo(),R({type:"success",title:"欢迎回来",message:A()});const s=w.query.redirect;h.push(s||"/home"),l.value=!1}else G({type:"error",message:"账号或密码错误"}),setTimeout(()=>l.value=!1,1e3)}})};return(u,e)=>{const s=n("el-col"),c=n("el-input"),m=n("el-form-item"),V=n("el-button"),I=n("el-form"),k=n("el-row");return S(),q("div",J,[o(k,null,{default:a(()=>[o(s,{span:12,xs:0}),o(s,{span:12,xs:24},{default:a(()=>[o(I,{class:"inputForm",ref_key:"loginForm",ref:p,rules:v,model:t,"label-width":"auto",style:{"max-width":"600px"}},{default:a(()=>[K,M,o(m,{prop:"username"},{default:a(()=>[o(c,{modelValue:t.username,"onUpdate:modelValue":e[0]||(e[0]=i=>t.username=i),placeholder:"account","prefix-icon":f(T)},null,8,["modelValue","prefix-icon"])]),_:1}),o(m,{prop:"password",style:{margin:"15px 0 30px 0"}},{default:a(()=>[o(c,{modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=i=>t.password=i),placeholder:"password","prefix-icon":f(U),type:"password","show-password":""},null,8,["modelValue","prefix-icon"])]),_:1}),o(V,{loading:l.value,class:"login_btn",type:"primary",onClick:e[2]||(e[2]=i=>y())},{default:a(()=>[D("login in")]),_:1},8,["loading"])]),_:1},8,["model"])]),_:1})]),_:1})])}}}),Q=H(O,[["__scopeId","data-v-f687e7f9"]]);export{Q as default};