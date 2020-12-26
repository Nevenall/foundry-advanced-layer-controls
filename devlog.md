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


