import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

// internal icons
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(fas)
library.add(fab)
Vue.component('vue-fontawesome', FontAwesomeIcon)

import Buefy from 'buefy'
import { ConfigProgrammatic } from 'buefy'
ConfigProgrammatic.setOptions({ defaultIconPack: 'fas', defaultIconComponent: 'vue-fontawesome' })

import Main from './Main.vue'

Vue.use(Buefy)


// Router.afterEach(() => {
//   console.log('reached page')
// })

new Vue({
  el: '#app',
  render: h => h(Main)
})
