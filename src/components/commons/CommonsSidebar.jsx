
const CommonsSidebar = ({children}) => {
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-primary sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full p-3 pb-4 overflow-y-auto bg-primary">
          <ul className="space-y-2 font-semibold text-lg">
              {children}
          </ul>
      </div>
    </aside>
  )
}

export default CommonsSidebar
