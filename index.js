var MovingBackground = function(element){
	var scope;
	var returnObj = {
		_blocks: {
			all: [],
		},
		_timeKeeper: null,
		init: function(){
			scope = this;
			scope._blocks.all = element.querySelectorAll(".colour-block");

			for(var i=0;i<scope._blocks.all.length;i++){
				var thisBlock = scope._blocks.all[i];
				var coords = thisBlock.getBoundingClientRect();
				
				thisBlock.style.top = coords.top+"px";
				thisBlock.style.backgroundColor = scope.randRGB();
			}

			setTimeout(function(){
				element.style.opacity = "1";
				for(var i=0;i<scope._blocks.all.length;i++){
					scope._blocks.all[i].style.position = "absolute";
				}
				scope.start();
			},100)
		},
		start: function(){
			scope._timeKeeper = setInterval(function(){
				scope.tick();
			}, 10)
		},
		stop: function(){
			clearInterval(scope._timeKeeper);
		},
		tick: function(){
			var screenDims = document.body.getBoundingClientRect();
			for(var i=0;i<scope._blocks.all.length;i++){
				var thisBlock = scope._blocks.all[i];
				var blockDims = thisBlock.getBoundingClientRect();
				
				thisBlock.style.top = (blockDims.top + 1)+"px"

				//If its below the fold, shifty it to the top
				if(blockDims.top > screenDims.height){
					thisBlock.style.top = 0-(blockDims.height)+"px";
					thisBlock.style.backgroundColor = scope.randRGB();

				}

			}
		},
		randRGB: function(){
			var rand1 = Math.round(Math.random()*256);
			var rand2 = Math.round(Math.random()*256);
			var rand3 = Math.round(Math.random()*256);
			return "rgb("+rand1+","+rand2+","+rand3+")";
		}		
	}
	returnObj.init();
	return returnObj;
};

var movingBackground = new MovingBackground(document.querySelector(".colour-block-container"));

/*!
 * Fairy Dust Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/jWmZxZ/
 */

(function fairyDustCursor() {
  
	var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
	var width = window.innerWidth;
	var height = window.innerHeight;
	var cursor = {x: width/2, y: width/2};
	var particles = [];
	
	function init() {
	  bindEvents();
	  loop();
	}
	
	// Bind events that are needed
	function bindEvents() {
	  document.addEventListener('mousemove', onMouseMove);
	  document.addEventListener('touchmove', onTouchMove);
	  document.addEventListener('touchstart', onTouchMove);
	  
	  window.addEventListener('resize', onWindowResize);
	}
	
	function onWindowResize(e) {
	  width = window.innerWidth;
	  height = window.innerHeight;
	}
	
	function onTouchMove(e) {
	  if( e.touches.length > 0 ) {
		for( var i = 0; i < e.touches.length; i++ ) {
		  addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
		}
	  }
	}
	
	function onMouseMove(e) {    
	  cursor.x = e.clientX;
	  cursor.y = e.clientY;
	  
	  addParticle( cursor.x, cursor.y, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
	}
	
	function addParticle(x, y, color) {
	  var particle = new Particle();
	  particle.init(x, y, color);
	  particles.push(particle);
	}
	
	function updateParticles() {
	  
	  // Updated
	  for( var i = 0; i < particles.length; i++ ) {
		particles[i].update();
	  }
	  
	  // Remove dead particles
	  for( var i = particles.length -1; i >= 0; i-- ) {
		if( particles[i].lifeSpan < 0 ) {
		  particles[i].die();
		  particles.splice(i, 1);
		}
	  }
	  
	}
	
	function loop() {
	  requestAnimationFrame(loop);
	  updateParticles();
	}
	
	/**
	 * Particles
	 */
	
	function Particle() {
  
	  this.character = "*";
	  this.lifeSpan = 120; //ms
	  this.initialStyles ={
		"position": "absolute",
		"display": "block",
		"pointerEvents": "none",
		"z-index": "10000000",
		"fontSize": "16px",
		"will-change": "transform"
	  };
  
	  // Init, and set properties
	  this.init = function(x, y, color) {
  
		this.velocity = {
		  x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
		  y: 1
		};
		
		this.position = {x: x - 10, y: y - 20};
		this.initialStyles.color = color;
  
		this.element = document.createElement('span');
		this.element.innerHTML = this.character;
		applyProperties(this.element, this.initialStyles);
		this.update();
		
		document.querySelector('.wrapy').appendChild(this.element);
	  };
	  
	  this.update = function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.lifeSpan--;
		
		this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
	  }
	  
	  this.die = function() {
		this.element.parentNode.removeChild(this.element);
	  }
	  
	}
	
	/**
	 * Utils
	 */
	
	// Applies css `properties` to an element.
	function applyProperties( target, properties ) {
	  for( var key in properties ) {
		target.style[ key ] = properties[ key ];
	  }
	}
	
	init();
  })();