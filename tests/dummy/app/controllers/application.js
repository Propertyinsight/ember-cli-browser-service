import Ember from 'ember';

export default Ember.Controller.extend({

    browser: Ember.inject.service(),

    detect: function() {
        return this.get('browser').detect();
    }.property()

});
