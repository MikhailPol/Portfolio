// Import images and fonts
import './assets/images/project-cafe.png';
import './assets/images/favicon.png';
import './assets/images/mail.png';
import './assets/images/phone.png';
import './assets/images/github.png';
import './assets/images/js-b.webp';
import './assets/images/HCJ.webp';
import './assets/images/p-b.webp';
import './assets/images/p-a.webp';
import './assets/images/p-g.webp';
import './assets/images/p-oop.webp';
import './assets/images/SQL.webp';
import './assets/images/sun.svg';
import './assets/images/moon.svg';
import './assets/images/light_fone.png';
import './assets/images/skills.png'


// Import style
import "./style.scss";

// Other import for work
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Custom slider
const arrayImagesSrc = ['js-b.webp', 'HCJ.webp', 'p-b.webp', 'p-a.webp', 'p-g.webp', 'p-oop.webp', 'SQL.webp']; // Массив с именами изображений.
const arrayImagesDesc = ['JS for beginners', 'HTML CSS JS', 'Python for beginners', 'Python for advanced', 'Python good', 'python OOP', 'SQL']; // Массив с альтернативными описаниями для изображений.
const slider = document.querySelector('.slider'); // Получаем контейнер для изображений.
const nextButton = document.querySelector('.certificates__button-next'); // Получаем элемент кнопки " > ".
const prevButton = document.querySelector('.certificates__button-prev'); // Получаем элемент кнопки " < ".
const sliderWidth = slider.offsetWidth; // Находим ширину контейнера( для работы слайдера ).
slider.style.width = sliderWidth * 3 + 'px'; //Увеличиваем ширину, делая ее равной трем от текущей.
slider.style.left = '-' + sliderWidth + 'px'; // Смещаем позицию слайдера влево на ширину одного слайда ( центрируем ).
let currentIndex = 0; // Текущий индекс изображения в массиве images.
let flag = true; // Флаг, для работы с функционалом, который блокирует работу функций при анимации.

// Функция для получения следующего и предыдущего индекса. В зависимости от параметра key возвращает нужный индекс.
const getIndex = (key) => {
  if (key === 'next') {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= arrayImagesSrc.length) nextIndex = 0;

      return nextIndex;
  };
  if (key === 'prev') {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = arrayImagesSrc.length - 1;

      return prevIndex;  
  };
};

// Фунция для генерации изображения и альтернативного описания элемента "img". 
const generateImages = (index, method, w = false) => {
  const image = document.createElement('img');
  image.src = './assets/images/' + arrayImagesSrc[index];
  image.alt = arrayImagesDesc[index];
  if (w) image.style.width = 0;
  slider[method](image);
};

// Функция для создания слайдера с 3-мя изображениями.
const createSlider = () => {
  generateImages( currentIndex, 'append' ); // 1-ое изображение.
  generateImages( getIndex('next'), 'append' ); // 2-ое изображение.
  generateImages( getIndex('prev'), 'prepend' ); // 3-е изображение.
};
// Функционал работы кнопок "<" ">", в зависимости от параметра (side) движение слайдера происходит влево или вправо.
function switchSlide(side) {
  if (!flag) return;
  flag = !flag;
  let left = side === 'left';

  if (side === 'right') {
      currentIndex++;
      if (currentIndex > arrayImagesSrc.length - 1) currentIndex = 0;
      showHideButton(currentIndex);
      generateImages( getIndex('next'), 'append' );
      mainAnimate();
  };

  if (side === 'left') {
      currentIndex--;
      if (currentIndex < 0) currentIndex = arrayImagesSrc.length - 1;
      showHideButton(currentIndex);
      generateImages( getIndex('prev'), 'prepend', true );
      mainAnimate(left = true);
  };
};

// Функция для показа / скрытия кнопок "<" ">" на старнице, если слайдер находится в начале / в конце.
function showHideButton (checkIndex) {
  if (checkIndex === arrayImagesSrc.length - 1) nextButton.classList.add('hide');
  if (checkIndex === 1) prevButton.classList.remove('hide');
  if (checkIndex === 0) prevButton.classList.add('hide');
  if (checkIndex === arrayImagesSrc.length - 2) nextButton.classList.remove('hide');
};

// Анимация переключения слайдера. Если параметр left = true, анимация работает влево, left = false - вправо.
function mainAnimate(left = false) {
  const img = document.querySelector('.slider img');
  let width;
  left === false ? width = 100 : width = 0;

  function animate() {
      if (left) {
          width += 3;
          img.style.width = width + '%';

          if (width > 100) {
              document.querySelector('.slider img:last-child').remove();
              flag = true;
          } else {
              requestAnimationFrame(animate);
          };
      } else {
          width -= 3;
  
          if (width <= 0) {
              img.remove();
              flag = true;
          } else {
              img.style.width = `${width}%`;
              requestAnimationFrame(animate);
          };
      };
  };
  animate();
};

// Создаем слайдер на странице.
createSlider();

// Добавляем слушателя события на кнопки.
nextButton.addEventListener('click', () => switchSlide('right'));
prevButton.addEventListener('click', () => switchSlide('left'));

// Отслеживаем изменения размера слайдера и делаем его адаптивным.
window.addEventListener('resize', () => {
  let dinamicWidth = slider.offsetWidth;
  slider.style.width = dinamicWidth;
  slider.style.left = '-' + dinamicWidth + 'px';
});

// Анимации

const tl1 = gsap.timeline({defaults: {duration: 0.5}});
tl1.from('.banner__first_word', {x: '-100%', opacity:0, delay: .5})
  .from('.banner__second_word', {x: '100%', opacity:0})
  .from('.banner__proffesion', {y: '50%', opacity: 0})
  .from('.banner__description', {y: '50%', opacity: 0})
  .from('.banner__btn', {y: 100, scale: 0,}, 2.5)
  .from('.navbar__wrapper', {y: -100, opacity: 0}, 2.5)
  .add(btnAnimation);

function btnAnimation() {
  const tlBtn = gsap.timeline({defaults: {duration: 0.1, repeat: -1, repeatDelay: 3}});
  tlBtn.to('.banner__btn', {rotate: 5})
    .to('.banner__btn', {rotate: -5})
    .to('.banner__btn', {rotate: 5})
    .to('.banner__btn', {rotate: 0})
  return tlBtn;
};

const tl2 = gsap.timeline({defaults: {duration: 1, repeat: -1, repeatDelay: 3}});
tl2.to('.first-icon', {y: -20})
.to('.first-icon', {y: 0, ease: 'bounce.out'})
.to('.second-icon', {y: -20})
.to('.second-icon', {y: 0, ease: 'bounce.out'})
.to('.third-icon', {y: -20})
.to('.third-icon', {y: 0, ease: 'bounce.out'})


const tl_lamp = gsap.timeline({defaults: {duration: 1, repeat: -1, repeatDelay: 3}});
tl_lamp.to('.skills-img', {rotate: 5})
.to('.skills-img', {rotate: -5})
.to('.skills-img', {rotate: 0})
.to('.skills-img', {rotateY: 360});




gsap.from('.skills__frontend', {
  x: -100,
  y: -50,
  opacity:0,
  duration: 1,
  scrollTrigger: {
    trigger:'.skills__frontend',
    start: 'top 60%',
    end: 'bottom -20%',
    toggleActions: 'play reverse play reverse',
    // markers: true
  }
});

gsap.from('.skills-img', {
  opacity:0,
  duration: 1,
  scrollTrigger: {
    trigger:'.skills__frontend',
    start: 'top 60%',
    end: 'bottom -20%',
    toggleActions: 'play reverse play reverse',
    // markers: true
  }
});

gsap.from('.skills__backend', {
  x: 100,
  y: 50,
  opacity:0,
  duration: 1,
  scrollTrigger: {
    trigger:'.skills__frontend',
    start: 'top 60%',
    end: 'bottom -20%',
    toggleActions: 'play reverse play reverse',
    // markers: true
  }
});

gsap.from('.certificates__container', {
  rotateY: 360,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.certificates__container',
    start: 'top 70%',
    end: 'bottom 20%',
    toggleActions: 'play reverse play reverse',
  }
});

gsap.from('.skills__title', {
  x: 30,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.skills__title',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse',
  }
});

gsap.from('.certificates__title', {
  x: -30,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.certificates__title',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse',
  }
});

gsap.from('.projects__title', {
  x: 30,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.projects__title',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse',
  }
});

gsap.from('.project-item', {
  y: 40,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.project-item',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse',
  }
});


// mobile navigation
const button_menu = document.querySelector('.menu-button');
const navbar_list = document.querySelector('.navbar__list');
button_menu.addEventListener('click', () => {
  button_menu.classList.toggle('open');
  navbar_list.classList.toggle('navbar__list-opened');
  mode_btn.classList.toggle('dark-mode--close');
});
let menu_items = document.querySelectorAll('.navbar__list-item');
menu_items.forEach(function(item) {
  item.addEventListener('click', () => {
    button_menu.classList.toggle('open');
    navbar_list.classList.toggle('navbar__list-opened');
    mode_btn.classList.toggle('dark-mode--close');
  });
});

//dark and light mode button
const mode_btn = document.querySelector('.dark-mode');
const page_theme = document.querySelector('.theme')

if (localStorage.getItem('theme') === 'light') {
  mode_btn.classList.add('dark-mode--active');
  page_theme.classList.add('light-theme');
}

mode_btn.onclick = function () {
  mode_btn.classList.toggle('dark-mode--active');
  const isLight = page_theme.classList.toggle('light-theme');
  if (isLight) {
    localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'dark')
  }
};


