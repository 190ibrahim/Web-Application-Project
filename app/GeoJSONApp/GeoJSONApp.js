import Application from '../Application.js';

export default class GeoJSONApp extends Application {
    constructor(options) {
        super(options);
        this.geojsonString = null;
    }

    init() {
        super.init();
        this.createHTML();
    }

    createHTML() {

        const containerElem = document.createElement('div');
        containerElem.className = 'victor-container';

        const textarea = this.createTextArea();
        containerElem.appendChild(textarea);

        const formatButton = this.createFormatButton();
        containerElem.appendChild(formatButton);

        const validateButton = this.createValidateButton();
        containerElem.appendChild(validateButton);

        const copyButton = this.createCopyButton();
        containerElem.appendChild(copyButton);

        const resultElem = this.createValidationResultElement();
        containerElem.appendChild(resultElem);

        this.target.appendChild(containerElem);
    }

    createValidationResultElement() {
        const resultElem = document.createElement('div');
        resultElem.className = 'validation-result';

        // Create the output box for formatted JSON
        const outputBox = document.createElement('pre');
        outputBox.className = 'formatted-json-output';
        resultElem.appendChild(outputBox);

        return resultElem;
    }

    formatJSON() {
        if (this.geojsonString) {
            try {
                const formattedJSON = JSON.stringify(JSON.parse(this.geojsonString), null, 2);
                this.updateTextareaValue(formattedJSON);
                this.showOutputBox(formattedJSON); // Show the output box with formatted JSON
                console.log('JSON formatted:', this.geojsonString);
            } catch (error) {
                console.error('Invalid JSON:', error);
            }
        } else {
            console.warn('No JSON available for formatting.');
        }
    }


    showOutputBox(formattedJSON) {
        const outputBox = document.querySelector('.formatted-json-output');
        if (outputBox) {
            outputBox.innerText = formattedJSON;
            outputBox.style.display = 'block'; // Display the output box
        }
    }

    createTextArea() {
        const textarea = document.createElement('textarea');
        textarea.addEventListener('input', () => this.updateGeoJSON(textarea.value));
        return textarea;
    }

    createFormatButton() {
        const formatButton = document.createElement('button');
        formatButton.innerText = 'Format JSON';
        formatButton.addEventListener('click', () => this.formatJSON());
        return formatButton;
    }

    createCopyButton() {
        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy Text';
        copyButton.addEventListener('click', () => this.copyText());
        return copyButton;
    }

    createValidateButton() {
        const validateButton = document.createElement('button');
        validateButton.innerText = 'Validate GeoJSON';
        validateButton.addEventListener('click', () => this.validateGeoJSON());
        return validateButton;
    }

    updateGeoJSON(geojsonString) {
        this.geojsonString = geojsonString;
    }

    updateTextareaValue(value) {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = value;
            this.geojsonString = value;
            textarea.dispatchEvent(new Event('input')); // Trigger input event to re-validate the JSON
        }
    }


    validateGeoJSON() {
        const resultElem = document.querySelector('.validation-result');

        if (this.geojsonString) {
            const validationResult = this.validateGeoJSONSyntax(this.geojsonString);
            const { isValid, errorMessage } = validationResult;

            resultElem.innerText = isValid ? 'GeoJSON is valid.' : `GeoJSON is invalid:\n${errorMessage}`;
            resultElem.classList.toggle('valid', isValid);
            resultElem.classList.toggle('invalid', !isValid);
        } else {
            resultElem.innerText = 'No GeoJSON available.';
            resultElem.classList.remove('valid', 'invalid');
        }
    }

    validateGeoJSONSyntax(geojsonString) {
        try {
            const geojson = JSON.parse(geojsonString);

            if (
                geojson &&
                geojson.type &&
                geojson.geometry &&
                geojson.properties
            ) {
                return {
                    isValid: true,
                    errorMessage: ''
                };
            } else {
                return {
                    isValid: false,
                    errorMessage: 'GeoJSON is missing required properties.'
                };
            }
        } catch (error) {
            return {
                isValid: false,
                errorMessage: error.message
            };
        }
    }

    copyText() {
        const outputBox = document.querySelector('textarea');
        if (outputBox) {
            const text = outputBox.innerText;
            navigator.clipboard.writeText(text)
                .then(() => console.log('Text copied to clipboard:', text))
                .catch((error) => console.error('Error copying text:', error));
        }
    }
}
