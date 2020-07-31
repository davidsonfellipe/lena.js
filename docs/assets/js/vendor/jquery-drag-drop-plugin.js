(function($) {
    var defaultOptions = {
        makeClone: false,  // Drag a clone of the source, and not the actual source element
        sourceClass: null, // Class to apply to source element when dragging a clone of the source element
        sourceHide: false, // Specify with true that the source element should hade visibility:hidden while dragging a clone
        dragClass: null,   // Class to apply to the element that is dragged
        canDropClass: null, // Class to apply to the dragged element when dropping is possible
        dropClass: null,
        isActive: true,
        container: null, // if set, dragging is limited to this container

        // Default is to allow all elements to be dragged
        canDrag: function($src, event) {
            return $src;
        },

        // Default is to allow dropping inside elements with css stylesheet "drop"
        canDrop: function($dst) {
            return $dst.hasClass("drop") || $dst.parents(".drop").size()>0;
        },

        // Default is to move the element in the DOM and insert it into the element where it is dropped
        didDrop: function($src, $dst) {
            $src.appendTo($dst);
        }
    };

    // Status during a drag-and-drop operation. Only one such operation can be in progress at any given time.
    var $sourceElement = null; // Element that user wanted to drag
    var $activeElement = null; // Element that is shown moving around during drag operation
    var $destElement = null;   // Element currently highlighted as possible drop destination
    var dragOffsetX, dragOffsetY; // Position difference from drag-point to active elements left top corner
    var limits;

    // Private helper methods

    function cancelDestElement(options) {
        if ($destElement!=null) {
            if (options.dropClass)
                $destElement.removeClass(options.dropClass);
            $destElement = null;
        }
        if ($activeElement!=null) {
            if (options.canDropClass) {
                $activeElement.removeClass(options.canDropClass);
            }
        }
    }

    // Public methods

    var methods = {
        init: function(options) {
            options = $.extend({}, defaultOptions, options);
            this.data("options", options);
            this.bind("mousedown.dragdrop touchstart.dragdrop", methods.onStart);

            return this;
        },

        destroy: function() {
            this.unbind("mousedown.dragdrop touchstart.dragdrop");
            return this;
        },
        on: function() {
            this.data("options").isActive = true;
        },
        off: function() {
            this.data("options").isActive = false;
        },

        onStart: function(event) {
            var $me = $(this);
            var options = $me.data("options");
            if (!options.isActive)
                return;

            var $element = options.canDrag($me, event);
            if ($element) {
                $sourceElement = $element;
                var offset = $sourceElement.offset();
                var width = $sourceElement.width();
                var height = $sourceElement.height();
                if (event.type=="touchstart") {
                    dragOffsetX = event.originalEvent.touches[0].clientX - offset.left;
                    dragOffsetY = event.originalEvent.touches[0].clientY - offset.top;
                }
                else {
                    dragOffsetX = event.pageX - offset.left;
                    dragOffsetY = event.pageY - offset.top;
                }

                if (options.makeClone) {
                    $activeElement = $sourceElement.clone(false);

                    // Elements that are cloned and dragged around are added to the parent in order
                    // to get any cascading styles applied.
                    $activeElement.appendTo($element.parent());
                    if (options.sourceClass)
                        $sourceElement.addClass(options.sourceClass);
                    else if (options.sourceHide)
                        $sourceElement.css("visibility", "hidden");
                }
                else {
                    $activeElement = $sourceElement;
                }

                $activeElement.css({
                    position: "absolute",
                    left: offset.left,
                    top: offset.top,
                    width: width,
                    height: height
                });
                if (options.dragClass)
                    $activeElement.addClass(options.dragClass);

                var $c = options.container;
                if ($c) {
                    var offset = $c.offset();
                    limits = {
                        minX: offset.left,
                        minY: offset.top,
                        maxX: offset.left + $c.outerWidth() - $element.outerWidth(),
                        maxY: offset.top + $c.outerHeight() - $element.outerHeight()
                    };
                }

                $(window)
                    .bind("mousemove.dragdrop touchmove.dragdrop", { source: $me }, methods.onMove)
                    .bind("mouseup.dragdrop touchend.dragdrop", { source: $me }, methods.onEnd);

                event.stopPropagation();
                return false;
            }
        },

        onMove: function(event) {
            if (!$activeElement)
                return;

            var $me = event.data.source;
            var options = $me.data("options");
            var posX, posY;
            if (event.type=="touchmove") {
                posX = event.originalEvent.touches[0].clientX;
                posY = event.originalEvent.touches[0].clientY;
            }
            else {
                posX = event.pageX;
                posY = event.pageY;
            }
            $activeElement.css("display", "none");
            var destElement = document.elementFromPoint(
                posX - document.documentElement.scrollLeft - document.body.scrollLeft,
                posY - document.documentElement.scrollTop - document.body.scrollTop
            );
            $activeElement.css("display", "");
            posX -= dragOffsetX;
            posY -= dragOffsetY;
            if (limits) {
                posX = Math.min(Math.max(posX, limits.minX), limits.maxX);
                posY = Math.min(Math.max(posY, limits.minY), limits.maxY);
            }
            $activeElement.css({ left: posX, top: posY });

            if (destElement) {
                if ($destElement==null || $destElement.get(0)!=destElement) {
                    var $possibleDestElement = $(destElement);
                    if (options.canDrop($possibleDestElement)) {
                        if (options.dropClass) {
                            if ($destElement!=null)
                                $destElement.removeClass(options.dropClass);
                            $possibleDestElement.addClass(options.dropClass);
                        }
                        if (options.canDropClass) {
                            $activeElement.addClass(options.canDropClass);
                        }
                        $destElement = $possibleDestElement;
                    }
                    else if ($destElement!=null) {
                        cancelDestElement(options);
                    }
                }
            }
            else if ($destElement!=null) {
                cancelDestElement(options);
            }

            event.stopPropagation();
            return false;
        },

        onEnd: function(event) {
            if (!$activeElement)
                return;

            var $me = event.data.source;
            var options = $me.data("options");
            if ($destElement) {
                options.didDrop($sourceElement, $destElement);
            }
            cancelDestElement(options);

            if (options.makeClone) {
                $activeElement.remove();
                if (options.sourceClass)
                    $sourceElement.removeClass(options.sourceClass);
                else if (options.sourceHide)
                    $sourceElement.css("visibility", "visible");
            }
            else {
                $activeElement.css("position", "static");
                $activeElement.css("width", "");
                $activeElement.css("height", "");
                if (options.dragClass)
                    $activeElement.removeClass(options.dragClass);
            }

            $(window).unbind("mousemove.dragdrop touchmove.dragdrop");
            $(window).unbind("mouseup.dragdrop touchend.dragdrop");
            $sourceElement = $activeElement = limits = null;
        }
    };

    $.fn.dragdrop = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on jQuery.dragdrop');
        }
    };
})(jQuery);

