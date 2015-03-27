import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isSelected', 'isPartiallySelected'],

  children: Ember.computed.alias('court.children'),
  hasChildren: Ember.computed.notEmpty('children'),
  isSelected: function(key, value) {
    if (arguments.length === 1) {
      return this.get('court.isSelected');
    } else {
      // Set all children the same as we are being set
      if (this.get('hasChildren')) {
        this.get('children').forEach((kid) => kid.set('isSelected', value));
      }
      this.set('court.isSelected', value);
      return value;
    }
  }.property('court.isSelected'),

  isAllChildrenSelected: function() {
    return !this.get('hasChildren') ||
      this.get('children').every((kid) => kid.get('isSelected'));
  }.property('hasChildren', 'children.@each.isSelected'),
  notAllChildrenSelected: Ember.computed.not('isAllChildrenSelected'),
  isPartiallySelected: Ember.computed.and('isSelected', 'notAllChildrenSelected'),

  click: function() {
    this.toggleProperty('isSelected');
  }
});
