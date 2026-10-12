import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "file:///C:/Users/lin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const outDir = "C:/Users/lin/Documents/ChatGPT/公路广告牌项目/deliverables";
const qaDir = "C:/Users/lin/Documents/ChatGPT/公路广告牌项目/.xlsx-qa";
const outFile = `${outDir}/06_高速公路广告牌经营管理系统_Product_Backlog_V1.0.xlsx`;

const rows = [
  ["PB-001","项目基础","建立前后端仓库结构与质量门禁","作为开发团队，我希望项目具备统一目录、环境配置和自动检查，以便后续迭代保持一致。","Must","Sprint 0",3,"李嘉伟/刘俊义","待开始","无","仓库包含 Vue、FastAPI、测试和 Docker 基础结构；提交触发 lint、类型检查和单元测试；无真实密钥入库。"],
  ["PB-002","项目基础","建立数据库迁移与种子数据","作为开发团队，我希望数据库结构可版本化并能初始化基础字典。","Must","Sprint 0",3,"李嘉伟","待开始","PB-001","Alembic 可完成全新升级；基础角色和业务字典可重复初始化；失败不会留下半完成状态。"],
  ["PB-003","身份权限","用户登录与安全会话","作为用户，我希望通过账号密码安全登录，以访问被授权功能。","Must","Sprint 1",5,"刘俊义","待开始","PB-001","正确凭据可登录；错误凭据不泄露账号状态；会话过期需重新认证；登录行为写入审计日志。"],
  ["PB-004","身份权限","角色、菜单与数据权限","作为管理员，我希望配置角色的功能和数据范围，以控制业务访问。","Must","Sprint 1",8,"刘俊义","待开始","PB-003","权限由后端强制执行；支持一个用户多个角色；系统管理权限不自动授予全部业务数据；越权返回 403。"],
  ["PB-005","身份权限","用户与组织管理","作为管理员，我希望维护用户、部门和启停状态。","Should","Sprint 1",5,"刘俊义","待开始","PB-003","可新增、编辑、停用用户；停用后无法新建会话；已有业务记录保留原责任人。"],
  ["PB-006","广告牌资产","广告牌基础档案","作为运营人员，我希望维护广告牌编号、位置、规格和权属信息。","Must","Sprint 1",8,"李嘉伟","待开始","PB-002,PB-004","编号唯一；必填项校验；支持草稿和启用；新增修改均有审计记录。"],
  ["PB-007","广告牌资产","广告牌列表、筛选与导出","作为运营人员，我希望快速查询并导出权限范围内的广告牌。","Must","Sprint 1",5,"林家明","待开始","PB-006","支持编号、路线、区域、状态筛选；分页稳定；导出沿用当前筛选和数据权限。"],
  ["PB-008","广告牌资产","地图点位展示","作为运营人员，我希望在地图查看广告牌分布和状态。","Should","Sprint 2",8,"林家明","待开始","PB-006","点位与档案坐标一致；聚合展示；状态同时使用颜色和图标；点击打开详情。"],
  ["PB-009","广告牌资产","资产附件管理","作为运营人员，我希望上传照片、权属证明和图纸。","Should","Sprint 2",5,"李嘉伟","待开始","PB-006","文件保存 OSS；限制类型和大小；下载鉴权；删除保留审计记录。"],
  ["PB-010","客户管理","客户档案与联系人","作为合同人员，我希望维护客户主体、联系人和开票信息。","Must","Sprint 2",5,"李嘉伟","待开始","PB-004","客户名称支持重复提醒；联系人可多条；敏感字段脱敏展示；停用客户不能新建合同。"],
  ["PB-011","客户管理","客户合同与回款视图","作为合同人员，我希望从客户页查看其合同和回款摘要。","Should","Sprint 3",3,"林家明","待开始","PB-010,PB-015","金额与合同、收款明细一致；仅展示有权数据；支持跳转对应详情。"],
  ["PB-012","合同管理","创建合同草稿","作为合同人员，我希望选择客户和广告牌创建合同草稿。","Must","Sprint 2",8,"李嘉伟","待开始","PB-006,PB-010","同一广告牌租期冲突时阻止提交；金额和日期校验；草稿不占用正式经营状态。"],
  ["PB-013","合同管理","合同审批与驳回","作为审批人，我希望审核合同并记录意见。","Must","Sprint 2",8,"刘俊义","待开始","PB-012","仅授权审批人可处理；驳回必须填写原因；审批后记录不可覆盖；重复提交幂等。"],
  ["PB-014","合同管理","合同生效、变更与终止","作为合同人员，我希望管理合同完整生命周期并保留历史。","Must","Sprint 3",8,"李嘉伟","待开始","PB-013","生效后同步广告牌经营状态；变更生成新版本；终止记录原因与时间；历史版本可追溯。"],
  ["PB-015","财务管理","生成应收计划","作为财务人员，我希望按合同生成应收计划。","Must","Sprint 3",8,"刘俊义","待开始","PB-014","各期应收合计等于合同应收；日期和金额可复核；重复触发不生成重复记录。"],
  ["PB-016","财务管理","登记收款与核销","作为财务人员，我希望登记收款并分配到应收项目。","Must","Sprint 3",8,"刘俊义","待开始","PB-015","支持一次收款核销多期应收；不得超额核销；事务失败全部回滚；保留凭证。"],
  ["PB-017","财务管理","部分收款与退款冲销","作为财务人员，我希望处理部分收款、退款和冲销。","Must","Sprint 3",8,"刘俊义","待开始","PB-016","部分核销余额正确；退款不覆盖原收款；冲销建立关联记录；余额可对账。"],
  ["PB-018","财务管理","欠款与逾期预警","作为经营人员，我希望查看即将到期和已逾期应收。","Must","Sprint 3",5,"林家明","待开始","PB-015","逾期天数由规则计算；预警阈值可配置；支持客户、合同和责任人筛选。"],
  ["PB-019","巡检维护","巡检计划和任务","作为运营人员，我希望创建周期巡检计划并生成任务。","Should","Sprint 4",5,"李嘉伟","待开始","PB-006","计划可启停；按周期生成且不重复；任务分配到责任人；逾期可识别。"],
  ["PB-020","巡检维护","移动端巡检记录","作为巡检人员，我希望手机记录结果并上传现场照片。","Should","Sprint 4",8,"林家明","待开始","PB-019","支持手机浏览器；记录定位、时间、结果和图片；弱网失败保留输入并可重试。"],
  ["PB-021","巡检维护","缺陷与维修闭环","作为运营人员，我希望将巡检缺陷转为维修并跟踪关闭。","Should","Sprint 4",8,"李嘉伟","待开始","PB-020","缺陷关联广告牌和巡检；分派、处理中、验收、关闭状态可追溯；关闭需验收结果。"],
  ["PB-022","工作台报表","经营工作台","作为项目负责人，我希望查看待办、资产、合同和收款核心指标。","Must","Sprint 4",8,"林家明","待开始","PB-007,PB-014,PB-018","指标口径与明细一致；显示统计周期与更新时间；点击指标进入对应筛选结果。"],
  ["PB-023","工作台报表","经营分析报表","作为管理人员，我希望按路线、区域、客户和周期分析经营情况。","Should","Sprint 5",8,"林家明","待开始","PB-022","指标口径可见；筛选联动；导出结果与页面一致；无权限数据不参与汇总。"],
  ["PB-024","工作台报表","报表导出与异步任务","作为用户，我希望导出大数据量报表并查看生成进度。","Should","Sprint 5",5,"刘俊义","待开始","PB-023","大导出异步执行；显示进度和失败原因；下载链接有时效和权限校验。"],
  ["PB-025","AI 能力","大模型供应商配置","作为管理员，我希望通过 API Key 配置和测试不同模型。","Must","Sprint 5",5,"刘俊义","待开始","PB-004","支持 OpenAI 兼容端点、模型名和参数；密钥加密保存且仅显示末四位；可测试连接和停用。"],
  ["PB-026","AI 能力","合同文档解析草稿","作为合同人员，我希望上传合同后生成结构化字段草稿。","Should","Sprint 5",8,"李嘉伟","待开始","PB-012,PB-025","展示原文引用和置信提示；用户确认前不写正式合同；解析失败可人工录入。"],
  ["PB-027","AI 能力","经营知识检索与问答","作为用户，我希望按权限查询合同、制度和经营信息。","Should","Sprint 6",13,"李嘉伟","待开始","PB-025","回答附来源；检索继承用户权限；无依据时明确拒答；Milvus 不可用时降级为关键词检索。"],
  ["PB-028","AI 能力","风险解释与行动建议","作为管理人员，我希望 AI 解释系统计算出的风险并给出建议。","Could","Sprint 6",8,"林家明","待开始","PB-018,PB-027","风险事实由规则引擎提供；AI 不修改风险等级；回答区分事实与建议并记录模型调用。"],
  ["PB-029","审计安全","统一审计日志","作为审计人员，我希望追踪关键对象的查看和变更。","Must","Sprint 1",5,"刘俊义","待开始","PB-003","记录操作者、时间、对象、动作、前后状态和请求关联 ID；日志不可由普通管理员修改。"],
  ["PB-030","审计安全","敏感数据与日志脱敏","作为安全负责人，我希望敏感字段不出现在普通日志和无权界面。","Must","Sprint 1",5,"刘俊义","待开始","PB-001","API Key、手机号、身份证号按规则脱敏；异常日志不输出密钥；导出同样执行权限控制。"],
  ["PB-031","运维交付","Vercel 演示环境","作为项目负责人，我希望通过 GitHub 自动发布个人演示环境。","Should","Sprint 1",5,"林家明","待开始","PB-001","前端和轻量 FastAPI 可从主分支部署；仅使用测试或脱敏数据；环境变量由平台管理。"],
  ["PB-032","运维交付","阿里云生产部署模板","作为运维人员，我希望具备 ECS、RDS、Redis、OSS、Milvus 的部署模板。","Must","Sprint 5",13,"李嘉伟/刘俊义","待开始","PB-024","后端 Docker 化；服务健康检查；私网访问数据服务；配置与演示环境接口一致。"],
  ["PB-033","运维交付","监控、日志与告警","作为运维人员，我希望监控服务、任务和 AI 调用。","Should","Sprint 5",8,"刘俊义","待开始","PB-032","关键接口、数据库、队列、模型调用有指标；错误可关联请求；告警包含影响和处理入口。"],
  ["PB-034","数据迁移","基础档案导入","作为实施人员，我希望通过模板批量导入广告牌和客户数据。","Should","Sprint 4",8,"李嘉伟","待开始","PB-006,PB-010","导入前校验并给出行级错误；支持预览；重复编号不覆盖；结果可追踪。"],
  ["PB-035","数据迁移","合同与应收迁移核对","作为实施人员，我希望迁移存量合同和应收并完成对账。","Must","Sprint 5",13,"李嘉伟/祝贺","待开始","PB-014,PB-015","迁移前后合同数、应收总额和关键状态一致；异常单独清单；正式导入可回滚。"],
];

const wb = Workbook.create();
const summary = wb.worksheets.add("Sprint计划");
const backlog = wb.worksheets.add("Product Backlog");
summary.showGridLines = false;
backlog.showGridLines = false;
summary.tabColor = "#CC785C";
backlog.tabColor = "#A9583E";

backlog.getRange("A1:K1").values = [["编号","Epic","Backlog 项","用户故事","优先级","建议迭代","故事点","建议负责人","状态","依赖","验收标准"]];
backlog.getRange(`A2:K${rows.length + 1}`).values = rows;
const table = backlog.tables.add(`A1:K${rows.length + 1}`, true, "ProductBacklogTable");
table.style = "TableStyleMedium2";
table.showFilterButton = true;
backlog.freezePanes.freezeRows(1);
backlog.freezePanes.freezeColumns(2);
backlog.getRange(`A1:K${rows.length + 1}`).format.font = { name: "Microsoft YaHei", size: 10, color: "#3D3D3A" };
backlog.getRange("A1:K1").format = { fill: "#181715", font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FAF9F5" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
backlog.getRange(`A2:K${rows.length + 1}`).format.verticalAlignment = "top";
backlog.getRange(`D2:D${rows.length + 1}`).format.wrapText = true;
backlog.getRange(`K2:K${rows.length + 1}`).format.wrapText = true;
backlog.getRange(`A2:A${rows.length + 1}`).format.horizontalAlignment = "center";
backlog.getRange(`E2:J${rows.length + 1}`).format.horizontalAlignment = "center";
backlog.getRange(`G2:G${rows.length + 1}`).format.numberFormat = "0";
backlog.getRange(`E2:E${rows.length + 1}`).dataValidation = { rule: { type: "list", values: ["Must","Should","Could","Won't"] } };
backlog.getRange(`I2:I${rows.length + 1}`).dataValidation = { rule: { type: "list", values: ["待开始","进行中","待验收","已完成","已阻塞"] } };
backlog.getRange(`E2:E${rows.length + 1}`).conditionalFormats.add("containsText", { text: "Must", format: { fill: "#FCE8E3", font: { color: "#A9583E", bold: true } } });
backlog.getRange(`I2:I${rows.length + 1}`).conditionalFormats.add("containsText", { text: "已阻塞", format: { fill: "#F9DEDE", font: { color: "#C64545", bold: true } } });
backlog.getRange(`I2:I${rows.length + 1}`).conditionalFormats.add("containsText", { text: "已完成", format: { fill: "#E3F2E7", font: { color: "#3F8F5B", bold: true } } });

const widths = [12,16,28,46,11,12,9,18,11,18,62];
for (let i = 0; i < widths.length; i++) backlog.getRangeByIndexes(0,i,rows.length+1,1).format.columnWidth = widths[i];
backlog.getRange("1:1").format.rowHeight = 34;
backlog.getRange(`2:${rows.length + 1}`).format.rowHeight = 56;

summary.getRange("B2:J2").merge();
summary.getRange("B2").values = [["高速公路广告牌经营管理系统 Product Backlog"]];
summary.getRange("B2:J2").format = { font: { name: "Microsoft YaHei", size: 16, bold: true, color: "#141413" }, verticalAlignment: "center" };
summary.getRange("B3:J3").format.borders = { bottom: { style: "thin", color: "#CC785C" } };
summary.getRange("B5:J5").values = [["指标","总 Backlog","Must","Should","总故事点","Sprint 1 条目","Sprint 1 故事点","未开始","当前版本"]];
summary.getRange("B6:J6").formulas = [["=\"规模\"",`=COUNTA('Product Backlog'!$A$2:$A$${rows.length+1})`,`=COUNTIF('Product Backlog'!$E$2:$E$${rows.length+1},\"Must\")`,`=COUNTIF('Product Backlog'!$E$2:$E$${rows.length+1},\"Should\")`,`=SUM('Product Backlog'!$G$2:$G$${rows.length+1})`,`=COUNTIF('Product Backlog'!$F$2:$F$${rows.length+1},\"Sprint 1\")`,`=SUMIF('Product Backlog'!$F$2:$F$${rows.length+1},\"Sprint 1\",'Product Backlog'!$G$2:$G$${rows.length+1})`,`=COUNTIF('Product Backlog'!$I$2:$I$${rows.length+1},\"待开始\")`,`=\"V1.0\"`]];
summary.getRange("B5:J5").format = { fill: "#181715", font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FAF9F5" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
summary.getRange("B6:J6").format = { fill: "#F5F0E8", font: { name: "Microsoft YaHei", size: 12, bold: true, color: "#141413" }, horizontalAlignment: "center", verticalAlignment: "center" };
summary.getRange("B8:G8").values = [["迭代","目标","主要范围","条目数","故事点","出口条件"]];
const sprints = [
  ["Sprint 0","建立可持续开发基线","工程骨架、迁移和质量门禁",null,null,"主干构建和测试通过，环境可重复初始化"],
  ["Sprint 1","完成安全基础与资产最小闭环","登录权限、用户组织、广告牌档案、列表、审计、脱敏、演示部署",null,null,"授权用户能安全维护和查询广告牌；越权、审计和部署测试通过"],
  ["Sprint 2","形成客户与合同审批闭环","地图、附件、客户、合同草稿与审批",null,null,"合同可由草稿进入审批并阻止点位租期冲突"],
  ["Sprint 3","形成合同履约和回款闭环","合同变更、应收、核销、退款冲销、逾期预警",null,null,"合同金额与应收、收款、余额可对账"],
  ["Sprint 4","形成运营执行与管理看板","巡检维修、工作台、基础数据导入",null,null,"巡检问题可闭环，核心指标可追溯到明细"],
  ["Sprint 5","具备 AI 前置能力和生产交付条件","报表、大模型配置、合同解析、阿里云部署、监控与迁移",null,null,"生产部署和数据迁移验收通过，AI 仅生成可确认草稿"],
  ["Sprint 6","上线权限内 RAG 与风险解释","知识检索问答、风险解释",null,null,"回答有来源、不越权，事实与建议明确分离"],
];
summary.getRange("B9:G15").values = sprints;
for (let r = 9; r <= 15; r++) {
  summary.getRange(`E${r}`).formulas = [[`=COUNTIF('Product Backlog'!$F$2:$F$${rows.length+1},B${r})`]];
  summary.getRange(`F${r}`).formulas = [[`=SUMIF('Product Backlog'!$F$2:$F$${rows.length+1},B${r},'Product Backlog'!$G$2:$G$${rows.length+1})`]];
}
summary.getRange("B8:G8").format = { fill: "#CC785C", font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center" };
summary.getRange("B9:G15").format = { font: { name: "Microsoft YaHei", size: 10, color: "#3D3D3A" }, verticalAlignment: "top", wrapText: true };
summary.getRange("B8:G15").format.borders = { preset: "inside", style: "thin", color: "#E6DFD8" };
summary.getRange("B17:G17").merge();
summary.getRange("B17").values = [["Sprint 1 建议范围"]];
summary.getRange("B17:G17").format = { fill: "#181715", font: { name: "Microsoft YaHei", size: 11, bold: true, color: "#FAF9F5" } };
summary.getRange("B18:G21").values = [
  ["目标","建立可登录、可授权、可审计的广告牌资产最小闭环","","","",""],
  ["团队分工","林家明：交互与验收；李嘉伟：资产与迁移；刘俊义：认证权限与审计；祝贺：测试设计和验收","","","",""],
  ["演示路径","登录 → 进入广告牌列表 → 新增广告牌 → 筛选查询 → 查看审计记录 → 权限拒绝验证","","","",""],
  ["风险控制","Sprint 1 不接真实客户数据；Vercel 仅保存测试或脱敏数据；生产云资源在正式数据接入前完成","","","",""],
];
for (let r=18; r<=21; r++) summary.getRange(`C${r}:G${r}`).merge();
summary.getRange("B18:G21").format = { font: { name: "Microsoft YaHei", size: 10, color: "#3D3D3A" }, verticalAlignment: "top", wrapText: true };
summary.getRange("B18:B21").format.font = { name: "Microsoft YaHei", size: 10, bold: true, color: "#A9583E" };
summary.getRange("B2:J21").format.font.name = "Microsoft YaHei";
summary.getRange("B5:J6").format.borders = { preset: "all", style: "thin", color: "#E6DFD8" };
summary.getRange("B8:G15").format.borders = { preset: "all", style: "thin", color: "#E6DFD8" };
summary.getRange("B17:G21").format.borders = { preset: "all", style: "thin", color: "#E6DFD8" };
const summaryWidths = [3,15,28,28,12,12,56,14,14,14];
for (let i=0;i<summaryWidths.length;i++) summary.getRangeByIndexes(0,i,24,1).format.columnWidth = summaryWidths[i];
summary.getRange("2:2").format.rowHeight = 30;
summary.getRange("5:6").format.rowHeight = 34;
summary.getRange("8:8").format.rowHeight = 30;
summary.getRange("9:15").format.rowHeight = 52;
summary.getRange("18:21").format.rowHeight = 44;

wb.recalculate();
await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(qaDir, { recursive: true });
const inspect = await wb.inspect({ kind: "table", sheetId: "Sprint计划", range: "B2:J21", include: "values,formulas", tableMaxRows: 24, tableMaxCols: 12, maxChars: 12000 });
console.log(inspect.ndjson);
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "formula errors" });
console.log(errors.ndjson);
for (const [sheetName, range, file] of [["Sprint计划","A1:J22","sprint-plan.png"],["Product Backlog","A1:K18","product-backlog.png"]]) {
  const preview = await wb.render({ sheetName, range, scale: 1.2, format: "png" });
  await fs.writeFile(`${qaDir}/${file}`, new Uint8Array(await preview.arrayBuffer()));
}
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outFile);
console.log(outFile);
