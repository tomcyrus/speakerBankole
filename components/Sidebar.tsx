import React from 'react';
import { ListTodo, Calendar, Star, LayoutGrid, CheckCircle2, Zap } from 'lucide-react';
import { FilterType } from '../types';

interface SidebarProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  taskCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentFilter, setFilter, taskCount }) => {
  const navItems = [
    { id: FilterType.ALL, icon: LayoutGrid, label: 'All Tasks' },
    { id: FilterType.ACTIVE, icon: Zap, label: 'Active' },
    { id: FilterType.COMPLETED, icon: CheckCircle2, label: 'Completed' },
  ];

  return (
    <aside className="w-64 h-screen bg-obsidian border-r border-zinc-200 flex flex-col hidden md:flex fixed left-0 top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 text-zinc-900 mb-8">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
            <ListTodo size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">Just Do It</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-purple-600' : 'text-zinc-400'} />
                  {item.label}
                </div>
                {item.id === FilterType.ALL && (
                  <span className="bg-zinc-100 px-2 py-0.5 rounded text-xs text-zinc-500">{taskCount}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-100">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Star size={16} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900">Go Pro</p>
              <p className="text-xs text-zinc-500 mt-1">Unlock unlimited AI breakdowns and team features.</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
