document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Car inventory data
    const cars = [
        {
            id: 1,
            name: 'Toyota Land Cruiser',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2022',
            mileage: '15,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol',
            price: 'PKR 1.5 Crore',
            type: 'sale'
        },
        {
            id: 2,
            name: 'Honda Civic RS',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2023',
            mileage: '5,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol',
            price: 'PKR 85 Lakh',
            type: 'sale'
        },
        {
            id: 3,
            name: 'Mercedes-Benz S-Class',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2023',
            mileage: '10,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol',
            price: 'PKR 2.2 Crore',
            type: 'sale'
        },
        {
            id: 4,
            name: 'Toyota Corolla Altis',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2022',
            mileage: '20,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol',
            price: 'PKR 60 Lakh',
            type: 'sale'
        },
        {
            id: 5,
            name: 'Toyota Fortuner',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2023',
            mileage: '8,000 km',
            transmission: 'Automatic',
            fuel: 'Diesel',
            price: 'PKR 1.2 Crore',
            type: 'rental',
            rentPrice: 'PKR 25,000/day'
        },
        {
            id: 6,
            name: 'Honda City',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            year: '2023',
            mileage: '12,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol',
            price: 'PKR 45 Lakh',
            type: 'rental',
            rentPrice: 'PKR 15,000/day'
        }
    ];

    // Load cars into the inventory
    function loadCars(filter = 'all') {
        const inventoryGrid = document.getElementById('inventory-grid');
        if (!inventoryGrid) return;

        // Clear existing content
        inventoryGrid.innerHTML = '';

        // Filter cars if needed
        const filteredCars = filter === 'all' 
            ? cars 
            : cars.filter(car => car.type === filter);

        // Add cars to the grid
        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'col-md-6 col-lg-4';
            carCard.innerHTML = `
                <div class="car-card">
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.name}">
                    </div>
                    <div class="car-details">
                        <h3>${car.name}</h3>
                        <div class="car-specs">
                            <span>${car.year}</span>
                            <span>${car.mileage}</span>
                            <span>${car.transmission}</span>
                            <span>${car.fuel}</span>
                        </div>
                        <span class="car-price">${car.type === 'rental' ? car.rentPrice : car.price}</span>
                        <div class="car-buttons">
                            <a href="#contact" class="btn btn-outline-primary">
                                ${car.type === 'rental' ? 'Rent Now' : 'Inquire Now'}
                            </a>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#carModal${car.id}">
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Car Details Modal -->
                <div class="modal fade" id="carModal${car.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content bg-dark text-white">
                            <div class="modal-header border-0">
                                <h5 class="modal-title">${car.name} - ${car.year}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <img src="${car.image}" alt="${car.name}" class="img-fluid rounded">
                                    </div>
                                    <div class="col-md-6">
                                        <h4>${car.type === 'rental' ? 'Rental Price: ' + car.rentPrice : 'Price: ' + car.price}</h4>
                                        <ul class="list-unstyled">
                                            <li><strong>Mileage:</strong> ${car.mileage}</li>
                                            <li><strong>Transmission:</strong> ${car.transmission}</li>
                                            <li><strong>Fuel Type:</strong> ${car.fuel}</li>
                                            <li><strong>Status:</strong> ${car.type === 'rental' ? 'Available for Rent' : 'Available for Sale'}</li>
                                        </ul>
                                        <p>Contact us now to ${car.type === 'rental' ? 'rent' : 'purchase'} this vehicle or to schedule a test drive.</p>
                                        <a href="#contact" class="btn btn-primary me-2" data-bs-dismiss="modal">
                                            ${car.type === 'rental' ? 'Book Now' : 'Contact Seller'}
                                        </a>
                                        <a href="tel:+923105664411" class="btn btn-outline-light">
                                            <i class="fas fa-phone-alt me-2"></i> Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            inventoryGrid.appendChild(carCard);
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize the page
    loadCars();

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Load filtered cars
            loadCars(this.dataset.filter);
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check in case elements are already in view
    animateOnScroll();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(alertDiv);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        });
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});
