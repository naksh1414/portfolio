export interface SkillCategory {
  name: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  { name: "Languages", items: ["Java", "C", "TypeScript", "JavaScript", "SQL", "NoSQL"] },
  { name: "Infrastructure", items: ["Docker", "Nginx", "Linux", "Redis", "RabbitMQ", "Microservices"] },
  { name: "Frameworks", items: ["Node.js", "Express.js", "Next.js", "React.js", "Redux"] },
  { name: "Cloud & DevOps", items: ["Azure", "Cosmos DB", "CI/CD", "GitHub", "GitLab", "Jira"] },
  { name: "AI / ML Tools", items: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face Transformers"] },
]
