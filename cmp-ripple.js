cmpRipple = function(elements, options) {
  //TODO: add version/copyright notice + version tag
  //TODO: track touch events
  //TODO: build encapsulated JS file (like: new cmpRipple() …)
  //TODO: destroy() function removing click event handlers
  //TODO: build animationEvent/rippleElement only once? (via _self )
  //TODO: add init-class for elements to apply standard attributes
  //TODO: specify browser support
  //TODO: jQuery-object-checker in case someone forgets `[0]`
  //TODO: calculate ripple radius depending on element size
  //TODO: allow for 2 ripple variants (snappy: new vs ripple: old behaviour)
  //TODO: even better: allow for snappy behaviour on mouseDown + ripple on touchDown

  'use strict';

  /* options */
  if (!options) {options = {};}

  if (!options.animationClass) { options.animationClass = 'cmp-ripple-animation'; }
  if (!options.bubble) { options.bubble = false; }


  //get browser prefixed animation event
  var animationEvent = stylePrefix('animationend');

  //check for element + animation event support
  if (elements && animationEvent) {

    //assume single element
    if (!(elements instanceof NodeList)) {
      elements = [elements];
    }

    for (var index = 0; index < elements.length; index++) {
      var rippleMe = elements[index];

      rippleMe.addEventListener("mousedown", function( clickEvent ) {
        //prevent event bubbling
        if (!options.bubble) {
          clickEvent.stopPropagation();
        }

        startRipple(rippleMe, clickEvent);
      });

      rippleMe.addEventListener("mouseup", function( clickEvent ) {
        //prevent event bubbling
        if (!options.bubble) {
          clickEvent.stopPropagation();
        }
        
        rippleRemove(clickEvent.currentTarget.querySelector('.cmp-ripple-animation'));
      });

      var startRipple = function(element, clickEvent) {

        //offset relation = (click offset - element offset) ÷ element dimension
        var offsetRel = {
          left : ( clickEvent.clientX - offset(clickEvent.currentTarget).left ) / clickEvent.currentTarget.offsetWidth,
          top  : ( clickEvent.clientY - offset(clickEvent.currentTarget).top ) / clickEvent.currentTarget.offsetHeight
        }

        //create element for ripple animation
        var ripple = document.createElement('span');
        ripple.className = options.animationClass;
        ripple.setAttribute('style','top: '+ offsetRel.top*100 +'%; left: '+ offsetRel.left*100 +'%;');

        //trigger animation
        clickEvent.currentTarget.insertBefore(ripple, clickEvent.currentTarget.firstChild);
      }

    }
    
    var rippleRemove = function(ripple) {
      ripple.className += ' cmp-ripple-remove'; //triggers fadeout
    
      //1st case: init ripple not finished
      //this removes the element in case the initial animation is still running
      ripple.addEventListener(stylePrefix('animationend'), function(event) {
        event.currentTarget.parentNode.removeChild(event.currentTarget);
      });
    
      //2nd case: ripple animation ended, fadeout transition was triggered
      //if the button is already filled this listens on the fadeout animation
      ripple.addEventListener(stylePrefix('transitionend'), function(event) {
        event.currentTarget.parentNode.removeChild(event.currentTarget);
      });
    }

  }
}

//helper function for element offset
//via https://youmightnotneedjquery.com
offset = function(element){
  var rect = element.getBoundingClientRect();
  /*
    note:

    we removed `document.body.scrollTop` and `document.body.scrollLeft` because
    these aren't respected – we need to checkback in IE

  */

  return offsetObject =
    {
      top: rect.top,
      left: rect.left
    }

}

/**
 * Testing on prefixes
 *
 * stolen from David Walsh here:
 * https://davidwalsh.name/css-animation-callback
 * originally stolen from Modernizr:
 *
 */
function stylePrefix(attributeName){
  var prefixStyleLookup = {
    'animationend': {
      'animation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    },
    'transitionend': {
      'transition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }
  }

  var attribute;
  var el = document.createElement('fakeTestElement');
  for(attribute in prefixStyleLookup[attributeName]){
      if( el.style[attribute] !== undefined ){
          return prefixStyleLookup[attributeName][attribute];
      }
  }
}