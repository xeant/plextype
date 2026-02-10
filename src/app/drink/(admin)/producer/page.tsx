"use client";

import { useEffect, useState } from "react";
import { getProducers, deleteProducer } from "../_actions/producer";
import { getCountries } from "../_actions/country";
import ProducerFormModal from "../_components/ProducerFormModal";
import {
  Factory,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Globe,
  Info,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProducerAdminPage() {
  const [producers, setProducers] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // 0. 구글 지도 열기 함수
  const openGoogleMap = (latlng: string | null) => {
    if (!latlng) {
      alert("좌표 정보가 없는 증류소입니다.");
      return;
    }
    // 구글 지도 좌표 검색 URL
    const url = `https://www.google.com/maps/search/?api=1&query=${latlng}`;
    window.open(url, "_blank");
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pData, cData] = await Promise.all([
        getProducers(),
        getCountries(),
      ]);
      setProducers(pData);
      setCountries(cData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = (item: any) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`'${name}' 증류소 정보를 정말 삭제하시겠습니까?`)) {
      const res = await deleteProducer(id);
      if (res.success) {
        await loadData();
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100 mt-10 text-gray-900">
      {/* 헤더 섹션 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-100">
            <Factory size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              증류소 및 생산자 관리
            </h1>
            <p className="text-sm text-gray-500">
              주종별 핵심 생산지 및 증류소 정보를 관리합니다.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
        >
          <Plus size={20} />
          <span className="font-bold text-sm">새 증류소 등록</span>
        </button>
      </div>

      {/* 목록 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-32 text-center">
            <div className="inline-block animate-spin size-8 border-4 border-amber-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-400 font-medium">
              증류소 정보를 불러오는 중입니다...
            </p>
          </div>
        ) : producers.length > 0 ? (
          producers.map((item) => (
            <motion.div
              layout
              key={item.producerId}
              className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-50/50 transition-all"
            >
              {/* 카드 상단: 상태 및 액션 */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {item.status}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.producerId, item.nameKo)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* 카드 본문: 이름 및 정보 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
                  {item.nameKo}
                </h3>
                <p className="text-xs text-gray-400 font-mono font-medium uppercase tracking-tighter line-clamp-1">
                  {item.nameEn || "No English Name"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                  <Globe size={16} className="text-gray-400" />
                  <span className="font-semibold">
                    {item.country?.nameKo || "국가 미지정"}
                  </span>
                </div>

                {/* 지도 보기 클릭 영역 추가 */}
                <button
                  onClick={() => openGoogleMap(item.latlng)}
                  className="w-full flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors group/map"
                >
                  <div className="flex items-center gap-3 truncate">
                    <MapPin
                      size={16}
                      className="text-gray-400 group-hover/map:text-amber-500"
                    />
                    <span className="truncate">
                      {item.region || "지역 정보 없음"}
                    </span>
                  </div>
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover/map:opacity-100 shrink-0"
                  />
                </button>
              </div>

              {item.description && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-100">
                  <div className="flex gap-2 items-start">
                    <Info size={14} className="text-gray-300 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed group-hover:line-clamp-none transition-all">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-100 rounded-3xl">
            <Factory size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">
              등록된 증류소가 없습니다.
              <br />새 증류소를 등록해 보세요!
            </p>
          </div>
        )}
      </div>

      <ProducerFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        countries={countries}
        onSuccess={loadData}
        editData={editItem}
      />
    </div>
  );
}
