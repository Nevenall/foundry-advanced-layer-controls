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
         global: global,
         layers: canvas.layers.reverse()
      }

   }

   /** @override */
   activateListeners(html) {

      html.find('#global-setting').click(ev => {
         console.log(`ALC | `, ev.currentTarget.checked)
         game.settings.set('advanced-layer-controls', 'global', ev.currentTarget.checked)
      })

      html.find('.opacity-slider').change(ev => {
         // console.log(`ALC | `, ev)
         // debugger
         let el = ev.currentTarget
         let layer = canvas.layers.find(l => l.name === el.dataset.layer)
         layer.alpha = ev.currentTarget.value
      })




   }
}