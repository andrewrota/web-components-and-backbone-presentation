'use strict';
import * as Backbone from 'backbone';

var SlideView = Backbone.View.extend({
    show: function() {
        this.el.show();
    },
    hide: function() {
        this.el.hide();
    },
    goToNext: function() {
        this.el.goToNext();
    },
    goToPrev: function() {
        this.el.goToPrev();
    }
});

export default SlideView;