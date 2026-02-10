"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createCategory, updateCategory } from "../_actions/category";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  onSuccess: () => void;
  editData?: any; // 수정 시 넘어올 데이터
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  categories,
  onSuccess,
  editData,
}: Props) {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    parentId: 0,
  });

  // 수정 모드일 경우 데이터 세팅
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.categoryId,
        name: editData.name,
        description: editData.description || "",
        parentId: editData.parentId,
      });
    } else {
      setFormData({ id: 0, name: "", description: "", parentId: 0 });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert("이름을 입력하세요.");

    const res = editData
      ? await updateCategory(editData.categoryId, {
          newId: formData.id,
          name: formData.name,
          description: formData.description,
          parentId: formData.parentId,
        })
      : await createCategory(formData);

    if (res.success) {
      onSuccess();
      onClose();
    } else {
      alert(res.error);
    }
  };

  const flatten = (items: any[], depth = 0): any[] => {
    return items.reduce(
      (acc, item) => [
        ...acc,
        { ...item, depth },
        ...flatten(item.children, depth + 1),
      ],
      [],
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-6">
              {editData ? "카테고리 수정" : "새 카테고리 추가"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  카테고리 ID (PK)
                </label>
                <input
                  type="number"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded-lg bg-gray-50 font-mono text-sm"
                  placeholder="ID를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  부모 카테고리
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parentId: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value={0}>없음 (최상위)</option>
                  {flatten(categories)
                    .filter((c) => c.categoryId !== editData?.categoryId)
                    .map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {"\u00A0".repeat(cat.depth * 2)} {cat.name} (ID:{" "}
                        {cat.categoryId})
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg min-h-[80px] text-sm"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  저장하기
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
