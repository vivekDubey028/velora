import React from "react";

export interface ProductFilterState {
  purity: string;
  stock: string;
}

export interface ProductFilterSidebarProps {
  filter: ProductFilterState;
  setFilter: (f: ProductFilterState) => void;
  purityOptions: string[];
  stockOptions: string[];
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  filter,
  setFilter,
  purityOptions,
  stockOptions,
}) => {
  return (
    <aside className="w-full max-w-[220px] bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-8">
      <div>
        <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Purity Grades</h4>
        <select
          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          value={filter.purity}
          onChange={e => setFilter({ ...filter, purity: e.target.value })}
        >
          <option value="">All grades</option>
          {purityOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Stock Status</h4>
        <select
          className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
          value={filter.stock}
          onChange={e => setFilter({ ...filter, stock: e.target.value })}
        >
          <option value="">All</option>
          {stockOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};
