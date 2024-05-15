// Logo Import
import logo from '@src/assets/images/logo/logo.png'

// ** config options
const themeConfig = {
  app: {
    appName: 'Lynx',
    appLogoImage: logo,
  },
  layout: {
    isRTL: false,
    skin: 'dark', // light, dark, bordered, semi-dark
    type: 'horizontal', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'sticky', // static , sticky , floating, hidden
      backgroundColor: 'white', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'sticky', // static, sticky, hidden
    },
    customizer: true,
    scrollTop: true, // Enable scroll to top button
    toastPosition: 'top-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  },
}

export default themeConfig
