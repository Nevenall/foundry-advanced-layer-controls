import CustomSidebar from './ui/custom-sidebar.js'
import Layers from './ui/layers.js'
import reduce from './reducer.js'

Hooks.once('init', () => {

   // process our module events
   game.socket.on('module.advanced-layer-controls', data => {
      reduce(data)
   })
})

Hooks.once('setup', () => {

   // todo - add gm only layer
   


   game.settings.register('advanced-layer-controls', 'global', {
      name: 'When the GM makes layer changes, send them to all players',
      scope: 'client',
      config: true,
      default: false,
      type: Boolean
   })

   game.settings.register('advanced-layer-controls', 'gm-only', {
      name: 'When true, all new items will be added to the GM only layer',
      scope: 'client',
      config: true,
      default: false,
      type: Boolean
   })

   // On setup we override the existing sidebar with our own custom sidebar
   CONFIG.ui.sidebar = CustomSidebar
   CONFIG.ui.layers = Layers
})

Hooks.once('ready', () => {
   ui.sidebar.activateTab('layers')
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
      tools: [
         // seems like controls is not immediately availble, seems like we might need to wait until the canvas is active. 
         {
            name: 'toggle-doors',
            title: 'Toggle doors',
            icon: 'fas fa-door-open',
            toggle: true,
            active: canvas ? canvas.controls.doors.visible : true,
            visible: true,
            onClick: value => {
               canvas.controls.doors.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
                  game.socket.emit('module.advanced-layer-controls', {
                     layer: 'Doors',
                     visible: value
                  })
               }
            }
         },
         {
            name: 'toggle-effects',
            title: 'Toggle effects layer',
            icon: 'fas fa-shield-alt',
            toggle: true,
            active: canvas ? canvas.effects.visible : true,
            visible: true,
            onClick: value => {
               canvas.effects.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.sounds.visible : true,
            visible: true,
            onClick: value => {
               canvas.sounds.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.lighting.visible : true,
            visible: true,
            onClick: value => {
               canvas.lighting.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.tokens.visible : true,
            visible: true,
            onClick: value => {
               canvas.tokens.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.notes.visible : true,
            visible: true,
            onClick: value => {
               canvas.notes.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.templates.visible : true,
            visible: true,
            onClick: value => {
               canvas.templates.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.walls.visible : true,
            visible: true,
            onClick: value => {
               canvas.walls.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.grid.visible : true,
            visible: true,
            onClick: value => {
               canvas.grid.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.drawings.visible : true,
            visible: true,
            onClick: value => {
               canvas.drawings.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.tiles.visible : true,
            visible: true,
            onClick: value => {
               canvas.tiles.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
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
            active: canvas ? canvas.background.visible : true,
            visible: true,
            onClick: value => {
               canvas.background.visible = value
               if (game.user.isGM /* && the push to clients setting is active */ ) {
                  game.socket.emit('module.advanced-layer-controls', {
                     layer: 'BackgroundLayer',
                     visible: value
                  })
               }
            }
         }
      ]
   })
})