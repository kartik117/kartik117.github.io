export const projects = [
  {
    id: 'provenance',
    title: 'Provenance',
    description:
      'Multi-agent LangGraph research assistant that searches, filters, and synthesizes findings from academic papers — a citation-verification agent grounds every claim against its source before showing it to you, achieving 0.81 RAGAS faithfulness.',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'Gemini', 'Streamlit', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/kartik117/Provenance',
    categories: ['ai'],
    status: 'live',
  },
  {
    id: 'repomindmcp',
    title: 'RepoMind MCP',
    description:
      'Codebase intelligence tool that parses GitHub repos into a Neo4j knowledge graph (functions, classes, calls, imports, inheritance) and exposes it as an MCP server, so Claude Desktop and Cursor can answer structural questions grounded in the real graph.',
    technologies: ['Python', 'TypeScript', 'Neo4j', 'MCP SDK', 'FastAPI', 'Docker', 'GitHub Actions'],
    github: 'https://github.com/kartik117/RepoMindMCP',
    categories: ['ai', 'devtools'],
    status: 'live',
  },
  {
    id: 'medallionnyc',
    title: 'MedallionNYC',
    description:
      'Medallion lakehouse (Bronze/Silver/Gold) over 10M+ real NYC TLC taxi trip records, orchestrated with Airflow and built on Delta Lake for ACID transactions and time travel — used to quantify how taxi demand shifted by zone after 2025 congestion pricing.',
    technologies: ['PySpark', 'Delta Lake', 'Airflow', 'DuckDB', 'Docker'],
    github: 'https://github.com/kartik117/MedallionNYC',
    categories: ['data'],
    status: 'live',
  },
  {
    id: 'webapp',
    title: 'Webapp',
    description:
      'Assignment management REST API (accounts, assignments, submissions with deadline/attempt validation) backed by Sequelize/MySQL, with AWS SNS + CloudWatch observability and a Packer + GitHub Actions pipeline that builds and ships AMIs.',
    technologies: ['Node.js', 'Express', 'Sequelize', 'AWS', 'Packer', 'GitHub Actions'],
    github: 'https://github.com/kartik117/webapp',
    categories: ['infra'],
    status: 'live',
  },
  {
    id: 'medfinetune',
    title: 'MedFineTune',
    description:
      'QLoRA fine-tuning of an open LLM on clinical QA data (PubMedQA + MedQA), served through a vLLM OpenAI-compatible endpoint — in progress.',
    technologies: ['PyTorch', 'QLoRA', 'vLLM', 'Hugging Face'],
    github: null,
    categories: ['ai'],
    status: 'in-progress',
  },
  {
    id: 'dotboard',
    title: 'Dotboard',
    description:
      'Real-time collaborative pixel-art board with a Go WebSocket server broadcasting live updates to concurrent users, with per-user rate limiting and persisted board state — up next.',
    technologies: ['Go', 'WebSockets'],
    github: null,
    categories: ['infra'],
    status: 'planned',
  },
];

export const featuredProjects = projects.filter((p) => p.status === 'live');
