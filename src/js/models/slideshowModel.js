'use strict';
import * as Backbone from 'backbone';

var SlideshowModel = Backbone.Model.extend({
        validate: function(attrs) {
            if(attrs.slideIndex < 0 || attrs.slideIndex >= this.get('numberOfSlides')) {
                return 'Trying to access slide ' + this.get('slideIndex') + ' that does not exist';
            }
        }
});
export default SlideshowModel;
