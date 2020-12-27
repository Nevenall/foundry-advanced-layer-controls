/**
 * Render the Sidebar container, and after rendering insert Sidebar tabs
 */
class Sidebar extends Application {
   constructor(...args) {
     super(...args);
 
     /**
      * Sidebar application instances
      * @type {Application[]}
      */
     this.apps = [];
 
     /**
      * Track whether the sidebar container is currently collapsed
      * @type {boolean}
      */
     this._collapsed = false;
   }
 
   /* -------------------------------------------- */
 
   /** @inheritdoc */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "sidebar",
       template: "templates/sidebar/sidebar.html",
       popOut: false,
       width: 300,
       tabs: [{navSelector: ".tabs", contentSelector: "#sidebar", initial: "chat"}]
     });
   }
 
   /* -------------------------------------------- */
 
   /**
    * Return the name of the active Sidebar tab
    * @type {string}
    */
   get activeTab() {
     return this._tabs[0].active;
   }
 
   /* -------------------------------------------- */
 
   /**
    * Return an Array of pop-out sidebar tab Application instances
    * @type {Application[]}
    */
   get popouts() {
     return this.apps.map(a => a._popout).filter(p => p);
   }
 
    /* -------------------------------------------- */
   /*  Rendering
    /* -------------------------------------------- */
 
   /** @override */
   getData(options) {
     const canUpdate = game.user.isGM && game.data.coreUpdate;
     return {
       coreUpdate: canUpdate ? game.i18n.format("SETUP.UpdateAvailable", game.data.coreUpdate) : false,
       user: game.user
     };
   }
 
     /* -------------------------------------------- */
 
   /** @override */
    async _render(...args) {
 
      // Render the Sidebar container only once
     if ( !this.rendered ) await super._render(...args);
 
     // Define the sidebar tab names to render
      const tabs = ["chat", "combat", "actors", "items", "journal", "tables", "playlists", "compendium", "settings"];
      if ( game.user.isGM ) tabs.push("scenes");
 
     // Render sidebar Applications
     for ( let name of tabs ) {
       const app = ui[name];
       try {
         await app._render(true, {})
       } catch(err) {
         console.error(`Failed to render Sidebar tab ${name}`);
         console.error(err);
       }
     }
   }
 
    /* -------------------------------------------- */
   /*  Methods
    /* -------------------------------------------- */
 
   /**
    * Activate a Sidebar tab by it's name
    * @param {string} tabName      The tab name corresponding to it's "data-tab" attribute
    */
   activateTab(tabName) {
     this._tabs[0].activate(tabName, {triggerCallback: true});
   }
 
    /* -------------------------------------------- */
 
   /**
    * Expand the Sidebar container from a collapsed state.
    * Take no action if the sidebar is already expanded.
    */
   expand() {
     if ( !this._collapsed ) return;
     const sidebar = this.element;
     const tab = sidebar.find(".sidebar-tab.active");
     const icon = sidebar.find("#sidebar-tabs a.collapse i");
 
     // Animate the sidebar expansion
     tab.hide();
     sidebar.animate({width: this.options.width, height: this.position.height}, 150, () => {
       sidebar.css({width: "", height: ""});
       icon.removeClass("fa-caret-left").addClass("fa-caret-right");
       tab.fadeIn(250, () => tab.css("display", ""));
       this._collapsed = false;
       sidebar.removeClass("collapsed");
       Hooks.callAll("sidebarCollapse", this, this._collapsed);
     })
   }
 
    /* -------------------------------------------- */
 
   /**
    * Collapse the sidebar to a minimized state.
    * Take no action if the sidebar is already collapsed.
    */
   collapse() {
     if ( this._collapsed ) return;
     const sidebar = this.element;
     const tab = sidebar.find(".sidebar-tab.active");
     const icon = sidebar.find("#sidebar-tabs a.collapse i");
 
     // Animate the sidebar collapse
     tab.fadeOut(250, () => {
       sidebar.animate({width: 30, height: 370}, 150, () => {
         icon.removeClass("fa-caret-right").addClass("fa-caret-left");
         this._collapsed = true;
         sidebar.addClass("collapsed");
         tab.css("display", "");
         Hooks.callAll("sidebarCollapse", this, this._collapsed);
       })
     })
   }
 
    /* -------------------------------------------- */
   /*  Event Listeners and Handlers
    /* -------------------------------------------- */
 
   /** @inheritdoc */
    activateListeners(html) {
      super.activateListeners(html);
 
     // Right click pop-out
     const nav = this._tabs[0]._nav;
     nav.addEventListener('contextmenu', this._onRightClickTab.bind(this));
 
     // Toggle Collapse
     const collapse = nav.querySelector(".collapse");
     collapse.addEventListener("click", this._onToggleCollapse.bind(this));
   }
 
    /* -------------------------------------------- */
 
   /** @override */
   _onChangeTab(event, tabs, active) {
     const app = ui[active];
     if ( (active === "chat") && app ) app.scrollBottom();
     if ( this._collapsed ) {
       if ( active !== "chat") app.renderPopout(app);
     }
   }
 
   /* -------------------------------------------- */
 
   /**
    * Handle right-click events on tab controls to trigger pop-out containers for each tab
    * @param {Event} event     The originating contextmenu event
    * @private
    */
   _onRightClickTab(event) {
     const li = event.target.closest(".item");
     if ( !li ) return;
     event.preventDefault();
     const tabName = li.dataset.tab;
     const tabApp = ui[tabName];
     if ( tabName !== "chat" ) tabApp.renderPopout(tabApp);
   }
 
   /* -------------------------------------------- */
 
   /**
    * Handle toggling of the Sidebar container's collapsed or expanded state
    * @param {Event} event
    * @private
    */
   _onToggleCollapse(event) {
     event.preventDefault();
     if ( this._collapsed ) this.expand();
     else this.collapse();
   }
 }
 