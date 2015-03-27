import Ember from 'ember';

export default Ember.Component.extend({
  federalJDXs: Ember.computed.filterBy('jdxs', 'isFederal'),
  stateJDXs: Ember.computed.filterBy('jdxs', 'isState'),
  districtJDXs: Ember.computed.filterBy('jdxs', 'isDistrict'),

  isAllDistrictVisibility: false,
  isAnyDistrictVisible: Ember.computed.gt('visibleDistricts.length', 0),
  visibleDistricts: function() {
    var districts = this.get('districtJDXs');
    if (this.get('isAllDistrictVisibility')) {
      return districts;
    }
    return districts.filterBy('isVisible');
  }.property('isAllDistrictVisibility', 'districtJDXs.@each.isVisible'),

  allVisibilityButtonName: function() {
    if (this.get('isAllDistrictVisibility')) {
      return "Hide Unselected Districts";
    } else {
      return "Show Unselected Districts";
    }
  }.property('isAllDistrictVisibility'),

  actions: {
    toggleDistrictVisibility: function() {
      this.toggleProperty('isAllDistrictVisibility');
      return false;
    }
  }
});
