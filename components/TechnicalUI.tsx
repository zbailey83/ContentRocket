import React, { useState, useEffect } from 'react';
import { LucideIcon, ChevronDown, Check, Circle, Sun, Moon } from 'lucide-react';

// --- Layout Wrapper & Theme Context ---
export const TechnicalGridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-x-hidden text-primary selection:bg-accent-blue selection:text-white transition-colors duration-300">
      {/* Radial Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Theme Toggle - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-border bg-surface/50 backdrop-blur hover:bg-surface-hover text-secondary hover:text-primary transition-all shadow-lg"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// --- Card Component ---
interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({ children, className = '', noPadding = false }) => (
  <div className={`relative bg-surface/30 backdrop-blur-sm border border-dashed border-border rounded-xl overflow-hidden group hover:border-secondary/50 transition-colors duration-300 ${className}`}>
    {/* Corner Brackets */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-secondary/50 opacity-50" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-secondary/50 opacity-50" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-secondary/50 opacity-50" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-secondary/50 opacity-50" />
    
    <div className={noPadding ? '' : 'p-6'}>
      {children}
    </div>
  </div>
);

// --- Button Component ---
interface TechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const TechButton: React.FC<TechButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  isLoading,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide uppercase font-mono transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent-blue/10 text-accent-blue border border-accent-blue hover:bg-accent-blue hover:text-white hover:shadow-[0_0_20px_var(--color-accent-blue-dim)]",
    outline: "bg-transparent text-secondary border border-border hover:border-secondary hover:text-primary",
    ghost: "bg-transparent text-secondary hover:text-primary"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon && (
        <Icon size={16} />
      )}
      {children}
      
      {/* Decorative technical line */}
      {variant === 'primary' && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-current opacity-50" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
      )}
    </button>
  );
};

// --- Input Component ---
interface TechInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TechInput: React.FC<TechInputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-mono text-secondary uppercase tracking-wider">{label}</label>}
    <div className="relative group">
      <input
        className={`w-full bg-background/50 border border-border text-primary px-4 py-3 font-sans text-sm placeholder-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all ${className}`}
        {...props}
      />
      {/* Focus decoration */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-blue group-focus-within:w-full transition-all duration-500" />
    </div>
  </div>
);

// --- Badge ---
export const TechBadge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'red' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "text-accent-blue border-accent-blue/30 bg-accent-blue/5",
    green: "text-accent-green border-accent-green/30 bg-accent-green/5",
    red: "text-accent-red border-accent-red/30 bg-accent-red/5"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono border ${colors[color]} tracking-wide`}>
      {children}
    </span>
  );
};

// --- Section Header ---
export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight mb-2">
      <span className="text-accent-blue mr-2">//</span>
      {title}
    </h2>
    {subtitle && <p className="text-secondary max-w-2xl text-sm md:text-base">{subtitle}</p>}
  </div>
);

// --- Accordion ---
interface AccordionItemProps {
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const TechAccordionItem: React.FC<AccordionItemProps> = ({ title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-surface/30 mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-hover/50 transition-colors text-left"
      >
        <div className="flex flex-col gap-1">
          <div className="font-medium text-primary">{title}</div>
          {subtitle && <div className="text-xs text-secondary font-mono">{subtitle}</div>}
        </div>
        <ChevronDown 
          className={`text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-border bg-background/30 text-sm text-secondary">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Checklist ---
export const TechChecklist: React.FC<{ items: string[]; title?: string }> = ({ items, title }) => (
  <div className="space-y-3">
    {title && <h4 className="font-mono text-xs uppercase text-secondary mb-4">{title}</h4>}
    {items.map((item, idx) => (
      <div key={idx} className="flex items-start gap-3 group">
        <div className="mt-0.5 relative flex items-center justify-center w-5 h-5 rounded border border-border bg-surface/50 group-hover:border-accent-blue/50 transition-colors">
          <Check size={12} className="text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-sm text-secondary group-hover:text-primary transition-colors">{item}</span>
      </div>
    ))}
  </div>
);