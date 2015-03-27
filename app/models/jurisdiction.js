import Ember from 'ember';

var Jurisdiction = Ember.Object.extend({
  name: Ember.required(),

  isSupreme: Ember.computed.equal('name', 'Supreme'),
  isSpecial: Ember.computed.equal('name', 'Special'),
  isFederal: Ember.computed.or('isSupreme', 'isSpecial', 'isCircuit'),

  isVisible: Ember.computed.alias('isSelected')
});

export default Jurisdiction;
