const createdNodeIds=[];
const hex=h=>{const n=parseInt(h.replace('#',''),16);return{r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255}};
const paint=h=>[{type:'SOLID',color:hex(h)}];
const C={ink:'#18242C',muted:'#66757E',nav:'#152A35',blue:'#225F7D',blueSoft:'#EAF2F6',orange:'#C5612F',paper:'#F5F7F8',white:'#FFFFFF',line:'#D7DFE3',line2:'#AAB8C0',success:'#2F7352',successBg:'#EAF4EE',warning:'#9B551F',warningBg:'#FFF1E7',danger:'#A73E36',dangerBg:'#FBECEB'};
await Promise.all([figma.loadFontAsync({family:'Noto Sans SC',style:'Regular'}),figma.loadFontAsync({family:'Noto Sans SC',style:'Medium'}),figma.loadFontAsync({family:'Noto Sans SC',style:'Bold'}),figma.loadFontAsync({family:'Inter',style:'Regular'}),figma.loadFontAsync({family:'Inter',style:'Semi Bold'})]);
const page=await figma.getNodeByIdAsync('2:2');await figma.setCurrentPageAsync(page);
function frame(name,x,y,w,h,fill=C.white,stroke=null,r=0){const f=figma.createFrame();f.name=name;f.x=x;f.y=y;f.resize(w,h);f.fills=paint(fill);if(stroke){f.strokes=paint(stroke);f.strokeWeight=1}if(r)f.cornerRadius=r;page.appendChild(f);createdNodeIds.push(f.id);return f}
function rect(parent,name,x,y,w,h,fill,stroke=null,r=0){const n=figma.createRectangle();n.name=name;n.x=x;n.y=y;n.resize(w,h);n.fills=paint(fill);if(stroke){n.strokes=paint(stroke);n.strokeWeight=1}if(r)n.cornerRadius=r;parent.appendChild(n);createdNodeIds.push(n.id);return n}
function text(parent,name,value,x,y,w,size=14,weight='Regular',color=C.ink,line=1.45,family='Noto Sans SC'){const t=figma.createText();t.name=name;t.fontName={family,style:weight};t.characters=value;t.fontSize=size;t.lineHeight={unit:'PERCENT',value:line*100};t.fills=paint(color);t.x=x;t.y=y;t.resize(w,10);t.textAutoResize='HEIGHT';parent.appendChild(t);createdNodeIds.push(t.id);return t}
function divider(parent,x,y,w,color=C.line,h=1){return rect(parent,'Divider',x,y,w,h,color)}
const buttonSet=await figma.getNodeByIdAsync('2:112');const inputComp=await figma.getNodeByIdAsync('2:115');const selectComp=await figma.getNodeByIdAsync('2:118');const statusSet=await figma.getNodeByIdAsync('2:139');
function instanceOf(comp,parent,x,y,label,w=null){const i=comp.createInstance();parent.appendChild(i);i.x=x;i.y=y;if(w)i.resize(w,i.height);const ts=i.findAllWithCriteria({types:['TEXT']});if(label&&ts[0])ts[0].characters=label;createdNodeIds.push(i.id);return i}
function button(parent,type,label,x,y){const c=buttonSet.children.find(n=>n.type==='COMPONENT'&&n.name===`Type=${type}`);return instanceOf(c,parent,x,y,label)}
function tag(parent,state,label,x,y){const c=statusSet.children.find(n=>n.type==='COMPONENT'&&n.name===`State=${state}`);return instanceOf(c,parent,x,y,label)}

const root=frame('广告牌台账 / 桌面端',0,0,1440,900,C.paper);
rect(root,'Sidebar',0,0,208,900,C.nav);rect(root,'Topbar',208,0,1232,56,C.white);divider(root,208,55,1232);
rect(root,'Brand Marker',24,22,7,22,C.orange);text(root,'Brand','高速公路广告牌\n经营管理',42,15,146,14,'Bold',C.white,1.35);
text(root,'Nav Group 1','业务管理',24,96,140,10,'Regular','#78909B');
const nav=['广告牌资产','客户管理','合同管理','财务管理','经营报表'];nav.forEach((n,i)=>{const y=120+i*44;if(i===0){rect(root,'Active Nav',16,y,176,38,C.white,null,4);rect(root,'Active Marker',16,y,4,38,C.orange)}text(root,`Nav/${n}`,n,32,y+9,140,12,i===0?'Bold':'Regular',i===0?C.ink:'#C6D2D8')});
text(root,'Nav Group 2','协同',24,372,140,10,'Regular','#78909B');['消息提醒','售后维护'].forEach((n,i)=>text(root,`Nav/${n}`,n,32,402+i*44,140,12,'Regular','#C6D2D8'));
divider(root,24,786,160,'#3C4F59');text(root,'Scope Label','当前数据范围',24,806,150,10,'Regular','#8FA1AB');text(root,'Scope Value','华东运营单位',24,827,150,11,'Bold',C.white);
text(root,'Breadcrumb','广告牌资产 / 广告牌台账',232,18,400,11,'Regular',C.muted);text(root,'User','运营档案员',1258,18,95,11,'Regular',C.ink);rect(root,'Avatar',1370,13,30,30,C.blue,null,15);text(root,'Avatar Text','林',1379,20,16,11,'Bold',C.white);

text(root,'Page Title','广告牌台账',232,84,300,23,'Bold',C.ink);text(root,'Page Desc','查询、核对和维护广告牌正式档案',232,119,430,12,'Regular',C.muted);
button(root,'Secondary','导出当前结果',1185,88);button(root,'Primary','新建广告牌',1304,88);

const filter=rect(root,'Filter Bar',232,158,1184,72,C.white,C.line,4);rect(root,'Filter Marker',232,158,4,72,C.blue);
instanceOf(inputComp,root,252,176,'广告牌编号或名称',360);instanceOf(selectComp,root,626,176,'全部路段',180);instanceOf(selectComp,root,820,176,'全部经营状态',180);button(root,'Primary','查询',1014,176);button(root,'Secondary','重置',1088,176);
text(root,'Applied Filter','生效条件：华东运营单位　·　查询与导出使用同一范围',1180,183,210,10,'Regular',C.muted);

text(root,'Count','找到',232,252,40,11,'Regular',C.muted);text(root,'Count Value','128',268,244,45,19,'Bold',C.blue,1.2,'Inter');text(root,'Count Unit','块广告牌　·　第 1–20 条',312,252,220,11,'Regular',C.muted);

const table=rect(root,'Ledger Table',232,286,810,528,C.white,C.line,4);rect(root,'Table Header',232,286,810,42,'#E8EDF0');
const cols=[['广告牌编号',248,112],['名称',360,210],['所属路段',570,115],['现场桩号',685,112],['经营状态',797,95],['手续状态',892,120]];cols.forEach(c=>text(root,`Column/${c[0]}`,c[0],c[1],299,c[2],11,'Bold','#4A5C65'));
const rows=[['GG-2026-018','沪昆高速 K120 广告牌','沪昆高速','K120+350','在租','正常'],['GG-2026-021','绕城高速南段广告牌','绕城高速','K36+800','空闲','保险将到期'],['GG-2025-109','杭瑞高速东向广告牌','杭瑞高速','K88+120','暂停经营','审批已过期'],['GG-2025-083','沪昆高速机场连接段广告牌','沪昆高速','K142+060','空闲','正常'],['GG-2025-041','杭长高速西向广告牌','杭长高速','K17+420','在租','正常'],['GG-2024-196','绕城高速北段双面牌','绕城高速','K52+710','在租','年审将到期']];
rows.forEach((r,idx)=>{const y=328+idx*70;if(idx===0){rect(root,'Selected Row',232,y,810,70,C.blueSoft);rect(root,'Selected Marker',232,y,4,70,C.blue)}divider(root,232,y+69,810);text(root,`Cell Code/${idx}`,r[0],248,y+24,110,11,'Regular',C.ink,1.2,'Inter');text(root,`Cell Name/${idx}`,r[1],360,y+21,205,12,'Bold',C.ink);text(root,`Cell Road/${idx}`,r[2],570,y+24,110,11,'Regular',C.ink);text(root,`Cell Stake/${idx}`,r[3],685,y+22,110,12,'Semi Bold',C.ink,1.2,'Inter');tag(root,r[4]==='暂停经营'?'Neutral':'Neutral',r[4],797,y+21);if(r[5]==='正常')text(root,`Cell Procedure/${idx}`,'正常',906,y+24,90,11,'Regular',C.ink);else tag(root,r[5].includes('过期')?'Danger':'Warning',r[5],892,y+21)});
text(root,'Pager Info','每页 20 条',830,830,70,10,'Regular',C.muted);button(root,'Secondary','上一页',900,820);text(root,'Page No','1 / 7',966,830,45,10,'Bold',C.ink);button(root,'Secondary','下一页',1005,820);

const detail=rect(root,'Quick Detail',1058,286,358,576,C.white,C.line,4);rect(root,'Detail Topline',1058,286,358,4,C.orange);text(root,'Detail Eyebrow','当前选中 · GG-2026-018',1078,310,250,10,'Regular',C.muted);text(root,'Detail Title','沪昆高速 K120 广告牌',1078,336,300,18,'Bold',C.ink);tag(root,'Neutral','在租',1078,373);
const photo=rect(root,'Photo Placeholder',1078,412,318,120,'#EEF2F4','#B8C6CD',3);text(root,'Photo Label','现场照片',1190,461,90,11,'Regular',C.muted);
const facts=[['所属路段','沪昆高速'],['运营单位','华东运营单位'],['合同桩号','K120+300'],['现场桩号','K120+350'],['批复桩号','K120+320']];facts.forEach((d,i)=>{const y=550+i*42;text(root,`Fact Label/${d[0]}`,d[0],1078,y,90,10,'Regular',C.muted);text(root,`Fact Value/${d[0]}`,d[1],1172,y-1,200,11,'Bold',C.ink);divider(root,1078,y+27,318)});
rect(root,'Procedure Notice',1078,763,318,48,'#EAF4EE');rect(root,'Notice Marker',1078,763,4,48,C.success);text(root,'Procedure Notice Text','手续状态正常\n路政审批、保险和年审均在有效期内',1092,771,286,10,'Regular',C.success,1.5);
button(root,'Primary','打开完整档案',1078,822);button(root,'Secondary','编辑',1238,822);

return {createdNodeIds,rootId:root.id,pageId:page.id,bounds:{width:root.width,height:root.height},instanceCounts:{buttons:6,inputs:3,statusTags:9}};
