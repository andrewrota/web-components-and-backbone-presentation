'use strict';
import * as Backbone from 'backbone';

var SlideView = Backbone.View.extend({
    show() {
        this.el.show();
    },
    hide() {
        this.el.hide();
    },
    goToNext() {
        this.el.goToNext();
    },
    goToPrev() {
        this.el.goToPrev();
    }
});

export default SlideView;
