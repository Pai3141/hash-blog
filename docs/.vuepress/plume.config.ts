import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/Hash.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: 'https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/Hash.png',
    name: 'Paiad',
    description: '',
    circle: true,
    location: 'Lake Baikal',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    // { icon: { svg: plumeIcon, name: 'plumeIcon' }, link: 'https://theme-plume.vuejs.press' },
    // { icon: { svg: hashIcon, name: 'hashIcon' }, link: 'https://github.com/Pai3141/pai' },
    { icon: 'github', link: 'https://github.com' },
    { icon: {svg: '<svg t="1736477582372" class="icon" viewBox="0 0 1122 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10845" width="200" height="200"><path d="M1008.650301 336.528085c-42.072945-17.800092-68.222898-57.801753-68.222898-104.40563v-18.12373c8.155678-75.084024-27.05614-146.802213-90.489194-183.826404l-5.69603-3.818929-3.624746-2.200739C772.718173-12.936265 691.93812-6.981326 629.605434 39.752007c-40.972575 31.133979-95.991041 31.133979-136.963617 0l-1.553462-1.10037a203.594215 203.594215 0 0 0-208.034529-15.275715l-6.990582 3.560019C210.753089 64.219042 174.829267 138.008514 184.408953 214.904912l0.582548 4.789842 1.229825 3.689474c0.129455 1.35928 0.129455 4.272022 0.129455 6.472761 0 45.503508-27.120867 85.310986-69.064357 101.42816l-0.970914 0.388366C47.768974 359.765296 3.23638 424.363448 0 500.353659v15.664081c3.106925 74.048382 49.387164 140.070542 117.998428 168.421233 41.360941 18.447368 68.093443 59.096305 68.352353 103.823082-0.129455 1.035642-0.323638 2.071283-0.453093 3.171653-0.647276 4.142567-1.553463 10.226962-1.812373 17.476454-8.414589 75.860755 27.444505 148.355675 91.977929 185.185684l6.21385 3.171652c26.538319 14.498984 56.830839 21.877931 90.10083 21.877931 42.396583 0 80.32696-14.757894 108.612924-27.638688l4.919298-2.265466 4.33675-3.301108c40.972575-31.133979 95.991041-31.133979 136.963617 0l1.553462 1.100369a203.658943 203.658943 0 0 0 207.969802 15.275716l2.718559-1.35928 8.220406-5.501847c63.368327-37.024191 98.580146-108.74238 90.424467-183.826404v-18.12373c0-44.985687 26.797229-85.958262 68.352353-104.470358 68.222898-28.221237 112.496581-92.689933 115.668234-168.421233v-15.987719c0-71.524006-45.503508-139.0349-113.467495-168.162323z m-447.591403 351.665089c-97.156138 0-176.188546-79.032408-176.188546-176.188546s79.032408-176.188546 176.188546-176.188546S737.247445 414.84849 737.247445 512.004628s-79.032408 176.188546-176.188547 176.188546z" p-id="10846" fill="#707070"></path></svg>',
        name: 'settings'}, link: 'https://theme-plume.vuejs.press' },
  ],
  navbarSocialInclude:['github','settings'],

  footer:{ message: '',copyright: '© Copyright 2024 All Rights Reserved. Proprietary Rights Reserved by Paiad.'},

  outline: [2,4]
})
