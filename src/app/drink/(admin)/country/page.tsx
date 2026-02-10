import { db } from "@/lib/db";
import SyncButton from "../_components/SyncButton";
import { deleteCountryAction, syncCountriesAction } from "../_actions/country";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DrinkCountryPage({ searchParams }: Props) {
  // 1. URL에서 sync 파라미터 확인 및 처리 (Server-side Sync)
  const params = await searchParams;
  const isSync = params.sync === "true";

  if (isSync) {
    await syncCountriesAction();
    // 동기화가 끝나면 URL을 깔끔하게 정리 (파라미터 제거)
    redirect("/drink/country");
  }

  // 2. DB에서 국가 목록 조회
  const countries = await db.drinkCountry.findMany({
    orderBy: { nameKo: "asc" },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">주류 국가 관리</h1>
          <p className="text-gray-500 text-sm">
            총 {countries.length}개의 국가가 등록되어 있습니다.
          </p>
        </div>
        <SyncButton />
      </header>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                국기
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                국가명 (한글)
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                국가명 (영어)
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                ISO
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                대륙
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase text-center">
                상태
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase text-right">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {countries.map((country) => (
              <tr
                key={country.countryId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  {country.flagPath ? (
                    <img
                      src={country.flagPath}
                      alt={country.nameKo}
                      className="w-8 h-5 rounded shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-8 h-5 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {country.nameKo}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {country.nameEn}
                </td>
                <td className="px-6 py-4 text-gray-600">{country.isoCode}</td>
                <td className="px-6 py-4 text-gray-600">{country.continent}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      country.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {country.status === "active" ? "활성" : "비활성"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <form
                    action={async () => {
                      "use server";
                      await deleteCountryAction(country.countryId);
                    }}
                  >
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      삭제
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {countries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  데이터가 없습니다. 동기화 버튼을 눌러 데이터를 가져오세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
