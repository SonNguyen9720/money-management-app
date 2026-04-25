import React from 'react';
import { templatesConfig } from './templatesConfig';
import type { QuickAddTemplate } from '../../pages/transactions/types';
import './transactions.css';

interface QuickAddTemplatesProps {
  onSelect: (template: QuickAddTemplate) => void;
}

const QuickAddTemplates: React.FC<QuickAddTemplatesProps> = ({ onSelect }) => {
  return (
    <section className="quick-add-section">
      <h3 className="quick-add-title">Quick Add Templates</h3>
      <div className="quick-add-templates">
        {templatesConfig.map((template) => {
          // Assign arbitrary colors for icons based on id for visual variety
          const colors = ['text-tertiary', 'text-secondary', 'text-primary', 'text-orange-500'];
          const iconColorClass = colors[parseInt(template.id, 10) % colors.length] || 'text-primary';
          
          return (
            <button 
              key={template.id} 
              className="template-chip"
              onClick={() => onSelect(template)}
            >
              <span className={`material-symbols-outlined ${iconColorClass}`}>{template.icon}</span>
              <div className="template-chip-text">
                <p className="template-label">{template.label}</p>
                <p className="template-category">{template.categoryId.replace('-id', '')}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickAddTemplates;
