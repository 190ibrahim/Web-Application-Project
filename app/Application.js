export default class Application {

    /**
     * @type {HTMLElement}
     * Target element of the application.
     */
    target;

    /**
     * @type {HTMLElement}
     * Target element of the application.
     */
    statBarTarget;

    constructor(options) {
        options = options ?? {};

        this.validate(options);

        const start = Date.now();
        this.init();
        const elapsed = Date.now() - start;
        this.#updateStatus(elapsed);
    }

    validate(opts) {
        if (typeof opts !== 'object') {
            throw new Error('Options must be an object.');
        }

        if (!(opts.target instanceof HTMLElement)) {
            throw new Error('Argument target must be a valid HTML element.');
        }

        if (opts.statBarTarget !== undefined && !(opts.statBarTarget instanceof HTMLElement)) {
            throw new Error('Argument statBarTarget must be a valid HTML element.');
        }

        this.target = opts.target;
        this.statBarTarget = opts.statBarTarget;
    }

    init() {
        console.log('Initialization started');
    }

    #updateStatus(elapsedTime) {
        if (this.statBarTarget) {
            this.statBarTarget.textContent = `Application started successfully in ${elapsedTime}ms.`;
        } else {
            console.log(`Application started successfully in ${elapsedTime}ms.`);
        }
    }

    destroy() {
        console.log('Destroying application');
        while (this.target.lastChild) {
            this.target.lastChild.remove();
        }
    }
}