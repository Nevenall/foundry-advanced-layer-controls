import reduce from '../reducer.js'

export default class Layers extends SidebarTab {
   constructor(options) {
      super(options)
   }

   /** @override */
   static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
         id: 'layers',
         template: 'modules/advanced-layer-controls/templates/layers.html',
         title: 'Layer Controls'
      })
   }

   /** @override */
   async getData(options) {
      let global = game.settings.get('advanced-layer-controls', 'global')

      return {
         user: game.user,
         global: global,
         layers: canvas.layers.reverse()
      }
   }

   /** @override */
   activateListeners(html) {

      html.find('#global-setting').click(ev => {
         game.settings.set('advanced-layer-controls', 'global', ev.currentTarget.checked)
      })

      html.find('.opacity-slider').change(ev => {
         let el = ev.currentTarget
         reduce({
            action: 'opacity',
            layer: el.dataset.layer,
            value: el.value
         })
      })

      html.find('.visible').click(ev => {
         let el = ev.currentTarget
         let classes = el.firstElementChild.classList
         // debugger

         reduce({
            action: 'visible',
            layer: el.dataset.layer
         }, up => {
            if (up.value) {
               classes.value = 'fas fa-eye'
            } else {
               classes.value = 'fas fa-eye-slash'
            }
         })
      })
   }
}