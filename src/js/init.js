'use strict';
import * as Backbone from 'backbone';
import SlideshowView from './views/slideshowView.js';
import SlideshowModel from './models/slideshowModel.js';


var slideshowModel = new SlideshowModel();

new SlideshowView({
    el: 'body',
    model: slideshowModel
});

var Router = Backbone.Router.extend({
    routes: {
        ':page': 'goToPage'
    },
    goToPage(page) {
        slideshowModel.set({slideIndex : page}, {validate: true});
    }
});

var router = new Router();

Backbone.Events.listenTo(slideshowModel, 'change:slideIndex', function(event, slideIndex) {
    router.navigate('#' + slideIndex);
});

if(!Backbone.history.start()) {
    router.goToPage(0);
}
