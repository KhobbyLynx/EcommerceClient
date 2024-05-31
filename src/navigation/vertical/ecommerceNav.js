// ** Icons Import
import { Home, ShoppingBag, ShoppingCart, Circle, Info } from 'react-feather'
import { CiCircleMore } from 'react-icons/ci'
import { SiMicrodotblog } from 'react-icons/si'
import { MdOutlinePermPhoneMsg } from 'react-icons/md'
import { BsBagHeartFill } from 'react-icons/bs'

export default [
  {
    icon: <Home />,
    id: 'home',
    title: 'Home',
    navLink: '/home',
  },
  {
    id: 'shop',
    title: 'Shop',
    icon: <ShoppingBag />,
    children: [
      {
        id: 'shopAll',
        title: 'All Products',
        icon: <Circle size={12} />,
        navLink: '/shop',
      },
      {
        id: 'pumps',
        title: 'Pumps',
        icon: <Circle size={12} />,
        navLink: '/shop/pumps',
      },
      {
        id: 'generators',
        title: 'Generators',
        icon: <Circle size={12} />,
        navLink: '/shop/generators',
      },
    ],
  },
  {
    icon: <SiMicrodotblog />,
    id: 'blog',
    title: 'Blog',
    navLink: '/blog',
  },
  {
    icon: <CiCircleMore />,
    id: 'about',
    title: 'About',
    navLink: '/about',
  },
  {
    icon: <MdOutlinePermPhoneMsg />,
    id: 'contact',
    title: 'Contact',
    navLink: '/contact',
  },
  {
    icon: <ShoppingCart />,
    id: 'cart',
    title: 'Cart',
    navLink: '/cart',
  },
  {
    icon: <BsBagHeartFill />,
    id: 'wishlist',
    title: 'Wishlist',
    navLink: '/wishlist',
  },
  {
    id: 'faq',
    title: 'FAQ & More',
    icon: <Info size={20} />,
    children: [
      {
        id: 'fag',
        title: 'FAQ',
        icon: <Circle size={12} />,
        navLink: '/faq',
      },
      {
        id: 'more',
        title: 'More',
        icon: <Circle size={12} />,
        navLink: '/more',
      },
    ],
  },
]
