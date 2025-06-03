document.addEventListener('DOMContentLoaded', function () {
    const textBlocks = document.querySelectorAll('.text-block');
    const images = document.querySelectorAll('.essay-image');
    
    function updateActiveImage() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const introHeight = document.querySelector('.introduction').offsetHeight;

        if (scrollTop < introHeight - 400) {
            images.forEach(img => img.classList.remove('active'));
            const firstImage = document.querySelector('[data-image="1"]');
            if (firstImage) {
                firstImage.classList.add('active');
            }
            return;
        }
        
        let activeIndex = 0;
        
        textBlocks.forEach((block, index) => {
            const blockTop = block.offsetTop;
            const blockHeight = block.offsetHeight;
            const blockCenter = blockTop + (blockHeight / 2);
            
            //Pick active block
            if (blockCenter <= scrollTop + (windowHeight / 2) + 250) {
                activeIndex = index;
            }
        });
        
        images.forEach(img => img.classList.remove('active'));
        
        //Add active class to corresponding image
        const targetImage = document.querySelector(`img[data-image="${activeIndex + 1}"]`);
        if (targetImage) {
            targetImage.classList.add('active');
        }
    }
    
    //Throttle scroll events for better performance
    let timeout = false;
    
    function requestTick() {
        if (!timeout) {
            requestAnimationFrame(updateActiveImage);
            timeout = true;
            setTimeout(() => { timeout = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);

    updateActiveImage();
});