// components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = "", 
  ...props 
}: ButtonProps) {
  // Base: Sharp corners, uppercase text, bold font
  const baseStyles = "px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors duration-200 flex items-center justify-center font-sans";
  
  const variants = {
    // Primary: Red background -> Turns Black on hover
    primary: "bg-red-700 text-white hover:bg-slate-900",
    
    // Outline: Light border -> Turns Dark on hover
    outline: "border border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-transparent",

    // Ghost: No border -> Subtle background on hover
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}