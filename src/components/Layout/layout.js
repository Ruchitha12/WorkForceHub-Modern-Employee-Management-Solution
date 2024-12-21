import { Navbar } from './navbar'

export const Layout = props => (
  <>
    <Navbar />
    <main className='min-h-screen'>
      <div>{props.children}</div>
    </main>
  </>
)
