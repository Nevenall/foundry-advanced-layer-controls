const localKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']
const globalKeys = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']

Hooks.once('ready', () => {

   game.socket.on('module.advanced-layer-controls', async data => {


      let layer = data.layer === 'Doors' ? canvas.controls.doors : canvas.layers.find(l => l.name === data.layer)

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
   // setup the layer control buttons
   buttons.push({
      name: 'layers',
      title: 'Layer Controls',
      layer: 'ControlsLayer',
      icon: 'fas fa-layer-group',
      activeTool: 'toggle-tokens',
      visible: true,
      tools: [{
         name: 'toggle-doors',
         title: 'Toggle doors',
         icon: 'fas fa-door-open',
         toggle: true,
         active: canvas.controls.doors.visible,
         visible: true,
         onClick: value => {
            canvas.controls.doors.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'Doors',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-effects',
         title: 'Toggle effects layer',
         icon: 'fas fa-shield-alt',
         toggle: true,
         active: canvas.effects.visible,
         visible: true,
         onClick: value => {
            canvas.effects.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'EffectsLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-sounds',
         title: 'Toggle sounds layer',
         icon: 'fas fa-music',
         toggle: true,
         active: canvas.sounds.visible,
         visible: true,
         onClick: value => {
            canvas.sounds.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'SoundsLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-lighting',
         title: 'Toggle lighting layer',
         icon: 'fas fa-lightbulb',
         toggle: true,
         active: canvas.lighting.visible,
         visible: true,
         onClick: value => {
            canvas.lighting.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'LightingLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-tokens',
         title: 'Toggle tokens layer',
         icon: 'fas fa-user',
         toggle: true,
         active: canvas.tokens.visible,
         visible: true,
         onClick: value => {
            canvas.tokens.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'TokenLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-notes',
         title: 'Toggle notes layer',
         icon: 'fas fa-bookmark',
         toggle: true,
         active: canvas.notes.visible,
         visible: true,
         onClick: value => {
            canvas.notes.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'NotesLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-template',
         title: 'Toggle template layer',
         icon: 'fas fa-ruler-combined',
         toggle: true,
         active: canvas.templates.visible,
         visible: true,
         onClick: value => {
            canvas.templates.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'TemplateLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-walls',
         title: 'Toggle walls layer',
         icon: 'fas fa-university',
         toggle: true,
         active: canvas.walls.visible,
         visible: true,
         onClick: value => {
            canvas.walls.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'WallsLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-grid',
         title: 'Toggle grid layer',
         icon: 'fas fa-border-all',
         toggle: true,
         active: canvas.grid.visible,
         visible: true,
         onClick: value => {
            canvas.grid.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'GridLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-drawings',
         title: 'Toggle drawing layer',
         icon: 'fas fa-pencil-alt',
         toggle: true,
         active: canvas.drawings.visible,
         visible: true,
         onClick: value => {
            canvas.drawings.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'DrawingsLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-tiles',
         title: 'Toggle the tiles layer',
         icon: 'fas fa-cubes',
         toggle: true,
         active: canvas.tiles.visible,
         visible: true,
         onClick: value => {
            canvas.tiles.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'TilesLayer',
                  visible: value
               })
            }
         }
      }, {
         name: 'toggle-background',
         title: 'Toggle background layer',
         icon: 'fas fa-map',
         toggle: true,
         active: canvas.background.visible,
         visible: true,
         onClick: value => {
            canvas.background.visible = value
            if (game.user.isGM /* && the push to clients setting is active */) {
               game.socket.emit('module.advanced-layer-controls', {
                  layer: 'BackgroundLayer',
                  visible: value
               })
            }
         }
      }]
   })
})