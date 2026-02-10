"use client";

import { useState, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { X, Search, MapPin, Globe, Save, Factory, Link } from "lucide-react";
import { upsertProducer } from "../_actions/producer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  countries: any[];
  onSuccess: () => void;
  editData?: any;
}

const libraries: "places"[] = ["places"];

export default function ProducerFormModal({
  isOpen,
  onClose,
  countries,
  onSuccess,
  editData,
}: Props) {
  // 1. Hydration 에러 방지를 위한 마운트 상태
  const [mounted, setMounted] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. 구글 맵 로더
  // language: "ko" -> 한국어 검색 결과를 우선시합니다.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
    language: "ko",
  });

  const [formData, setFormData] = useState({
    nameKo: "",
    nameEn: "",
    countryId: "",
    region: "",
    address: "",
    lat: "" as string | number,
    lng: "" as string | number,
    mapUrl: "",
    description: "",
    status: "active",
    homepage: "",
  });

  // 컴포넌트 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 초기화 및 수정 데이터 로드
  useEffect(() => {
    if (editData) {
      setFormData({
        nameKo: editData.nameKo || "",
        nameEn: editData.nameEn || "",
        countryId: editData.countryId?.toString() || "",
        region: editData.region || "",
        address: editData.address || "",
        lat: editData.latlng?.split(",")[0] || "",
        lng: editData.latlng?.split(",")[1] || "",
        mapUrl: editData.mapUrl || "",
        description: editData.description || "",
        status: editData.status || "active",
        homepage: editData.homepage || "",
      });
    } else {
      setFormData({
        nameKo: "",
        nameEn: "",
        countryId: "",
        region: "",
        address: "",
        lat: "",
        lng: "",
        mapUrl: "",
        description: "",
        status: "active",
        homepage: "",
      });
    }
  }, [editData, isOpen]);

  // 3. 구글 검색 결과 처리 로직 (핵심 수정 부분)
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      // (1) 국가 자동 매칭 로직
      const countryComponent = place.address_components.find((c) =>
        c.types.includes("country"),
      );
      // 구글이 주는 'GB', 'JP', 'KR' 등의 코드를 가져옴
      const googleIsoCode = countryComponent?.short_name;

      // 내 DB의 countries 리스트에서 ISO 코드가 일치하는 나라 찾기
      const matchedCountry = countries.find(
        (c) => c.isoCode?.toUpperCase() === googleIsoCode?.toUpperCase(),
      );

      // (2) 이름 분기 처리
      const rawName = place.name || "";
      // 한글 포함 여부 정규식 체크
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(rawName);

      setFormData((prev) => ({
        ...prev,
        // 한글이 포함된 결과면 '한글 이름' 칸에 넣고, 영문 이름은 건드리지 않음
        // 영문 결과면 '영문 이름' 칸에 넣음
        nameKo: hasKorean ? rawName : prev.nameKo,
        nameEn: !hasKorean ? rawName : prev.nameEn,

        // 매칭된 국가가 있으면 해당 ID 선택, 없으면 기존 값 유지
        countryId: matchedCountry
          ? matchedCountry.countryId.toString()
          : prev.countryId,

        // 주/도/현 정보 추출 (예: 홋카이도, 스코틀랜드)
        region:
          place.address_components?.find((c) =>
            c.types.includes("administrative_area_level_1"),
          )?.long_name || prev.region,

        address: place.formatted_address || prev.address,
        lat: place.geometry?.location?.lat() || "",
        lng: place.geometry?.location?.lng() || "",
        mapUrl: place.url || prev.mapUrl,
        homepage: place.website || prev.homepage,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.countryId) {
      alert("국가를 선택해 주세요.");
      return;
    }
    setIsSubmitting(true);

    // 4. 저장 시 위도/경도 합치기 및 데이터 가공
    const payload = {
      ...formData,
      producerId: editData?.producerId,
      countryId: parseInt(formData.countryId), // 숫자로 변환
      // lat, lng를 latlng 문자열로 병합 (스키마 대응)
      latlng:
        formData.lat && formData.lng ? `${formData.lat},${formData.lng}` : null,
      mapType: "google",
    };

    const res = await upsertProducer(payload);
    if (res.success) {
      onSuccess();
      onClose();
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  // 마운트 전이거나 열려있지 않으면 렌더링 안 함
  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-gray-900">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-white">
              <Factory size={20} />
            </div>
            <h2 className="text-xl font-bold">
              {editData ? "증류소 정보 수정" : "새 증류소 등록"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-8 space-y-6">
          {/* Google Search Section */}
          {isLoaded && (
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
              <label className="block text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Search size={16} /> Google Maps 검색 자동 채우기
              </label>
              <Autocomplete
                onLoad={setAutocomplete}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="영문으로 검색하면 영문명이 자동 입력됩니다 (예: Yoichi)"
                  className="w-full p-3 rounded-xl border-2 border-white focus:border-amber-400 outline-none shadow-sm transition-all"
                />
              </Autocomplete>
              <p className="text-[11px] text-amber-600 mt-2 ml-1">
                * 한글 검색 시 한글명과 국가가, 영문 검색 시 영문명과 국가가
                자동 입력됩니다.
              </p>
            </div>
          )}

          {/* 이름 입력 필드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                증류소명 (한글)
              </label>
              <input
                required
                value={formData.nameKo}
                onChange={(e) =>
                  setFormData({ ...formData, nameKo: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="닛카 요이치 증류소"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                영문 이름
              </label>
              <input
                value={formData.nameEn}
                onChange={(e) =>
                  setFormData({ ...formData, nameEn: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="Yoichi Distillery"
              />
            </div>
          </div>

          {/* 국가 및 지역 선택 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                <Globe size={14} /> 국가 (자동선택)
              </label>
              <select
                required
                value={formData.countryId}
                onChange={(e) =>
                  setFormData({ ...formData, countryId: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              >
                <option value="">국가 선택</option>
                {countries.map((c) => (
                  <option key={c.countryId} value={c.countryId.toString()}>
                    {c.nameKo} ({c.isoCode})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                <MapPin size={14} /> 세부 지역
              </label>
              <input
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="예: Hokkaido"
              />
            </div>
          </div>

          {/* 주소 및 기타 정보 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">주소</label>
            <input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                <Link size={14} /> 홈페이지
              </label>
              <input
                value={formData.homepage}
                onChange={(e) =>
                  setFormData({ ...formData, homepage: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                좌표 (자동지정)
              </label>
              <div className="p-3 bg-gray-100 rounded-xl text-[10px] text-gray-500 font-mono flex items-center justify-center h-[46px]">
                {formData.lat
                  ? `${Number(formData.lat).toFixed(4)}, ${Number(formData.lng).toFixed(4)}`
                  : "Google 검색 시 자동입력"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">설명</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-400"
            >
              {isSubmitting ? (
                "저장 중..."
              ) : (
                <>
                  <Save size={18} /> 정보 저장하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
