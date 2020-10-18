import { ExampleBasic } from './example-basic';
import { ExampleSetTimeout } from './example-set-timeout';

document.addEventListener("DOMContentLoaded", ($event) => {
    const main = new Main();
});

class Main {
    constructor() {
        this.bindEvent('#ExampleBasic', 'click', this.onExampleBasicBtnClicked);
        this.bindEvent('#ExampleSetTimeout', 'click', this.onExampleSetTimeoutBtnClicked);
    }

    bindEvent(selector: string, event: string, handler: any): void {
        document.querySelector(selector)?.addEventListener(event, handler);
    }

    onExampleBasicBtnClicked($event: MouseEvent): void {
        ExampleBasic();
    }

    onExampleSetTimeoutBtnClicked($event: MouseEvent): void {
        ExampleSetTimeout();
    }
}