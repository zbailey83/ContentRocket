import React, { useState } from 'react';
import { 
  Terminal, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Lock, 
  Zap, 
  Users,
  Code,
  Rocket,
  FileText,
  Clock,
  Award,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Newspaper,
  Check
} from 'lucide-react';
import { 
  TechnicalGridBackground, 
  TechCard, 
  TechButton, 
  TechBadge, 
  SectionHeader, 
  TechAccordionItem,
  TechChecklist
} from './components/TechnicalUI';
import { generateMarketingHook } from './services/geminiService';
import { CourseDay, AppView, GeneratedHook, DetailedDay, DeliverableCategory } from './types';

// --- Data Constants ---

const COURSE_OVERVIEW: CourseDay[] = [
  {
    id: 'day1',
    day: 'FRIDAY',
    title: 'Foundation & First Assets',
    duration: '6:00 PM - 12:00 AM (Evening)',
    modules: [
      'Environment Configuration',
      'Brand Voice DNA Extraction',
      'First Asset Generated (30 min)',
      'Visual Content Blitz'
    ]
  },
  {
    id: 'day2',
    day: 'SATURDAY',
    title: 'Content Production Machine',
    duration: '09:00 AM - 06:30 PM',
    modules: [
      'Social Media Automation Strategy',
      'Video Scripting & Faceless Video',
      'Copywriting Accelerator',
      'SEO & Content Optimization'
    ]
  },
  {
    id: 'day3',
    day: 'SUNDAY',
    title: 'Advanced Systems & Launch',
    duration: '10:00 AM - 05:15 PM',
    modules: [
      'No-Code Workflow Automation',
      'Custom GPT Creation',
      'Quality Control & Human Touch',
      'Live Feedback & Graduation'
    ]
  }
];

const DETAILED_CURRICULUM: DetailedDay[] = [
  {
    id: 'd1',
    title: 'Day 1: Foundation & First Assets',
    subtitle: 'Friday Evening (6 hours)',
    sessions: [
      {
        title: 'Session 1: Setup Sprint',
        time: '6:00 PM - 7:30 PM',
        objectives: [
          'Configure AI tools for immediate use', 
          'Establish brand voice parameters', 
          'Create first AI-generated asset within 30 minutes'
        ],
        content: [
          { 
            type: 'module', 
            title: '1.1 Welcome & Expectations (15 min)', 
            details: [
              'Course roadmap overview', 
              'Deliverables checklist distribution', 
              'Accountability pod assignments', 
              'Platform navigation tutorial'
            ] 
          },
          { 
            type: 'module', 
            title: '1.2 AI Tool Arsenal Setup (45 min)', 
            details: [
              'ChatGPT Plus/Claude Pro account verification', 
              'Midjourney/DALL-E setup walkthrough', 
              'Browser extension installations (Notion AI, Grammarly, etc.)', 
              'API key generation for advanced users', 
              'Bookmark folder organization'
            ] 
          },
          { 
            type: 'exercise', 
            title: 'LIVE EXERCISE 1: First Prompt Test (30 min)', 
            duration: '30 min',
            details: [
              'Students input their business details into provided template',
              'Generate 3 headline variations using instructor-provided prompt',
              'Share results in chat for live critique',
              'Instructor demonstrates prompt refinement in real-time'
            ]
          },
          {
            type: 'deliverable',
            title: 'Deliverable Checkpoint',
            details: [
              'Screenshot of functional AI tool dashboard',
              '3 refined headlines for student\'s business'
            ]
          }
        ]
      },
      {
        title: 'Session 2: Brand Voice Engineering',
        time: '7:45 PM - 9:15 PM',
        objectives: [
          'Extract and codify unique brand voice', 
          'Build reusable brand context document', 
          'Generate first long-form content piece'
        ],
        content: [
          { 
            type: 'module', 
            title: '2.1 Voice DNA Extraction (30 min)', 
            details: [
              'Analyzing existing content for patterns', 
              'Tone spectrum exercises (formal ↔ casual, technical ↔ conversational)', 
              'Identifying brand-specific vocabulary and phrases', 
              'Competitor voice differentiation'
            ] 
          },
          { 
            type: 'project', 
            title: 'LIVE PROJECT 1: Brand Voice Brief (45 min)', 
            duration: '45 min',
            details: [
              'Company mission statement (AI-refined)',
              'Target audience psychographics',
              '10 sample phrases in brand voice',
              '5 "never say" phrases',
              'Tone calibration scale'
            ]
          },
          { 
            type: 'module', 
            title: '2.2 Long-Form Content Generation (15 min)', 
            details: [
              'Blog structure formulas (listicle, how-to, thought leadership)',
              'SEO keyword integration without keyword stuffing',
              'Human editing for authenticity markers'
            ]
          },
          {
            type: 'exercise',
            title: 'LIVE EXERCISE 2: First Blog Post (Homework - 60 min)',
            duration: 'Homework',
            details: [
              'Generate 1,500-word blog post using provided prompts',
              'Upload draft to platform for Day 2 review',
              'Peer review assignment (review 2 other posts by morning)'
            ]
          },
          {
            type: 'deliverable',
            title: 'Deliverable Checkpoint',
            details: [
              'Completed Brand Voice Brief document',
              'First draft blog post (submitted by 11:59 PM)'
            ]
          }
        ]
      },
      {
        title: 'Session 3: Visual Content Blitz',
        time: '9:30 PM - 11:00 PM',
        objectives: [
          'Master AI image generation prompts', 
          'Create 10 graphics in 60 minutes', 
          'Build reusable visual brand guidelines'
        ],
        content: [
          { 
            type: 'module', 
            title: '3.1 Image Prompt Engineering (30 min)', 
            details: [
              'Anatomy of effective image prompts', 
              'Style consistency techniques (seed numbers, style references)', 
              'Aspect ratio selection for different platforms', 
              'Negative prompts to avoid common mistakes'
            ] 
          },
          {
            type: 'demo',
            title: 'LIVE DEMO: Instructor generates 5 variations live (15 min)'
          },
          { 
            type: 'exercise', 
            title: 'SPRINT CHALLENGE 1: 10 Graphics in 60 Minutes (60 min)', 
            duration: '60 min',
            details: [
              'Students must create: 3 social media post graphics, 2 blog header images, 3 Instagram story templates, 2 LinkedIn carousel slides',
              'Timer on screen | Instructor circulates virtual breakout rooms',
              'Quick Wins Gallery: Students submit best 3 images to group gallery'
            ]
          },
          {
            type: 'deliverable',
            title: 'Deliverable Checkpoint',
            details: [
              '10 AI-generated graphics',
              'Personal visual style guide (colors, fonts, themes)'
            ]
          },
          {
            type: 'module',
            title: 'Day 1 Wrap',
            details: [
              'Homework review: Polish blog post',
              'Preview Day 2 deliverables',
              'Accountability check-in'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'd2',
    title: 'Day 2: Content Production Machine',
    subtitle: 'Saturday (8 hours)',
    sessions: [
      {
        title: 'Session 4: Social Media Automation',
        time: '9:00 AM - 11:00 AM',
        objectives: ['30-day content calendar', 'Platform variations', 'Repurposing workflows'],
        content: [
          { type: 'project', title: 'LIVE PROJECT 2: 30-Day Calendar Generation', duration: '60 min' },
          { type: 'module', title: '4.2 Repurposing Formulas', details: ['Blog to social posts', 'Video to carousel'] }
        ]
      },
      {
        title: 'Session 5: Video Content Workshop',
        time: '11:15 AM - 1:15 PM',
        objectives: ['Script video content', 'Faceless video production', 'YouTube metadata'],
        content: [
          { type: 'module', title: '5.1 Video Scripting System', details: ['Hook-body-CTA framework', 'Teleprompter formatting'] },
          { type: 'exercise', title: 'SPRINT CHALLENGE 2: Script 5 Videos', duration: '60 min' }
        ]
      },
      {
        title: 'Session 6: Copywriting Accelerator',
        time: '2:15 PM - 4:15 PM',
        objectives: ['High-converting sales copy', 'Email sequences', 'Persuasion frameworks'],
        content: [
          { type: 'module', title: '6.1 Conversion Frameworks', details: ['PAS, AIDA, BAB models'] },
          { type: 'exercise', title: 'LIVE EXERCISE 3: Landing Page Copy', duration: '45 min' },
          { type: 'exercise', title: 'SPRINT CHALLENGE 3: 7-Email Welcome Series', duration: '30 min' }
        ]
      },
      {
        title: 'Session 7: SEO & Content Optimization',
        time: '4:30 PM - 6:30 PM',
        objectives: ['AI keyword research', 'On-page optimization', 'Internal linking'],
        content: [
          { type: 'project', title: 'LIVE PROJECT 3: Keyword Strategy Doc', duration: '45 min' },
          { type: 'exercise', title: 'GROUP EXERCISE: SEO Audit Swap', duration: '30 min' }
        ]
      }
    ]
  },
  {
    id: 'd3',
    title: 'Day 3: Advanced Systems & Launch',
    subtitle: 'Sunday (5 hours)',
    sessions: [
      {
        title: 'Session 8: AI Workflow Automation',
        time: '10:00 AM - 11:30 AM',
        objectives: ['Build automated pipelines', 'Connect via Zapier', 'Create Custom GPTs'],
        content: [
          { type: 'module', title: '8.1 No-Code Automation', details: ['Zapier walkthrough', 'RSS-to-social'] },
          { type: 'project', title: 'LIVE PROJECT 4: Build Your Brand GPT', duration: 'Guided' }
        ]
      },
      {
        title: 'Session 9: Quality Control & Human Touch',
        time: '11:45 AM - 1:15 PM',
        objectives: ['Identify AI tells', 'Add authenticity', 'Fact-checking'],
        content: [
          { type: 'module', title: '9.1 The Human Edit Process', details: ['Detecting generic patterns', 'Injection points for stories'] },
          { type: 'exercise', title: 'LIVE EXERCISE 4: Before/After Editing Sprint', duration: '30 min' }
        ]
      },
      {
        title: 'Session 10: Rapid Implementation Planning',
        time: '2:00 PM - 3:30 PM',
        objectives: ['90-day rollout plan', 'Troubleshooting', 'Success metrics'],
        content: [
          { type: 'project', title: 'LIVE PROJECT 5: Personal Action Plan', duration: '45 min' },
          { type: 'module', title: '10.2 Obstacle Premortem', details: ['Common failure points'] }
        ]
      },
      {
        title: 'Session 11: Live Feedback & Graduation',
        time: '3:45 PM - 5:15 PM',
        objectives: ['Instructor feedback', 'Portfolio review', 'Accountability'],
        content: [
          { type: 'module', title: '11.1 Portfolio Review', details: ['Student presentations', 'Best in Show awards'] },
          { type: 'module', title: '11.2 Accountability Lock-In', details: ['30-day challenge commitment'] }
        ]
      }
    ]
  }
];

const DELIVERABLES_LIST: DeliverableCategory[] = [
  {
    category: "Writing Assets",
    count: 8,
    items: [
      "1 Brand Voice Brief document",
      "1 Long-form blog post (1,500+ words)",
      "30-day social media content calendar",
      "10 social media posts (ready to publish)",
      "1 Complete landing page copy",
      "7-email welcome sequence",
      "1 Keyword research document (50+ keywords)",
      "1 Personal 90-day implementation plan"
    ]
  },
  {
    category: "Visual Assets",
    count: 11,
    items: [
      "10 AI-generated graphics (various formats)",
      "1 Visual brand style guide"
    ]
  },
  {
    category: "Video Assets",
    count: 5,
    items: [
      "5 Video scripts with metadata",
      "1 Produced short-form video (optional)"
    ]
  },
  {
    category: "Strategic Documents",
    count: 6,
    items: [
      "Custom Brand GPT (or prompt system)",
      "Content cluster roadmap",
      "AI Editorial Guidelines document",
      "1 Automation workflow (functional)",
      "Keyword-to-URL mapping spreadsheet",
      "Week 1 granular task list"
    ]
  }
];

const COHORTS = [
  "12-14th December (Last 2 spots)",
  "19-21st December (Filling fast)"
];

// --- Sub-Components ---

const LandingPage: React.FC<{ onEnroll: () => void }> = ({ onEnroll }) => {
  const [demoTopic, setDemoTopic] = useState('');
  const [demoResult, setDemoResult] = useState<GeneratedHook | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(COHORTS[0]);

  const handleDemo = async () => {
    if (!demoTopic) return;
    setIsGenerating(true);
    try {
      const result = await generateMarketingHook(demoTopic, "Digital Marketers");
      setDemoResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Branding Header */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Rocket className="text-accent-blue" />
          <span>Content Rocket</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 border border-accent-green/30 bg-accent-green/5 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
              <span className="text-xs font-mono text-accent-green tracking-wide">LAST 2025 COHORTS CLOSING</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-primary">AI Content Machine</span>
              <br /> in 72 Hours.
            </h1>
            
            <p className="text-secondary text-lg max-w-lg leading-relaxed border-l-2 border-border pl-6">
              A 3-Day Weekend Intensive for marketers who want output, not theory. 
              Leave with 30+ assets and a fully automated system.
            </p>

            {/* Platform Icons Strip */}
            <div className="flex items-center gap-4 py-2 opacity-80">
              <span className="text-xs font-mono text-secondary uppercase tracking-widest mr-2">Content For All Platforms:</span>
              <Instagram size={20} className="text-secondary hover:text-[#E1306C] transition-colors" />
              <Linkedin size={20} className="text-secondary hover:text-[#0077B5] transition-colors" />
              <Twitter size={20} className="text-secondary hover:text-primary transition-colors" />
              <Facebook size={20} className="text-secondary hover:text-[#1877F2] transition-colors" />
              <Youtube size={20} className="text-secondary hover:text-[#FF0000] transition-colors" />
              <span title="Substack" className="flex items-center">
                <Newspaper size={20} className="text-secondary hover:text-[#FF6719] transition-colors" />
              </span>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex flex-col sm:flex-row gap-4">
                <TechButton onClick={onEnroll} icon={Zap}>
                  Secure Your Spot
                </TechButton>
                <TechButton variant="outline" icon={Terminal} onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Syllabus
                </TechButton>
              </div>
              <div className="text-xs text-secondary font-mono mt-2">
                NEXT START: {selectedCohort}
              </div>
            </div>
          </div>

          <div className="relative">
            <TechCard className="backdrop-blur-xl bg-surface/80">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="font-mono text-xs text-secondary">weekend_intensive_v2.0</div>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-4 text-zinc-400">
                  <span>$</span>
                  <span className="text-accent-blue">init_system --mode=aggressive</span>
                </div>
                <div className="flex gap-4 text-zinc-400">
                  <span>{'>'}</span>
                  <span>Loading brand guidelines... [OK]</span>
                </div>
                <div className="flex gap-4 text-zinc-400">
                  <span>{'>'}</span>
                  <span>Generating 30-day calendar... [OK]</span>
                </div>
                <div className="flex gap-4 text-zinc-400">
                  <span>{'>'}</span>
                  <span className="text-green-500">30+ assets ready for review.</span>
                </div>
                
                <div className="mt-8 p-4 bg-background/40 border border-border rounded">
                  <p className="text-secondary mb-2">// Interactive Demo: Try the Hook Generator</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={demoTopic}
                      onChange={(e) => setDemoTopic(e.target.value)}
                      placeholder="Enter a topic (e.g. 'Email Marketing')"
                      className="bg-transparent border-b border-border focus:border-accent-blue outline-none flex-1 py-1 text-primary placeholder-secondary/50"
                    />
                    <button 
                      onClick={handleDemo}
                      disabled={isGenerating || !demoTopic}
                      className="text-accent-blue hover:text-primary transition-colors"
                    >
                      {isGenerating ? 'Running...' : 'EXECUTE'}
                    </button>
                  </div>
                  {demoResult && (
                    <div className="mt-4 border-t border-border pt-4 animate-pulse-glow">
                      <p className="text-primary mb-2">"{demoResult.hook}"</p>
                      <p className="text-xs text-secondary">Analysis: {demoResult.rationale}</p>
                    </div>
                  )}
                </div>
              </div>
            </TechCard>
            
            {/* Decoration Elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Syllabus Grid */}
      <section id="syllabus" className="px-6 max-w-7xl mx-auto w-full">
        <SectionHeader title="Operational Timeline" subtitle="From zero to fully deployed content system in 72 hours." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSE_OVERVIEW.map((day, idx) => (
            <TechCard key={day.id} className="h-full flex flex-col hover:bg-surface-hover/50">
              <div className="mb-6 flex justify-between items-start">
                <TechBadge>{day.day}</TechBadge>
                <span className="text-xs font-mono text-secondary text-right w-1/2">{day.duration}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{day.title}</h3>
              <ul className="space-y-3 flex-1">
                {day.modules.map((mod, i) => (
                  <li key={i} className="flex gap-3 text-sm text-secondary items-start">
                    <ArrowRight size={14} className="mt-1 text-zinc-500 shrink-0" />
                    {mod}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border border-dashed">
                <div className="flex items-center gap-2 text-xs font-mono text-secondary">
                  <div className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-accent-green' : 'bg-accent-blue'}`}></div>
                  STATUS: {idx === 2 ? 'DEPLOYMENT' : 'TRAINING'}
                </div>
              </div>
            </TechCard>
          ))}
        </div>
      </section>

      {/* Benefits / Outcomes */}
      <section className="px-6 max-w-7xl mx-auto w-full bg-surface/20 border-y border-border py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader title="System Output" subtitle="This is not a lecture. It is a workshop." />
            <div className="space-y-6">
              {[
                { title: "Complete AI Pipeline", desc: "A Notion-based system to manage prompts and outputs." },
                { title: "30+ Published Assets", desc: "You will hit 'publish' during the weekend." },
                { title: "Custom Voice Matrix", desc: "No more generic sounding AI copy." },
                { title: "Live Feedback Loop", desc: "Direct critique from senior instructors." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded bg-surface flex items-center justify-center shrink-0 border border-border">
                    <CheckCircle size={18} className="text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-sm text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent rounded-xl"></div>
             <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
              alt="Workspace" 
              className="rounded-xl border border-border opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 shadow-2xl" 
             />
             <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur px-4 py-2 border border-border rounded text-xs font-mono text-primary">
               ASSETS_GENERATED: 30+
             </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="px-6 max-w-4xl mx-auto w-full text-center">
        <TechCard className="border-accent-blue/30 bg-accent-blue/5">
          <div className="py-8">
            <TechBadge color="blue">LIMITED CAPACITY: 10 SEATS MAX</TechBadge>
            <h2 className="text-4xl font-bold mt-6 mb-2">Initialize Your Upgrade</h2>
            <p className="text-secondary mb-8">Join the next cohort and transform your workflow.</p>
            
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-mono font-bold text-primary">$197</span>
                <span className="text-2xl font-mono text-secondary line-through decoration-secondary">$397</span>
              </div>
              <p className="text-xs text-accent-green mt-2 font-mono border border-accent-green/30 px-2 py-1 bg-accent-green/10 rounded">
                PROMO: REGISTER BEFORE 2026 - BACK TO $397 JAN 1
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="text-left">
                <label className="text-xs font-mono text-secondary mb-1 block">SELECT COHORT:</label>
                <div className="grid gap-2">
                  {COHORTS.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCohort(c)}
                      className={`w-full text-left px-4 py-3 border rounded transition-all text-sm ${
                        selectedCohort === c 
                          ? 'bg-surface border-accent-blue text-primary' 
                          : 'bg-background/50 border-border text-secondary hover:border-zinc-500'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <TechButton onClick={onEnroll} className="w-full h-12 text-lg">
                Begin Registration
              </TechButton>
            </div>
            
            <p className="mt-6 text-xs text-secondary">
              100% Money-back guarantee if you don't generate at least 10 assets by Sunday noon.
            </p>
          </div>
        </TechCard>
      </section>
    </div>
  );
};

const PlatformDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [expandedDay, setExpandedDay] = useState<string>('d1');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <div className="font-bold tracking-tight flex items-center gap-2">
            <Rocket size={20} className="text-accent-blue" />
            Content Rocket
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'curriculum', label: 'Curriculum', icon: Code },
            { id: 'deliverables', label: 'Deliverables', icon: CheckCircle },
            { id: 'schedule', label: 'Live Schedule', icon: Calendar },
            { id: 'workbench', label: 'AI Workbench', icon: Terminal },
            { id: 'community', label: 'Cohort Chat', icon: Users },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-background text-primary border border-border' 
                  : 'text-secondary hover:text-primary hover:bg-background/50'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button onClick={onBack} className="text-xs text-secondary hover:text-primary flex items-center gap-2">
            <Lock size={12} /> LOGOUT_SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-background/50 relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50 backdrop-blur">
          <div className="flex items-center gap-4">
             <button className="md:hidden text-secondary" onClick={onBack}>←</button>
             <h2 className="font-mono text-sm uppercase tracking-wider text-secondary">
               Current Module: <span className="text-primary">Day 1 / Setup</span>
             </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-900/50 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-500 font-medium">LIVE</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'curriculum' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Course Curriculum</h1>
                    <TechBadge>v2.1_LATEST</TechBadge>
                  </div>
                  
                  {DETAILED_CURRICULUM.map((day) => (
                    <div key={day.id} className="space-y-4">
                      <button 
                        onClick={() => setExpandedDay(expandedDay === day.id ? '' : day.id)}
                        className={`w-full text-left p-4 rounded-lg border flex justify-between items-center transition-all ${
                          expandedDay === day.id 
                            ? 'bg-surface border-accent-blue/50' 
                            : 'bg-surface/40 border-border hover:border-secondary'
                        }`}
                      >
                        <div>
                           <h3 className="font-bold text-lg">{day.title}</h3>
                           <p className="text-xs text-secondary font-mono mt-1">{day.subtitle}</p>
                        </div>
                        <div className={`transition-transform duration-300 ${expandedDay === day.id ? 'rotate-90' : ''}`}>
                          <ArrowRight size={18} className="text-secondary" />
                        </div>
                      </button>

                      {expandedDay === day.id && (
                        <div className="space-y-4 pl-2 animate-in fade-in slide-in-from-top-4 duration-300">
                          {day.sessions.map((session, sIdx) => (
                            <TechAccordionItem
                              key={sIdx}
                              title={
                                <div className="flex items-center gap-3">
                                  <Clock size={14} className="text-accent-blue" />
                                  <span>{session.title}</span>
                                </div>
                              }
                              subtitle={session.time}
                              defaultOpen={sIdx === 0}
                            >
                              <div className="space-y-4">
                                <div className="p-3 bg-background/50 rounded border border-border">
                                  <div className="text-xs font-mono text-secondary mb-2 uppercase">Learning Objectives:</div>
                                  <ul className="list-disc list-inside text-primary/80 text-sm space-y-1">
                                    {session.objectives.map((obj, oIdx) => (
                                      <li key={oIdx}>{obj}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-3">
                                  {session.content.map((item, cIdx) => (
                                    <div key={cIdx} className="flex gap-3 text-sm border-l-2 border-border pl-4 py-1 hover:border-secondary transition-colors">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${
                                            item.type === 'exercise' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' :
                                            item.type === 'project' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                                            item.type === 'deliverable' ? 'border-purple-500/30 text-purple-500 bg-purple-500/5' :
                                            item.type === 'demo' ? 'border-cyan-500/30 text-cyan-500 bg-cyan-500/5' :
                                            'border-border text-secondary'
                                          }`}>
                                            {item.type.toUpperCase()}
                                          </span>
                                          <span className="font-medium text-primary">{item.title}</span>
                                        </div>
                                        {item.details && (
                                          <ul className="mt-1 ml-1 text-xs text-secondary space-y-0.5">
                                            {item.details.map((d, dIdx) => <li key={dIdx}>- {d}</li>)}
                                          </ul>
                                        )}
                                      </div>
                                      {item.duration && <div className="text-xs text-secondary font-mono whitespace-nowrap">{item.duration}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TechAccordionItem>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <TechCard noPadding className="sticky top-6">
                     <div className="p-4 bg-surface border-b border-border flex items-center gap-2">
                        <Award size={16} className="text-accent-blue" />
                        <span className="font-bold text-sm">Grading Criteria</span>
                     </div>
                     <div className="p-4 space-y-4 text-sm text-secondary">
                        <div>
                          <p className="font-medium text-primary mb-1">Quizzes (3)</p>
                          <p className="text-xs">Must pass with 80%+ score. Unlimited attempts for Q1/Q2.</p>
                        </div>
                        <div>
                          <p className="font-medium text-primary mb-1">Live Exercises</p>
                          <p className="text-xs">4 timed sprints during live calls.</p>
                        </div>
                        <div>
                          <p className="font-medium text-primary mb-1">Major Projects</p>
                          <p className="text-xs">5 key deliverables reviewed by instructors.</p>
                        </div>
                     </div>
                  </TechCard>
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="max-w-4xl mx-auto">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Asset Tracker</h1>
                      <p className="text-secondary">Track your progress towards the 30+ asset guarantee.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold font-mono text-accent-green">0/30</div>
                      <div className="text-xs text-secondary uppercase">Assets Completed</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DELIVERABLES_LIST.map((cat, idx) => (
                      <TechCard key={idx} className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6 border-b border-border pb-4 border-dashed">
                          <h3 className="font-bold flex items-center gap-2">
                            {idx === 0 ? <FileText size={18} /> : 
                             idx === 1 ? <CheckCircle size={18} /> : 
                             idx === 2 ? <Play size={18} /> : <Terminal size={18} />}
                            {cat.category}
                          </h3>
                          <TechBadge color={idx === 3 ? 'blue' : 'green'}>{cat.count} ITEMS</TechBadge>
                        </div>
                        <div className="flex-1">
                          <TechChecklist items={cat.items} />
                        </div>
                      </TechCard>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'workbench' && (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-border rounded-xl bg-surface/20">
                 <Terminal size={48} className="text-secondary mb-6" />
                 <h3 className="text-xl font-bold mb-2">AI Workbench Locked</h3>
                 <p className="text-secondary max-w-md">
                   The integrated AI environment is available only during active live sessions to ensure server stability. Please return at 18:00 Friday.
                 </p>
               </div>
            )}
            
            {(activeTab === 'schedule' || activeTab === 'community') && (
              <div className="flex flex-col items-center justify-center h-64 text-secondary">
                <span className="font-mono text-sm">CONTENT_NOT_LOADED</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  
  // Basic Navigation Handler
  const navigate = (newView: AppView) => {
    // Add a small fake loading delay for effect
    setTimeout(() => {
      setView(newView);
      window.scrollTo(0,0);
    }, 150);
  };

  return (
    <TechnicalGridBackground>
      {view === AppView.LANDING ? (
        <LandingPage onEnroll={() => navigate(AppView.PLATFORM)} />
      ) : (
        <PlatformDashboard onBack={() => navigate(AppView.LANDING)} />
      )}
    </TechnicalGridBackground>
  );
}

export default App;