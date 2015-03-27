import Ember from 'ember';

var Jurisdiction = Ember.Object.extend({
  name: Ember.required(),

  isSupreme: Ember.computed.equal('name', 'Supreme'),
  isSpecial: Ember.computed.equal('name', 'Special'),
  isFederal: Ember.computed.or('isSupreme', 'isSpecial', 'isCircuit'),

  isVisible: Ember.computed.alias('isSelected'),

  hasChildren: Ember.computed.notEmpty('children'),
  isSelected: function(key, value) {
    if (arguments.length === 1) {
      return false;
    } else {
      // Set all children the same as we are being set
      if (this.get('hasChildren')) {
        this.get('children').forEach((kid) => kid.set('isSelected', value));
      }
      return value;
    }
  }.property()
});

export default Jurisdiction;
