        const slides = document.querySelectorAll('.slide');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const progressBar = document.getElementById('progressBar');
        const currentSlideEl = document.getElementById('currentSlide');
        const totalSlidesEl = document.getElementById('totalSlides');
        
        let currentSlide = 0;
        totalSlidesEl.innerText = slides.length;

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'previous');
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else if (index < currentSlide) {
                    slide.classList.add('previous');
                }
            });

            // Update Progress Bar
            const progress = ((currentSlide + 1) / slides.length) * 100;
            progressBar.style.width = progress + '%';
            
            // Update counter
            currentSlideEl.innerText = currentSlide + 1;
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlides();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlides();
            }
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });

        // Inicializar
        updateSlides();
