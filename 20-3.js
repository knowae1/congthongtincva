const ring = document.getElementById('ring');
    const zoomed = document.getElementById('zoomed');
    const hint = document.querySelector('.preview .hint');
    const total = 23;
    const radius = 780;
    const items = [];
    let currentDeg = 0;
    let rotating = true;

    for (let i = 0; i < total; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.dataset.index = i;
      const angle = (360 / total) * i;
      item.dataset.angle = angle;
      item.style.backgroundImage = src="5-anh-chot-5-1606141341409419474438.jpg";
      item.style.transform = `
        translate3d(-50%, -50%, 0)
        rotateY(${angle}deg)
        translateZ(${radius}px)
        rotateY(180deg)
      `;
      ring.appendChild(item);
      items.push(item);

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        rotating = false;
        items.forEach(x => x.classList.remove('selected','inactive'));
        item.classList.add('selected');
        items.filter(x => x !== item).forEach(x => x.classList.add('inactive'));
        const idx = Number(item.dataset.index) + 1;
        hint.style.display = 'none';
        zoomed.src = 5-anh-chot-5-1606141341409419474438.jpg;
        zoomed.onload = () => zoomed.classList.add('show');
        currentDeg = -Number(item.dataset.angle);
        ring.style.transform = rotateX(0deg) rotateY(${currentDeg}deg);
        refreshVisibility();
      });
    }

    function normalizeAngle(a) {
      let x = a % 360;
      if (x < 0) x += 360;
      return x;
    }

    function refreshVisibility() {
      items.forEach(item => {
        const base = Number(item.dataset.angle);
        const view = normalizeAngle(base + currentDeg);
        const cos = Math.cos(view * Math.PI / 180);
        item.style.zIndex = Math.round((cos + 1) * 1500);
        if (view <= 50 || view >= 310) {
          item.classList.add('visible'); item.classList.remove('near','far');
        } else if (view <= 95 || view >= 265) {
          item.classList.add('near'); item.classList.remove('visible','far');
        } else {
          item.classList.add('far'); item.classList.remove('visible','near');
        }
      });
    }

    document.body.addEventListener('click', (e) => {
      if (!e.target.closest('.item')) {
        rotating = true;
        items.forEach(i => i.classList.remove('selected','inactive'));
        zoomed.classList.remove('show');
        hint.style.display = 'block';
      }
    });

    function animate() {
      if (rotating) {
        currentDeg = (currentDeg + 0.03) % 360;
        ring.style.transform = rotateX(0deg) rotateY(${currentDeg}deg);
      }
      refreshVisibility();
      requestAnimationFrame(animate);
    }

    animate();
