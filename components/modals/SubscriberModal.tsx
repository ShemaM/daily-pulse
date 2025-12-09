// components/modals/SubscribeModal.tsx
import { useState } from 'react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Optional: Close modal automatically after 2 seconds
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white p-8 rounded-sm shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
          title="Close"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {status === 'success' ? (
          <div className="py-8 animate-fade-in">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">You&#39;re on the list.</h3>
            <p className="text-slate-600">Thank you for supporting independent journalism.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">The Kivu Briefing</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Get the weekly security dispatch delivered to your inbox every Monday morning.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-red-700 text-slate-900 placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-red-700 text-white font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-slate-900 transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'loading' ? 'Processing...' : 'Subscribe Free'}
              </button>
            </form>
            <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-wide">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}