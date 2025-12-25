import React, { useState, useRef } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { Button } from './Button';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

export const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, courseTitle }) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Check if emailjs is loaded
    const emailjs = (window as any).emailjs;
    if (!emailjs) {
        setStatus('error');
        setErrorMessage('Email service not initialized. Check internet connection.');
        return;
    }

    // TODO: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from EmailJS dashboard
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
            onClose();
            setStatus('idle');
        }, 3000);
      }, (error: any) => {
        setStatus('error');
        setErrorMessage(error.text || 'Failed to send registration. Please try again.');
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-slide-up">
        
        {/* Decorative Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-zinc-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Secure Your Seat</h2>
            <p className="text-zinc-500 text-sm">
              Registering for: <span className="text-amber-600 font-medium">{courseTitle}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-full hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Registration Confirmed!</h3>
              <p className="text-zinc-500">
                We've received your details. Check your email for the joining instructions.
              </p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              {/* Hidden input for course title */}
              <input type="hidden" name="course_title" value={courseTitle} />

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    name="user_phone"
                    placeholder="+234..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2">
                <Button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 text-base font-bold bg-amber-500 hover:bg-amber-400 text-black border-none rounded-xl shadow-lg shadow-amber-500/20"
                >
                    {status === 'sending' ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={18} /> Processing...
                        </span>
                    ) : (
                        "Confirm Registration"
                    )}
                </Button>
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-zinc-400">
                    <Lock size={12} />
                    <span>Your information is securely processed.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
