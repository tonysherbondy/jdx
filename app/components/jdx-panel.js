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
    },
    selectAllFederal: function() {
      this.get('federalJDXs').forEach((court) => court.set('isSelected', true));
      return false;
    },
    selectRelatedFederal: function() {
      // For any selected court
      var federalJDXs = this.get('federalJDXs');
      this.get('jdxs').filterBy('isSelected').forEach((court) => {
        // Select every circuit of the selected court
        var circuits = court.get('circuits') || [];
        circuits.forEach((circuitName) => {
          var federal = federalJDXs.findBy('name', circuitName);
          federal.set('isSelected', true);
        });
      });
      return false;
    },
    selectAllState: function() {
      this.get('stateJDXs').forEach((court) => court.set('isSelected', true));
      return false;
    },
    clearSelected: function() {
      this.get('jdxs').forEach((court) => court.set('isSelected', false));
      return false;
    }
  }
});
