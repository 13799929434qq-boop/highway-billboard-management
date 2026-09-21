# 分阶段采用 Vercel 和阿里云部署

项目个人开发和试用阶段将 Vue Vite 前端与 FastAPI 后端部署在 Vercel，并连接测试用途的企业级外部设施，以获得低运维成本、预览部署和快速迭代能力。客户正式使用或存储真实合同及财务数据之前，前端迁移至阿里云 OSS 与 CDN，FastAPI 以 Docker 部署至阿里云 ECS，并通过内网连接 RDS MySQL、Redis、OSS 和 Milvus；此选择在早期效率、Vercel Python Runtime 的 Beta 风险、国内网络质量及数据安全之间取得平衡。
