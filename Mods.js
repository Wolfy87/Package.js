/**
 * @preserve Mods.js - Add class and package support to the browser
 * Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 **/

/**
 * Class - Can extend, implement and require other classes
 **/
function Class(settings) {
	// If settings have been passed initialise the class
	if(settings) {
		return this.initialise(settings);
	}
}

/**
 * Initialises the class
 * 
 * @param {Object} settings The settings to set up your class with such as what class to extend
 * @return {Function} The finished class
 **/
Class.prototype.initialise = function(settings) {
	// Store the constructor
	this.built = settings.Constructor || new Function();
	
	// Implement the extendable class if one exists
	if(settings.Extends) {
		this.implement(settings.Extends.prototype);
	}
	
	// Clean up the settings
	delete settings.Extends;
	delete settings.Implements;
	delete settings.Requires;
	delete settings.Constructor;
	
	// Implement the remaining methods
	this.implement(settings);
	
	// Return the built class
	return this.built;
};

/**
 * Implements an object into the class
 * 
 * @param {Object} obj Object to implement into the class
 **/
Class.prototype.implement = function(obj) {
	// Initialise variables
	var key = null;
	
	// Loop over the methods implementing them
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			this.built.prototype[key] = obj[key];
		}
	}
};