/**
 * A SidebarTab for providing help messages and settings configurations.
 * The Settings sidebar is the furthest-to-right using a triple-cogs icon.
 * @extends {SidebarTab}
 */
class Settings extends SidebarTab {

   /** @override */
    static get defaultOptions() {
      const options = super.defaultOptions;
      options.id = "settings";
      options.template = "templates/sidebar/settings.html";
      options.title = "Settings";
      return options;
   }
 
    /* -------------------------------------------- */
 
   /** @override */
   getData(options) {
     const canUpdate = game.user.isGM && game.data.coreUpdate;
     return {
       user: game.user,
       system: game.system,
       coreVersion: game.data.version,
       canConfigure: game.user.can("SETTINGS_MODIFY"),
       canSetup: game.user.hasRole("GAMEMASTER"),
       coreUpdate: canUpdate ? game.i18n.format("SETUP.UpdateAvailable", game.data.coreUpdate) : false,
       modules: game.data.modules.reduce((n, m) => n + (m.active ? 1 : 0), 0)
     };
   }
 
    /* -------------------------------------------- */
 
   /** @override */
    activateListeners(html) {
      html.find("button[data-action]").click(this._onSettingsButton.bind(this));
   }
 
   /* -------------------------------------------- */
 
   /**
    * Delegate different actions for different settings buttons
    * @param event
    * @private
    */
   _onSettingsButton(event) {
     event.preventDefault();
     const button = event.currentTarget;
     switch (button.dataset.action) {
       case "configure":
         game.settings.sheet.render(true);
         break;
       case "modules":
         new ModuleManagement().render(true);
         break;
       case "players":
         return ui.menu.items.players.onClick();
       case "setup":
         return game.shutDown();
       case "controls":
         new ControlsReference().render(true);
         break;
       case "docs":
         new FrameViewer("https://foundryvtt.com/kb", {
           title: "Foundry VTT Documentation"
         }).render(true);
         break;
       case "wiki":
         new FrameViewer("https://foundryvtt.wiki/", {
           title: "Foundry VTT Community Wiki"
         }).render(true);
         break;
       case "invitations":
         new InvitationLinks().render(true);
         break;
       case "logout":
         return ui.menu.items.logout.onClick();
     }
   }
 }
 