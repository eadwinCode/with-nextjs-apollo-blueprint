import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Button, Alignment } from "@blueprintjs/core"

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <header>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Link href="/">
              <Navbar.Heading className="bp3-button bp3-minimal">Blueprint</Navbar.Heading>
            </Link>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Link href="/home">
              <Button className="bp3-minimal" icon="home" text="Home" />
            </Link>
            <Link href="/about">
              <Button className="bp3-minimal" icon="document" text="Files" />
            </Link>
            <Link href="/users">
              <Button className="bp3-minimal" icon="user" text="Users List" />
            </Link>
            <a className="bp3-button bp3-minimal" href="/api/users">Users API</a>

          </Navbar.Group>
        </Navbar>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )

export default Layout
