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

(function() {
  var container = document.querySelector('.animated-container');
  var containerHeight = container.offsetHeight;
  var containerWidth = container.offsetWidth;
  var random = function(min, max) {
    return (Math.random() * (max - min)) + min;
  };
  var randInt = function(min, max) {
    return Math.floor(random(min, max));
  };

  var Particle = function(elem) {
    this.elem = elem;
    this.speed = randInt(2, 5);
    this.X = randInt(0, containerWidth);
    this.Y = randInt(0, containerHeight);
    var direction = random(0, Math.PI * 2);
    this.dX = Math.cos(direction);
    this.dY = Math.sin(direction);

    this.sizeX = elem.offsetWidth;
    this.sizeY = elem.offsetHeight;

    this.position();
  };
  Particle.prototype.position = function() {
    this.elem.style.left = this.X + 'px';
    this.elem.style.top = this.Y + 'px';
  };
  Particle.prototype.tick = function() {
    this.X += this.dX * this.speed;
    this.Y += this.dY * this.speed;
    if (this.X <= 0) {
      this.X = 0;
      this.dX *= -1;
    } else if (this.X + this.sizeX >= containerWidth) {
      this.X = containerWidth - this.sizeX;
      this.dX *= -1;
    }
    if (this.Y <= 0) {
      this.Y = 0;
      this.dY *= -1;
    } else if (this.Y + this.sizeY >= containerHeight) {
      this.Y = containerHeight - this.sizeY;
      this.dY *= -1;
    }
    this.position();
  };

  var particles = document.querySelectorAll('.animated-object');
  var particleObjects = [].map.call(particles, function(elem) {
    return new Particle(elem);
  });

  var tick = function() {
    for (var i = particleObjects.length; i--; ) {
      particleObjects[i].tick();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
