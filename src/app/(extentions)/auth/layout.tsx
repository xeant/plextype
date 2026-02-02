export const dynamic = 'force-dynamic';
import DefaultLayout from 'src/layouts/plextype/Layout'

const PageLayout = ({ children }) => {
  return <DefaultLayout>
    <div className="max-w-screen-sm mx-auto px-6 py-20">
      {children}
    </div>
  </DefaultLayout>
}

export default PageLayout
