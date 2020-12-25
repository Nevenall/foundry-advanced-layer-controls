# Advanced Layer Controls

There's a lot that can be added to layers in foundry. From toggling the visiblity or opacity of select layers to creating custom layers. 
Rearranging them, sending placeables between layers. 
Creating new gm only layers. 

## 12.24.2020, danb

toggling a layer is really easy. Currently it's only a local thing, but we could use a special message socket to conditionally propegate layer changes. 

adding some buttons to control layers. We can store the state of the layers to module settings, just like we should for the Push to Clients setting.
I wonder if we need to do work to save the GM layer when we add one?