import FullLayout from 'src/layouts/fullLayout/Layout'

const PageLayout = ({ children, bottom }) => {
  return (
    <>
      <FullLayout>
        {children} {bottom}
      </FullLayout>
    </>
  )
}

export default PageLayout
