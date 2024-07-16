import Header from './Header'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
