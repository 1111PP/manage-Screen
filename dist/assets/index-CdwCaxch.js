import{M as w,d as Z,m as i,D as ee,y as le,n as te,r as u,o as ae,c as oe,g as l,w as t,q as r,P as x,B as m,f as P,F as ne,v as q,J as h}from"./index-DiapZNiM.js";const se=(d,n,v)=>w.get(`/admin/acl/role/${d}/${n}/?roleName=${v}`),re=d=>d.id?w.put("/admin/acl/role/update",d):w.post("/admin/acl/role/save",d),de=d=>w.get("/admin/acl/permission/toAssign/"+d),ie=(d,n)=>w.post(`/admin/acl/permission/doAssign/?roleId=${d}&permissionId=${n}`),ue=d=>w.delete("/admin/acl/role/remove/"+d),ce=P("h4",null,"分配菜单与按钮的权限",-1),pe={style:{flex:"auto"}},ve=Z({__name:"index",setup(d){let n=i(1),v=i(10),g=i(""),V=i([]),A=i(0),c=i(!1);const N=i();let f=ee({roleName:""});le(()=>{y()});const y=async(o=1)=>{n.value=o;let e=await se(n.value,v.value,g.value);e.code==200&&(A.value=e.data.total,V.value=e.data.records)},D=()=>{y(),g.value=""},T=()=>{y()},C=i(!1),F=async()=>{c.value=!0,Object.assign(f,{roleName:"",id:0}),q(()=>{N.value.clearValidate("roleName")})},I=async()=>{N.value.validate().then(async()=>{(await re(f)).code===200?(h({type:"success",message:f.id?"Success Edit":"Success Add"}),y()):h({type:"success",message:f.id?"Failed Edit":"Failed Add"}),c.value=!1},()=>{h({type:"error",message:"Name is Empty"})})},L=o=>{c.value=!0,Object.assign(f,o),q(()=>{N.value.clearValidate("roleName")})},M=async o=>{(await ue(o)).code===200?(h({type:"success",message:"Success Delete"}),y(V.value.length===1?n.value-1:n.value)):h({type:"error",message:"Failed Delete"})};te([n,v],()=>{y(n.value)});const j={roleName:[{required:!0,trigger:"blur",validator:(o,e,p)=>{e.trim().length>=2?p():p(new Error("职位名称至少两位"))}}]};let z=i([]);const B={children:"children",label:"name"};let S=i([]),R=i(),E=i(0);const O=async o=>{z.value=[],C.value=!0,E.value=o.id;const e=await de(o.id);console.log(e),e.code===200&&(S.value=e.data,z.value=H(e.data))},H=o=>{let e=[];function p(k,s){k.forEach(_=>{_.level===4&&_.select&&s.push(_.id),_.children&&_.children.length>0&&p(_.children,s)})}return p(o,e),e},K=async()=>{let o=R.value.getCheckedKeys(),e=R.value.getHalfCheckedKeys();const p=o.concat(e);(await ie(E.value,p)).code===200&&(C.value=!1,h({type:"success",message:"Success Change!"}),window.location.reload())};return(o,e)=>{const p=u("el-input"),k=u("el-form-item"),s=u("el-button"),_=u("el-form"),U=u("el-card"),b=u("el-table-column"),J=u("el-popconfirm"),G=u("el-table"),Q=u("el-pagination"),W=u("el-dialog"),X=u("el-tree"),Y=u("el-drawer");return ae(),oe(ne,null,[l(U,null,{default:t(()=>[l(_,{inline:!0,class:"form"},{default:t(()=>[l(k,{label:"职位搜索"},{default:t(()=>[l(p,{placeholder:"请你输入搜索职位关键字",modelValue:r(g),"onUpdate:modelValue":e[0]||(e[0]=a=>x(g)?g.value=a:g=a)},null,8,["modelValue"])]),_:1}),l(k,null,{default:t(()=>[l(s,{type:"primary",size:"default",disabled:!r(g),onClick:D},{default:t(()=>[m("搜索")]),_:1},8,["disabled"]),l(s,{type:"info",size:"default",onClick:T},{default:t(()=>[m("重置")]),_:1})]),_:1})]),_:1})]),_:1}),l(U,{style:{margin:"10px 0px"}},{default:t(()=>[l(s,{type:"success",size:"default",icon:"Plus",onClick:F},{default:t(()=>[m("添加职位")]),_:1}),l(G,{border:"",style:{margin:"10px 0px"},data:r(V)},{default:t(()=>[l(b,{type:"index",align:"center",label:"#"}),l(b,{label:"ID",align:"center",prop:"id"}),l(b,{label:"职位名称",align:"center",prop:"roleName","show-overflow-tooltip":""}),l(b,{label:"创建世间",align:"center","show-overflow-tooltip":"",prop:"createTime"}),l(b,{label:"更新时间",align:"center","show-overflow-tooltip":"",prop:"updateTime"}),l(b,{label:"操作",width:"280px",align:"center"},{default:t(({row:a,$index:fe})=>[l(s,{type:"primary",size:"small",icon:"User",onClick:$=>O(a)},{default:t(()=>[m("分配权限")]),_:2},1032,["onClick"]),l(s,{type:"info",size:"small",icon:"Edit",onClick:$=>L(a)},{default:t(()=>[m("编辑")]),_:2},1032,["onClick"]),l(J,{title:`你确定要删除${a.roleName}?`,width:"260px",onConfirm:$=>M(a.id)},{reference:t(()=>[l(s,{type:"danger",size:"small",icon:"Delete"},{default:t(()=>[m("删除")]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),l(Q,{"current-page":r(n),"onUpdate:currentPage":e[1]||(e[1]=a=>x(n)?n.value=a:n=a),"page-size":r(v),"onUpdate:pageSize":e[2]||(e[2]=a=>x(v)?v.value=a:v=a),"page-sizes":[5,10,20,30],background:!0,layout:"prev, pager, next, jumper,->,sizes,total",total:r(A)},null,8,["current-page","page-size","total"])]),_:1}),l(W,{modelValue:r(c),"onUpdate:modelValue":e[5]||(e[5]=a=>x(c)?c.value=a:c=a),title:r(f).id?"更新职位":"添加职位"},{footer:t(()=>[l(s,{type:"primary",size:"default",onClick:e[4]||(e[4]=a=>x(c)?c.value=!1:c=!1)},{default:t(()=>[m("取消")]),_:1}),l(s,{type:"primary",size:"default",onClick:I},{default:t(()=>[m("确定")]),_:1})]),default:t(()=>[l(_,{model:r(f),rules:j,ref_key:"form",ref:N},{default:t(()=>[l(k,{label:"职位名称",prop:"roleName"},{default:t(()=>[l(p,{placeholder:"请你输入职位名称",modelValue:r(f).roleName,"onUpdate:modelValue":e[3]||(e[3]=a=>r(f).roleName=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),l(Y,{modelValue:C.value,"onUpdate:modelValue":e[7]||(e[7]=a=>C.value=a)},{header:t(()=>[ce]),default:t(()=>[l(X,{ref_key:"tree",ref:R,data:r(S),"show-checkbox":"","node-key":"id","default-expand-all":!0,"default-checked-keys":r(z),props:B},null,8,["data","default-checked-keys"])]),footer:t(()=>[P("div",pe,[l(s,{onClick:e[6]||(e[6]=a=>C.value=!1)},{default:t(()=>[m("取消")]),_:1}),l(s,{type:"primary",onClick:K},{default:t(()=>[m("确定")]),_:1})])]),_:1},8,["modelValue"])],64)}}});export{ve as default};