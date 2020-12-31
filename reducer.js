// this is a reducer style function to handle state changes for layers. 
// its messy because it will conditionally propegate updates to players

// todo - what if we made this a class with a constructor that we can give the game and canvas reference? 
// is that worth it?

export default function (update, callback) {
   let global = game.settings.get('advanced-layer-controls', 'global')
   let data = game.settings.get('advanced-layer-controls', 'data')
   let layer = canvas.layers.find(l => l.name === update.layer)

   switch (update.action) {
      case 'opacity':
         layer.alpha = update.value
         data.layers[layer.name] = {
            opacity: update.value
         }
         break
      case 'visible':
         layer.visible = !layer.visible

         update.value = layer.visible

         data.layers[layer.name] = {
            visible: layer.visible
         }
         break
      case 'accessible':
         layer.accessible = !layer.accessible

         update.value = layer.accessible

         data.layers[layer.name] = {
            accessible: layer.accessible
         }
         break
      default:

         break
   }

   game.settings.set('advanced-layer-controls', 'data', data)

   // then conditionally send change to socket
   if (game.user.isGM && global) {
      game.socket.emit('module.advanced-layer-controls', update)
   }

   if(callback) {
      callback(update)
   }


}