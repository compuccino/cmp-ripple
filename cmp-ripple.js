cmpRipple = function(elements, options) {
  //TODO: add version/copyright notice + version tag
  //TODO: build encapsulated JS file
  //TODO: active state should listen on mousedown + stay triggered on click
  //TODO: destroy() function removing click event handlers
  //TODO: build animationEvent/rippleElement only once?
  //TODO: add init-class for elements to apply standard attributes
  //TODO: specify browser support
  //TODO: jQuery-object-checker in case someone forgets `[0]`

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

      rippleMe.addEventListener("click", function( clickEvent ) {

        startRipple(rippleMe, clickEvent);

      });

      var startRipple = function(element, clickEvent) {
        //prevent event bubbling
        if (!options.bubble) {
          clickEvent.stopPropagation();
        }

        //offset relation = (click offset - element offset) ÷ element dimension
        var offsetRel = {
          left : ( clickEvent.clientX - offset(clickEvent.target).left ) / clickEvent.target.offsetWidth,
          top  : ( clickEvent.clientY - offset(clickEvent.target).top ) / clickEvent.target.offsetHeight
        }

        //create element for ripple animation
        var rippleElement = document.createElement('span');
        rippleElement.className = options.animationClass;
        rippleElement.setAttribute('style','top: '+ offsetRel.top*100 +'%; left: '+ offsetRel.left*100 +'%;');

        //self-destruct after animation
        rippleElement.addEventListener(animationEvent, function() {
           this.parentNode.removeChild(this);
        });

        //trigger animation
        clickEvent.target.insertBefore(rippleElement, clickEvent.target.firstChild);
      }

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