<p align="center">
  <img src="https://midnight.network/img/midnight-logo.svg" alt="Midnight Network" width="200"/>
</p>

<h1 align="center">🌙 Midnight Starter Template</h1>

<p align="center">
  A full-stack privacy-preserving dApp built on the <a href="https://midnight.network">Midnight Network</a> — featuring smart contracts written in <strong>Compact</strong>, a React frontend, and a CLI toolchain.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Midnight-Compact-8B5CF6" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=nodedotjs&logoColor=white" />
</p>

<p align="center">
  <a href="#-what-is-this">About</a> · 
  <a href="#-what-it-does">What It Does</a> · 
  <a href="#-features">Features</a> · 
  <a href="#-getting-started">Quick Start</a> · 
  <a href="#-deployed-smart-contract">Smart Contract</a>
</p>

---

## 📖 What Is This?

This is a **production-ready starter template** for building decentralized applications on the **Midnight Network** — a blockchain designed from the ground up for **data protection and privacy**.

It demonstrates how to write, deploy, and interact with smart contracts using Midnight's unique **Compact** language, which supports both **public and private on-chain state** through zero-knowledge proofs.

> Whether you're a blockchain developer exploring Midnight for the first time or an experienced engineer looking for a clean project scaffold, this template gives you everything you need to go from zero to a working dApp.

---

## 🚀 What It Does

The template ships with **three smart contracts** and a **modern React frontend** to interact with them:

| Contract | Description |
|---|---|
| **Counter** | A simple counter with a public `round` state that can be incremented. Great for learning the basics. |
| **Recorder** | A privacy-aware resolution recorder — stores vote tallies (`yes`/`no`) in **private ledger state** and only reveals them on-demand via ZK proofs. |
| **Voting** | Extends the pattern for governance-style voting scenarios on-chain. |

### How the Privacy Works

```
Board votes on Resolution #42
         │
         ▼
┌─────────────────────────────────┐
│  record_resolution(yes=7, no=3) │
│                                 │
│  🔒 Private State (hidden):    │
│    yes_votes ← 7                │
│    no_votes  ← 3                │
│                                 │
│  🌐 Public Ledger (visible):   │
│    total_resolutions ← 42       │
└─────────────────────────────────┘
         │
         ▼  ZK proof generated
         │
   Regulator verifies proof ✓
         │
         ▼  Disclosure deadline passes
         │
┌─────────────────────────────────┐
│  reveal_outcome() → [7, 3]     │
│  Shareholders can now see       │
│  the vote breakdown             │
└─────────────────────────────────┘
```

The frontend connects via a **wallet widget**, lets users deploy new contract instances, call contract transitions (e.g., increment a counter), and observe both public and private state updates **in real time**.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Privacy-First Smart Contracts** | Written in [Compact](https://docs.midnight.network) — supports `private ledger` state hidden via zero-knowledge proofs alongside public on-chain data |
| ⚡ | **Modern React Frontend** | React 19 + Vite 6 + TanStack Router + Tailwind CSS 4 + shadcn/ui — with dark mode and responsive design |
| 👛 | **Wallet Integration** | Built-in wallet widget for connecting, managing keys, and signing transactions on Midnight |
| 🔁 | **Live State Subscriptions** | Real-time contract state updates via RxJS-powered observable subscriptions |
| 🧪 | **Full Test Suite** | Vitest-based tests covering deployments, wallets, ZK proof providers, and indexer queries |
| 📦 | **Monorepo Architecture** | npm workspaces + Turborepo for fast parallel builds across all packages |
| 🛠️ | **CLI Toolchain** | Interactive TUI for deploying contracts, setting up standalone environments, and configuration |
| 🧩 | **Multiple Contract Examples** | Counter → Recorder → Voting: a progression from simple to privacy-preserving patterns |

---

## 🏗️ Project Structure

```
midnight-starter-template/
│
├── counter-contract/           # 📜 Smart contracts & TypeScript bindings
│   ├── src/
│   │   ├── counter.compact         # Simple public counter contract
│   │   ├── recorder.compact        # Privacy-preserving vote recorder
│   │   └── managed/                # Compiled artifacts (provers, ZK IR, keys)
│   ├── deployment.json             # Deployed contract address & metadata
│   └── package.json
│
├── frontend-vite-react/        # 🖥️ React frontend (Vite + Tailwind + shadcn/ui)
│   ├── src/
│   │   ├── pages/                  # Counter, Home, and Wallet UI pages
│   │   ├── components/             # Reusable UI components
│   │   └── modules/midnight/       # SDK hooks & wallet widget integration
│   └── package.json
│
├── counter-cli/                # ⌨️ CLI tool for deployment & setup
│   ├── src/
│   │   ├── cli.ts                  # Command-line interface
│   │   └── tui_standalone.ts       # Interactive terminal UI
│   └── package.json
│
├── turbo.json                  # Turborepo pipeline configuration
├── vercel.json                 # Vercel deployment config
└── package.json                # Root workspace config
```

---

## 📋 Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥ 18 | JavaScript runtime |
| [npm](https://www.npmjs.com/) | ≥ 10 | Package manager |
| [Git LFS](https://git-lfs.com/) | Latest | Large file storage for ZK prover keys |
| [Lace Wallet](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg) | Latest | Midnight-compatible browser wallet extension |

---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd midnight-starter-template
npm install
```

### 2. Build the Smart Contracts

```bash
cd counter-contract
npm run build
```

### 3. Build the CLI *(optional)*

```bash
cd counter-cli
npm run build
```

### 4. Start the Frontend

```bash
npm run dev:frontend
```

The app will be available at **http://localhost:5173** 🎉

### 5. Build Everything *(one command)*

```bash
npm run build
```

> Uses Turborepo to build all packages in the correct dependency order.

---

## 📜 Deployed Smart Contract

| Property | Value |
|---|---|
| **Contract Address** | `b45963d3be44ce3c526ea872bb99ed86767d15d967271cc8e1e22d659dd85d4c` |
| **Network** | Midnight |
| **Deployed At** | February 14, 2026 |

---

## 🧪 Running Tests

```bash
cd counter-cli
npm run test
```

Tests cover:
- ✅ Contract deployment and interaction
- ✅ Wallet creation and tDUST transfers
- ✅ Public and private data providers
- ✅ Zero-knowledge proof generation & verification

---

## 🌐 Networks

| Network | How to Run |
|---|---|
| **Local (Standalone)** | `npm run setup-standalone` — spins up Node + Indexer + Proof Server via Docker |
| **Preview (Testnet)** | Configure `.env` with preview endpoints, fund wallet via [faucet](https://faucet.preview.midnight.network/) |

---

## 🔧 Available Scripts

| Script | Location | Description |
|---|---|---|
| `npm run build` | Root | Build all packages via Turborepo |
| `npm run dev:frontend` | Root | Start the Vite dev server |
| `npm run setup-standalone` | Root | Start local Midnight network (Docker) |
| `npm run build` | counter-contract | Compile Compact contracts |
| `npm run deploy` | counter-contract | Deploy counter contract to the network |
| `npm run test` | counter-cli | Run the full test suite |

---

## 📚 Tech Stack

| Technology | Purpose |
|---|---|
| [Midnight Network](https://midnight.network) | Privacy-preserving blockchain |
| [Compact](https://docs.midnight.network) | Smart contract language with ZK support |
| [React 19](https://react.dev) | UI framework |
| [Vite 6](https://vite.dev) | Frontend build tool |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com) | Component library |
| [TanStack Router](https://tanstack.com/router) | Type-safe file-based routing |
| [Turborepo](https://turbo.build) | Monorepo build orchestration |
| [Vitest](https://vitest.dev) | Testing framework |
| [RxJS](https://rxjs.dev) | Reactive state subscriptions |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. **Fork** the repository
2. **Create** your feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m 'Add amazing feature'`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is provided as a starter template. See individual package files for specific license information.

---

<p align="center">
  Built with 💜 on the <a href="https://midnight.network">Midnight Network</a><br/>
  <sub>Powered by <a href="https://eddalabs.io">Edda Labs</a> — Data Protection by Design</sub>
</p>
