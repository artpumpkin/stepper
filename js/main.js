class Stepper {
	#currentStep = 0;

	constructor({ id, steps }) {
		this.numberOfSteps = steps.length;
		this.stepperElement = document.getElementById(id);
		this.stepperElement.className = "stepper";
		this.stepperElement.innerHTML += `<div class="stepper__bullets">
          ${`<div class="stepper__bullet"></div>`.repeat(steps.length + 1)}  
        </div>`;
		this.addSteps(steps);
		this.attachEvents();
	}

	addSteps(steps) {
		const navigationTemplate = `<div class="stepper__previous"><img src="assets/left-arrow-icon.png" /></div>
				<div class="stepper__next"><img src="assets/right-arrow-icon.png" /></div>`;

		steps.forEach(({ inputs }) => {
			const template = `
				<div class="stepper__step">
					${ inputs.map(input => `
					<div class="stepper__field">
						<input ${Object.entries(input).map(([key, value]) => `${key}="${value}"`).join` `} required />
						<span class="stepper__placeholder">${input.placeholder}</span>
						<span class="stepper__bottom-border"></span>
					</div>`).join``}
					${navigationTemplate}
				</div>`;
			this.stepperElement.innerHTML += template;
		});

		this.stepperElement.innerHTML += `
			<div class="stepper__step">
				<button class="stepper__button">Submit</button>
        ${navigationTemplate}
			</div>`;

		this.showStep();
	}

	attachEvents() {
		this.stepperElement.querySelectorAll(".stepper__previous").forEach(button => {
			button.onclick = () => {
				if (this.currentStep > 0) {
					this.currentStep--;
				}
			};
		});

		this.stepperElement.querySelectorAll(".stepper__next").forEach(button => {
			button.onclick = () => {
				if (this.currentStep < this.numberOfSteps) {
					let isValid = true;
					let password = "";
					this.stepperElement.querySelectorAll(".stepper--show input").forEach((input, index) => {
						if (input.type === "password" && index === 0) {
							password = input.value;
						}

						if (!input.validity.valid) {
							if (isValid) {
								input.reportValidity();
							}
							isValid *= false;
						}

						if (index === 1) {
							if (input.value !== "" && input.value !== password) {
								input.setCustomValidity("The password and its confirmation do not match.");
								input.reportValidity();
								isValid *= false;
							} else if (input.value !== "" && input.value === password) {
								input.setCustomValidity("");
								isValid = true;
							}
						}
					});
					
					if (isValid) {
						this.currentStep++;
					}
				}
			};
		});

		this.stepperElement.querySelector(".stepper__button").onclick = () => alert(`Thanks for Submiting!`);
	}

	get currentStep() {
		return this.#currentStep;
	}

	set currentStep(value) {
		this.#currentStep = value;
		this.showStep();
	}

	showStep() {
		this.stepperElement.querySelectorAll(".stepper__step").forEach((e, i) => {
			if (i === this.currentStep) {
				e.className = "stepper__step stepper--show";
				if (e.querySelector("input")) {
					e.querySelector("input").focus();
				}
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
			inputs: [
				{ type: "text", placeholder: "username"}
			]
		}, {
			inputs: [
				{ type: "email", placeholder: "email"} 
			]
		}, 
		{
			inputs: [
				{ type: "password", placeholder: "password" }, 
				{ type: "password", placeholder: "confirm password" }
			]
		}
	]
});