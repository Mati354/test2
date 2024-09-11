// Kalendarz i wydarzenia
document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar-table').getElementsByTagName('tbody')[0];
    const monthDisplay = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventDetails = document.getElementById('next-event-details');

    let currentMonth = new Date().getMonth(); // Aktualny miesiąc (0-11)
    let currentYear = new Date().getFullYear(); // Aktualny rok
    let events = {
        '2024-09-10': {
            title: 'Kino samochodowe',
            description: 'Pokaz filmu na dużym ekranie.',
        },
        '2024-09-20': {
            title: 'Zlot samochodowy',
            description: 'Spotkanie miłośników motoryzacji.',
        },
        '2024-10-05': {
            title: 'Rajd samochodowy',
            description: 'Wyścig przez różne trasy.',
        },
    };

    function renderCalendar(month, year) {
        calendar.innerHTML = ''; // Czyszczenie kalendarza
        const firstDay = new Date(year, month, 1).getDay() || 7; // Dzień tygodnia pierwszego dnia miesiąca (poniedziałek = 1)
        const daysInMonth = 32 - new Date(year, month, 32).getDate(); // Liczba dni w miesiącu

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 1; j <= 7; j++) {
                let cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.innerHTML = ''; // Puste komórki przed pierwszym dniem miesiąca
                } else if (date > daysInMonth) {
                    break; // Przerywamy, jeśli nie ma więcej dni w miesiącu
                } else {
                    cell.innerHTML = date;
                    const eventDateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    if (events[eventDateKey]) {
                        cell.classList.add('event-day'); // Dodanie klasy dla dni z wydarzeniami
                        cell.addEventListener('mouseover', function() {
                            eventDetails.innerHTML = `<strong>${events[eventDateKey].title}:</strong> ${events[eventDateKey].description}`;
                        });
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendar.appendChild(row);
        }
    }

    function updateMonthDisplay(month, year) {
        const months = [
            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
        ];
        monthDisplay.textContent = `${months[month]} ${year}`;
    }

    function findNextEvent() {
        const today = new Date();
        const sortedEvents = Object.keys(events).sort((a, b) => new Date(a) - new Date(b));

        for (let eventDate of sortedEvents) {
            if (new Date(eventDate) > today) {
                eventDetails.innerHTML = `<strong>${events[eventDate].title}:</strong> ${events[eventDate].description}`;
                break;
            }
        }
    }

    prevMonthButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
        updateMonthDisplay(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
        updateMonthDisplay(currentMonth, currentYear);
    });

    // Inicjalizacja kalendarza
    renderCalendar(currentMonth, currentYear);
    updateMonthDisplay(currentMonth, currentYear);
    findNextEvent();
});

// Formularz zapisu
const members = [];

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const imie = document.getElementById('imie').value;
    const nazwisko = document.getElementById('nazwisko').value;
    const email = document.getElementById('email').value;
    members.push({ imie, nazwisko, email });
    updateMemberList();
});

function updateMemberList() {
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = members.map(member => `<li>${member.imie} ${member.nazwisko} (${member.email})</li>`).join('');
}

// Logowanie
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        alert('Zalogowano jako administrator');
        // Tu możesz dodać funkcje edytowania/usuwania członków
    } else {
        alert('Niepoprawny login lub hasło');
    }
    
});

