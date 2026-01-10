import React, { useState, useRef, useEffect } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, Lock, Calendar, Clock } from 'lucide-react';
import { Button } from './Button';

export interface CourseData {
  title: string;
  subtitle?: string;
  date?: string;
  price?: string;
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseData | null;
}

export const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, course }) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset status when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen || !course) return null;

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

    emailjs.sendForm('service_6tuni16', 'template_jru6e5c', form.current)
      .then(() => {
        setStatus('success');
      }, (error: any) => {
        setStatus('error');
        setErrorMessage(error.text || 'Failed to send registration. Please try again.');
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-slide-up my-auto">
        
        {/* Decorative Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex justify-between items-start bg-zinc-50">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-1">Event Registration</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">SpeakerBankole Leadership Academy</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-full hover:bg-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-4 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Registration Confirmed!</h3>
              
              <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 text-left mb-6 w-full">
                  <p className="text-zinc-800 font-medium mb-4">
                      You’re officially registered for: <br/>
                      <span className="text-amber-600">{course.title}</span>
                  </p>
                  <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                      Your access details have been sent immediately to the email address you provided. Please check your inbox (and spam/promotions folder if necessary).
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-zinc-200 text-sm space-y-2">
                      <strong className="block text-zinc-900">What to do next:</strong>
                      <ul className="list-disc pl-4 text-zinc-600 space-y-1">
                          <li>Save the date {course.date && `(${course.date})`}</li>
                          <li>Keep your link/ticket safe</li>
                          <li>Prepare your questions</li>
                      </ul>
                  </div>
              </div>

              <Button onClick={onClose} className="w-full bg-zinc-900 text-white rounded-xl">
                  Close & Return Home
              </Button>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                 <h3 className="font-bold text-base text-zinc-900">{course.title}</h3>
                 {course.subtitle && <p className="text-sm text-zinc-600 mt-1">{course.subtitle}</p>}
                 <div className="flex items-center gap-4 mt-3 text-xs font-medium text-zinc-500">
                    {course.date && <span className="flex items-center gap-1"><Calendar size={14}/> {course.date}</span>}
                    {course.price && <span className="bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-700">{course.price}</span>}
                 </div>
              </div>

              {/* Hidden input for course title */}
              <input type="hidden" name="course_title" value={course.title} />

              {/* Row 1: Name & Age */}
              <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="user_name"
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Age <span className="text-red-500">*</span></label>
                    <input 
                        type="number" 
                        name="user_age"
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        name="user_email"
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        name="user_phone"
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
              </div>

               {/* Row 3: Country & Occupation */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Country of Residence <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="user_country"
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Current Role</label>
                    <input 
                        type="text" 
                        name="user_occupation"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
              </div>

              {/* Row 4: Category & Reason */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Category <span className="text-red-500">*</span></label>
                    <select name="user_category" required className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all appearance-none">
                        <option value="">Select Category</option>
                        <option value="Student">Student</option>
                        <option value="Professional">Professional</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Other">Other</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Reason for Attending</label>
                    <select name="user_reason" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all appearance-none">
                        <option value="">Select Primary Reason</option>
                        <option value="Leadership clarity">Leadership clarity</option>
                        <option value="Personal growth">Personal growth</option>
                        <option value="Enterprise & influence">Enterprise & influence</option>
                        <option value="Spiritual alignment">Spiritual alignment</option>
                        <option value="Purpose discovery">Purpose discovery</option>
                    </select>
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