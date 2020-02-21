class Stepper {
    #currentStep = 0;
    
    constructor({ id, steps }) {
        this.numberOfSteps = steps.length;
        this.stepperElement = document.getElementById(id);
        this.stepperElement.className = "stepper";
        this.stepperElement.innerHTML += `<div class="stepper__bullets">
          ${`<div class="stepper__bullet"></div>`.repeat(steps.length)}  
        </div>`;
        this.addSteps(steps);
        this.attachEvents();
    }

    attachEvents() {
        this.stepperElement.querySelectorAll(".stepper__field input").forEach(field => {
            field.onkeyup = ({ key }) => {
                if (key === "Enter" && this.currentStep < this.numberOfSteps - 1) {
                    this.currentStep++;
                }
            }
        });

        this.stepperElement.querySelectorAll(".stepper__bullets .stepper__bullet").forEach((bullet, i) => {
            bullet.onclick = () => {
                this.currentStep = i;
            }
        });
    }

    addSteps(steps) {
        steps.forEach(({ inputs }) => {
            const template = `<div class="stepper__step">
                ${ inputs.map(input => `<div class="stepper__field">
                <input ${ Object
                    .entries(input)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join` `
                } />
                <span class="stepper__placeholder">${input.placeholder}</span>
                <span class="stepper__bottom-border"></span>
                </div>`)
                    .join``
                }
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
            if (i === this.currentStep) {
                e.className = "stepper__step stepper--show";
                e.querySelector("input").focus();

                this.stepperElement.querySelector(`.stepper__bullets .stepper__bullet:nth-of-type(${i + 1})`).className = "stepper__bullet stepper--active";
            } else {
                e.className = "stepper__step";

                this.stepperElement.querySelector(`.stepper__bullets .stepper__bullet:nth-of-type(${i + 1})`).className = "stepper__bullet";
            }
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