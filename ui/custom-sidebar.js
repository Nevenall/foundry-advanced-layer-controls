/**
 * Render the Sidebar container, and after rendering insert Sidebar tabs
 */
export default class CustomSidebar extends Sidebar {
   constructor(...args) {
      super(...args)
   }


   /** @inheritdoc */
   static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
         id: "sidebar",
         template: "modules/advanced-layer-controls/templates/custom-sidebar.html",
         popOut: false,
         width: 326,
         tabs: [{
            navSelector: ".tabs",
            contentSelector: "#sidebar",
            initial: "chat"
         }]
      })
   }

   /** @override */
   async _render(...args) {

      // Render the Sidebar container only once
      if (!this.rendered) await super._render(...args)

      // Define the sidebar tab names to render
      const tabs = ["chat", "combat", "layers", "actors", "items", "journal", "tables", "playlists", "compendium", "settings"]
      if (game.user.isGM) tabs.push("scenes")

      // Render sidebar Applications
      for (let name of tabs) {
         // debugger
         const app = ui[name]
         try {
            await app._render(true, {})
         } catch (err) {
            console.error(`Failed to render Sidebar tab ${name}`)
            console.error(err)
         }
      }
   }

}