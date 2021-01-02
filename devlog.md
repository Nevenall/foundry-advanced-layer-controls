# Advanced Layer Controls

There's a lot that can be added to layers in foundry. From toggling the visiblity or opacity of select layers to creating custom layers. 
Rearranging them, sending placeables between layers. 
Creating new gm only layers. 

## 12.24.2020, danb

toggling a layer is really easy. Currently it's only a local thing, but we could use a special message socket to conditionally propegate layer changes. 

adding some buttons to control layers. We can store the state of the layers to module settings, just like we should for the Push to Clients setting.
I wonder if we need to do work to save the GM layer when we add one?

## 12.25.2020, danb

We have buttons for all the named layers. I think we need a new tab for more advanced layer controls. 
Interesting the layers are not recreated when the scene changes. making these toggles global. 

Also, interesting, doors seem to be on their own layer somewhere. 
also, probably need a button to reset to default. specially if we reorder layers.

Looks like sidebar tabs have a template for html and a class to drive them. We would probs have to inject a new nav for the tab, 
not super easy. the alternative would be to have the advanced dialog button in the scene controls, but that seems kinda dull. 


## 12.27.2020, danb

got the basics of the layers sidebar working. We can adjust opacity for every layer dynamically. There's still things we might want, like specificly door controls vs. all control layer stuff. 

question - is there a diff between visible and renderable? they are diff properties. Wonder how they affect things?

big todos:

- ☐ support propegating changes to all clients
  - need to add conditional to every possible change we can make
  - and create a state adjuster class on the client side to interpret every change we can make
  - be cool if we could use the same state adjuster for both? Reducer? we can give it the appropriate action to take, ie, BackgroundLayer set opacity to .5, then is could conditionally propegate changes. Poor man's flux. 
- ☐ need on/off toggle for layers sidebar
- ☐ need to store the state as we make changes
  - our state store reducer could help there too
  - also need the ability to restore state to default
  - currently the state is global to the app, does it make more sense for these settings to be scoped to the scene?
- ☐ need a reset button for when you want to go back to default
- ☐ support reordering layers
- ☐ icons for each layer in sidebar
- ☐ GM only layer
  - you can move any canvas item here and only gms can see them
  - you can also switch to gm layer mode and anything you create will be placed there instead. 

## 12.28.2020, danb

So, updates. when the layers init we get the data from settings and then what? we adjust our layers according to the settings? is that a reducer action? 
hold onto data. mm...
We have to match existing state with setting state, but I want to do it only once. 
On, setup?

## 12.30.2020, danb

Ok, so we can propegate changes successfully, but we do have the issue with keeping things correctly in sync. If the GM sends a change and a new player joins we need the state to be correct especially to keep the UI correct. 

We need to set the initial state of the ui, and then respond correctly to updates. 

## 12.31.2020, danb

A plan, we store the updates so we can replay them when a new player connects. rxjs subject? On shutdown we snapshot the events for startup so, there are stored local events and there are pushed events. mmm..all stored events are local, technically. 

resolve local changes with global changes

- on startup
  - we want the UI and canvas to match 

you know, what if we skip trying to persist the state? that would resolve a lot of things. 

## 1.1.2020, danb

Skip the storing of the state of the layers locally. then we don't have to deal with merging all the changes together. 
Now we can add the GM only Layer, on top of most things. 
there is a switch to say whether to place everything on the gm layer or not. 