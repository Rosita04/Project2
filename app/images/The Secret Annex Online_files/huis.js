var Flash = (function($) {
	
    var MUTE = 'mute',
    UNMUTE = 'unmute',
    LQ = 'lq',
    HQ = 'hq';
	
    var Flash = {
        call: function(action) {
            // find all Flash objects.
            var o = $('object, embed');
            var ids = [];
	
            // Call their actions by their IDs.
            for (var i = 0; i < o.size(); i++) {
                if (swfobject.getObjectById(o.get(i).id))
                    swfobject.getObjectById(o.get(i).id)[action]();
            }
        }
    }
	
    Links = new LBi.LinkRelations();

    // handle flash interaction.
    Links.subscribe(/flash/, function(e) {
	
        e.preventDefault();
	
        // toggle the state.
        $(e.target).closest('li').toggleClass('toggle');
	
        // get the action to call on all Flash objects.
        var action = e.target.rel.replace('flash-', '');
		
        // Update cookies.
        switch (action) {
            case MUTE :
                LBi.setCookie('sound', action);
                if ($('video')[0]) $('video')[0].player.setMuted(true);
                break;
            case UNMUTE :
                LBi.setCookie('sound', action);
                if ($('video')[0]) $('video')[0].player.setMuted(false);
                break;
            case LQ :
                LBi.setCookie('bandwidth', action);
                break;
            case HQ :
                LBi.setCookie('bandwidth', action);
                break;
            default :
                break;
        }
		
        Flash.call(action);
	
    });
	
    $(function() {

        /*
		 * Set toggle class based on cookies.
		 *
		 */

        var sound = LBi.getCookie('sound');
        if (sound === MUTE) {
            $('.sound').addClass('toggle');
        }

        var bandwidth = LBi.getCookie('bandwidth');
        if (bandwidth === LQ) {
            $('.bandwidth').addClass('toggle');
        }
		
        /*
		 * Initialise tooltips for bandwidth and sound.
		 *
		 */
		
        var Tooltip = LBi.Class.extend(
            LBi.Tooltip,
            function() {}, 
            {
                render: function(e) {

                    // the root element of the definition.
                    var root = $(e.target);
					
                    // set a data object.
                    var data = {};
                    data.tip = root.attr('name');
                    
                    if (!this.settings.template) {
                        // parse the template.
                        var html = this.settings.template.parse(data);

                        // insert the generated HTML
                        $('#canvas').append(html);
                    }
					
                    var tooltip = $(this.settings.tooltipSelector);

                    // set the position of the tooltip.
                    tooltip.css({
                        top: root.offset().top + root.height() + 10,
                        left: root.offset().left + (root.outerWidth() / 2) - tooltip.outerWidth() + 28
                    });
					
                }
            }
            );
		
        new Tooltip('.bandwidth a, .sound a', {
            template: new LBi.Template('<div class="options-tooltip"><p>$tip</p><div class="tip_arrow"></div></div>'),
            tooltipSelector: '.options-tooltip'
        });
		
        // Tooltip that automatically shows after some delay and hides again after some delay.
        var Flashtip = function(element, settings) {
            this.settings = $.extend({}, this.defaults, settings || {});
            this.tip = $(this.settings.tip);
            this.target = $(element);
            
            this.tip.bind('mouseleave', function(){
                setTimeout(this.hide.bind(this), 1000);
            }.bind(this));
            
            this.tip.bind('mouseenter', function() {
                clearTimeout(this.hideTimer);
            }.bind(this));
            
            this.showTimer = setTimeout(this.show.bind(this), this.settings.flashAfter * 1000);
            this.hideTimer = setTimeout(this.hide.bind(this), (this.settings.flashAfter + this.settings.flashTime) * 1000);
        }
			
        Flashtip.prototype.defaults = {
            flashTime: 5,
            flashAfter: 3
        }
                
        Flashtip.prototype.show = function(event) {
            var offset = this.target.offset();
            this.tip.css({
                top: offset.top,
                left: offset.left
            }).fadeIn();
        }
                
        Flashtip.prototype.hide = function() {
            clearTimeout(this.hideTimer);
            this.tip.fadeOut();
        }

        if ($('#language-tip').length == 1) {
            new Flashtip('.language a.lang', {
                tip: '#language-tip',
                flashAfter: 2,
                flashTime: 5
            });
        }
		
    });
	
    return Flash;

})(jQuery);