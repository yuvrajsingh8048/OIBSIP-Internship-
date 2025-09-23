document.addEventListener('DOMContentLoaded', () => {
    const degreesInput = document.getElementById('degrees');
    const typeSelect = document.getElementById('type');
    const resultDiv = document.getElementById('result');
    const convertBtn = document.getElementById('convertBtn');

    convertBtn.addEventListener('click', () => {
        const degrees = parseFloat(degreesInput.value);
        const type = typeSelect.value;

        if (isNaN(degrees)) {
            resultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        let convertedValue;
        let convertedUnit;

        if (type === 'fahrenheit') {
            // Convert Fahrenheit to Celsius
            convertedValue = (degrees - 32) * 5 / 9;
            convertedUnit = '°C';
        } else if (type === 'celsius') {
            // Convert Celsius to Fahrenheit
            convertedValue = (degrees * 9 / 5) + 32;
            convertedUnit = '°F';
        }
        resultDiv.textContent = `${convertedValue.toFixed(2)} ${convertedUnit}`;
    });
    convertBtn.click();
});
