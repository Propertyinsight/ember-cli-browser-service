import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Controller.extend({
  browser: Ember.inject.service(),
  functionBindWorks: false,

  init: function() {
    this._super.apply(this, arguments);

    setTimeout(function() {
      this.set('functionBindWorks', true);
    }.bind(this), 1000);
  },

  detect: computed(function(){
    return this.get('browser').detect();
  }),

  agent: computed(function(){
    return this.get('browser').agent();
  }),

  version: computed(function(){
    return this.get('browser').version();
  })
});
