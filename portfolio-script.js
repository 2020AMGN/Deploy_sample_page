const portfolioContainer = document.querySelector('.portfolio-container');
const showAllBtn = document.getElementById('showAllBtn');
const savePdfBtn = document.getElementById('savePdfBtn');
let isShowAllActive = false;

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;
let autoSlideInterval;

// 전체 보기 토글 함수
function toggleShowAll() {
    isShowAllActive = !isShowAllActive;
    portfolioContainer.classList.toggle('show-all-active');

    if (isShowAllActive) {
        // "전체 보기" 모드 진입
        showAllBtn.textContent = '슬라이드 보기';
        savePdfBtn.style.display = 'block';
        stopAutoSlide();
        stopAutoTechChange();
    } else {
        // "슬라이드 보기" 모드로 복귀
        showAllBtn.textContent = '전체 보기';
        savePdfBtn.style.display = 'none';
        updateSlider(); // 슬라이더 위치 초기화
        showTechContent(techTags[currentTechIndex]); // 기술 스택 표시 초기화
        startAutoSlide();
        startAutoTechChange();
    }
}

// 슬라이드 변경 함수
function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
}

// 특정 슬라이드로 이동
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function manualChangeSlide(direction) {
    stopAutoSlide();
    changeSlide(direction);
}

function manualGoToSlide(slideIndex) {
    stopAutoSlide();
    goToSlide(slideIndex);
}

// 슬라이더 업데이트
function updateSlider() {
    const container = document.getElementById('sliderContainer');
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // 도트 업데이트
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// 기술 태그 클릭 이벤트
function showTechContent(techId) {
    // 모든 기술 콘텐츠 숨기기
    const allContents = document.querySelectorAll('.tech-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // 모든 태그 비활성화
    const allTags = document.querySelectorAll('.tech-tag');
    allTags.forEach(tag => {
        tag.classList.remove('active');
    });

    // 선택된 콘텐츠와 태그 활성화
    document.getElementById(techId).classList.add('active');
    document.querySelector(`.tech-tag[data-tech="${techId}"]`).classList.add('active');
}

function manualShowTechContent(techId) {
    stopAutoTechChange();
    showTechContent(techId);
}

// 자동 슬라이드 (선택사항)
function startAutoSlide() {
    stopAutoSlide(); // 이전 인터벌이 있다면 중지
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

// 기술 스택 자동 순환
let currentTechIndex = 0;
let autoTechInterval;

function autoChangeTech() {
    currentTechIndex = (currentTechIndex + 1) % techTags.length;
    showTechContent(techTags[currentTechIndex]);
}

function stopAutoTechChange() {
    clearInterval(autoTechInterval);
}

function startAutoTechChange() {
    stopAutoTechChange();
    autoTechInterval = setInterval(autoChangeTech, 3000);
}

// 키보드 네비게이션
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        manualChangeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        manualChangeSlide(1);
    }
}); 