export interface Chapter {
  slug: string;
  number: number;
  title: string;
  readTime: string;
  summary: string;
  publishedAt: string;
  headings?: { id: string; title: string; level: number }[];
  content?: string;
}

export interface SeriesPart {
  id: string;
  partNumber: string; // e.g. "PART I"
  title: string; // e.g. "THE BIG PICTURE"
  chapters: Chapter[];
}

export interface Series {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  eyebrow: string;
  status: "Ongoing" | "Completed";
  articleCount: number;
  totalReadTime: string;
  featured?: boolean;
  parts: SeriesPart[];
}

export interface BlogPost {
  slug: string;
  title: string;
  headline?: string;
  description: string;
  category: "Development" | "System Design" | "Design" | "Tutorials" | "Notes" | "Tools" | "Career";
  publishedAt: string;
  readTime: string;
  coverType: "code" | "diagram" | "gradient";
  tags: string[];
  content?: string;
  headings?: { id: string; title: string; level: number }[];
}

export const filterTags = [
  "All",
  "Series",
  "Tutorials",
  "Notes",
  "Tools",
  "System Design",
  "Career",
  "Personal",
] as const;

export type FilterTag = (typeof filterTags)[number];

export const sampleSeries: Series = {
  slug: "backend-from-first-principles",
  eyebrow: "SERIES",
  title: "Backend from First Principles",
  subtitle:
    "Engineering backend systems from the data layer up — from requests and servers to databases, queues, caching, distributed systems, and production architecture.",
  description:
    "Engineering backend systems from the data layer to the interface. A practical, from-scratch journey to understand how the web works.",
  status: "Ongoing",
  articleCount: 32,
  totalReadTime: "~5 hr read",
  featured: true,
  parts: [
    {
      id: "part-1",
      partNumber: "PART I",
      title: "THE BIG PICTURE",
      chapters: [
        {
          slug: "introduction",
          number: 1,
          title: "Introduction",
          readTime: "8 min read",
          publishedAt: "July 9, 2025",
          summary:
            "Why this series exists, what we'll cover, and how to think about building backend systems from the ground up.",
          headings: [
            { id: "why-this-series", title: "Why this series?", level: 2 },
            { id: "the-modern-web", title: "The Modern Web & Systemic Thinking", level: 2 },
            { id: "implementing-the-core", title: "Implementing the Component / Server", level: 2 },
            { id: "what-youll-learn", title: "What you'll learn", level: 2 },
            { id: "how-to-use-this-series", title: "How to use this series", level: 2 },
            { id: "prerequisites", title: "Prerequisites", level: 2 },
            { id: "lets-get-started", title: "Let's get started", level: 2 },
          ],
          content: `Backend development can feel overwhelming at first — there are so many tools, frameworks, and buzzwords. This series is my attempt to simplify things, focus on fundamentals, and build a solid mental model of how backend systems actually work.

We'll go step by step, starting from the very basics and gradually building up to more advanced topics like caching, queues, and distributed systems.

> "The goal is not just to use tools, but to understand what's happening under the hood."

## Why this series?

Most backend tutorials jump directly into using high-level frameworks like Express, NestJS, or Django without explaining what a server actually does at the OS and network level. When something breaks in production — high latency, connection timeouts, or database deadlocks — a superficial understanding of syntax isn't enough.

In this series, we unpack backend architecture layer by layer. We will build tiny versions of HTTP parsers, connection multiplexers, router engines, and memory stores to see the mechanics firsthand.

## The Modern Web & Systemic Thinking

The modern web is experiential analytics and under processes to new component and flexible control design, knitting everything into reliable composition. When you understand the baseline protocols, you stop fearing architecture meetings.

## Implementing the Component / Server

Here is a minimal HTTP listener in Node.js illustrating raw socket request lifecycle:

\`\`\`typescript
import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    status: "ok",
    path: url,
    timestamp: Date.now()
  }));
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
\`\`\`

💡 **Tip:** Always design backend handlers to be stateless wherever possible. Storing state in memory makes horizontal autoscaling significantly more difficult down the road.

## What you'll learn

- **How the web works from first principles:** Protocols, DNS, TCP/IP, and raw sockets.
- **Building a backend server from scratch:** Routing, middleware pipelines, and validation.
- **Working with databases, caching, and queues:** Query indexing, Redis cache invalidation, and async worker queues.
- **Scaling and production-ready architecture:** Load balancers, rate limiters, Dockerization, and zero-downtime rolling deploys.

By the end of this series, you should have a clear mental model of how modern backend systems work and be able to design and build your own with complete confidence.
`,
        },
        {
          slug: "what-actually-happens-when-you-enter-a-url",
          number: 2,
          title: "What actually happens when you enter a URL?",
          readTime: "10 min read",
          publishedAt: "July 16, 2025",
          summary:
            "From browser DNS resolution and TLS handshakes to TCP sockets and HTTP request dispatching.",
          headings: [
            { id: "dns-resolution", title: "1. The DNS Resolution Chain", level: 2 },
            { id: "tcp-tls-handshake", title: "2. The TCP & TLS Handshake", level: 2 },
            { id: "http-dispatch", title: "3. HTTP Request & Server Dispatch", level: 2 },
          ],
        },
        {
          slug: "clients-servers-and-requests",
          number: 3,
          title: "Clients, servers, and requests",
          readTime: "12 min read",
          publishedAt: "July 24, 2025",
          summary:
            "Deconstructing HTTP methods, status codes, headers, body streams, and connection pooling.",
          headings: [
            { id: "anatomy-of-http-request", title: "Anatomy of an HTTP Request", level: 2 },
            { id: "status-codes-and-semantics", title: "Status Codes & Semantic Verbs", level: 2 },
            { id: "headers-and-content-negotiation", title: "Headers & Content Negotiation", level: 2 },
            { id: "connection-keepalive", title: "Connection Pooling and Keep-Alive", level: 2 },
          ],
        },
        {
          slug: "http-from-first-principles",
          number: 4,
          title: "HTTP from first principles",
          readTime: "14 min read",
          publishedAt: "Aug 1, 2025",
          summary:
            "The evolution from HTTP/1.1 pipelining to HTTP/2 multiplexing and HTTP/3 QUIC over UDP.",
          headings: [
            { id: "http-1-and-pipelining", title: "HTTP/1.1 and the Pipelining Problem", level: 2 },
            { id: "http-2-multiplexing", title: "HTTP/2 Binary Framing & Multiplexing", level: 2 },
            { id: "http-3-and-quic", title: "HTTP/3 and QUIC over UDP", level: 2 },
            { id: "choosing-the-right-protocol", title: "Choosing the Right Protocol", level: 2 },
          ],
        },
      ],
    },
    {
      id: "part-2",
      partNumber: "PART II",
      title: "BUILDING A BACKEND",
      chapters: [
        {
          slug: "building-your-first-server",
          number: 5,
          title: "Building your first server",
          readTime: "18 min read",
          publishedAt: "Aug 10, 2025",
          summary: "Raw sockets, request parsing, and event loops.",
          headings: [
            { id: "sockets-and-file-descriptors", title: "Sockets & OS File Descriptors", level: 2 },
            { id: "the-event-loop", title: "The Non-Blocking Event Loop", level: 2 },
            { id: "handling-concurrent-clients", title: "Handling 10,000 Concurrent Clients", level: 2 },
            { id: "graceful-shutdown", title: "Implementing Graceful Shutdown", level: 2 },
          ],
        },
        {
          slug: "routing-and-middleware",
          number: 6,
          title: "Routing and middleware",
          readTime: "16 min read",
          publishedAt: "Aug 18, 2025",
          summary: "Trie-based URL routing trees and the onion middleware pattern.",
          headings: [
            { id: "trie-radix-routing", title: "Trie & Radix Tree URL Matching", level: 2 },
            { id: "the-onion-middleware-pattern", title: "The Onion Middleware Pattern", level: 2 },
            { id: "request-context-propagation", title: "Request Context Propagation", level: 2 },
            { id: "benchmark-and-optimizations", title: "Benchmarks & Allocations", level: 2 },
          ],
        },
        {
          slug: "handling-data-and-validation",
          number: 7,
          title: "Handling data and validation",
          readTime: "14 min read",
          publishedAt: "Aug 25, 2025",
          summary: "Defensive validation schemas, sanitization, and error boundaries.",
          headings: [
            { id: "schema-first-validation", title: "Schema-First Defensive Validation", level: 2 },
            { id: "sanitization-and-escaping", title: "Sanitization & SQL Injection Prevention", level: 2 },
            { id: "type-coercion-gotchas", title: "Type Coercion Gotchas", level: 2 },
            { id: "error-responses-rfc-7807", title: "Consistent Error Responses (RFC 7807)", level: 2 },
          ],
        },
        {
          slug: "authentication-and-sessions",
          number: 8,
          title: "Authentication and sessions",
          readTime: "20 min read",
          publishedAt: "Sep 2, 2025",
          summary: "Session cookies, JWTs, OAuth2 grant flows, and refresh token rotation.",
          headings: [
            { id: "stateful-sessions-vs-stateless", title: "Stateful Cookies vs. Stateless JWTs", level: 2 },
            { id: "oauth2-and-pkce", title: "OAuth2 Grant Flows & PKCE", level: 2 },
            { id: "refresh-token-rotation", title: "Refresh Token Rotation", level: 2 },
            { id: "revocation-strategies", title: "Token Revocation & Blocklists", level: 2 },
          ],
        },
      ],
    },
    {
      id: "part-3",
      partNumber: "PART III",
      title: "DATA LAYER",
      chapters: [
        {
          slug: "databases",
          number: 9,
          title: "Databases",
          readTime: "18 min read",
          publishedAt: "Sep 10, 2025",
          summary: "Relational ACID models vs. NoSQL document stores.",
          headings: [
            { id: "relational-vs-document", title: "Relational ACID vs. Document Stores", level: 2 },
            { id: "acid-guarantees-explained", title: "ACID Guarantees Explained", level: 2 },
            { id: "connection-pooling-limits", title: "Database Connection Pool Sizing", level: 2 },
            { id: "data-modeling-patterns", title: "Normalized vs. Denormalized Modeling", level: 2 },
          ],
        },
        {
          slug: "querying-and-indexing",
          number: 10,
          title: "Querying and indexing",
          readTime: "16 min read",
          publishedAt: "Sep 18, 2025",
          summary: "B-Tree indexes, composite keys, and query execution plans.",
          headings: [
            { id: "how-b-trees-work", title: "How B-Tree Indexes Work", level: 2 },
            { id: "compound-index-order", title: "Compound Index Column Ordering", level: 2 },
            { id: "reading-explain-plans", title: "Reading EXPLAIN Query Plans", level: 2 },
            { id: "n-plus-one-problem", title: "Fixing N+1 Query Traps", level: 2 },
          ],
        },
        {
          slug: "caching",
          number: 11,
          title: "Caching",
          readTime: "14 min read",
          publishedAt: "Sep 25, 2025",
          summary: "Cache invalidation strategies, LRU algorithms, and Redis architectures.",
          headings: [
            { id: "cache-aside-pattern", title: "The Cache-Aside Pattern", level: 2 },
            { id: "invalidation-strategies", title: "Cache Invalidation & Expiry", level: 2 },
            { id: "redis-data-structures", title: "Picking Redis Data Structures", level: 2 },
            { id: "stampede-prevention", title: "Cache Stampede & Thundering Herd", level: 2 },
          ],
        },
        {
          slug: "queues-and-background-jobs",
          number: 12,
          title: "Queues and background jobs",
          readTime: "16 min read",
          publishedAt: "Oct 2, 2025",
          summary: "Message brokers, at-least-once delivery, and worker pool patterns.",
          headings: [
            { id: "why-decouple-with-queues", title: "Why Decouple with Queues?", level: 2 },
            { id: "at-least-once-delivery", title: "At-Least-Once Delivery & Idempotency", level: 2 },
            { id: "dead-letter-queues", title: "Dead Letter Queues (DLQ)", level: 2 },
            { id: "worker-pool-scaling", title: "Worker Pool Concurrency Scaling", level: 2 },
          ],
        },
      ],
    },
    {
      id: "part-4",
      partNumber: "PART IV",
      title: "SCALING",
      chapters: [
        {
          slug: "load-balancing",
          number: 13,
          title: "Load balancing",
          readTime: "15 min read",
          publishedAt: "Oct 12, 2025",
          summary: "L4 vs L7 load balancing, round-robin, and consistent hashing.",
          headings: [
            { id: "layer-4-vs-layer-7", title: "Layer 4 vs. Layer 7 Load Balancing", level: 2 },
            { id: "balancing-algorithms", title: "Round-Robin, Least Connections & Hashing", level: 2 },
            { id: "health-checking", title: "Active vs. Passive Health Checks", level: 2 },
            { id: "ssl-termination", title: "SSL/TLS Termination at the Proxy", level: 2 },
          ],
        },
        {
          slug: "horizontal-scaling",
          number: 14,
          title: "Horizontal scaling",
          readTime: "16 min read",
          publishedAt: "Oct 20, 2025",
          summary: "Stateless nodes, shared state management, and autoscale thresholds.",
          headings: [
            { id: "stateless-architecture", title: "The Golden Rule: Stateless Architecture", level: 2 },
            { id: "distributed-sessions", title: "Handling Distributed Sessions", level: 2 },
            { id: "database-read-replicas", title: "Splitting Reads Across Read Replicas", level: 2 },
            { id: "autoscaling-metrics", title: "Autoscaling Metrics & Cooldowns", level: 2 },
          ],
        },
        {
          slug: "distributed-systems",
          number: 15,
          title: "Distributed systems",
          readTime: "18 min read",
          publishedAt: "Oct 28, 2025",
          summary: "CAP theorem, consensus algorithms (Raft), and network partitions.",
          headings: [
            { id: "cap-theorem-reality", title: "The CAP Theorem in Practice", level: 2 },
            { id: "network-partitions", title: "Dealing with Network Partitions", level: 2 },
            { id: "consensus-with-raft", title: "Consensus with Raft in Plain English", level: 2 },
            { id: "distributed-locks", title: "Distributed Locks with Redis & Redlock", level: 2 },
          ],
        },
        {
          slug: "consistency-and-replication",
          number: 16,
          title: "Consistency and replication",
          readTime: "16 min read",
          publishedAt: "Nov 5, 2025",
          summary: "Primary-replica replication, read replicas, and eventual consistency.",
          headings: [
            { id: "single-leader-replication", title: "Single-Leader Replication", level: 2 },
            { id: "eventual-consistency", title: "Eventual Consistency & Read-Your-Writes", level: 2 },
            { id: "conflict-resolution", title: "Conflict Resolution & Vector Clocks", level: 2 },
            { id: "two-phase-commits", title: "2-Phase Commits vs. Sagas", level: 2 },
          ],
        },
      ],
    },
    {
      id: "part-5",
      partNumber: "PART V",
      title: "PRODUCTION",
      chapters: [
        {
          slug: "deployment",
          number: 17,
          title: "Deployment",
          readTime: "15 min read",
          publishedAt: "Nov 15, 2025",
          summary: "Docker containers, CI/CD pipelines, and healthcheck probes.",
          headings: [
            { id: "docker-container-hygiene", title: "Minimal Docker Image Hygiene", level: 2 },
            { id: "ci-cd-pipelines", title: "Automated Testing & CI/CD Pipelines", level: 2 },
            { id: "zero-downtime-deploys", title: "Zero-Downtime Blue/Green & Rolling Deploys", level: 2 },
            { id: "secrets-management", title: "Runtime Environment & Secrets Management", level: 2 },
          ],
        },
        {
          slug: "monitoring-and-logging",
          number: 18,
          title: "Monitoring and logging",
          readTime: "14 min read",
          publishedAt: "Nov 22, 2025",
          summary: "Structured JSON logs, distributed tracing, and Prometheus metrics.",
          headings: [
            { id: "structured-json-logging", title: "Structured JSON Logging", level: 2 },
            { id: "metrics-golden-signals", title: "The 4 Golden Signals", level: 2 },
            { id: "distributed-tracing", title: "Distributed Tracing with OpenTelemetry", level: 2 },
            { id: "actionable-alerting", title: "Alert Fatigue & Actionable Alerts", level: 2 },
          ],
        },
        {
          slug: "error-handling-and-resilience",
          number: 19,
          title: "Error handling and resilience",
          readTime: "16 min read",
          publishedAt: "Nov 30, 2025",
          summary: "Circuit breakers, exponential backoff retries, and rate limiting.",
          headings: [
            { id: "circuit-breakers", title: "Circuit Breaker Patterns", level: 2 },
            { id: "exponential-backoff-jitter", title: "Exponential Backoff with Jitter", level: 2 },
            { id: "rate-limiting-algorithms", title: "Token Bucket & Leaky Bucket Rate Limiters", level: 2 },
            { id: "bulkhead-isolation", title: "Bulkhead Pattern for Fault Isolation", level: 2 },
          ],
        },
        {
          slug: "real-world-architecture",
          number: 20,
          title: "Real-world architecture",
          readTime: "22 min read",
          publishedAt: "Dec 8, 2025",
          summary: "Putting it all together: production system blueprints and trade-offs.",
          headings: [
            { id: "end-to-end-request-journey", title: "The Complete End-to-End Request Journey", level: 2 },
            { id: "production-blueprint", title: "Production Blueprint & Topology", level: 2 },
            { id: "trade-offs-and-compromises", title: "Engineering Trade-Offs & Compromises", level: 2 },
            { id: "whats-next", title: "Final Thoughts & Where to Go Next", level: 2 },
          ],
        },
      ],
    },
  ],
};

export const sampleArticles: BlogPost[] = [
  {
    slug: "getting-started-with-go-for-web-development",
    title: "Getting Started with Go for Web Development",
    headline: "Go for Web APIs",
    description:
      "A practical guide to setting up a Go project, exploring the Echo framework, and building your first high-throughput API.",
    category: "Development",
    publishedAt: "Aug 20, 2025",
    readTime: "6 min read",
    coverType: "code",
    tags: ["Go", "Backend", "API", "Tutorials"],
    headings: [
      { id: "why-go", title: "Why Go for Web Services?", level: 2 },
      { id: "project-setup", title: "Setting up the Project", level: 2 },
      { id: "building-the-router", title: "Building an Echo Router", level: 2 },
      { id: "benchmarking", title: "Benchmarking Throughput", level: 2 },
    ],
    content: `Go has rapidly become the language of choice for building modern, high-throughput microservices and distributed backend tools. With its lightweight goroutines, fast compile times, and excellent standard library, Go cuts away framework bloat and lets you focus on performance.

In this guide, we'll walk through spinning up a production-ready API using Go and the Echo router.`,
  },
  {
    slug: "how-web-applications-actually-work",
    title: "How Web Applications Actually Work",
    headline: "Web System Anatomy",
    description:
      "A beginner-friendly deep dive into what happens when you type a URL in your browser and press Enter.",
    category: "System Design",
    publishedAt: "Aug 12, 2025",
    readTime: "10 min read",
    coverType: "diagram",
    tags: ["System Design", "Web", "Architecture", "Notes"],
    headings: [
      { id: "the-entry-point", title: "The Entry Point: Browsers & DNS", level: 2 },
      { id: "edge-and-cdn", title: "Edge Networks and CDNs", level: 2 },
      { id: "load-balancers", title: "Reverse Proxies & Load Balancers", level: 2 },
      { id: "application-state", title: "Application State & Data Stores", level: 2 },
    ],
    content: `When you open your browser and visit a web application, hundreds of coordinated operations occur within milliseconds across global networks. 

Understanding this sequence from client socket to database replica is the single best foundation for diagnosing production performance bottlenecks.`,
  },
  {
    slug: "a-simple-guide-to-beautiful-gradients",
    title: "A Simple Guide to Beautiful Gradients",
    headline: "Modern CSS Color Harmony",
    description:
      "Understanding color theory and practical tips to make your gradients look clean, vibrant, and modern without the muddy middle.",
    category: "Design",
    publishedAt: "Aug 5, 2025",
    readTime: "5 min read",
    coverType: "gradient",
    tags: ["Design", "CSS", "UI/UX", "Tutorials"],
    headings: [
      { id: "the-gray-dead-zone", title: "Avoiding the 'Gray Dead Zone'", level: 2 },
      { id: "okhsl-color-space", title: "Using Modern Color Spaces (OKLCH & OKLAB)", level: 2 },
      { id: "gradient-direction", title: "Angle and Light Direction", level: 2 },
      { id: "tailwind-v4-gradients", title: "Tailwind v4 Gradient Tricks", level: 2 },
    ],
    content: `Ever created a gradient between two bright colors, only to find an ugly, washed-out grayish band right in the middle? 

That happens because standard RGB color interpolation calculates color channels linearly. In this guide, we'll explore perceptual color spaces and modern CSS properties that make your gradients pop.`,
  },
];
