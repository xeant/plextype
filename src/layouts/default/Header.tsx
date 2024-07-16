const Header = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <a href="/" className="flex text-xl">
            <span className="font-extrabold text-gray-950">plex</span>
            <span className="font-normal text-gray-400">type</span>
          </a>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-4">
          <a href="/about" className="mx-3 text-sm">
            About
          </a>
          <a href="/contact" className="mx-3 text-sm">
            Contact
          </a>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4">
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  )
}

export default Header
