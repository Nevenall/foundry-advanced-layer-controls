
export default function (update, callback) {
   let global = game.settings.get('advanced-layer-controls', 'global')
   let layer = canvas.layers.find(l => l.name === update.layer)

   switch (update.action) {
      case 'opacity':
         layer.alpha = update.value
         break
      case 'visible':
         layer.visible = !layer.visible
         // add the value to update for the callback
         update.value = layer.visible
         break

         case 'order':

         
         break
    
      default:

         break
   }

   // then conditionally send change to socket
   if (game.user.isGM && global) {
      game.socket.emit('module.advanced-layer-controls', update)
   }

   if(callback) {
      callback(update)
   }


}