
        /* ==========================================================================
           [NOTE-11] JS SCRIPT - MATRIX DIGITAL RAIN EFFECTS GENERATOR
           ========================================================================== */
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const cypherText = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ1023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$';
        const alphabet = cypherText.split('');
        const fontSize = 14;
        let columns = canvas.width / fontSize;
        let rainDrops = [];

        function initRain() {
            columns = canvas.width / fontSize;
            rainDrops = [];
            for (let x = 0; x < columns; x++) {
                rainDrops[x] = Math.random() * -100;
            }
        }
        initRain();
        window.addEventListener('resize', initRain);

        function renderMatrix() {
            ctx.fillStyle = 'rgba(6, 6, 8, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00f0ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        // Upgraded to requestAnimationFrame to run loop natively with high refresh rate panels
        let last = 0;

function runMatrixPipeline(timestamp) {
    if (timestamp - last > 33) { // ~30 FPS
        renderMatrix();
        last = timestamp;
    }
    requestAnimationFrame(runMatrixPipeline);
}
        requestAnimationFrame(runMatrixPipeline);


        /* ==========================================================================
           [NOTE-12] JS SCRIPT - AMBIPHILIC ICON POP EFFECTS CONTROLLER
           ========================================================================== */
        const techIcons = [
            'fa-ethernet', 'fa-wifi', 'fa-satellite-dish', 'fa-car', 'fa-android', 'fa-apple',
            'fa-mobile-screen-button', 'fa-laptop', 'fa-microchip', 'fa-headphones', 
            'fa-keyboard', 'fa-mouse', 'fa-camera', 'fa-server', 'fa-gamepad', 
            'fa-memory', 'fa-fan', 'fa-display', 'fa-bolt'
        ];

        function triggerIconPop(x, y, isMouseTrail = false) {
            if (window.innerWidth <= 480) return; 

            const particle = document.createElement('div');
            particle.className = 'matrix-icon-particle';
            
            const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
            
            if (randomIcon === 'fa-android' || randomIcon === 'fa-apple') {
                particle.innerHTML = `<i class="fa-brands ${randomIcon}"></i>`;
            } else {
                particle.innerHTML = `<i class="fa-solid ${randomIcon}"></i>`;
            }
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.style.transform = 'translate(-50%, -50%) scale(1)';
                particle.style.opacity = '1';
            }, 10);

            const popLifespan = isMouseTrail ? 400 : (Math.random() * 1200 + 600);

            setTimeout(() => {
                if (isMouseTrail) {
                    particle.style.transform = 'translate(-50%, -50%) scale(0.6)';
                    particle.style.opacity = '0';
                    setTimeout(() => particle.remove(), 200);
                } else {
                    particle.classList.add('snap-out');
                    setTimeout(() => particle.remove(), 160);
                }
            }, popLifespan);
        }

        function dynamicAmbientPopLoop() {
            if (document.hidden) {
                setTimeout(dynamicAmbientPopLoop, 1000);
                return;
            }
            
            const randomClusterCount = Math.floor(Math.random() * 2) + 2; 

            for (let k = 0; k < randomClusterCount; k++) {
                const randomX = Math.random() * window.innerWidth;
                const randomY = Math.random() * window.innerHeight;
                
                const midWidth = window.innerWidth / 2;
                if (randomX > midWidth - 310 && randomX < midWidth + 310 && randomY < 950) {
                    const shiftX = Math.random() < 0.5 ? randomX - 320 : randomX + 320;
                    triggerIconPop(Math.max(25, Math.min(shiftX, window.innerWidth - 25)), randomY, false);
                } else {
                    triggerIconPop(randomX, randomY, false);
                }
            }

            const randomDelay = Math.random() * 1200 + 600;
            setTimeout(dynamicAmbientPopLoop, randomDelay);
        }
        dynamicAmbientPopLoop();


        /* ==========================================================================
           [NOTE-13] JS SCRIPT - HARDWARE MAGNETIC TARGET CURSOR ENGINES
           ========================================================================== */
        const pointer = document.getElementById('custom-pointer');
        const aura = document.getElementById('custom-pointer-aura');
        const magneticElements = document.querySelectorAll('.magnetic');
        
        let lastX = 0;
        let lastY = 0;
        const minDistanceToSpawn = 55; 
        let ticking = false; // Layout mouse animation clock execution handle

        document.addEventListener('mousemove', (e) => {
            pointer.style.left = e.clientX + 'px';
            pointer.style.top = e.clientY + 'px';

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    aura.style.left = e.clientX + 'px';
                    aura.style.top = e.clientY + 'px';

                    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
                    if (dist > minDistanceToSpawn) {
                        triggerIconPop(e.clientX, e.clientY, true); 
                        lastX = e.clientX;
                        lastY = e.clientY;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const boundary = this.getBoundingClientRect();
                const offsetX = e.clientX - boundary.left - (boundary.width / 2);
                const offsetY = e.clientY - boundary.top - (boundary.height / 2);
                
                this.style.transform = `translate(${offsetX * 0.35}px, ${offsetY * 0.35}px) scale(1.18)`;
                
                pointer.style.width = '16px';
                pointer.style.height = '16px';
                pointer.style.backgroundColor = 'transparent';
                pointer.style.border = '1px solid var(--accent-cyan)';
                aura.style.transform = 'translate(-50%, -50%) scale(0)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0px, 0px) scale(1)';
                
                pointer.style.width = '6px';
                pointer.style.height = '6px';
                pointer.style.backgroundColor = 'var(--accent-cyan)';
                pointer.style.border = 'none';
                aura.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });


        /* ==========================================================================
           [NOTE-14] JS SCRIPT - UI COMPONENT INTERACTION LAYERS (ACCORDION & DOCK)
           ========================================================================== */
        const accordions = document.querySelectorAll('.status-entry');
        
        accordions.forEach(acc => {
            const trigger = acc.querySelector('.status-trigger');
            const drawer = acc.querySelector('.status-content-drawer');
            
            trigger.addEventListener('click', () => {
                const isActive = acc.classList.contains('active');
                
                accordions.forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.status-content-drawer').style.maxHeight = null;
                });
                
                if (!isActive) {
                    acc.classList.add('active');
                    drawer.style.maxHeight = drawer.scrollHeight + "px";
                }
            });
        });

        const toTopBtn = document.getElementById('back-to-top-trigger');
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        const dockPanel = document.getElementById('dynamic-footer-dock');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                dockPanel.classList.add('visible');
            } else {
                dockPanel.classList.remove('visible');
            }
        });


        /* ==========================================================================
           [NOTE-15] JS SCRIPT - CIVIL SOLAR CALENDAR SYSTEM TRIPLE-CLOCK
           ========================================================================== */
        const clockElement = document.getElementById('unified-matrix-clock');
        
        const banglaMonths = [
            "Boishakh", "Joishtho", "Asharh", "Shrabon", "Bhadro", "Ashwin",
            "Kartik", "Agrahayan", "Poush", "Magh", "Falgun", "Chaitra"
        ];

        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        }

        function calculateOfficialBanglaDate(date) {
            const gYear = date.getFullYear();
            const gMonth = date.getMonth(); 
            const gDay = date.getDate();

            const isLeapYear = (gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0);
            const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isLeapYear ? 31 : 30, 30];

            const tempDate = new Date(gYear, 0, 1);
            const absoluteDayOfYear = Math.floor((date - tempDate) / (24 * 60 * 60 * 1000)) + 1;
            const april14DayIndex = isLeapYear ? 105 : 104;

            let targetBanglaDayIndex;
            let bYear;

            if (absoluteDayOfYear >= april14DayIndex) {
                targetBanglaDayIndex = absoluteDayOfYear - april14DayIndex + 1;
                bYear = gYear - 593;
            } else {
                const previousYearDaysCount = ((gYear - 1) % 4 === 0 && (gYear - 1) % 100 !== 0) || ((gYear - 1) % 400 === 0) ? 366 : 365;
                targetBanglaDayIndex = previousYearDaysCount - (april14DayIndex - absoluteDayOfYear) + 1;
                bYear = gYear - 594;
            }

            let bMonthIdx = 0;
            let runningDayCounter = targetBanglaDayIndex;

            while (runningDayCounter > monthLengths[bMonthIdx]) {
                runningDayCounter -= monthLengths[bMonthIdx];
                bMonthIdx++;
            }

            return { day: runningDayCounter, month: banglaMonths[bMonthIdx], year: bYear };
        }

        function updateUnifiedClock() {
            const now = new Date();
            
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const formattedHours = String(hours).padStart(2, '0');
            const timeString = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

            const engDay = now.getDate();
            const engMonth = now.toLocaleString('en-US', { month: 'long' });
            const engYear = now.getFullYear();
            const engDateString = `${engDay}${getOrdinalSuffix(engDay)} ${engMonth} ${engYear}`;

            const banglaData = calculateOfficialBanglaDate(now);
            const banglaDateString = `${banglaData.day}${getOrdinalSuffix(banglaData.day)} ${banglaData.month} ${banglaData.year}`;

            clockElement.textContent = `${timeString} // ${engDateString} // ${banglaDateString}`;
        }
        
        setInterval(updateUnifiedClock, 1000);
        updateUnifiedClock();