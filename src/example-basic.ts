import 'zone.js';

export function ExampleBasic() {
    const zoneA = Zone.current.fork({ name: 'Zone A' });
    const zoneB = Zone.current.fork({ name: 'Zone B' });

    function c() {
        console.log('c: ', Zone.current.name); // A
    }
    function b() {
        console.log('b: ', Zone.current.name); // B
        zoneA.run(c);
    }
    function a() {
        console.log('a: ', Zone.current.name); // A
        zoneB.run(b);
    }

    zoneA.run(a);
}
