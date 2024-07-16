'use client'

const ProfileComponent = ({ profileName, profileEmail }) => {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center py-10">
          <div className="rounded-full w-24 h-24 bg-gray-200"></div>
        </div>
        <div className="flex items-center justify-center gap-2 pb-2">
          <div className="text-gray-950 text-xl font-medium">{profileName}</div>
          <div className="flex items-center border-[0.5px] border-indigo-600 bg-indigo-100 text-indigo-600 py-[0.5px] px-2 rounded-lg text-[12px]">
            PREMIUM
          </div>
        </div>
        <div className="flex gap-2 justify-center flex-wrap mb-12">
          <div className="text-gray-400 text-sm">{profileEmail}</div>
        </div>
      </div>
    </>
  )
}

export default ProfileComponent
