document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Secondary button in hero section scrolls to "How it works"
    document.querySelector('.secondary-btn').addEventListener('click', function() {
        const howItWorksSection = document.querySelector('#how-it-works');
        if (howItWorksSection) {
            window.scrollTo({
                top: howItWorksSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

    // Influencer carousel functionality
    const carousel = document.querySelector('.influencer-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 300;
        
        nextBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Animated dashboard elements
    animateDashboard();

    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-btn, .pricing-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Thank you for your interest! This is a demo landing page. In a real implementation, this would redirect to a sign-up form.');
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}! This is a demo landing page.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Function to animate dashboard elements
function animateDashboard() {
    // Simulate live tweets
    const tweetTimes = document.querySelectorAll('.tweet-time');
    let minutes = 2;
    
    setInterval(() => {
        if (tweetTimes.length > 0) {
            tweetTimes[0].textContent = `${minutes} mins ago`;
            minutes++;
            if (minutes > 30) minutes = 1;
        }
    }, 30000);

    // Animate sentiment analysis bars
    const sentimentBars = document.querySelectorAll('.sentiment-bar');
    if (sentimentBars.length > 0) {
        setInterval(() => {
            // Randomly adjust bar widths to simulate live data
            const positiveBar = document.querySelector('.sentiment-bar.positive');
            const neutralBar = document.querySelector('.sentiment-bar.neutral');
            const negativeBar = document.querySelector('.sentiment-bar.negative');
            
            if (positiveBar && neutralBar && negativeBar) {
                let positiveVal = Math.floor(Math.random() * 30) + 65; // 65-95%
                let neutralVal = Math.floor(Math.random() * 20) + 5;  // 5-25%
                let negativeVal = 100 - positiveVal - neutralVal;
                
                if (negativeVal < 0) {
                    neutralVal += negativeVal;
                    negativeVal = 0;
                }
                
                // Update bar widths
                positiveBar.style.width = `${positiveVal}%`;
                neutralBar.style.width = `${neutralVal}%`;
                negativeBar.style.width = `${negativeVal}%`;
                
                // Update percentage text
                document.querySelectorAll('.sentiment-percentage')[0].textContent = `${positiveVal}%`;
                document.querySelectorAll('.sentiment-percentage')[1].textContent = `${neutralVal}%`;
                document.querySelectorAll('.sentiment-percentage')[2].textContent = `${negativeVal}%`;
                
                // Add pulse animation to bars that increase
                if (parseInt(positiveBar.getAttribute('data-prev') || 0) < positiveVal) {
                    positiveBar.classList.add('pulse');
                    setTimeout(() => positiveBar.classList.remove('pulse'), 1000);
                }
                if (parseInt(neutralBar.getAttribute('data-prev') || 0) < neutralVal) {
                    neutralBar.classList.add('pulse');
                    setTimeout(() => neutralBar.classList.remove('pulse'), 1000);
                }
                if (parseInt(negativeBar.getAttribute('data-prev') || 0) < negativeVal) {
                    negativeBar.classList.add('pulse');
                    setTimeout(() => negativeBar.classList.remove('pulse'), 1000);
                }
                
                // Store current values for next comparison
                positiveBar.setAttribute('data-prev', positiveVal);
                neutralBar.setAttribute('data-prev', neutralVal);
                negativeBar.setAttribute('data-prev', negativeVal);
            }
        }, 8000);
    }

    // Animate Telegram notification
    const telegramMessage = document.querySelector('.telegram-message');
    if (telegramMessage) {
        const recommendations = [
            { action: 'Buy', coin: '$DOGE', time: '15 mins', confidence: '94%', accuracy: '88%' },
            { action: 'Hold', coin: '$BTC', time: '24 hrs', confidence: '87%', accuracy: '92%' },
            { action: 'Buy', coin: '$ETH', time: '30 mins', confidence: '91%', accuracy: '89%' },
            { action: 'Sell', coin: '$SHIB', time: '10 mins', confidence: '89%', accuracy: '85%' }
        ];
        
        const tweetContents = [
            "Dogecoin might actually be my favorite cryptocurrency. It's pretty cool.",
            "Just had a great meeting about Bitcoin. Very promising technology!",
            "Ethereum's latest update is impressive. The team is doing great work.",
            "Not sure about some of these meme coins. Be careful out there."
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            const recommendation = recommendations[currentIndex];
            const tweetContent = tweetContents[currentIndex];
            
            telegramMessage.querySelector('p').textContent = `"${tweetContent}"`;
            telegramMessage.querySelector('.recommendation').textContent = `${recommendation.action} ${recommendation.coin} within ${recommendation.time}`;
            telegramMessage.querySelectorAll('p')[2].textContent = `Confidence: ${recommendation.confidence}`;
            telegramMessage.querySelectorAll('p')[3].textContent = `Historical Accuracy: ${recommendation.accuracy}`;
            
            currentIndex = (currentIndex + 1) % recommendations.length;
        }, 10000);
    }
}

// Intersection Observer for animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        observer.observe(feature);
    });
    
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
});
