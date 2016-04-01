cmp-ripple
==========

Lightweight Element Ripple, similar to [Material Design Lite](http://www.getmdl.io).

- no dependencies
- CSS-animation only
- easy adaption

FAQ
---

### Touch delay on mobile

This script doesn't remove the 300ms tap delay on mobile clients – you should use a solution like [fastclick.js](https://github.com/ftlabs/fastclick) or a custom viewport attribute for this.

### Browser support

TODO

### How does this work?

The script function injects a small helper element on the click event position inside the registered objects.
Like in the original Material UI package it registers multiple concurrent clicks, too.

You can style and animate the ripple via CSS, currently it's styled to display an expanding white circle fading out but you can create whatever you like.
Once the animation is finished, the element gets removed. No additional wrappers or events are needed.
