export type Source = "linkedin" | "x" | "reddit" | "yc" | "blog";
export type OppType = "hiring" | "collaboration" | "cofounder" | "investment";
export type Stage = "idea" | "pre-seed" | "seed" | "growth";
export type Urgency = "low" | "medium" | "high";

export interface Opportunity {
  id: string;
  source: Source;
  author: string;
  authorRole: string;
  postedAgo: string;
  originalTitle: string;
  rewrittenTitle: string;
  summary: string;
  tags: string[];
  type: OppType;
  stage: Stage;
  urgency: Urgency;
  signalScore: number; // 0-100
  whyMatched: string[];
  hiddenSignals: { label: string; value: string }[];
  originalPost: string;
  aiInterpretation: string;
  suggestedDM: string;
  accent: string; // tailwind gradient color hint
}

export const opportunities: Opportunity[] = [
  {
    id: "op-000",
    source: "linkedin",
    author: "Alicia Barnes",
    authorRole: "Executive Creative Director · Brand & Campaign Strategy",
    postedAgo: "1mo",
    originalTitle: "Creative Strategist Intern — Summer 2026",
    rewrittenTitle: "Creative agency opens rare strategy internship — seeking a writer who tracks culture",
    summary:
      "An ECD is personally sourcing a Summer 2026 Creative Strategist Intern to embed with designers and creative technologists, bridging cultural trends into real-world brand work.",
    tags: ["#hiring", "#internship", "#strategy", "#creative", "#summer-2026"],
    type: "hiring",
    stage: "growth",
    urgency: "medium",
    signalScore: 84,
    whyMatched: [
      "Your writing + cultural research background fits exactly",
      "Founder-led posts convert 4x faster than recruiter listings",
      "'Rare opportunity' phrasing signals real internal demand",
    ],
    hiddenSignals: [
      { label: "Posted by", value: "ECD personally (not recruiter)" },
      { label: "Phrase signal", value: "'rare opportunity' — high intent" },
      { label: "Amplification ask", value: "'please spread the word'" },
      { label: "Engagement", value: "21 reactions · 3 comments · 18 reposts" },
      { label: "ATS link", value: "greenhouse.io — active pipeline" },
    ],
    originalPost:
      "This is a rare opportunity, as we don't typically offer strategy internships! We're looking for a strong communicator and writer with a passion for staying in touch with the latest cultural trends. They'll have the opportunity to work closely with a team of designers and creative technologists to help bridge what's happening in culture to how we dream up and build real-world experiences for some very exciting brands this summer. Looking for a creative, curious, connector-of-dots — please spread the word if you know anyone who might be interested!",
    aiInterpretation:
      "This is genuine, founder-led hiring intent — not a recycled recruiter post. The ECD frames it as 'rare,' personally vouches for the role, and asks the network to amplify, which historically correlates with fast hiring decisions and higher offer rates than standard listings.",
    suggestedDM:
      "Hi Alicia — saw your post about the Summer 2026 Creative Strategist Intern. I write at the intersection of culture and brand and would love to be considered. Sharing a few short pieces I think you'll resonate with — would a quick intro chat be useful?",
    accent: "from-amber-300 to-rose-300",
  },
  {
    id: "op-001",
    source: "linkedin",
    author: "Maya Chen",
    authorRole: "Founder · Stealth AI",
    postedAgo: "2h ago",
    originalTitle: "Looking for frontend dev for AI startup",
    rewrittenTitle: "Stealth AI startup actively hiring frontend engineer for early product build",
    summary:
      "A stealth AI startup building developer tools is hiring a frontend engineer who can ship fast MVPs alongside the founder.",
    tags: ["#hiring", "#ai-startup", "#frontend", "#seed-stage", "#urgent"],
    type: "hiring",
    stage: "seed",
    urgency: "high",
    signalScore: 92,
    whyMatched: [
      "Matched your React + AI experience",
      "Similar to past projects you shipped",
      "High hiring urgency detected",
    ],
    hiddenSignals: [
      { label: "Hiring frequency", value: "3 posts in 2 weeks" },
      { label: "Founder activity", value: "Daily build-in-public" },
      { label: "Funding signal", value: "Recent angel round" },
      { label: "Network engagement", value: "1.2k impressions" },
    ],
    originalPost:
      "Hey network — we're scaling our stealth AI tooling startup and looking for a frontend engineer who lives in React, loves shipping, and gets excited about AI UX. DM me.",
    aiInterpretation:
      "This post hides a clear seed-stage hiring intent. The founder is actively building, has shipped two products this quarter, and engages with senior engineers. High signal, low noise.",
    suggestedDM:
      "Hi Maya — I saw your post about hiring a frontend engineer. I've been building AI-native interfaces and shipping React MVPs for early-stage teams. Would love to connect and learn more about what you're building.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "op-002",
    source: "x",
    author: "Devon Park",
    authorRole: "Building @ Layerlake",
    postedAgo: "5h ago",
    originalTitle: "anyone good at infra wanna jam on a weekend project?",
    rewrittenTitle: "Founder seeking infra-focused cofounder for an emerging AI infra side project",
    summary:
      "An indie founder is signaling latent cofounder interest around an AI infrastructure project — looking for someone to jam, with a clear path toward equity.",
    tags: ["#cofounder", "#ai-infra", "#hidden", "#weekend-build"],
    type: "cofounder",
    stage: "idea",
    urgency: "medium",
    signalScore: 78,
    whyMatched: [
      "You have backend + ML ops experience",
      "Frequent contributor to infra repos",
      "Interest signal in 'cofounder' opportunities",
    ],
    hiddenSignals: [
      { label: "Engagement velocity", value: "+340% this week" },
      { label: "Topic recurrence", value: "5 posts on infra" },
      { label: "Network", value: "Followed by 12 GPs" },
    ],
    originalPost: "anyone good at infra wanna jam on a weekend project? have something cooking 👀",
    aiInterpretation:
      "Casual phrasing masks a real cofounder search. Devon has been quietly preparing an infra product for 6 weeks and is now testing the waters for a technical partner.",
    suggestedDM:
      "Hey Devon — your post caught my eye. I've been working on infra for AI workloads and would love to hear what you're cooking. Free for a quick call this week?",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    id: "op-003",
    source: "reddit",
    author: "u/buildwithlena",
    authorRole: "r/startups",
    postedAgo: "1d ago",
    originalTitle: "Need a designer-engineer hybrid for our YC batch",
    rewrittenTitle: "YC-batch startup hiring a design engineer to lead end-to-end product polish",
    summary:
      "A current YC batch company needs a design engineer who can own the entire product surface — from Figma to production React.",
    tags: ["#hiring", "#yc", "#design-engineer", "#equity"],
    type: "hiring",
    stage: "seed",
    urgency: "high",
    signalScore: 88,
    whyMatched: [
      "Your portfolio shows design + engineering range",
      "YC-stage companies match your preferences",
      "Recent activity in design-engineering circles",
    ],
    hiddenSignals: [
      { label: "Batch", value: "YC W26" },
      { label: "Team size", value: "4 → hiring 2" },
      { label: "Equity range", value: "0.5% – 1.5%" },
    ],
    originalPost:
      "We're a YC W26 company shipping fast. Looking for someone who can design AND build — Figma to production React. Equity heavy.",
    aiInterpretation:
      "Strong signal: YC-backed, equity-forward, urgent. The phrase 'shipping fast' combined with hybrid skill ask suggests a small senior team valuing autonomy.",
    suggestedDM:
      "Hi Lena — saw your post on r/startups. I work across design and engineering and love YC-stage velocity. Happy to share recent work if helpful.",
    accent: "from-orange-500 to-amber-400",
  },
  {
    id: "op-004",
    source: "linkedin",
    author: "Theo Aoki",
    authorRole: "VP Eng · Northwind AI",
    postedAgo: "3h ago",
    originalTitle: "Excited about what we're building in agent infra",
    rewrittenTitle: "Series A AI team quietly expanding agent infra org — hidden hiring intent",
    summary:
      "Theo's recent posts reveal a quiet hiring push for agent infra engineers, even though no formal job is listed yet.",
    tags: ["#hidden-hiring", "#series-a", "#agents", "#infra"],
    type: "hiring",
    stage: "growth",
    urgency: "medium",
    signalScore: 81,
    whyMatched: [
      "Agent / orchestration experience match",
      "You follow 4 people on this team",
      "Stealth hiring patterns detected",
    ],
    hiddenSignals: [
      { label: "Team growth", value: "+8 hires in 60d" },
      { label: "Job board", value: "Not posted publicly" },
      { label: "Leader signal", value: "Posting 3x more than usual" },
    ],
    originalPost:
      "The team has shipped more in the last month than I've seen in years. If you care about agent infra, the next 6 months will be wild.",
    aiInterpretation:
      "Pattern matches a soft-launch hiring campaign — leadership posts ramp before a formal recruiter push. Reaching out now puts you ahead of the queue.",
    suggestedDM:
      "Hi Theo — really enjoying your posts on agent infra. I've been working on adjacent problems and would love to chat about what's next for your team.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    id: "op-005",
    source: "blog",
    author: "Iris Nakamura",
    authorRole: "Indie · sundial.dev",
    postedAgo: "6h ago",
    originalTitle: "Why I'm open-sourcing my entire stack",
    rewrittenTitle: "Solo founder signaling collaboration interest after open-sourcing AI stack",
    summary:
      "Iris just open-sourced her entire AI app stack and hinted at building a collaborator network around it.",
    tags: ["#collaboration", "#open-source", "#ai-tools"],
    type: "collaboration",
    stage: "pre-seed",
    urgency: "low",
    signalScore: 71,
    whyMatched: [
      "You contribute to similar OSS projects",
      "Tone match with indie maker community",
      "Shared interest in AI tooling",
    ],
    hiddenSignals: [
      { label: "Repo growth", value: "1.4k stars in 3 days" },
      { label: "Newsletter", value: "12k subscribers" },
      { label: "Collaboration cues", value: "Mentioned 'help' 4x" },
    ],
    originalPost:
      "Open-sourced sundial today. Excited to see who picks it up — would love collaborators who care about beautiful AI tools.",
    aiInterpretation:
      "Soft collaboration call. Iris has historically converted OSS contributors into paid collaborators within 3 months.",
    suggestedDM:
      "Hi Iris — congrats on the launch! I've been exploring similar ground and would love to contribute or just trade notes if you're open.",
    accent: "from-rose-500 to-pink-400",
  },
];

export const sourceMeta: Record<Source, { label: string; letter: string; color: string }> = {
  linkedin: { label: "LinkedIn", letter: "in", color: "bg-[#0A66C2] text-white" },
  x: { label: "X", letter: "𝕏", color: "bg-foreground text-background" },
  reddit: { label: "Reddit", letter: "r", color: "bg-[#FF4500] text-white" },
  yc: { label: "YC", letter: "Y", color: "bg-[#FB651E] text-white" },
  blog: { label: "Blog", letter: "✎", color: "bg-emerald-600 text-white" },
};
