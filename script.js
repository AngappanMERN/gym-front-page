// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ===== Gallery lightbox =====
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox) {
    galleryItems.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      });
    });

    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  // ===== BMI Calculator =====
  const bmiForm = document.querySelector('#bmi-form');
  if (bmiForm) {
    const unitButtons = document.querySelectorAll('.bmi-toggle button');
    const metricFields = document.querySelector('#metric-fields');
    const imperialFields = document.querySelector('#imperial-fields');
    let unit = 'metric';

    unitButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        unitButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        unit = btn.dataset.unit;
        if (unit === 'metric') {
          metricFields.style.display = 'block';
          imperialFields.style.display = 'none';
        } else {
          metricFields.style.display = 'none';
          imperialFields.style.display = 'block';
        }
      });
    });

    bmiForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let bmi;

      if (unit === 'metric') {
        const heightCm = parseFloat(document.querySelector('#height-cm').value);
        const weightKg = parseFloat(document.querySelector('#weight-kg').value);
        if (!heightCm || !weightKg) return;
        const heightM = heightCm / 100;
        bmi = weightKg / (heightM * heightM);
      } else {
        const heightFt = parseFloat(document.querySelector('#height-ft').value) || 0;
        const heightIn = parseFloat(document.querySelector('#height-in').value) || 0;
        const weightLb = parseFloat(document.querySelector('#weight-lb').value);
        const totalInches = (heightFt * 12) + heightIn;
        if (!totalInches || !weightLb) return;
        bmi = (weightLb / (totalInches * totalInches)) * 703;
      }

      bmi = Math.round(bmi * 10) / 10;

      let category;
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      document.querySelector('.bmi-value').textContent = bmi;
      document.querySelector('.bmi-category').textContent = category;
      document.querySelector('.bmi-result').classList.add('show');
    });
  }
});
