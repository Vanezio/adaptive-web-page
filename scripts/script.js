
+function ($) {
    'use strict';
  
    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================
  
    var Collapse = function (element, options) {
      this.$element      = $(element)
      this.options       = $.extend({}, Collapse.DEFAULTS, options)
      this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                             '[data-toggle="collapse"][data-target="#' + element.id + '"]')
      this.transitioning = null
  
      if (this.options.parent) {
        this.$parent = this.getParent()
      } else {
        this.addAriaAndCollapsedClass(this.$element, this.$trigger)
      }
  
      if (this.options.toggle) this.toggle()
    }
  
    Collapse.VERSION  = '3.4.1'
  
    Collapse.TRANSITION_DURATION = 350
  
    Collapse.DEFAULTS = {
      toggle: true
    }
  
    Collapse.prototype.dimension = function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }
  
    Collapse.prototype.show = function () {
      if (this.transitioning || this.$element.hasClass('in')) return
  
      var activesData
      var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')
  
      if (actives && actives.length) {
        activesData = actives.data('bs.collapse')
        if (activesData && activesData.transitioning) return
      }
  
      var startEvent = $.Event('show.bs.collapse')
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return
  
      if (actives && actives.length) {
        Plugin.call(actives, 'hide')
        activesData || actives.data('bs.collapse', null)
      }
  
      var dimension = this.dimension()
  
      this.$element
        .removeClass('collapse')
        .addClass('collapsing')[dimension](0)
        .attr('aria-expanded', true)
  
      this.$trigger
        .removeClass('collapsed')
        .attr('aria-expanded', true)
  
      this.transitioning = 1
  
      var complete = function () {
        this.$element
          .removeClass('collapsing')
          .addClass('collapse in')[dimension]('')
        this.transitioning = 0
        this.$element
          .trigger('shown.bs.collapse')
      }
  
      if (!$.support.transition) return complete.call(this)
  
      var scrollSize = $.camelCase(['scroll', dimension].join('-'))
  
      this.$element
        .one('bsTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }
  
    Collapse.prototype.hide = function () {
      if (this.transitioning || !this.$element.hasClass('in')) return
  
      var startEvent = $.Event('hide.bs.collapse')
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return
  
      var dimension = this.dimension()
  
      this.$element[dimension](this.$element[dimension]())[0].offsetHeight
  
      this.$element
        .addClass('collapsing')
        .removeClass('collapse in')
        .attr('aria-expanded', false)
  
      this.$trigger
        .addClass('collapsed')
        .attr('aria-expanded', false)
  
      this.transitioning = 1
  
      var complete = function () {
        this.transitioning = 0
        this.$element
          .removeClass('collapsing')
          .addClass('collapse')
          .trigger('hidden.bs.collapse')
      }
  
      if (!$.support.transition) return complete.call(this)
  
      this.$element
        [dimension](0)
        .one('bsTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }
  
    Collapse.prototype.toggle = function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
  
    Collapse.prototype.getParent = function () {
      return $(document).find(this.options.parent)
        .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
        .each($.proxy(function (i, element) {
          var $element = $(element)
          this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
        }, this))
        .end()
    }
  
    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
      var isOpen = $element.hasClass('in')
  
      $element.attr('aria-expanded', isOpen)
      $trigger
        .toggleClass('collapsed', !isOpen)
        .attr('aria-expanded', isOpen)
    }
  
    function getTargetFromTrigger($trigger) {
      var href
      var target = $trigger.attr('data-target')
        || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
  
      return $(document).find(target)
    }
  
  
    // COLLAPSE PLUGIN DEFINITION
    // ==========================
  
    function Plugin(option) {
      return this.each(function () {
        var $this   = $(this)
        var data    = $this.data('bs.collapse')
        var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
  
        if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
        if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }
  
    var old = $.fn.collapse
  
    $.fn.collapse             = Plugin
    $.fn.collapse.Constructor = Collapse
  
  
    // COLLAPSE NO CONFLICT
    // ====================
  
    $.fn.collapse.noConflict = function () {
      $.fn.collapse = old
      return this
    }
  
  
    // COLLAPSE DATA-API
    // =================
  
    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
      var $this   = $(this)
  
      if (!$this.attr('data-target')) e.preventDefault()
  
      var $target = getTargetFromTrigger($this)
      var data    = $target.data('bs.collapse')
      var option  = data ? 'toggle' : $this.data()
  
      Plugin.call($target, option)
    })
  
  }(jQuery);




jQuery(document).ready(function () {

    if (!sessionStorage.getItem('visited')) {
        $("#aboutUs").addClass("about-us-popup");
        sessionStorage.setItem('visited', 'true');
    }

    $("#aboutUsClose").click(function () {
        $("#aboutUs").removeClass("about-us-popup");
    });

    $("#T2DM-btn").click(function (i, e) {
        $("#switcher").removeClass("second-sw-content");
        $("#switcher").addClass("first-sw-content");
    });
    $("#T1DM-btn").click(function (i, e) {
        $("#switcher").removeClass("first-sw-content");
        $("#switcher").addClass("second-sw-content");
    });
    $(".map-mobile .cl-op-arrow").each(function (i, e) {
        $(e).click(function (event) {
            if ($(e).hasClass("active-arrow")) {
                $(e).removeClass("active-arrow");
                $(e).closest(".cl-op-wrapper").removeClass("active-cl-op");
            } else {
                $(e).addClass("active-arrow");
                $(e).closest(".cl-op-wrapper").addClass("active-cl-op");
            }
        });
    });
    $("#arrow-professional").each(function (i, e) {
        $(e).click(function () {
            if ($(e).hasClass("active-arrow")) {
                console.log("hey", $(e).attr("class"));
                $(e).removeClass("active-arrow");
                $(e).closest(".cl-op-wrapper").removeClass("active-cl-op");
                $(e).closest(".cl-op-wrapper").removeClass("visible-cl-op");
                $("#home-banner").removeClass("professional-banner");
            } else {
                console.log("hoy");
                $(e).addClass("active-arrow");
                $("#arrow-patient").removeClass("active-arrow");
                $(e).closest(".cl-op-wrapper").addClass("active-cl-op");
                setTimeout(function () {
                    $(e).closest(".cl-op-wrapper").addClass("visible-cl-op");
                }, 500);
                $("#home-banner").addClass("professional-banner");
                $("#home-banner").removeClass("patient-banner");
                $("#arrow-wrapper-patient").removeClass("active-cl-op");
            }
        });
    });
    $("#arrow-patient").each(function (i, e) {
        $(e).click(function () {
            if ($(e).hasClass("active-arrow")) {
                console.log("hey", $(e).attr("class"));
                $(e).removeClass("active-arrow");
                $(e).closest(".cl-op-wrapper").removeClass("active-cl-op");
                $("#home-banner").removeClass("patient-banner");
            } else {
                console.log("hoy");
                $(e).addClass("active-arrow");
                $("#arrow-professional").removeClass("active-arrow");
                $(e).closest(".cl-op-wrapper").addClass("active-cl-op");
                $("#home-banner").addClass("patient-banner");
                $("#home-banner").removeClass("professional-banner");
                $("#arrow-wrapper-professional").removeClass("active-cl-op");
                $("#arrow-wrapper-professional").removeClass("visible-cl-op");
            }
        });
    });
    $("circle").each(function (i, e) {
        $(e).hover(function (event) {
            if ($(event.target).attr("id") == "NIHB") {
                $("path").each(function (i, e) {
                    if (!$(e).attr("id").includes("Combined_Shape")) {
                        $(e).addClass("filled-svg");
                    }
                });
            } else {
                $("path[id=" + $(event.target).attr("id") + "-svg]").addClass("filled-svg");
            }
        }, function (event) {
            if ($(event.target).attr("id") == "NIHB") {
                $("path").each(function (i, e) {
                    // if($(e).attr("id").split("Fill_")[1] <= 249 || $(e).attr("id").split("Fill_")[1] == undefined){
                    $(e).removeClass("filled-svg");
                    // }
                });
            } else {
                $("path[id=" + $(event.target).attr("id") + "-svg]").removeClass("filled-svg");
            }
        });
    });

    $(".custom-select").click(function (event) {
        $(event.target).children(".custom-select-option-wrapper").addClass("active");
        $(window).click(function (e) {
            if (!$(e.target).hasClass("custom-select-option-wrapper") && !$(e.target).hasClass("custom-select-option") && !$(e.target).hasClass("custom-select")) {
                $(event.target).children(".custom-select-option-wrapper").removeClass("active");
            }
        });
    });
    $(".custom-select-option").click(function (event) {
        $(event.target).siblings(".custom-select-option.active").removeClass("active");
        $(event.target).addClass("active");
        $(event.target).parent().siblings(".custom-select-input-val")[0].textContent = $(event.target)[0].textContent;

        $("#province").val($(event.target)[0].textContent);

        $(event.target).parent().siblings(".custom-select-input-val")[0].setAttribute('data-province-value', $(event.target)[0].getAttribute('data-province-value'));
        $(event.target).closest(".custom-select-option-wrapper").removeClass("active");
        var selectedVal = $("#tear-pad-dropdown .custom-select-option.active").attr("data-link");
        $("#tear-pad").attr("href", selectedVal);
        $("#tear-pad").removeClass("tear-pad-none");
    });
})