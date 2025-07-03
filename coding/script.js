// Global state management
let selectedCharacter = null;
let selectedTier = null;
let formData = {};

// Character data
const characters = {
    fairy: {
        name: "CeeCee the Fairy",
        icon: "🧚‍♀️",
        description: "A sparkling fairy who loves nature, flowers, and sharing magical garden adventures!"
    },
    dragon: {
        name: "Drake the Dragon", 
        icon: "🐲",
        description: "A brave dragon superhero who protects the magical realm and loves exciting adventures!"
    },
    mermaid: {
        name: "Marina the Mermaid",
        icon: "🧜‍♀️", 
        description: "An ocean-loving mermaid who explores underwater kingdoms and discovers sea treasures!"
    }
};

// Pricing data
const pricing = {
    base: {
        name: "Magical Moments",
        price: 19.99,
        features: [
            "2 personalized letters per month",
            "Fun coloring pages included", 
            "Basic character stickers",
            "Monthly magical story excerpt"
        ]
    },
    premium: {
        name: "Enchanted Adventures",
        price: 34.99,
        features: [
            "4 personalized letters per month",
            "Monthly magical gift/craft kit",
            "Premium art supplies & activities", 
            "Exclusive holographic stickers",
            "Complete monthly adventure story",
            "Access to exclusive online activities",
            "Personalized character photos"
        ]
    }
};

// DOM elements
const characterCards = document.querySelectorAll('.character-card');
const pricingSection = document.getElementById('pricing');
const pricingCards = document.querySelectorAll('.pricing-card');
const formSection = document.getElementById('child-form');
const confirmationSection = document.getElementById('confirmation');
const preferencesForm = document.getElementById('preferencesForm');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeCharacterSelection();
    initializePricingSelection();
    initializeForm();
    initializeColorOptions();
    initializeTestimonialSelection();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Testimonial selection functionality
function initializeTestimonialSelection() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            const character = card.getAttribute('data-character');
            
            // Find the corresponding character card
            const characterCard = document.querySelector(`.character-card[data-character="${character}"]`);
            
            if (characterCard) {
                // Scroll to character section first
                document.getElementById('characters').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Add a small delay for smooth scrolling, then select character
                setTimeout(() => {
                    selectCharacter(character, characterCard);
                }, 800);
                
                // Add visual feedback to clicked testimonial
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            }
        });
        
        // Add hover effect to show it's clickable
        card.addEventListener('mouseenter', function() {
            const badge = card.querySelector('.character-badge');
            badge.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = card.querySelector('.character-badge');
            badge.style.transform = 'scale(1)';
        });
    });
}

// Character selection functionality
function initializeCharacterSelection() {
    characterCards.forEach(card => {
        const selectBtn = card.querySelector('.select-btn');
        
        selectBtn.addEventListener('click', function() {
            const character = card.getAttribute('data-character');
            selectCharacter(character, card);
        });
        
        // Also allow clicking the card itself
        card.addEventListener('click', function() {
            const character = card.getAttribute('data-character');
            selectCharacter(character, card);
        });
    });
}

function selectCharacter(character, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    cardElement.classList.add('selected');
    selectedCharacter = character;
    
    // Update button text
    const selectBtn = cardElement.querySelector('.select-btn');
    selectBtn.textContent = 'Selected! ✨';
    selectBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Show pricing section with smooth transition
    setTimeout(() => {
        pricingSection.style.display = 'block';
        pricingSection.classList.add('section-transition');
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Pricing selection functionality  
function initializePricingSelection() {
    const tierBtns = document.querySelectorAll('.tier-btn');
    
    tierBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tier = btn.getAttribute('data-tier');
            const pricingCard = btn.closest('.pricing-card');
            selectTier(tier, pricingCard);
        });
    });
    
    // Also allow clicking the pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            const tier = card.querySelector('.tier-btn').getAttribute('data-tier');
            selectTier(tier, card);
        });
    });
}

function selectTier(tier, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card  
    cardElement.classList.add('selected');
    selectedTier = tier;
    
    // Update button text
    const tierBtn = cardElement.querySelector('.tier-btn');
    tierBtn.textContent = 'Selected! ✨';
    tierBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    
    // Show form section with smooth transition
    setTimeout(() => {
        formSection.style.display = 'block';
        formSection.classList.add('section-transition');
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Form functionality
function initializeForm() {
    preferencesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            collectFormData();
            showConfirmation();
        }
    });
}

function initializeColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const checkbox = option.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
        });
    });
}

function validateForm() {
    const requiredFields = ['childName', 'childAge', 'parentName', 'parentEmail', 'address'];
    let isValid = true;
    
    // Clear previous error styles
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.style.borderColor = '#e5e7eb';
    });
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = document.getElementById('parentEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        emailField.style.borderColor = '#ef4444';
        emailField.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill in all required fields with valid information.');
        // Focus on first invalid field
        const firstInvalid = document.querySelector('input[style*="border-color: rgb(239, 68, 68)"], select[style*="border-color: rgb(239, 68, 68)"], textarea[style*="border-color: rgb(239, 68, 68)"]');
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
    
    return isValid;
}

function collectFormData() {
    const form = preferencesForm;
    const formDataObj = new FormData(form);
    
    formData = {
        character: selectedCharacter,
        tier: selectedTier,
        childName: formDataObj.get('childName'),
        childAge: formDataObj.get('childAge'),
        parentName: formDataObj.get('parentName'),
        parentEmail: formDataObj.get('parentEmail'),
        address: formDataObj.get('address'),
        activities: formDataObj.getAll('activities'),
        colors: formDataObj.getAll('colors'),
        favoriteAnimals: formDataObj.get('favoriteAnimals'),
        specialInterests: formDataObj.get('specialInterests'),
        readingLevel: formDataObj.get('readingLevel'),
        additionalNotes: formDataObj.get('additionalNotes')
    };
    
    console.log('Form data collected:', formData);
}

function showConfirmation() {
    // Hide form section
    formSection.style.display = 'none';
    
    // Show confirmation section
    confirmationSection.style.display = 'block';
    confirmationSection.classList.add('section-transition');
    
    // Generate order summary
    generateOrderSummary();
    
    // Scroll to confirmation
    confirmationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add success animation
    const confirmationCard = document.querySelector('.confirmation-card');
    confirmationCard.classList.add('success-animation');
    
    // Send data to server (simulated)
    simulateDataSubmission();
}

function generateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const character = characters[selectedCharacter];
    const tier = pricing[selectedTier];
    
    orderSummary.innerHTML = `
        <h4 style="color: #374151; margin-bottom: 1rem; font-family: 'Fredoka One', cursive;">Order Summary</h4>
        <div style="text-align: left;">
            <p><strong>Child:</strong> ${formData.childName} (${formData.childAge} years old)</p>
            <p><strong>Character:</strong> ${character.icon} ${character.name}</p>
            <p><strong>Package:</strong> ${tier.name}</p>
            <p><strong>Monthly Price:</strong> $${tier.price}/month</p>
            <p><strong>Parent Email:</strong> ${formData.parentEmail}</p>
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e5e7eb;">
            <p style="font-size: 0.9rem; color: #6b7280;">
                <strong>Personalization Details:</strong><br>
                ${formData.activities.length > 0 ? `Favorite Activities: ${formData.activities.join(', ')}<br>` : ''}
                ${formData.colors.length > 0 ? `Favorite Colors: ${formData.colors.join(', ')}<br>` : ''}
                ${formData.favoriteAnimals ? `Favorite Animals: ${formData.favoriteAnimals}<br>` : ''}
                ${formData.readingLevel ? `Reading Level: ${formData.readingLevel}` : ''}
            </p>
        </div>
    `;
}

function simulateDataSubmission() {
    // In a real application, this would send data to your backend
    console.log('Submitting order data:', formData);
    
    // Simulate API call
    setTimeout(() => {
        console.log('Order submitted successfully!');
        // Here you could show additional confirmation, send emails, etc.
    }, 1000);
}

// Navigation functions
function goBack() {
    // Hide current form section
    formSection.style.display = 'none';
    
    // Show pricing section  
    pricingSection.style.display = 'block';
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startOver() {
    // Reset all selections
    selectedCharacter = null;
    selectedTier = null;
    formData = {};
    
    // Reset character cards
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('.select-btn');
        const character = card.getAttribute('data-character');
        
        if (character === 'fairy') btn.textContent = 'Choose Luna';
        else if (character === 'dragon') btn.textContent = 'Choose Drake';  
        else if (character === 'mermaid') btn.textContent = 'Choose Marina';
        
        btn.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)';
    });
    
    // Reset pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
        const btn = card.querySelector('.tier-btn');
        const tier = btn.getAttribute('data-tier');
        
        btn.textContent = tier === 'base' ? 'Select Base Tier' : 'Select Premium Tier';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    });
    
    // Hide all sections except character selection
    pricingSection.style.display = 'none';
    formSection.style.display = 'none';
    confirmationSection.style.display = 'none';
    
    // Reset form
    preferencesForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add floating label effect
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add character count for text areas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500; // You can adjust this
        const counter = document.createElement('div');
        counter.style.cssText = 'font-size: 0.8rem; color: #6b7280; text-align: right; margin-top: 0.5rem;';
        counter.textContent = `0/${maxLength} characters`;
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/${maxLength} characters`;
            if (length > maxLength * 0.9) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#6b7280';
            }
        });
    });
});

// Add some fun interactive effects
function addSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 1.5rem;
        opacity: 0;
        transform: translateY(0px);
        transition: all 1s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'translateY(-30px)';
    }, 10);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle effects to button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.select-btn, .tier-btn, .btn-primary')) {
        addSparkleEffect(e.target);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.matches('.character-card, .pricing-card')) {
        e.target.click();
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    
    setTimeout(() => {
        element.classList.remove('loading');
        element.textContent = originalText;
    }, 1000);
}

// Performance optimization: Lazy load sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all major sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.character-selection, .pricing-section, .form-section');
    sections.forEach(section => observer.observe(section));
});

console.log('✨ Magical Pen Pals JavaScript loaded successfully!'); 