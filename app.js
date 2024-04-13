function validateNumericInput(input) {
    const value = input.val();
    const invalidFeedback = input.next('.invalid-feedback'); // Get the invalid feedback div


    if (value === '' || isNaN(value)) {
        input.addClass('is-invalid'); 
        invalidFeedback.text('Please enter a valid number.'); // Custom error message
        return false;
    } else {
        input.removeClass('is-invalid'); // Remove is-invalid class
        return true;
    }
}

function validateAgeGroupInput(input) {
    const value = input.val();
    const errorIcon = input.siblings('.error-icon');

    if (value === '') {
        errorIcon.show().attr('title', 'Please select an age group.');
        input.addClass('is-invalid'); // Add Bootstrap invalid class
        return false;
    } else {
        errorIcon.hide();
        input.removeClass('is-invalid');
        return true;
    }
}

// Calculate tax based on age group and overall income
function calculateTax(overallIncome, ageGroup) {
    if (overallIncome <= 8) {
        return 0;
    }

    const taxableIncome = overallIncome - 8;
    let taxRate = 0;

    // Set tax rate based on age group
    if (ageGroup === 'below-40') {
        taxRate = 0.3; // 30%
    } else if (ageGroup === '40-60') {
        taxRate = 0.4; // 40%
    } else if (ageGroup === '60-plus') {
        taxRate = 0.1; // 10%
    }

    // Calculate tax
    return taxableIncome * taxRate;
}

// Document ready function
$(document).ready(function() {
    // Handle form submission
    $('#tax-form').on('submit', function(event) {
        event.preventDefault();

        // Get input values
        const income = $('#income');
        const extraIncome = $('#extra-income');
        const deductions = $('#deductions');
        const ageGroup = $('#age-group');

        // Validate inputs
        const isIncomeValid = validateNumericInput(income);
        const isExtraIncomeValid = validateNumericInput(extraIncome);
        const isDeductionsValid = validateNumericInput(deductions);
        const isAgeGroupValid = validateAgeGroupInput(ageGroup);

        // Return if validation fails
        if (!isIncomeValid || !isExtraIncomeValid || !isDeductionsValid || !isAgeGroupValid) {
            return;
        }

        // Convert values to floats
        const incomeValue = parseFloat(income.val());
        const extraIncomeValue = parseFloat(extraIncome.val());
        const deductionsValue = parseFloat(deductions.val());

        // Calculate overall income
        const overallIncome = incomeValue + extraIncomeValue - deductionsValue;

        // Get age group value
        const ageGroupValue = ageGroup.val();

        // Calculate tax
        const tax = calculateTax(overallIncome, ageGroupValue);

        // Display result in the modal
        $('#result-text').text(`Your tax amount is: ${tax.toFixed(2)} Lakhs`);
        $('#resultModal').modal('show');
    });

    // Tooltip hover behavior
    $('.tooltip-icon').hover(function() {
        // Show tooltip
        $(this).children('.tooltip-text').show();
    }, function() {
        // Hide tooltip
        $(this).children('.tooltip-text').hide();
    });
});
