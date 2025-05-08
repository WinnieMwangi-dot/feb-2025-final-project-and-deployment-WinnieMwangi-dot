/**
 * Zawadi Haven Form Validation
 * Handles validation for contact forms, newsletter signup, and other forms
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all form validations
    initContactFormValidation();
    initNewsletterFormValidation();
});

/**
 * Contact Form Validation
 */
function initContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            // Form is valid - process submission
            processContactForm();
        }
    });
    
    // Add input event listeners for real-time validation
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const subjectInput = contactForm.querySelector('#subject');
    const messageInput = contactForm.querySelector('#message');
    
    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (phoneInput) phoneInput.addEventListener('input', validatePhone);
    if (subjectInput) subjectInput.addEventListener('change', validateSubject);
    if (messageInput) messageInput.addEventListener('input', validateMessage);
}

function validateContactForm() {
    let isValid = true;
    
    // Validate each field
    isValid = validateName() && isValid;
    isValid = validateEmail() && isValid;
    isValid = validatePhone() && isValid;
    isValid = validateSubject() && isValid;
    isValid = validateMessage() && isValid;
    
    return isValid;
}

function validateName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    const nameError = nameInput.nextElementSibling;
    
    if (!name) {
        showError(nameInput, 'Please enter your full name');
        return false;
    }
    
    if (name.length < 3) {
        showError(nameInput, 'Name must be at least 3 characters');
        return false;
    }
    
    clearError(nameInput);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const emailError = emailInput.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailInput, 'Please enter your email address');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
    }
    
    // Check for Kenyan email domains if needed
    if (email.endsWith('.co.ke') || email.endsWith('.ac.ke') || email.endsWith('.go.ke')) {
        // Kenyan domain - could add specific validation if needed
    }
    
    clearError(emailInput);
    return true;
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.trim();
    const phoneRegex = /^(\+?254|0)[17]\d{8}$/; // Matches Kenyan phone numbers
    
    // Phone is optional but if provided, validate it
    if (phone && !phoneRegex.test(phone)) {
        showError(phoneInput, 'Please enter a valid Kenyan phone number (e.g. 0712345678 or +254712345678)');
        return false;
    }
    
    clearError(phoneInput);
    return true;
}

function validateSubject() {
    const subjectInput = document.getElementById('subject');
    const subject = subjectInput.value;
    
    if (!subject) {
        showError(subjectInput, 'Please select a subject');
        return false;
    }
    
    clearError(subjectInput);
    return true;
}

function validateMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    
    if (!message) {
        showError(messageInput, 'Please enter your message');
        return false;
    }
    
    if (message.length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(messageInput);
    return true;
}

function processContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // In a real application, you would send this data to your server
    const formValues = {};
    formData.forEach((value, key) => {
        formValues[key] = value;
    });
    
    console.log('Form submission:', formValues);
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 1500);
}

/**
 * Newsletter Form Validation
 */
function initNewsletterFormValidation() {
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateNewsletterForm(form)) {
                processNewsletterForm(form);
            }
        });
        
        // Add input event listener for real-time validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) emailInput.addEventListener('input', function() {
            validateNewsletterEmail(this);
        });
    });
}

function validateNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    return validateNewsletterEmail(emailInput);
}

function validateNewsletterEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(input, 'Please enter your email address');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(input, 'Please enter a valid email address');
        return false;
    }
    
    clearError(input);
    return true;
}

function processNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();
    
    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    
    // In a real application, you would send this data to your server
    console.log('Newsletter submission:', email);
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for subscribing! Check your email for a 10% discount code.', 'success');
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
    }, 1500);
}

/**
 * Utility Functions
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Remove any existing error messages
    clearError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.marginTop = '5px';
    errorElement.style.fontSize = '0.9rem';
    
    // Insert error message after input
    input.insertAdjacentElement('afterend', errorElement);
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(notification);
    
    // Position notification (adjust as needed)
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#ff6b6b';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.style.zIndex = '1000';
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * Add CSS for error states
 */
function addFormValidationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff6b6b !important;
        }
        
        .error-message {
            color: #ff6b6b;
            margin-top: 5px;
            font-size: 0.9rem;
        }
        
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.error {
            background-color: #ff6b6b;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Add styles when script loads
addFormValidationStyles();