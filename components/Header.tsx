import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const DEFAULT_PAGES = [
  { title: 'About', path: '/about', disabled: false },
  { title: 'Posts', path: '/posts', disabled: false },
  { title: 'Projects', path: '/projects', disabled: true },
]

const Header = ({ pages = DEFAULT_PAGES }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const router = useRouter()

  const NavItem = ({ item }) => {
    return <div
      className={classNames({
        'nav-item': true,
        active: router.pathname.startsWith(item.path),
        disabled: item.disabled
      })}>
      <Link href={item.path} target={item.newTab ? '_blank' : '_self'}>{item.title}</Link>
    </div>;
  }

  const toggleMobileMenu = () => {
    const status = !showMobileMenu
    const html = document.getElementsByTagName('html')[0];

    if (status) {
      html.classList.add('hide-scroll');
    } else {
      html.classList.remove('hide-scroll');
    }

    setShowMobileMenu(status)
  }

  const MobileNav = () => {

    if (!showMobileMenu) return;

    return <div onClick={() => toggleMobileMenu()} id="mobile-nav">
      {pages.map(item => <NavItem key={item.path} item={item} />)}
    </div>
  }

  return <>
    <header>
      <Link href="/" id="logo">
        <h1>Aziz Devrim YAYLA<span>.</span></h1>
      </Link>

      <nav id="nav">
        {pages.map(item => <NavItem key={item.path} item={item} />)}
      </nav>

      <div id="mobile-menu" onClick={() => toggleMobileMenu()}>
        <i className="far fa-bars"></i>
      </div>
    </header>

    <MobileNav />
  </>
}

export default Header;