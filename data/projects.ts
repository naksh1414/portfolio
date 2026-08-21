export interface Project {
  name: string
  date: string
  status: string
  problem: string
  approach: string
  result: string
  stack: string[]
}

export const projects: Project[] = [
  {
    name: "Bus Tech",
    date: "Dec 2024",
    status: "WON SIH 2024",
    problem:
      "Delhi Transport Corporation needed automated duty scheduling and route management for its bus fleet — manual rostering wasted driver and conductor hours and had no live route visualization.",
    approach:
      "Built a Node.js/Next.js microservices system with intelligent duty allocation and rotation for drivers and conductors, plus a self-hosted tile server as a zero-dependency Google Maps alternative for real-time route visualization.",
    result: "Won SIH 2024, India's largest national hackathon.",
    stack: ["Java", "Node.js", "Next.js", "TypeScript", "Docker", "RabbitMQ", "Redis", "Microservices"],
  },
  {
    name: "Smart Load Balancer",
    date: "Nov 2024",
    status: "SHIPPED",
    problem:
      "Microservices need traffic routed reliably under high concurrency, with no single point of failure and zero-downtime deploys.",
    approach:
      "Engineered a Node.js/Nginx load balancer implementing Round Robin, Least Connections, and IP Hash routing with adaptive health checks, plus kernel-level TCP tuning and connection pooling.",
    result: "Automatic failover with maximized throughput and reduced packet loss under high-concurrency workloads.",
    stack: ["Node.js", "TypeScript", "Nginx", "Docker", "Redis", "Microservices"],
  },
  {
    name: "Pharmansh",
    date: "Nov 2024",
    status: "LIVE · 10K+ USERS",
    problem:
      "A pharmacy's warehouse operation needed to survive 10,000+ concurrent users during peak events without downtime, while tracking inventory end-to-end.",
    approach:
      "Architected performance optimizations across a Node.js/Next.js/Azure stack and delivered a full inbound-to-outbound warehouse management system with automated inventory tracking, batch/expiry tracking, and demand-forecasting reorder logic.",
    result: "Sustained 10,000+ concurrent users with zero downtime and minimized stock wastage.",
    stack: ["Node.js", "Next.js", "TypeScript", "Docker", "Azure", "Cosmos DB", "Nginx"],
  },
  {
    name: "DecentraPay",
    date: "Oct 2024",
    status: "SHIPPED",
    problem:
      "Peer-to-peer ETH payments needed a trustless flow with no centralized intermediary and no room for contract-level exploits.",
    approach:
      "Wrote a custom Solidity smart contract with owner-gated transfer logic and zero-address/balance validation, wired to a React + Vite frontend via Web3.js for wallet connection.",
    result: "A working decentralized payment gateway with tamper-resistant, owner-only-controlled on-chain transfers.",
    stack: ["React.js", "Vite", "Solidity", "Web3.js", "Ethereum", "JavaScript"],
  },
  {
    name: "Trello Clone",
    date: "Aug 2024",
    status: "SHIPPED",
    problem:
      "Teams needed a Trello-style board that also surfaced workload insight automatically, not just task tracking.",
    approach:
      "Built drag-and-drop kanban boards on Next.js + Appwrite with real-time persistence, integrated the OpenAI API to auto-generate task summaries, and used Zustand for typed, end-to-end state management.",
    result: "A full-featured kanban app where AI-generated summaries surface workload insight directly in the UI.",
    stack: ["Next.js", "TypeScript", "Appwrite", "OpenAI API", "Zustand", "Tailwind CSS"],
  },
]
