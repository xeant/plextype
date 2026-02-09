"use client";

import React, { useEffect, useState } from "react";
import { getCategoryTree, updateCategory, deleteCategory } from "@/app/drink/(admin)/_actions/category";
import { ChevronRight, FolderTree, Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryAdminPage() {
  const [tree, setTree] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  /** 수정 핸들러 */
  const handleEdit = async (id: number, currentName: string) => {
    const newName = window.prompt("새로운 카테고리 이름을 입력하세요:", currentName);
    if (newName && newName !== currentName) {
      const res = await updateCategory(id, { name: newName });
      if (res.success) {
        await loadData();
      } else {
        alert(res.error);
      }
    }
  };

  /** 삭제 핸들러 */
  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`'${name}' 카테고리를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      const res = await deleteCategory(id);
      if (res.success) {
        await loadData();
      } else {
        alert(res.error);
      }
    }
  };

  const renderCategory = (item: any) => (
    <div key={item.categoryId} className="ml-4">
      <div className="group flex items-center gap-2 py-2 px-3 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border-b border-gray-50">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand(item.categoryId);
          }} 
          className="p-1"
        >
          {item.children.length > 0 && (
            <ChevronRight className={`size-4 transition-transform text-gray-400 ${expanded.includes(item.categoryId) ? "rotate-90" : ""}`} />
          )}
        </button>
        <span className="text-sm font-medium text-gray-700">{item.name}</span>
        <span className="text-[10px] text-gray-300 font-mono">ID: {item.categoryId}</span>
        
        <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1 bg-white/80 backdrop-blur-sm rounded-md shadow-sm border border-gray-100 p-0.5">
          <button 
            onClick={() => handleEdit(item.categoryId, item.name)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="수정"
          >
            <Pencil size={14} />
          </button>
          <button 
            onClick={() => handleDelete(item.categoryId, item.name)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="삭제"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded.includes(item.categoryId) && item.children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l border-indigo-100 ml-4"
          >
            {item.children.map((child: any) => renderCategory(child))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <FolderTree size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">주류 카테고리 관리</h1>
            <p className="text-sm text-gray-500">계층 구조를 수정하거나 관리합니다.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <Plus size={18} />
          <span className="font-semibold text-sm">새 분류 추가</span>
        </button>
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">데이터를 불러오는 중...</div>
        ) : tree.length > 0 ? (
          tree.map(item => renderCategory(item))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400">
            등록된 카테고리가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}