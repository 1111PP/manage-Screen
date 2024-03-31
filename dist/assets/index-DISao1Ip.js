import{M as h,d as J,m as g,y as G,n as K,r as u,o as _,e as w,w as t,g as e,q as p,f as V,P as C,B as r,t as k,c as I,F as z,b as N,J as y,p as O,k as Q}from"./index-DiapZNiM.js";import{_ as W}from"./_plugin-vue_export-helper-DlAUqK2U.js";const X=(l,s)=>h.get(`/admin/product/list/${l}/${s}`),Y=l=>h.get("/admin/product/onSale/"+l),Z=l=>h.get("/admin/product/cancelSale/"+l),ee=l=>h.get("/admin/product/getSkuInfo/"+l),te=l=>h.delete("/admin/product/deleteSku/"+l),ae=l=>(O("data-v-dcaf9bd4"),l=l(),Q(),l),le=["src"],se=ae(()=>V("h4",null,"查看商品的详情",-1)),ne=["src"],oe=J({__name:"index",setup(l){let s=g(1),m=g(5),q=g(0),b=g([]),x=g(!1),c=g({});G(()=>{v()});const v=async(i=1)=>{s.value=i;let n=await X(s.value,m.value);n.code==200&&(q.value=n.data.total,b.value=n.data.records)};K([s,m],()=>{v(s.value)});const L=async i=>{i.isSale==1?(await Z(i.id),y({type:"success",message:"下架成功"})):(await Y(i.id),y({type:"success",message:"上架成功"})),v(s.value)},$=()=>{y({type:"success",message:"开发中...."})},A=async i=>{x.value=!0;let n=await ee(i.id);c.value=n.data},U=async i=>{(await te(i)).code==200?(y({type:"success",message:"删除成功"}),v(b.value.length>1?s.value:s.value-1)):y({type:"error",message:"系统数据不能删除"})};return(i,n)=>{const d=u("el-table-column"),S=u("el-button"),E=u("el-popconfirm"),F=u("el-table"),M=u("el-pagination"),o=u("el-col"),f=u("el-row"),B=u("el-tag"),P=u("el-carousel-item"),R=u("el-carousel"),T=u("el-drawer"),j=u("el-card");return _(),w(j,null,{default:t(()=>[e(F,{border:"",style:{margin:"10px 0px"},data:p(b)},{default:t(()=>[e(d,{label:"序号",type:"index",align:"center",width:"80px"}),e(d,{label:"名称","show-overflow-tooltip":"",width:"150px",prop:"skuName"}),e(d,{label:"描述","show-overflow-tooltip":"",width:"150px",prop:"skuDesc"}),e(d,{label:"图片",width:"150px"},{default:t(({row:a,$index:H})=>[V("img",{src:a.skuDefaultImg,alt:"",style:{width:"100px",height:"100px"}},null,8,le)]),_:1}),e(d,{label:"重量",width:"150px",prop:"weight"}),e(d,{label:"价格",width:"150px",prop:"price"}),e(d,{label:"操作",width:"250px",fixed:"right"},{default:t(({row:a,$index:H})=>[e(S,{type:a.isSale==1?"warning":"success",size:"small",icon:a.isSale==1?"Bottom":"Top",onClick:D=>L(a)},null,8,["type","icon","onClick"]),e(S,{type:"info",size:"small",icon:"Edit",onClick:$}),e(S,{type:"primary",size:"small",icon:"InfoFilled",onClick:D=>A(a)},null,8,["onClick"]),e(E,{title:`你确定要删除${a.skuName}?`,width:"200px",onConfirm:D=>U(a.id)},{reference:t(()=>[e(S,{type:"danger",size:"small",icon:"Delete"})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(M,{"current-page":p(s),"onUpdate:currentPage":n[0]||(n[0]=a=>C(s)?s.value=a:s=a),"page-size":p(m),"onUpdate:pageSize":n[1]||(n[1]=a=>C(m)?m.value=a:m=a),"page-sizes":[5,10,20,30],background:!0,layout:"prev, pager, next, jumper,->,sizes,total",total:p(q)},null,8,["current-page","page-size","total"]),e(T,{modelValue:p(x),"onUpdate:modelValue":n[2]||(n[2]=a=>C(x)?x.value=a:x=a)},{header:t(()=>[se]),default:t(()=>[e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("名称")]),_:1}),e(o,{span:18},{default:t(()=>[r(k(p(c).skuName),1)]),_:1})]),_:1}),e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("描述")]),_:1}),e(o,{span:18},{default:t(()=>[r(k(p(c).skuDesc),1)]),_:1})]),_:1}),e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("价格")]),_:1}),e(o,{span:18},{default:t(()=>[r(k(p(c).price),1)]),_:1})]),_:1}),e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("平台属性")]),_:1}),e(o,{span:18},{default:t(()=>[(_(!0),I(z,null,N(p(c).skuAttrValueList,a=>(_(),w(B,{style:{margin:"5px"},key:a.id},{default:t(()=>[r(k(a.valueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("销售属性")]),_:1}),e(o,{span:18},{default:t(()=>[(_(!0),I(z,null,N(p(c).skuSaleAttrValueList,a=>(_(),w(B,{style:{margin:"5px"},key:a.id},{default:t(()=>[r(k(a.saleAttrValueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(f,{style:{margin:"10px 0px"}},{default:t(()=>[e(o,{span:6},{default:t(()=>[r("商品图片")]),_:1}),e(o,{span:18},{default:t(()=>[e(R,{interval:4e3,type:"card",height:"200px"},{default:t(()=>[(_(!0),I(z,null,N(p(c).skuImageList,a=>(_(),w(P,{key:a.id},{default:t(()=>[V("img",{src:a.imgUrl,alt:"",style:{width:"100%",height:"100%"}},null,8,ne)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}}),re=W(oe,[["__scopeId","data-v-dcaf9bd4"]]);export{re as default};