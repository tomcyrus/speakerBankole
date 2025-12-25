import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TaskItem } from './components/TaskItem';
import { LandingPage } from './components/LandingPage';
import { Task, FilterType, SubTask } from './types';
import { Plus, Command, Quote, ArrowLeft } from 'lucide-react';
import { getMotivationalQuote } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');

  // --- Dashboard Logic ---
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('justdoit-tasks');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Complete Project Documentation',
        completed: false,
        priority: 'high',
        category: 'Work',
        createdAt: Date.now(),
        subtasks: []
      },
      {
        id: '2',
        title: 'Review Quarterly Goals',
        completed: true,
        priority: 'medium',
        category: 'Work',
        createdAt: Date.now() - 100000,
        subtasks: []
      }
    ];
  });

  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [quote, setQuote] = useState<string>('');
  const [loadingQuote, setLoadingQuote] = useState(false);

  useEffect(() => {
    localStorage.setItem('justdoit-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (view === 'app' && !quote) {
      const fetchQuote = async () => {
          setLoadingQuote(true);
          const q = await getMotivationalQuote();
          setQuote(q);
          setLoadingQuote(false);
      };
      fetchQuote();
    }
  }, [view]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium', // Default
      category: 'General',
      createdAt: Date.now(),
      subtasks: []
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addSubtasks = (taskId: string, subtaskTitles: string[]) => {
    setTasks(tasks.map(t => {
      if (t.id !== taskId) return t;
      const newSubtasks: SubTask[] = subtaskTitles.map(title => ({
        id: crypto.randomUUID(),
        title,
        completed: false
      }));
      return { ...t, subtasks: [...(t.subtasks || []), ...newSubtasks] };
    }));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id !== taskId) return t;
      const updatedSub = t.subtasks?.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s);
      return { ...t, subtasks: updatedSub };
    }));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === FilterType.ACTIVE) return !t.completed;
    if (filter === FilterType.COMPLETED) return t.completed;
    return true;
  });

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('app')} />;
  }

  return (
    <div className="min-h-screen bg-charcoal text-zinc-900 font-sans selection:bg-purple-500/30">
      <Sidebar 
        currentFilter={filter} 
        setFilter={setFilter} 
        taskCount={tasks.length} 
      />

      <main className="md:ml-64 min-h-screen p-6 md:p-12 transition-all">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-4">
               <button 
                 onClick={() => setView('landing')} 
                 className="md:hidden text-zinc-500 hover:text-zinc-900 flex items-center gap-2 mb-4"
               >
                 <ArrowLeft size={16} /> Back
               </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                {filter === FilterType.ALL ? 'My Tasks' : filter === FilterType.ACTIVE ? 'In Progress' : 'Completed'}
              </h1>
              <div className="text-xs font-mono text-zinc-500 border border-zinc-200 px-3 py-1 rounded-full bg-white">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
            
            {/* Quote of the session */}
            <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative p-6 rounded-xl bg-white border border-zinc-200 shadow-sm flex gap-4 items-start">
                 <Quote className="text-purple-500 shrink-0 mt-1" size={20} />
                 <div>
                   <p className={`text-lg font-light italic leading-relaxed text-zinc-700 ${loadingQuote ? 'animate-pulse' : ''}`}>
                     "{quote || 'Loading insight...'}"
                   </p>
                   <p className="text-xs text-zinc-400 mt-2 font-medium uppercase tracking-wider">— AI Assistant</p>
                 </div>
               </div>
            </div>
          </header>

          {/* Add Task Input */}
          <form onSubmit={addTask} className="mb-8 relative group z-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Plus className="text-zinc-400 group-focus-within:text-purple-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent shadow-lg shadow-zinc-200/50 transition-all"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="hidden md:flex items-center gap-1 text-xs text-zinc-400 border border-zinc-100 px-2 py-1 rounded bg-zinc-50">
                <Command size={10} />
                <span>Enter</span>
              </span>
            </div>
          </form>

          {/* Task List */}
          <div className="space-y-1">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onAddSubtasks={addSubtasks}
                  onToggleSubtask={toggleSubtask}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                 <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                    <Command className="text-zinc-400" size={32} />
                 </div>
                 <p className="text-zinc-400 text-lg">No tasks found</p>
                 <p className="text-zinc-400 text-sm">You're all caught up, or maybe it's time to plan.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
