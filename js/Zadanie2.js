'use strict';


//Wzorując się na przykładzie i biorąc pod uwagę brak reguły o wyświetleniu w konsoli informacji o wieku po spełnieniu jednego z warunków dotyczących zarobków, podjąłem decyzję nie sprawdzać dodatkowo wieku osoby po spełnieniu kryteriów
//Dla optymizacji kodu wszystkie sprawdzenia są umieszczone według priorytetu, oraz przy wykonaniu jednego z nich, trwająca iteracja cyklu kończy się za pomocą return
//Dodatkowo w celu optymizacji warunki przy sprawdzeniu poprawności danych umieszczone są według priorytetu
function welcomeUsers(array) {
    const currentDate = new Date();
    let userAge;

    array.forEach(user => {
        //Dodałem kilka sprawdzań poprawności danych, żeby kod był maksymalne automatyzowany, oraz odporny na złe dane
        //Można usunąć wszystkie sprawdzenia poprawności danych, wtedy kod będzie działał szybciej. Nie będzie to miało żadnego wpływu na zgodność wyniku z przykładem

        //Sprawdzenie istnienie pola 'username' w objekcie
        if (!user.username) {
            console.log(`Błąd, brak danych o imieniu użytkownika pod indeksom ${array.indexOf(user)}`);
            return;
        }

        //Sprawdzenie poprawności danych pola 'salary' objektu - czy istnieje pole, czy zgadza się typ danych, oraz czy jej wartość jest większa od zera
        if (!user.salary || isNaN(user.salary) || user.salary < 0) {
            console.log(`Błąd, nieprawidłowe dane o zarobkach użytkownika - ${user.username}, pod indeksom ${array.indexOf(user)}`);
            return;
        }
        
        if (user.salary < 5000) {
            console.log(`${user.username}, szykuj się na podwyżkę!`);
            return;
        } else if (user.salary > 17000) {
            console.log('Witaj, prezesie!');
            return;
        }

        userAge = currentDate.getFullYear() - user.birthYear;
        //Sprawdzenie poprawności danych pola 'birthYear' objektu- czy istnieje pole, czy zgadza się typ danych, oraz czy jej wartość jest większa od zera i czy jest rzeczywistą
        if (!user.birthYear || isNaN(user.birthYear) || userAge < 0 || userAge > 110) {
            console.log(`Błąd, nieprawidłowe dane o dacie urodzenia użytkownika - ${user.username}, pod indeksom ${array.indexOf(user)}`);
            return;
        }

        //Nie robię ścisłego porównania z mod, ponieważ już sprawdziłem dane pod kątem NaN wyżej
        if (user.birthYear % 2 == 0) {
            console.log(`Witaj, ${user.username}! W tym roku kończysz ${userAge} lat!`);
            return;
        } else {
            console.log(`${user.username}, jesteś zwolniony!`);
        }
    });
}

const usersArr = [
    {username: 'Jan Kowalski', birthYear: 1983, salary: 4200},
    {username: 'Anna Nowak', birthYear: 1994, salary: 7500},
    {username: 'Jakub Jakubowski', birthYear: 1985, salary: 18000},
    {username: 'Piotr Kozak', birthYear: 2000, salary: 4999},
    {username: 'Marek Sinica', birthYear: 1989, salary: 7200},
    {username: 'Kamila Wiśniewska', birthYear: 1972, salary: 6800},
];

welcomeUsers(usersArr);