import 'zone.js';

export function ExampleSetTimeout() {
    let timer: number;

    const z = Zone.current.fork({
        name: 'z',
        onHasTask(parent, current, target, hasTask) {
            console.log('hasTask', hasTask);

            if (hasTask.macroTask) {
                console.log("There are outstanding MacroTasks.");
            } else {
                console.log("All MacroTasks have been completed.");
            }
        },
        onScheduleTask(delegate, currentZone, targetZone, task) {
            const result = delegate.scheduleTask(targetZone, task);
            const name = task.callback.name;

            console.log(
                Date.now() - timer,
                `task with callback '${name}' is added to the task queue`
            );

            return result;
        },
        onInvokeTask(delegate, currentZone, targetZone, task, ...args) {
            const result = delegate.invokeTask(targetZone, task, ...args);
            const name = task.callback.name;

            console.log(
                Date.now() - timer,
                `task with callback '${name}' is removed from the task queue`
            );

            return result;
        },
        onInvoke(delegate, current, target, callback, ...args) {
            console.log(`entering zone '${target.name}'`);

            return delegate.invoke(target, callback, ...args);
        }
    });

    function a1() { }
    function a2() { }

    function b() {
        timer = Date.now();

        setTimeout(a1, 2000);
        setTimeout(a2, 4000);
    }

    z.run(b);
}

