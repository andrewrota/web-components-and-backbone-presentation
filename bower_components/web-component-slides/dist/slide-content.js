!function(a){var b="slide-content",c="slide-content-template",d=document.currentScript.ownerDocument.getElementById(c).content,e=Object.create(HTMLElement.prototype);e.createdCallback=function(){var a=this.createShadowRoot(),b=document.importNode(d,!0);a.appendChild(b)},e.show=function(){this.classList.add("current"),this.resetImages()},e.hide=function(){this.classList.remove("current")},e.resetImages=function(){var b=this.querySelectorAll("img[data-reset]");b[0]&&Array.prototype.slice.call(b).forEach(function(b){var c=b.src;b.src="",a.setTimeout(function(){b.src=c},0)})},a.SlideContentElement=document.registerElement(b,{prototype:e})}(window);