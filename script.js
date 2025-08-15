document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Modal functionality
    const providerBtn = document.getElementById('providerBtn');
    const clientBtn = document.getElementById('clientBtn');
    const providerModal = document.getElementById('providerModal');
    const clientModal = document.getElementById('clientModal');
    const closeButtons = document.querySelectorAll('.close');
    
    if (providerBtn && providerModal) {
        providerBtn.addEventListener('click', function() {
            providerModal.style.display = 'block';
        });
    }
    
    if (clientBtn && clientModal) {
        clientBtn.addEventListener('click', function() {
            clientModal.style.display = 'block';
        });
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            providerModal.style.display = 'none';
            clientModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === providerModal) {
            providerModal.style.display = 'none';
        }
        if (event.target === clientModal) {
            clientModal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for registration forms
    const validateForm = (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validate Aadhaar number (12 digits)
            const aadhaarField = form.querySelector('input[name="aadhaar"]');
            if (aadhaarField && !/^\d{12}$/.test(aadhaarField.value.trim())) {
                isValid = false;
                aadhaarField.style.borderColor = 'red';
            } else if (aadhaarField) {
                aadhaarField.style.borderColor = '#ddd';
            }
            
            // Validate mobile number (10 digits)
            const mobileField = form.querySelector('input[name="mobile"]');
            if (mobileField && !/^\d{10}$/.test(mobileField.value.trim())) {
                isValid = false;
                mobileField.style.borderColor = 'red';
            } else if (mobileField) {
                mobileField.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // Form is valid, proceed with submission
                alert('Form submitted successfully!');
                form.reset();
                
                // In a real application, you would send data to the server here
                // and redirect to a success page or show a success message
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    };
    
    // Initialize form validation for both forms
    validateForm('providerForm');
    validateForm('clientForm');
    
    // Tab functionality for admin page
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });
        
        // Activate first tab by default
        tabBtns[0].click();
    }
    
    // Export data functionality
    const exportBtns = document.querySelectorAll('.export-btn');
    
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dataType = this.getAttribute('data-type');
            alert(`Exporting ${dataType} data as CSV`);
            
            // In a real application, this would generate and download a CSV file
            // containing the relevant data from the table
        });
    });
});