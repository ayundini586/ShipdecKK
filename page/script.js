// script.js 
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href').replace('./', '').replace('.html', '');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (currentPage === 'subscription') {  
        initAuthForm();
    }

    if (currentPage === 'gallery') {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.loading = 'lazy';
        });
    }
 
    if (currentPage === 'services') {
        document.querySelectorAll('.learn-more').forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
    }
});

function initAuthForm() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-wrapper');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });
    
    // Form validation for sign in
    const signInForm = document.getElementById('auth-form');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || username.length < 4) {
                return alert("Username must be at least 4 characters.");
            }
            
            if (!password || password.length < 6) {
                return alert("Password must be at least 6 characters.");
            }
     
            alert('Login successful!');
            signInForm.reset();
        });
    }
    
    // Form validation for sign up
    const signUpForm = document.getElementById('auth-form-signup');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                fullname: document.getElementById('fullname').value.trim(),
                email: document.getElementById('email').value.trim(),
                username: document.getElementById('username-signup').value.trim(),
                password: document.getElementById('password-signup').value.trim(),
                age: parseInt(document.getElementById('age').value)
            };
            
            // Validation logic
            if (!formData.fullname || formData.fullname.length < 3) {
                return alert("Full name must be at least 3 characters.");
            }
            if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
                return alert("Please enter a valid email.");
            }
            if (!formData.username || formData.username.length < 4) {
                return alert("Username must be at least 4 characters.");
            }
            if (!formData.password || formData.password.length < 6) {
                return alert("Password must be at least 6 characters.");
            }
            if (isNaN(formData.age) || formData.age < 18) {
                return alert("You must be at least 18 years old.");
            }
    
            alert('Registration successful!');
            signUpForm.reset();
        });
    }
}

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    // Skip placeholder links ("#") that aren't real in-page anchors
    if (!targetId || targetId === '#') {
        return;
    }

    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}