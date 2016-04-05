cmp-ripple
==========

Lightweight Element Ripple, similar to [Material Design Lite](http://www.getmdl.io).

- no dependencies :unlock:
- CSS-animation only :ocean:
- easy adaption :coffee:

[Check out the demo!](https://compuccino.github.io/cmp-ripple/)

Usage
-----

1. Include CSS (or supply your own modification)
2. Include JS file
3. Call on elements like this:  
  ~~~html
  <script>
    var rippleUs = document.querySelectorAll('.cmp-ripple');
    cmpRipple(rippleUs,options);
  </script>
  ~~~



Options
-------

Define via `cmp-ripple( elements, options )`

### bubble

Default: `{ bubble : false }`

Setting `true` makes the click event bubble up (standard behaviour).

### animationClass

Default: `{ animationClass : 'cmp-ripple-animation' }`

Defines custom class of small ripple animation.

Note that you need to adapt the corresponding CSS code accordingly.




FAQ
---

### Touch delay on mobile

This script doesn't remove the 300ms tap delay on mobile clients – you should use a solution like [fastclick.js](https://github.com/ftlabs/fastclick) or a custom viewport attribute for this.

### Browser support

TODO

### How does this work?

The script function injects a small helper element on the click event position inside the parsed objects.
Like the original Material UI package, it registers multiple concurrent clicks.

You can style and animate the ripple via CSS.
Currently it's styled to display an expanding white circle fading out but you can create whatever you like.
Once the animation is finished, the element gets removed. No additional wrappers or bindings are needed.
