const slides = document.querySelectorAll('.slider-content__slide')
const sliderLine = document.querySelector('.slider-line')
const sliderBtnNext = document.querySelector('.slider-buttons__right')
const sliderBtnPrev = document.querySelector('.slider-buttons__left')
const button = document.getElementById('button')
const dots = document.getElementById('dots')

class Slider {
    constructor() {
        this.slides = slides
        this.sliderLine = sliderLine
        this.sliderDots = []
        this.sliderBtnNext = sliderBtnNext
        this.sliderBtnPrev = sliderBtnPrev
        this.button = button
        this.dots = dots

        this.unclickedSlides = [...Array(this.slides.length)].map((_, index) => index)
        this.unclickedSlides.shift()
        this.sliderCount = 0
        this.sliderWidth = 0

        this.renderDots()
        window.addEventListener('resize', this.showSlide.bind(this))
        this.sliderBtnNext.addEventListener('click', this.nextSlide.bind(this))
        this.sliderBtnPrev.addEventListener('click', this.prevSlide.bind(this))
        this.sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.sliderCount = index
                this.rollSlider()
                this.thisSlide(this.sliderCount)
                this.setButtonActive()
            })
        })

        this.showSlide()      
    }

    showSlide() {
        this.sliderWidth = document.querySelector('.slider').offsetWidth
        this.sliderLine.style.width =
            this.sliderWidth * this.slides.length + 'px'
        this.slides.forEach(
            item => (item.style.width = this.sliderWidth + 'px')
        )
        this.rollSlider()
    }

    nextSlide() {
        this.sliderCount++
        if (this.sliderCount >= this.slides.length) this.sliderCount = 0

        this.rollSlider()
        this.thisSlide(this.sliderCount)
    }

    prevSlide() {
        this.sliderCount--
        if (this.sliderCount < 0) this.sliderCount = this.slides.length - 1

        this.rollSlider()
        this.thisSlide(this.sliderCount)
    }

    rollSlider() {
        this.sliderLine.style.transform = `translateX(${-this.sliderCount *
            this.sliderWidth}px)`
    }

    thisSlide(index) {
        this.unclickedSlides = this.unclickedSlides.filter(slide => slide != index)
        this.sliderDots.forEach(item => item.classList.remove('dot_active'))
        this.sliderDots[index].classList.add('dot_active')
        console.log(this.unclickedSlides)
        this.setButtonActive()
    }

    setButtonActive() {
        if (this.unclickedSlides.length == 0) {
            this.button.classList.remove('button_disabled')
        }
    }

    renderDots() {
        let dotsHtml = ''
        this.slides.forEach((_, index) => {
            if (index === 0) {
                dotsHtml += '<button class="dot dot_active"></button>'
            } else {
                dotsHtml += '<button class="dot"></button>'
            }
        })
        this.dots.innerHTML = dotsHtml  
        this.sliderDots = document.querySelectorAll('.dot')
    }
}

const slider = new Slider()
