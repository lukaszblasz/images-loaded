class ImagesLoader {
	constructor(){
  	this.counters= {
    	completed: 0,
      loaded: 0,
      errors: 0
    }
  }
  
  _checkLoadedItems(){
  	let sum = Object.values(this.counters).reduce((value, sum)=> {
    		return sum + value;
    })
    
    if(sum === this.imgNodes.length){
    	this.config.callback.call(this, {
      	stats: this.counters
      });
    }
  }
  
  loadImages(config) {    
    this.config = config;
  
  	this.imgNodes = document.querySelectorAll(this.config.selector + ' img');
  	this.imgNodes.forEach((domNode) => {
				if(domNode.complete){
        	this.counters.completed++;
          this._checkLoadedItems();
        }
        domNode.addEventListener('load', ()=> {
        	this.counters.loaded++;
          this._checkLoadedItems();
        });
        domNode.addEventListener('error', ()=> {
        	this.counters.errors++;
          this._checkLoadedItems();
        });
		});
  }
};


((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.imagesLoaded = factory();
    }
})(this, () => {
  return new ImagesLoader();
});