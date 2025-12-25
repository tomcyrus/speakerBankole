import React, { useState } from 'react';
import { Check, Trash2, Sparkles, ChevronDown, ChevronUp, Clock, AlertCircle } from 'lucide-react';
import { Task, SubTask } from '../types';
import { generateSubtasks } from '../services/geminiService';
import { Button } from './Button';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtasks: (taskId: string, subtasks: string[]) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete, 
  onAddSubtasks,
  onToggleSubtask
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiBreakdown = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.subtasks && task.subtasks.length > 0) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsGenerating(true);
    setIsExpanded(true);
    try {
      const subtasks = await generateSubtasks(task.title);
      onAddSubtasks(task.id, subtasks);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const priorityColor = {
    low: 'text-zinc-400',
    medium: 'text-amber-500',
    high: 'text-red-500'
  };

  return (
    <div className={`group rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all duration-300 mb-3 overflow-hidden ${task.completed ? 'opacity-50' : ''}`}>
      <div className="p-4 flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            task.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-zinc-300 hover:border-zinc-400'
          }`}
        >
          {task.completed && <Check size={14} strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-grow min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h3 className={`font-medium truncate transition-all ${task.completed ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
            <span className={`flex items-center gap-1 ${priorityColor[task.priority]}`}>
              <AlertCircle size={10} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.subtasks && task.subtasks.length > 0 && (
              <>
                <span>•</span>
                <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-2 h-8 w-8 !rounded-full ${isGenerating ? 'animate-pulse text-purple-500' : 'text-purple-500 hover:text-purple-600 hover:bg-purple-50'}`}
            onClick={handleAiBreakdown}
            title="AI Breakdown"
          >
            <Sparkles size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 h-8 w-8 !rounded-full text-red-400 hover:text-red-500 hover:bg-red-50"
            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Subtasks / Expansion Area */}
      <div className={`bg-zinc-50 transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 py-3 border-t border-zinc-100' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="px-12">
           {isGenerating ? (
             <div className="flex items-center gap-2 text-sm text-purple-600 py-2">
               <Loader2 size={14} className="animate-spin" />
               <span>AI is analyzing your task...</span>
             </div>
           ) : (
             <div className="space-y-2">
                {task.subtasks?.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3 text-sm group/sub">
                     <button
                        onClick={() => onToggleSubtask(task.id, sub.id)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          sub.completed ? 'bg-purple-500 border-purple-500 text-white' : 'border-zinc-300 hover:border-zinc-400 bg-white'
                        }`}
                      >
                        {sub.completed && <Check size={10} />}
                      </button>
                      <span className={`${sub.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                        {sub.title}
                      </span>
                  </div>
                ))}
                {(!task.subtasks || task.subtasks.length === 0) && (
                  <p className="text-xs text-zinc-400 italic">No subtasks yet. Click the sparkles to generate.</p>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Helper for loading icon in component
const Loader2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
