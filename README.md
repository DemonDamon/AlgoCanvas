# AlgoCanvas
![](./assets/logo.webp)

> 让算法可视化，让学习更生动

## 项目起源
在算法学习的过程中，我们常常发现纯文字和代码难以直观地理解算法的运行过程。AlgoCanvas 正是为解决这个问题而生，它将抽象的算法转化为动态的可视化过程，让学习者能够"看见"算法的运作方式。

## 项目愿景
- 🎨 将算法转化为视觉艺术
- 🔍 深入理解算法内部运作
- 🎓 辅助教学与自主学习
- 🌈 让算法学习变得有趣

## 核心特性
- 算法运行过程实时可视化
- 交互式操作与控制
- 支持多种经典算法
- 直观的数据结构展示


让我帮你分析如何运行这个项目:

1. 这是一个使用 Vue 3 + TypeScript + Vite 构建的前端项目,主要用于可视化展示 Beam Search 算法。

2. 项目依赖:
- Vue 3
- TypeScript 
- Pinia (状态管理)
- Element Plus (UI组件库)
- D3.js (可视化库)

3. 运行步骤:

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

4. 项目结构分析:
- 入口文件: `src/main.ts`
- 主组件: `src/App.vue`
- 状态管理: `src/store/index.ts`
- 核心算法: 
  - `src/algorithms/beam-search.ts`
  - `src/algorithms/greedy-search.ts`
- 可视化组件:
  - `src/components/BeamSearch/BeamSearchVisualization.vue`
  - `src/components/GreedySearch/GreedySearchVisualization.vue`

5. 开发服务器配置:

```13:16:src/vite.config.ts
  server: {
    port: 5173,
    host: true
  }
```

服务器将在 http://localhost:5173 启动

6. 注意事项:
- 确保 Node.js 版本 >= 14.18.0
- 需要安装的开发工具:
  - TypeScript
  - Vite
  - Vue CLI

如果遇到任何问题,可以:
1. 检查 node_modules 是否正确安装
2. 检查 TypeScript 配置是否正确
3. 查看开发服务器控制台输出的错误信息