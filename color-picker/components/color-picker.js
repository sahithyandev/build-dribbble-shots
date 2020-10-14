{/* <div class="hue-selector"></div> */ }
const COLOR_PICKER_TEMPLATE = `
    <div class="base">

    </div>
    <div class="popup">
        <div class="color-selector"></div>
        <input type="range" min="0" max="255" class="hue-selector" /> 
        <div class="values">
            <div class="value-container">
                <label>Hex</label>
                <input type="text" />
            </div>
            <div class="value-container">
                <label>R</label>
                <input type="number" />
            </div>
            <div class="value-container">
                <label>G</label>
                <input type="number" />
            </div>
            <div class="value-container">
                <label>B</label>
                <input type="number" />
            </div>
        </div>
    </div>
`

class ColorPicker extends HTMLElement {
    constructor() {
        super();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "./components/color-picker.css";

        const container = document.createElement('div');
        container.classList.add('color-picker-container');
        container.innerHTML = COLOR_PICKER_TEMPLATE;

        this.shadow = this.attachShadow({ mode: 'closed' });
        this.shadow.append(...[link, container]);
    }
    onConnectedCallback() {

    }
}

window.customElements.define('color-picker', ColorPicker)