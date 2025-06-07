import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from './checkbox';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner',
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => setOpen((o) => !o);
  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const displayValue =
    value.length === 0
      ? placeholder
      : value.length === 1
      ? options.find((o) => o.value === value[0])?.label
      : `${value.length} sélectionnées`;

  return (
    <div className={cn('relative', className)} ref={ref}>
      <button
        type="button"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          open && 'ring-2 ring-ring',
        )}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate" style={{ pointerEvents: 'none' }}>{displayValue}</span>
        <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
      </button>
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95" role="listbox">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-accent',
                value.includes(opt.value) && 'bg-accent text-accent-foreground',
              )}
            >
              <Checkbox
                checked={value.includes(opt.value)}
                onCheckedChange={() => handleSelect(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}; 