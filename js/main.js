class Stepper {
    #currentStep = 0;
    
    constructor({ id, steps }) {
        this.numberOfSteps = steps.length;
        this.stepperElement = document.getElementById(id);
        this.stepperElement.className = "stepper";
        this.addSteps(steps);
    }

    addSteps(steps) {
        steps.forEach(({ title, description, fields }) => {
            const template = `<div class="stepper__step">
                <div class="stepper__title">${title}<div>
                <div class="stepper__description">${description}<div>
                <div class="fields">
                    ${ fields
                    .map(({
                        type,
                        placeholder
                    }) => `<input type="${type}" placeholder="${placeholder}"/>`)
                    .join``}
                </div>
            </div>`;
            this.stepperElement.innerHTML += template;
        });
        this.showStep();
    }

    get currentStep() {
        return this.#currentStep;
    }

    set currentStep(value) {
        this.#currentStep = value;
        this.showStep();
    }

    showStep() {
        [...this.stepperElement.getElementsByClassName("stepper__step")].forEach((e, i) => {
            e.className = "stepper__step" + (i === this.#currentStep ? "" : " stepper--hide");
        });
    }
}

const stepper = new Stepper({
    id: "stepper",
    steps: [
        {
            title: "Step1",
            description: "Just a description",
            fields: [
                { type: "text", placeholder: "Your Email" }
            ]
        },
        {
            title: "Step2",
            description: "Just a description 2",
            fields: [
                { type: "password", placeholder: "Your Password" },
                { type: "password", placeholder: "Repeat Password" }
            ]
        }
    ]
});