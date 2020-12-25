const localKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']
const globalKeys = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']

Hooks.once('ready', () => {

   game.socket.on('module.advanced-layer-controls', async data => {
      console.log(data)
      let layer = canvas.layers.find(l => l.name === data.layer)
      if (layer.visible != data.visible) {
         layer.visible = data.visible
      }
   })

   window.addEventListener('keydown', event => {
      if (event.isComposing) return; // Ignore IME composition

      let local = localKeys.indexOf(event.key)
      let global = globalKeys.indexOf(event.key)
      if (event.ctrlKey && local != -1) {
         console.log(`Control + ${event.key}`)
         canvas.layers[local].visible = !canvas.layers[local].visible
      } else if (event.ctrlKey && event.shiftKey && global != -1) {
         console.log(`Control + Shift + ${event.key}`)
         canvas.layers[global].visible = !canvas.layers[global].visible
         game.socket.emit('module.advanced-layer-controls', {
            layer: global,
            visible: canvas.layers[global].visible
         })
      }

   })

})


Hooks.on('getSceneControlButtons', buttons => {

   buttons.push({
      name: 'layers',
      title: 'Advanced Layer Controls',
      layer: 'ControlsLayer',
      icon: 'fas fa-layer-group',
      activeTool: 'toggleTokens',
      visible: true,
      tools: [{
         name: 'toggleTokens',
         title: 'Toggle tokens layer',
         icon: 'fas fa-user',
         toggle: true,
         active: canvas.tokens.visible,
         visible: true,
         onClick: value => {
            // debugger
            // todo - need to store the state of the layer in settings so we can use it to correctl
            canvas.tokens.visible = value
            if (game.user.isGM /* && the push to clients setting is active */ ) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'TokenLayer',
                  visible: value
               })
            }
         }
      }]
   })


   console.log(buttons)
})