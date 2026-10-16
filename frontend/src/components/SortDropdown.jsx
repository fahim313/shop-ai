import React from 'react';
import { ArrowDownWideNarrow } from 'lucide-react';

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="relative flex items-center">
        <label htmlFor="sort-select" className="text-xs text-neutral-500 mr-2 hidden sm:inline whitespace-nowrap">
          Sort by:
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-white border border-neutral-300 rounded px-3 py-2 pr-8 text-xs font-medium text-neutral-900 hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
            <ArrowDownWideNarrow className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
