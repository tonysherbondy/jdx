import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isSelected', 'isPartiallySelected'],

  children: Ember.computed.alias('court.children'),
  hasChildren: Ember.computed.alias('court.hasChildren'),

  isSelected: Ember.computed.alias('court.isSelected'),

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
