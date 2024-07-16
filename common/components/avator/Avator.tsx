'use Client'

const Avator = props => {
  return (
    <>
      <div className="flex gap-2 md:pr-4">
        <div className="flex items-center">
          <div className="relative dark:bg-dark-400 block h-5 w-5 rounded-full bg-gray-800">
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center flex-1 gap-2">
          <div>
            <div className="text-left dark:text-dark-100 text-xs font-medium text-gray-800">
              {props.username}
            </div>
            <div className="text-left dark:text-dark-100 text-xs font-medium text-gray-800">
              {props.email}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Avator
