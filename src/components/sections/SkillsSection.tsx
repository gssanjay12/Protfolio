import React from 'react';
import { Code2, Cpu, Database, Wrench } from 'lucide-react';
import { skillsData } from '../../data/skills';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return Code2;
      case 'aiml':
        return Cpu;
      case 'data':
        return Database;
      case 'tools':
      default:
        return Wrench;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-[#26262B]">
      {/* Top Technical Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.SKILLS_MATRIX
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          TECHNICAL SKILLS
        </h2>
      </div>

      {/* Grid of 4 Clean Technical Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillsData.map((category) => {
          const Icon = getCategoryIcon(category.id);
          return (
            <div
              key={category.id}
              className="p-5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-colors flex flex-col justify-between rounded-xs"
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#26262B]">
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-[#8C8C93]" />
                    <h3 className="font-sans font-bold text-xs tracking-wide text-[#EDEDED]">
                      {category.category}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-[#5C5C64]">
                    {category.systemTag}
                  </span>
                </div>

                {/* Skills List */}
                <div className="mt-4 space-y-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="px-3 py-2 bg-[#121214] border border-[#26262B] flex items-center justify-between rounded-xs"
                    >
                      <span className="text-xs font-mono text-[#EDEDED] font-medium">
                        {item.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C93]/40" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Footer */}
              <div className="mt-5 pt-3 border-t border-[#26262B] flex items-center justify-between text-[10px] font-mono text-[#5C5C64]">
                <span>MODULE</span>
                <span className="text-[#8C8C93]">{category.items.length} SKILLS</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
