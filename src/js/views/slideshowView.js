'use strict';
import * as Backbone from 'backbone';
import SlideView from './slideView.js';
import SlideshowModel from '../models/slideshowModel.js';
const RIGHT_KEY_CODE = 39;
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const SPACE_KEY_CODE = 32;

var SlideshowView = Backbone.View.extend({
    initialize: function() {
        var view = this;
        this.initSlides();
        this.model.listenTo(this.model, 'change:slideIndex', function(event, slideIndex) {
            view.handleCurrentSlideChange(slideIndex);
        });
        this.progressBar = this.el.querySelector('.progress-bar');
        window.model = this.model;
    },
    goToSlide: function(slideIndex) {
        this.slideViews.forEach(slideView => {
            slideView.hide();
        });
        this.slideViews[slideIndex].show();
        if(this.progressBar) {
            this.progressBar.style.width = (this.model.get('slideIndex') / (this.model.get('numberOfSlides') - 1)) * 100 + '%';
        }
    },
    handleCurrentSlideChange: function(slideIndex) {
        this.goToSlide(slideIndex);
    },
    handleKeydown: function(e) {
        if(e.which === RIGHT_KEY_CODE || e.which === DOWN_KEY_CODE || e.which === SPACE_KEY_CODE) {
            this.model.set({'slideIndex':  parseInt(this.model.get('slideIndex'), 10) + 1}, {validate:true});
        } else if(e.which === LEFT_KEY_CODE || e.which === UP_KEY_CODE) {
            this.model.set({'slideIndex': parseInt(this.model.get('slideIndex'), 10) - 1}, {validate:true});
        }
    },
    events: {
        'keydown': 'handleKeydown'
    },
    slideViews: [],
    initSlides: function() {
        var slideElements = this.el.querySelectorAll('slide-content');
        for(let i = 0; i < slideElements.length; i++) {
            this.slideViews.push(new SlideView({
                el: slideElements[i]
            }));
        }
        this.model.set('numberOfSlides', this.slideViews.length);
    }
});
export default SlideshowView;
