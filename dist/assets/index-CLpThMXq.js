import{M as N,d as X,m as u,D as Y,n as Z,y as ee,r as d,o as V,c as O,g as l,w as t,B as p,q as k,f as x,P,t as T,e as ae,F as le,J as _,v as B,p as te,k as oe}from"./index-DiapZNiM.js";import{_ as re}from"./_plugin-vue_export-helper-DlAUqK2U.js";const se=(n,i)=>N.get(`/admin/product/baseTrademark/${n}/${i}`),ne=n=>N.delete(`/admin/product/baseTrademark/remove//${n}`),de=n=>n.id!==0?N.put("/admin/product/baseTrademark/update",n):N.post("/admin/product/baseTrademark/save",n),ie=n=>(te("data-v-a9bfcc6a"),n=n(),oe(),n),ue=["src"],ce={class:"pagination-block"},pe=ie(()=>x("span",null,"是否确认删除?",-1)),me={class:"dialog-footer1",ref:"lpp"},ge=["src"],fe=X({__name:"index",setup(n){let i=u(1),m=u(3),y=u([]),w=u(0),c=u();const b=async()=>{const a=await se(i.value,m.value);a.code===200&&(y.value=a.data.records,w.value=a.data.total)},v=u(!1),h=u(0),D=a=>{v.value=!0,h.value=a},S=async()=>{const a=await ne(h.value);console.log(a),a.code===200?y.value.length>1?b():i.value-=1:_({type:"error",message:a.data}),v.value=!1,h.value=0},g=u(""),$=()=>{g.value="新增",f.value=!0,Object.assign(r,{id:0,tmName:"",logoUrl:""}),B(()=>{c.value.clearValidate("tmName"),c.value.clearValidate("logoUrl")})},f=u(!1),r=Y({id:0,tmName:"",logoUrl:""}),E=a=>{g.value="编辑",B(()=>{c.value&&(c.value.clearValidate("tmName"),c.value.clearValidate("logoUrl"))}),f.value=!0,r.id=a;let e=y.value.find(s=>s.id===r.id);e&&(r.tmName=e.tmName,r.logoUrl=e.logoUrl)},z=async()=>{c.value.validate().then(async()=>{(await de({id:r.id,tmName:r.tmName,logoUrl:r.logoUrl})).code===200?_({type:"success",message:`${g.value}成功`}):_({type:"error",message:"修改失败"}),Object.assign(r,{id:0,tmName:"",logoUrl:""}),f.value=!1,b()},()=>{_({type:"error",message:"表单校验失败"})})},G=a=>a.type=="image/png"||a.type=="image/jpeg"||a.type=="image/gif"?a.size/1024/1024<4?!0:(_({type:"error",message:"上传文件大小小于4M"}),!1):(_({type:"error",message:"上传文件格式务必PNG|JPG|GIF"}),!1),A=(a,e)=>{r.logoUrl=a.data,c.value.clearValidate("logoUrl")};Z([i,m],()=>{b()}),ee(()=>{b()});const L={tmName:[{required:!0,validator:(a,e,s)=>{r.tmName.length>=2?s():s(new Error("品牌名称必须>=2字符")),console.log(999)},trigger:"blur"}],logoUrl:[{required:!0,validator:(a,e,s)=>{e?s():s(new Error("LOGO图片未上传"))}}]};return(a,e)=>{const s=d("el-button"),U=d("el-table-column"),R=d("el-table"),j=d("el-pagination"),M=d("el-card"),C=d("el-dialog"),q=d("el-input"),I=d("el-form-item"),H=d("Plus"),J=d("el-icon"),F=d("el-upload"),K=d("el-form");return V(),O(le,null,[l(M,{class:"box-card"},{default:t(()=>[l(s,{type:"success",icon:"Plus",style:{"margin-bottom":"10px"},onClick:$},{default:t(()=>[p("添加品牌")]),_:1}),l(R,{border:"",data:k(y),stripe:""},{default:t(()=>[l(U,{prop:"id",label:"序号",width:"80px",align:"center"}),l(U,{prop:"tmName",label:"品牌名称",align:"center"}),l(U,{label:"品牌LOGO",align:"center"},{default:t(({row:o,$index:Q})=>[x("img",{src:o.logoUrl,style:{width:"50px",height:"50px"}},null,8,ue)]),_:1}),l(U,{label:"品牌操作",align:"center"},{default:t(({row:o,$index:Q})=>[l(s,{type:"primary",icon:"edit",onClick:W=>E(o.id)},{default:t(()=>[p("编辑")]),_:2},1032,["onClick"]),l(s,{type:"danger",icon:"delete",onClick:W=>D(o.id)},{default:t(()=>[p("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),x("div",ce,[l(j,{"current-page":k(i),"onUpdate:currentPage":e[0]||(e[0]=o=>P(i)?i.value=o:i=o),"page-size":k(m),"onUpdate:pageSize":e[1]||(e[1]=o=>P(m)?m.value=o:m=o),"page-sizes":[3,5,7,9],background:!0,disabled:!1,layout:"  prev, pager, next,sizes,->,jumper,total",total:k(w)},null,8,["current-page","page-size","total"])])]),_:1}),l(C,{modelValue:v.value,"onUpdate:modelValue":e[3]||(e[3]=o=>v.value=o),width:"300"},{footer:t(()=>[x("div",me,[l(s,{onClick:e[2]||(e[2]=o=>v.value=!1)},{default:t(()=>[p("取消")]),_:1}),l(s,{type:"primary",onClick:S},{default:t(()=>[p(" 确认 ")]),_:1})],512)]),default:t(()=>[pe]),_:1},8,["modelValue"]),l(C,{modelValue:f.value,"onUpdate:modelValue":e[6]||(e[6]=o=>f.value=o),title:`${g.value}品牌`,width:"500",style:{"border-radius":"20px",padding:"30px"}},{footer:t(()=>[l(s,{type:"primary",onClick:e[5]||(e[5]=o=>f.value=!1)},{default:t(()=>[p(T("取消"+g.value),1)]),_:1}),l(s,{type:"primary",onClick:z},{default:t(()=>[p(T("确认"+g.value),1)]),_:1})]),default:t(()=>[l(K,{rules:L,"status-icon":"",ref_key:"formRef",ref:c,model:r},{default:t(()=>[l(I,{"label-width":"100px",prop:"tmName",label:"品牌名称:"},{default:t(()=>[l(q,{modelValue:r.tmName,"onUpdate:modelValue":e[4]||(e[4]=o=>r.tmName=o),placeholder:"请输入品牌名称"},null,8,["modelValue"])]),_:1}),l(I,{"label-width":"100px",prop:"logoUrl",label:"品牌LOGO:"},{default:t(()=>[l(F,{class:"avatar-uploader",action:"/api/admin/product/fileUpload","before-upload":G,"on-success":A,"show-file-list":!1},{default:t(()=>[r.logoUrl?(V(),O("img",{key:0,style:{height:"128px",width:"128px",overflow:"hidden"},src:r.logoUrl,class:"avatar"},null,8,ge)):(V(),ae(J,{key:1,class:"avatar-uploader-icon"},{default:t(()=>[l(H)]),_:1}))]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])],64)}}}),Ue=re(fe,[["__scopeId","data-v-a9bfcc6a"]]);export{Ue as default};