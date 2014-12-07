'use strict';

import * as Backbone from 'backbone';
import SlideView from './slideView.js';

var SlideshowView = Backbone.View.extend({
    initialize: function() {
        window.console.log(new SlideView());
    }
});

export default SlideshowView;