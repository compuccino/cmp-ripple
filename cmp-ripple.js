cmpRipple = function(elements, options) {
  //TODO: build encapsulated JS file
  //TODO: destroy() function removing click event handlers
  //TODO: build animationEvent/rippleElement only once?
  //TODO: specify browser support
  //TODO: custom class attribute
  //TODO: prevent bubbling via attribute?
  //TODO: jQuery-object-checker in case someone forgets `[0]`

  'use strict';
  
  /* options */
  if (!options) {options = {};}

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
        
        //offset relation = (click offset - element offset) ÷ element dimension
        var offsetRel = {
          left : ( clickEvent.clientX - offset(this).left ) / this.offsetWidth,
          top  : ( clickEvent.clientY - offset(this).top ) / this.offsetHeight
        }
        
        //create element for ripple animation
        var rippleElement = document.createElement('span');
        rippleElement.className = 'cmp-ripple-animation';
        rippleElement.setAttribute('style','top: '+ offsetRel.top*100 +'%; left: '+ offsetRel.left*100 +'%;');
        
        //self-destruct after animation
        rippleElement.addEventListener(animationEvent, function() {
           this.parentNode.removeChild(this);
        });
        
        //trigger animation
        this.insertBefore(rippleElement, this.firstChild);
      
      });
    }
  
  }
}

//helper function for element offset
//via https://youmightnotneedjquery.com
offset = function(element){
  var rect = element.getBoundingClientRect();
  
  return offsetObject =
    {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
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