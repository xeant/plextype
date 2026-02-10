"use client";

import { useEffect, useState } from "react";
import { getCategoryTree, deleteCategory } from "../_actions/category";
import CategoryFormModal from "../_components/CategoryFormModal";
import { ChevronRight, FolderTree, Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryAdminPage() {
  const [tree, setTree] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getCategoryTree();
    setTree(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleEditClick = (item: any) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`'${name}' 삭제하시겠습니까?`)) {
      const res = await deleteCategory(id);
      if (res.success) await loadData();
      else alert(res.error);
    }
  };

  const renderCategory = (item: any) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.includes(item.categoryId);

    return (
      <div key={item.categoryId} className="w-full">
        <div className="group flex items-start gap-2 py-3 px-3 hover:bg-indigo-50 rounded-lg transition-colors border-b border-gray-50">
          <button
            onClick={() => toggleExpand(item.categoryId)}
            className={`mt-0.5 p-1 ${!hasChildren ? "invisible" : ""}`}
          >
            <ChevronRight
              className={`size-4 transition-transform text-gray-400 ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>
          <div
            className="flex-1 cursor-pointer"
            onClick={() => hasChildren && toggleExpand(item.categoryId)}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {item.name}
              </span>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">
                ID: {item.categoryId}
              </span>
            </div>
            {item.description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover:line-clamp-none">
                {item.description}
              </p>
            )}
          </div>
          <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(item);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.categoryId, item.name);
              }}
              className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-l-2 border-indigo-100 ml-6"
            >
              {item.children.map((child: any) => renderCategory(child))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <FolderTree size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              주류 카테고리 관리
            </h1>
          </div>
        </div>
        <button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100"
        >
          <Plus size={18} /> 새 분류 추가
        </button>
      </div>
      <div className="space-y-1">
        {isLoading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">
            로딩 중...
          </div>
        ) : (
          tree.map((item) => renderCategory(item))
        )}
      </div>
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        categories={tree}
        onSuccess={loadData}
        editData={editItem}
      />
    </div>
  );
}
