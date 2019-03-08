// custom script for owl carousel
// npm - https://www.npmjs.com/package/owl.carousel
// documentation - https://owlcarousel2.github.io/OwlCarousel2/
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  var $homeCarousel = $('.home-carousel');
  var $pagination = $('.ff-pagination ul');
  var $progress = $('.home-carousel-pagination__progress');
  var $bar = $progress.children('span');
  var isPause,
    tick,
    percentTime;
  var time = $homeCarousel.data('time') ? $homeCarousel.data('time') : 15
  var $dotsContainer = $('.home-carousel-pagination__bullets');
  var $dots = $dotsContainer.find('.home-carousel-pagination__button');
  // staring owl
  const $owl = $homeCarousel.owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    dots: true,
    mouseDrag: false,
    touchDrag: true,
    singleItem: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    onInitialized: sliderInit,
    onDragged: dragged,
    onChanged: moved,
    onTranslate: beforeSlide,
    onTranslated: afterSlide,
    dotsContainer: '.home-carousel-pagination__bullets'
  });
setTimeout(function(){  $owl.trigger('refresh.owl.carousel');},1)
  //* mouse whell
  //! need to change
  $homeCarousel.on('wheel', '.owl-stage', function (e) {
    clearTimeout($.data(this, 'timer'));
    $.data(this, 'timer', setTimeout(function () {
      if (e.originalEvent.deltaY > 0) {
        $homeCarousel.trigger('next.owl', [1000]);
      } else {
        $homeCarousel.trigger('prev.owl', [1000]);
      }
      //do something
    }, 200));
    e.preventDefault();
  });

  function sliderInit(event) {
    // on owl slider init
    var elem = event.target;
    var itemCount = event.item.count;
    updateAria(0);
    start();
  }

  function start() {
    //reset timer
    percentTime = 0;
    isPause = false;

    tick = setInterval(timer, 10);
  }

  function timer() {
    if (isPause === false) {
      percentTime += 1 / time;
      $bar.css({
        height: percentTime + "%"
      });
      //if percentTime is equal or greater than 100
      if (percentTime >= 100) {
        //slide to next item 
        $homeCarousel.trigger('next.owl.carousel')
      }
    }
  }

  function dragged() {

  }

  function moved(event) {
    //start again
    clearTimeout(tick);
    start();
    // $bar = $pagination.find('li.active span')
  }

  function beforeSlide(event) {
    let index = event.item.index;
    let $slide = $homeCarousel.find('.owl-item').eq(index);
    var slide_index = $slide.children('div').data('slide');
    // animating slide
    $slide.addClass('slide-up')
    // animating progress bar
    $progress.css({
      'margin-top': (5 + (16 * slide_index))
    });
    updateAria(slide_index);
  }

  function afterSlide(event) {
    let index = event.item.index;
    let $slide = $homeCarousel.find('.owl-item').eq(index);
  }

  function updateAria(index) {
    for (var i = 0; i < $dots.length; i++) {
      if(i == index){
        $dots.eq(i).attr({
          'tabindex':0,
        'aria-selected' : true});
      }else{
        $dots.eq(i).attr({
          'tabindex':-1,
        'aria-selected' : false});
      }
    }
  }
});



/**
 * Owl Carousel v2 Accessibility Plugin
 * Version 0.2.1
 * © Geoffrey Roberts 2016
 */

; (function ($, window, document) {
  var Owl2A11y = function (carousel) {
    this._core = carousel;
    this._initialized = false;

    this._core._options = $.extend(Owl2A11y.defaults, this._core.options);

    this.$element = this._core.$element;

    var setCurrent = $.proxy(function (e) {
      this.setCurrent(e);
    }, this);

    this._handlers = {
      'initialized.owl.carousel': $.proxy(function (e) {
        this.setupRoot();
        if (e.namespace && !this._initialized) {
          this.setupFocus();
          this.setupKeyboard();
        }
        this.setCurrent(e);
      }, this),
      'changed.owl.carousel': setCurrent,
      'translated.owl.carousel': setCurrent,
      'refreshed.owl.carousel': setCurrent,
      'resized.owl.carousel': setCurrent
    };
    this.$element.on(this._handlers);
  };


  /* PREFERENCES */

  /**
   * Contains default parameters, if there were any.
   */
  Owl2A11y.defaults = {};


  /* EVENT HANDLERS */

  /**
   * Adds support for things that don't map nicely to the root object
   * such as event handlers.
   */
  Owl2A11y.eventHandlers = {};

  /**
   * Get a callback for keyup events within this carousel.
   *
   * @return callback
   *   An event callback that takes an Event as an argument.
   */
  Owl2A11y.prototype.getDocumentKeyUp = function () {
    var self = this;
    return function (e) {
      var eventTarg = $(e.target),
        targ = self.focused(eventTarg),
        action = null;

      if (!!targ) {
        if (e.keyCode == 37 || e.keyCode == 38) {
          action = 'prev.owl.carousel';
        }
        else if (e.keyCode == 39 || e.keyCode == 40) {
          action = 'next.owl.carousel';
        }
        else if (e.keyCode == 13) {
          if (eventTarg.hasClass('owl-prev')) action = 'prev.owl.carousel';
          else if (eventTarg.hasClass('owl-next')) action = 'next.owl.carousel';
          else if (eventTarg.hasClass('owl-dot')) action = 'click';
        }

        if (!!action) targ.trigger(action);
      }
    };
  };


  /* SETUP AND TEAR DOWN */

  /**
   * Assign attributes to the root element.
   */
  Owl2A11y.prototype.setupRoot = function () {
    this.$element.attr({
      role: 'listbox',
      tabindex: '0'
    });
  };

  /**
   * Setup keyboard events for this carousel.
   */
  Owl2A11y.prototype.setupKeyboard = function () {
    // Only needed to initialise once for the entire document
    if (!this.$element.attr('data-owl-access-keyup')) {
      this.$element.bind('keyup', this.getDocumentKeyUp())
        .attr('data-owl-access-keyup', '1');
    }
    this.$element.attr('data-owl-carousel-focusable', '1');
  };

  /**
   * Setup focusing behaviour for the carousel.
   */
  Owl2A11y.prototype.setupFocus = function () {
    // Only needed to initialise once for the entire document
    this.$element.bind('focusin', function () {
      $(this).attr({
        'data-owl-carousel-focused': '1',
        'aria-live': 'polite'
      }).trigger('stop.owl.autoplay');
    }).bind('focusout', function () {
      $(this).attr({
        'data-owl-carousel-focused': '0',
        'aria-live': 'off'
      }).trigger('play.owl.autoplay');
    });

    // Add tabindex to allow navigation to be focused.
    if (!!this._core._plugins.navigation) {
      var navPlugin = this._core._plugins.navigation,
        toFocus = [];
      if (!!navPlugin._controls.$previous) {
        toFocus.push(navPlugin._controls.$previous);
      }
      if (!!navPlugin._controls.$next) {
        toFocus.push(navPlugin._controls.$next);
      }
      if (!!navPlugin._controls.$indicators) {
        toFocus.push(navPlugin._controls.$indicators.children());
      }
      $.each(toFocus, function () {
        this.attr('tabindex', '0');
      });
    }
  };

  /**
   * Assign attributes to the root element.
   */
  Owl2A11y.prototype.destroy = function () {
    this.$element.unbind('keyup', this.eventHandlers.documentKeyUp)
      .removeAttr('data-owl-access-keyup data-owl-carousel-focusable')
      .unbind('focusin focusout');
  };


  /* HELPER FUNCTIONS */

  /**
   * Identifies all focusable elements within a given element.
   *
   * @param DOMElement elem
   *   A DOM element.
   *
   * @return jQuery
   *   A jQuery object that may refer to zero or more focusable elements.
   */
  Owl2A11y.prototype.focusableElems = function (elem) {
    return $(elem).find('a, input, select, button, *[tabindex]');
  };

  /**
   * Identifies all focusable elements within a given element.
   *
   * @param jQeury elems
   *   A jQuery object that may refer to zero or more focusable elements.
   * @param boolean enable
   *   Whether focus is to be enabled on these elements or not.
   */
  Owl2A11y.prototype.adjustFocus = function (elems, enable) {
    elems.each(function () {
      var item = $(this);
      var newTabIndex = '0',
        storeTabIndex = '0';

      currentTabIndex = item.attr('tabindex'),
        storedTabIndex = item.attr('data-owl-temp-tabindex');

      if (enable) {
        newTabIndex = (
          typeof (storedTabIndex) != 'undefined' && (storedTabIndex != '-1') ?
            item.attr('data-owl-temp-tabindex') :
            '0'
        );
        storedTabIndex = newTabIndex;
      }
      else {
        newTabIndex = '-1';
        storedTabIndex = (
          (typeof (currentTabIndex) != 'undefined') || (currentTabIndex != '-1') ?
            currentTabIndex :
            '0'
        );
      }

      item.attr({
        tabindex: newTabIndex,
        'data-owl-temp-tabindex': storeTabIndex
      });
    });
  };

  /**
   * Get the root element if we are focused within it.
   *
   * @param DOMElement targ
   *   An element that might be within this carousel.
   *
   * @return mixed
   *   Either the jQuery element containing the root element, or NULL.
   */
  Owl2A11y.prototype.focused = function (targ) {
    var targ = $(targ);
    if (targ.attr('data-owl-carousel-focused') == 1) {
      return targ;
    }
    var closest = targ.closest('[data-owl-carousel-focused="1"]');
    if (closest.length > 0) return closest;
    return null;
  };


  /* UPDATE FUNCTIONS */

  /**
   * Identify active elements, set WAI-ARIA sttributes accordingly,
   * scroll to show element if we need to, and set up focusing.
   *
   * @param Event e
   *   The triggering event.
   */
  Owl2A11y.prototype.setCurrent = function (e) {
    var targ = this.focused($(':focus')),
      element = this._core.$element,
      stage = this._core.$stage,
      focusableElems = this.focusableElems,
      adjustFocus = this.adjustFocus;

    if (!!stage) {
      var offs = stage.offset();
      if (!!targ) {
        window.scrollTo(
          offs.left,
          offs.top - parseInt($('body').css('padding-top'), 10)
        );
      }

      this._core.$stage.children().each(function (i) {
        var item = $(this);
        var focusable = focusableElems(this);

        // Use the active class to determine if we can see it or not.
        // Pretty lazy, but the Owl API doesn't make it easy to tell
        // from indices alone.
        if (item.hasClass('active')) {
          item.attr('aria-hidden', 'false');
          adjustFocus(focusable, true);
        }
        else {
          item.attr('aria-hidden', 'true');
          adjustFocus(focusable, false);
        }
      });

      if (!!targ) {
        // Focus on the root element after we're done moving,
        // but only if we're not using the controls.
        setTimeout(function () {
          var newFocus = element;
          if ($(':focus').closest('.owl-controls').length) {
            newFocus = $(':focus');
          }
          newFocus.focus();
        }, 250);
      }
    }
  };

  $.fn.owlCarousel.Constructor.Plugins['Owl2A11y'] = Owl2A11y;
})(window.Zepto || window.jQuery, window, document);