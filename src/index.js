const slides = document.querySelectorAll('.slider-content__slide')
const sliderLine = document.querySelector('.slider-line')
const sliderDots = document.querySelectorAll('.dot')
const sliderBtnNext = document.querySelector('.slider-buttons__right')
const sliderBtnPrev = document.querySelector('.slider-buttons__left')
const button = document.getElementById('button')
const dots = document.getElementsById('dots')

class Slider {
    constructor() {
        this.slides = slides
        this.sliderLine = sliderLine
        this.sliderDots = sliderDots
        this.sliderBtnNext = sliderBtnNext
        this.sliderBtnPrev = sliderBtnPrev
        this.button = button
        this.dots = dots

        this.sliderCount = 0
        this.sliderWidth = 0

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
        this.renderDots()
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
        this.setButtonActive()
    }

    prevSlide() {
        this.sliderCount--
        if (this.sliderCount < 0) this.sliderCount = this.slides.length - 1

        this.rollSlider()
        this.thisSlide(this.sliderCount)
        this.setButtonActive()
    }

    rollSlider() {
        this.sliderLine.style.transform = `translateX(${-this.sliderCount *
            this.sliderWidth}px)`
    }

    thisSlide(index) {
        this.sliderDots.forEach(item => item.classList.remove('dot_active'))
        this.sliderDots[index].classList.add('dot_active')
    }

    setButtonActive() {
        if (this.sliderCount === this.slides.length - 1) {
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
        console.log(dotsHtml)
        this.dots.innerHTML = dotsHtml   
    }
}

const slider = new Slider()
