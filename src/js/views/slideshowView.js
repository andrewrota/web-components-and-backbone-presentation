'use strict';
import * as Backbone from 'backbone';
import SlideView from './slideView.js';
const RIGHT_KEY_CODE = 39;
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const SPACE_KEY_CODE = 32;

var SlideshowView = Backbone.View.extend({
    model: new Backbone.Model(),
    initialize: function() {
        this.initSlides();
        this.listenTo(this.model, 'change:currentSlide', this.handleCurrentSlideChange);
        this.model.set('currentSlide', 0);
        window.model = this.model;
    },
    goToSlide: function(slideIndex) {
        // @todo move this check to the model
        if(slideIndex < 0 || slideIndex >= this.slideViews.length) {
            throw 'Trying to access slide ' + slideIndex + ' that does not exist';
        }
        this.slideViews.forEach(slideView => {
            slideView.hide();
        });
        this.slideViews[slideIndex].show();
    },
    handleCurrentSlideChange: function(e, slideIndex) {
        this.goToSlide(slideIndex);
    },
    handleKeydown: function(e) {
        if(e.which === RIGHT_KEY_CODE || e.which === DOWN_KEY_CODE || e.which === SPACE_KEY_CODE) {
            this.model.set('currentSlide', this.model.get('currentSlide') + 1);
        } else if(e.which === LEFT_KEY_CODE || e.which === UP_KEY_CODE) {
            this.model.set('currentSlide', this.model.get('currentSlide') - 1);
        }
    },
    events: {
        'keydown': 'handleKeydown'
    },
    slideViews: [],
    initSlides: function() {
        var slideElements = this.el.querySelectorAll('slide-content');
        for(var i = 0; i < slideElements.length; i++) {
            this.slideViews.push(new SlideView({
                el: slideElements[i]
            }));
        }
    }
});
export default SlideshowView;
