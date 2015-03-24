import Ember from 'ember';

export default Ember.Controller.extend({

    init: function() {
        this._super.apply(this, arguments);

        setTimeout(function(){
            this.set('functionBindWorks', true);
        }.bind(this), 1000);
    },

    functionBindWorks: false,

    browser: Ember.inject.service(),

    detect: function() {
        return this.get('browser').detect();
    }.property(),

    agent: function() {
        return this.get('browser').agent();
    }.property(),

    version: function() {
        return this.get('browser').version();
    }.property()

});
