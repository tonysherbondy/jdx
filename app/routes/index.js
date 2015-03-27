import Ember from 'ember';
import Jurisdiction from 'jdx/models/jurisdiction';

export default Ember.Route.extend({
  model: function() {
    var jdxs = [
      {name: 'Supreme'},
      {name: 'Special'},

      {name: 'First', isCircuit: true, states: ['California', 'Arizona', 'Oregon']},
      {name: 'Second', isCircuit: true, states: ['Utah', 'Colorado', 'Wyoming']},
      {name: 'Third', isCircuit: true, states: ['New York', 'Virginia', 'Florida']}

    ];
    function process(jdx, unprocessed) {
      if (jdx.isCircuit) {
        var states = jdx.states.map((state) => {
          return { name: state, isState: true, circuits: [jdx.name] };
        });
        states.forEach((j) => unprocessed.push(j));
      } else if (jdx.isState) {
        var districts = ['Northern', 'Southern'].map((district) => {
          return { name: `${district} ${jdx.name}`, isDistrict: true, circuits: jdx.circuits, states: [jdx.name] };
        });
        districts.forEach((j) => unprocessed.push(j));
      }
      return Jurisdiction.create(jdx);
    }
    var unprocessed = jdxs.map((j) => j);
    var processed = [];
    while (unprocessed.length > 0) {
      var jdx = unprocessed.shift();
      processed.push(process(jdx, unprocessed));
    }

    // Add children to circuit
    processed.filterBy('isCircuit').forEach((circuit) => {
      // Find all the children
      let children = processed.filter((court) => {
        let circuits = court.get('circuits');
        return !Ember.isEmpty(circuits) && circuits.contains(circuit.get('name'));
      });
      circuit.set('children', children);
    });

    return processed;
  }
});
