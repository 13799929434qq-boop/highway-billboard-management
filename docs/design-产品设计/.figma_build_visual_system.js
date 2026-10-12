const createdNodeIds = [];
const hex = h => { const n=parseInt(h.replace('#',''),16); return {r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255}; };
const paint = h => [{type:'SOLID',color:hex(h)}];
const C = {ink:'#18242C',muted:'#66757E',nav:'#152A35',blue:'#225F7D',blueSoft:'#EAF2F6',orange:'#C5612F',paper:'#F5F7F8',white:'#FFFFFF',line:'#D7DFE3',line2:'#AAB8C0',success:'#2F7352',successBg:'#EAF4EE',warning:'#9B551F',warningBg:'#FFF1E7',danger:'#A73E36',dangerBg:'#FBECEB'};

await Promise.all([
  figma.loadFontAsync({family:'Noto Sans SC',style:'Regular'}),
  figma.loadFontAsync({family:'Noto Sans SC',style:'Medium'}),
  figma.loadFontAsync({family:'Noto Sans SC',style:'Bold'}),
  figma.loadFontAsync({family:'Inter',style:'Regular'}),
  figma.loadFontAsync({family:'Inter',style:'Semi Bold'})
]);

const page = figma.currentPage;
page.name = '01 视觉规范';
const screenPage = figma.createPage(); screenPage.name='02 广告牌台账';

const collection = figma.variables.createVariableCollection('Product UI');
collection.renameMode(collection.modes[0].modeId,'Light');
const modeId = collection.modes[0].modeId;
const vars=[];
function colorVar(name,value,scopes){ const v=figma.variables.createVariable(name,collection,'COLOR'); v.scopes=scopes; v.setValueForMode(modeId,{...hex(value),a:1}); vars.push(v); return v; }
function numVar(name,value,scopes){ const v=figma.variables.createVariable(name,collection,'FLOAT'); v.scopes=scopes; v.setValueForMode(modeId,value); vars.push(v); return v; }
colorVar('color/text/primary',C.ink,['TEXT_FILL']);
colorVar('color/text/secondary',C.muted,['TEXT_FILL']);
colorVar('color/surface/page',C.paper,['FRAME_FILL','SHAPE_FILL']);
colorVar('color/surface/base',C.white,['FRAME_FILL','SHAPE_FILL']);
colorVar('color/navigation/base',C.nav,['FRAME_FILL','SHAPE_FILL']);
colorVar('color/action/primary',C.blue,['FRAME_FILL','SHAPE_FILL']);
colorVar('color/accent/identity',C.orange,['FRAME_FILL','SHAPE_FILL']);
colorVar('color/border/default',C.line,['STROKE_COLOR']);
colorVar('color/state/success',C.success,['FRAME_FILL','SHAPE_FILL','TEXT_FILL']);
colorVar('color/state/warning',C.warning,['FRAME_FILL','SHAPE_FILL','TEXT_FILL']);
colorVar('color/state/danger',C.danger,['FRAME_FILL','SHAPE_FILL','TEXT_FILL']);
[4,8,12,16,24,32].forEach(v=>numVar(`space/${v}`,v,['GAP']));
[2,4,6].forEach(v=>numVar(`radius/${v}`,v,['CORNER_RADIUS']));

function frame(name,x,y,w,h,fill=C.white,stroke=null,r=0){ const f=figma.createFrame(); f.name=name; f.x=x; f.y=y; f.resize(w,h); f.fills=paint(fill); if(stroke){f.strokes=paint(stroke);f.strokeWeight=1;} if(r)f.cornerRadius=r; createdNodeIds.push(f.id); return f; }
function rect(parent,name,x,y,w,h,fill,stroke=null,r=0){ const n=figma.createRectangle(); n.name=name; n.x=x;n.y=y;n.resize(w,h);n.fills=paint(fill);if(stroke){n.strokes=paint(stroke);n.strokeWeight=1;}if(r)n.cornerRadius=r;parent.appendChild(n);createdNodeIds.push(n.id);return n; }
function text(parent,name,value,x,y,w,size=14,weight='Regular',color=C.ink,line=1.45,family='Noto Sans SC'){ const t=figma.createText();t.name=name;t.fontName={family,style:weight};t.characters=value;t.fontSize=size;t.lineHeight={unit:'PERCENT',value:line*100};t.fills=paint(color);t.x=x;t.y=y;t.resize(w,10);t.textAutoResize='HEIGHT';parent.appendChild(t);createdNodeIds.push(t.id);return t; }
function rule(parent,x,y,w,color=C.line,h=1){return rect(parent,'Divider',x,y,w,h,color);}

const root=frame('产品视觉设计规范 V2.0',0,0,1440,2200,C.paper);
rect(root,'Sidebar',0,0,232,2200,C.nav);
text(root,'Brand','高速公路广告牌\n经营管理系统',28,32,170,17,'Bold',C.white,1.35);
text(root,'Version','产品视觉设计规范 · V2.0',28,88,170,11,'Regular','#91A3AD');
rule(root,20,126,192,'#3C4F59');
const navItems=['设计原则','色彩系统','字体层级','间距与形状','页面骨架','基础组件','数据表格','表单与状态'];
navItems.forEach((n,i)=>{ if(i===0)rect(root,'Nav Active',18,160+i*42,196,36,C.white,null,2); if(i===0)rect(root,'Nav Marker',18,160+i*42,4,36,C.orange); text(root,`Nav/${n}`,n,30,168+i*42,160,12,i===0?'Bold':'Regular',i===0?C.ink:'#C6D2D8'); });
text(root,'Scope','适用范围：P1–P8 桌面端\n需求范围以 TAPD 基线为准\n目标视口：1440 × 900',28,2050,175,10,'Regular','#8FA1AB',1.7);

const contentX=232, contentW=1208;
rect(root,'Hero',contentX,0,contentW,326,C.white); rect(root,'Hero Topline',contentX,0,contentW,7,C.blue);
text(root,'Eyebrow','PRODUCT VISUAL STANDARD / 02',284,56,480,11,'Semi Bold',C.blue,1.2,'Inter');
text(root,'Hero Title','让复杂业务保持清楚、稳定和可追溯',284,94,850,38,'Bold',C.ink,1.25);
text(root,'Hero Description','需求基线决定做什么，视觉规范决定如何清晰地呈现。\n统一颜色、字体、间距、组件和页面骨架，让设计、前端与 AI 使用同一套规则。',284,160,780,15,'Regular',C.muted,1.7);
rule(root,284,258,1100);
[['版本','V2.0 · 评审稿'],['目标视口','1440 × 900'],['基础网格','4px'],['适用对象','设计 · 前端 · AI']].forEach((d,i)=>{text(root,`Meta Label/${d[0]}`,d[0],284+i*275,274,220,10,'Regular',C.muted);text(root,`Meta Value/${d[0]}`,d[1],284+i*275,294,220,12,'Bold',C.ink);});

text(root,'Section 01','01 / FOUNDATION',284,372,180,11,'Semi Bold',C.orange,1.2,'Inter');
text(root,'Section 01 Title','颜色与文字',456,360,420,26,'Bold',C.ink);
text(root,'Section 01 Desc','中性色承担主要界面，路牌蓝负责操作和选择，施工橙只作为少量识别锚点。',456,402,780,13,'Regular',C.muted);
const swatches=[['主文字',C.ink],['导航底色',C.nav],['主操作',C.blue],['识别锚点',C.orange],['页面背景',C.paper],['成功',C.success],['临期',C.warning],['失败',C.danger]];
swatches.forEach((d,i)=>{const col=i%4,row=Math.floor(i/4);const x=284+col*270,y=452+row*122;rect(root,`Swatch/${d[0]}`,x,y,248,76,d[1],i===4?C.line:null,4);text(root,`Swatch Label/${d[0]}`,d[0],x,y+84,140,11,'Bold',C.ink);text(root,`Swatch Hex/${d[0]}`,d[1],x+144,y+84,100,10,'Regular',C.muted,1.2,'Inter');});
rule(root,284,710,1100);
text(root,'Type Label','字体层级',284,746,150,14,'Bold',C.ink);
const types=[['页面标题','广告牌台账','22 / 30 · Bold',22,'Bold'],['区域标题','三个桩号','16 / 24 · Bold',16,'Bold'],['正文','查询、查看和维护广告牌正式档案。','14 / 22 · Regular',14,'Regular'],['辅助信息','当前数据范围：华东运营单位','12 / 20 · Regular',12,'Regular']];
types.forEach((d,i)=>{const y=790+i*58;text(root,`Type Role/${d[0]}`,d[0],284,y,130,10,'Regular',C.muted);text(root,`Type Sample/${d[0]}`,d[1],456,y-4,560,d[3],d[4],C.ink);text(root,`Type Spec/${d[0]}`,d[2],1190,y,190,10,'Regular',C.muted,1.2,'Inter');rule(root,284,y+40,1100);});

text(root,'Section 02','02 / COMPONENTS',284,1056,180,11,'Semi Bold',C.orange,1.2,'Inter');
text(root,'Section 02 Title','基础组件',456,1044,420,26,'Bold',C.ink);
text(root,'Section 02 Desc','精确边缘、轻微物理反馈、清楚的默认与异常状态。每个区域最多一个主按钮。',456,1086,820,13,'Regular',C.muted);
const compPanel=frame('Components',284,1140,1100,660,C.white,C.line,6);root.appendChild(compPanel);compPanel.x=284;compPanel.y=1140;
text(compPanel,'Buttons Title','按钮',24,22,200,14,'Bold',C.ink);text(compPanel,'Buttons Spec','36H · 4R · 1B',850,24,210,10,'Regular',C.muted,1.2,'Inter');rule(compPanel,24,58,1052);

function buttonComponent(name,label,bg,border,fg,x,y){ const c=figma.createComponent();c.name=name;c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='AUTO';c.paddingLeft=16;c.paddingRight=16;c.paddingTop=9;c.paddingBottom=9;c.itemSpacing=8;c.fills=paint(bg);c.strokes=paint(border);c.strokeWeight=1;c.cornerRadius=4; const t=figma.createText();t.fontName={family:'Noto Sans SC',style:'Medium'};t.characters=label;t.fontSize=12;t.fills=paint(fg);c.appendChild(t);compPanel.appendChild(c);c.x=x;c.y=y;createdNodeIds.push(c.id,t.id);return c;}
const bp=buttonComponent('Type=Primary','保存档案',C.blue,'#194C65',C.white,24,82);
const bs=buttonComponent('Type=Secondary','取消',C.white,C.line2,C.ink,140,82);
const bd=buttonComponent('Type=Danger','确认作废',C.white,'#C47770',C.danger,220,82);
const buttonSet=figma.combineAsVariants([bp,bs,bd],compPanel);buttonSet.name='Button';buttonSet.description='页面与区域操作按钮。每个区域最多使用一个 Primary。';buttonSet.x=24;buttonSet.y=82;createdNodeIds.push(buttonSet.id);

text(compPanel,'Inputs Title','输入与选择',24,190,200,14,'Bold',C.ink);rule(compPanel,24,224,1052);
function inputComponent(name,placeholder,x,y,w=270){const c=figma.createComponent();c.name=name;c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.resize(w,36);c.paddingLeft=11;c.paddingRight=11;c.counterAxisAlignItems='CENTER';c.fills=paint(C.white);c.strokes=paint(C.line2);c.strokeWeight=1;c.cornerRadius=4;const t=figma.createText();t.fontName={family:'Noto Sans SC',style:'Regular'};t.characters=placeholder;t.fontSize=12;t.fills=paint(C.muted);c.appendChild(t);compPanel.appendChild(c);c.x=x;c.y=y;c.description='默认输入框。标签位于控件上方，错误说明位于控件下方。';createdNodeIds.push(c.id,t.id);return c;}
const inputComp=inputComponent('Input/Default','广告牌编号或名称',24,250,286);
text(compPanel,'Field Label','广告牌编号 *',24,238,180,10,'Bold',C.ink);
const selectComp=inputComponent('Select/Default','全部路段　⌄',336,250,220);
text(compPanel,'Select Label','所属路段',336,238,180,10,'Bold',C.ink);
const errorComp=inputComponent('Input/Error','GG-2026-018',582,250,286);errorComp.strokes=paint(C.danger);
text(compPanel,'Error Label','广告牌编号 *',582,238,180,10,'Bold',C.ink);text(compPanel,'Error Help','该编号已经存在，请修改后保存。',582,292,286,10,'Regular',C.danger);

text(compPanel,'Status Title','状态标签',24,350,200,14,'Bold',C.ink);rule(compPanel,24,384,1052);
function tagComponent(name,label,bg,fg,x){const c=figma.createComponent();c.name=name;c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='AUTO';c.paddingLeft=9;c.paddingRight=9;c.paddingTop=5;c.paddingBottom=5;c.fills=paint(bg);c.strokes=paint(fg);c.strokeWeight=.6;c.cornerRadius=99;const dot=figma.createEllipse();dot.resize(6,6);dot.fills=paint(fg);c.appendChild(dot);const t=figma.createText();t.fontName={family:'Noto Sans SC',style:'Regular'};t.characters=label;t.fontSize=10;t.fills=paint(fg);c.appendChild(t);c.itemSpacing=6;compPanel.appendChild(c);c.x=x;c.y=410;createdNodeIds.push(c.id,dot.id,t.id);return c;}
const t0=tagComponent('State=Neutral','暂停经营','#F0F3F4','#53646D',24),t1=tagComponent('State=Success','有效',C.successBg,C.success,126),t2=tagComponent('State=Warning','保险将到期',C.warningBg,C.warning,204),t3=tagComponent('State=Danger','审批已过期',C.dangerBg,C.danger,318);
const statusSet=figma.combineAsVariants([t0,t1,t2,t3],compPanel);statusSet.name='Status Tag';statusSet.description='状态必须同时使用文字和颜色，不允许只靠颜色判断。';statusSet.x=24;statusSet.y=410;createdNodeIds.push(statusSet.id);
text(compPanel,'Tabs Title','对象内标签页',24,500,200,14,'Bold',C.ink);rule(compPanel,24,534,1052);
const tabNames=['基本信息','三类手续','现场照片','资产变动','操作记录'];tabNames.forEach((n,i)=>{if(i===0){rect(compPanel,'Tab Active',24+i*110,554,104,44,C.white,C.line2,4);rect(compPanel,'Tab Marker',36+i*110,554,80,3,C.blue);}text(compPanel,`Tab/${n}`,n,38+i*110,567,90,11,i===0?'Bold':'Regular',i===0?C.blue:C.muted);});rule(compPanel,24,597,650,C.line2);

text(root,'Section 03','03 / LAYOUT',284,1870,180,11,'Semi Bold',C.orange,1.2,'Inter');
text(root,'Section 03 Title','标准页面骨架',456,1858,420,26,'Bold',C.ink);
text(root,'Section 03 Desc','208px 左侧导航、56px 顶栏、24px 内容边距；标题、筛选、表格与分页保持同一左边界。',456,1900,840,13,'Regular',C.muted);
const mini=frame('Layout Anatomy',284,1950,1100,210,C.white,C.line2,4);root.appendChild(mini);mini.x=284;mini.y=1950;
rect(mini,'Mini Sidebar',0,0,165,210,C.nav);rect(mini,'Mini Topbar',165,0,935,44,C.white);rule(mini,165,44,935);rect(mini,'Mini Page Title',190,66,260,24,'#DCE5E9');rect(mini,'Mini Action',978,66,96,28,C.blue);rect(mini,'Mini Filter',190,108,884,38,C.white,C.line);rect(mini,'Mini Table',190,158,884,34,'#E8EDF0',C.line);

return {createdNodeIds,pageIds:{visual:page.id,screen:screenPage.id},rootId:root.id,componentIds:{buttonSet:buttonSet.id,input:inputComp.id,select:selectComp.id,statusSet:statusSet.id},variableCollectionId:collection.id,variableCount:vars.length,rootBounds:{width:root.width,height:root.height}};
