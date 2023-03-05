import Link from 'next/link'

const Navbar = () => (
  <header>
    <ul>
      <li>
        <Link href="/">
          Home
        </Link>
      </li>
      <li>
        <Link href="/themes">
          Themes
        </Link>
      </li>
      <li>
        <Link href="/contact">
          Contact Us
        </Link>
      </li>
      <li>
        <Link href="/wedding">
          Wedding
        </Link>
      </li>
    </ul>
  </header>
)

export default Navbar