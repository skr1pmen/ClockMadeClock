const clocks = document.querySelectorAll(".clocks");

setInterval(() => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    clocks[0].className = `clocks c_${String(hours).padStart(2, '0')[0]}`
    clocks[1].className = `clocks c_${String(hours).padStart(2, '0')[1]}`
    clocks[2].className = `clocks c_${String(minutes).padStart(2, '0')[0]}`
    clocks[3].className = `clocks c_${String(minutes).padStart(2, '0')[1]}`
    clocks[4].className = `clocks c_${String(seconds).padStart(2, '0')[0]}`
    clocks[5].className = `clocks c_${String(seconds).padStart(2, '0')[1]}`
},1000)



// Цвета для разных временных периодов
const colors = [
    { hour: 0, start: '#0a0f1e', end: '#1a1f2e' },   // Глубокая ночь
    { hour: 4, start: '#2b1e3c', end: '#4a3f5e' },   // Рассвет
    { hour: 6, start: '#ff9966', end: '#ff5e62' },   // Восход
    { hour: 8, start: '#4facfe', end: '#00f2fe' },   // Утро
    { hour: 11, start: '#2193b0', end: '#6dd5ed' },  // День
    { hour: 15, start: '#ffb88c', end: '#de6262' },  // После обеда
    { hour: 17, start: '#ff6b6b', end: '#556270' },  // Закат
    { hour: 19, start: '#2c3e50', end: '#3498db' },  // Сумерки
    { hour: 21, start: '#0f2027', end: '#203a43' }   // Ночь
];

// Функция для интерполяции цвета
function lerpColor(color1, color2, factor) {
    if (!color1 || !color2) return color1 || color2 || '#000000';

    // Конвертируем HEX в RGB
    const hex = (color) => {
        const c = color.replace('#', '');
        return {
            r: parseInt(c.substring(0, 2), 16),
            g: parseInt(c.substring(2, 4), 16),
            b: parseInt(c.substring(4, 6), 16)
        };
    };

    const rgb1 = hex(color1);
    const rgb2 = hex(color2);

    // Интерполяция
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

    // Обратно в HEX
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Получаем цвета для текущего времени
function getCurrentColors() {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

    // Находим текущий и следующий период
    let currentIndex = 0;
    for (let i = 0; i < colors.length - 1; i++) {
        if (hour >= colors[i].hour && hour < colors[i + 1].hour) {
            currentIndex = i;
            break;
        }
    }

    // Если время после последнего периода, берем последний и первый
    if (hour >= colors[colors.length - 1].hour) {
        currentIndex = colors.length - 1;
    }

    const nextIndex = (currentIndex + 1) % colors.length;
    const current = colors[currentIndex];
    const next = colors[nextIndex];

    // Вычисляем фактор интерполяции
    let factor;
    if (currentIndex === colors.length - 1) {
        // Для полуночи
        const nightDuration = 24 - current.hour + next.hour;
        const timeFromCurrent = hour - current.hour;
        factor = timeFromCurrent / nightDuration;
    } else {
        const periodDuration = next.hour - current.hour;
        const timeFromCurrent = hour - current.hour;
        factor = timeFromCurrent / periodDuration;
    }

    return {
        start: lerpColor(current.start, next.start, factor),
        end: lerpColor(current.end, next.end, factor)
    };
}

// Обновление градиента и времени
function updateGradientAndTime() {
    // Обновляем градиент
    const colors = getCurrentColors();
    document.body.style.background = `linear-gradient(135deg, ${colors.start}, ${colors.end})`;
}

// Запускаем обновление
document.addEventListener('DOMContentLoaded', () => {
    updateGradientAndTime();
    setInterval(updateGradientAndTime, 1000);
});