class Translations {
    static language = navigator.language || navigator.userLanguage || 'en'

    static GetText(textId) {
        if(!this.texts.hasOwnProperty(this.language))
            this.language = 'en'

        if(this.texts[this.language].hasOwnProperty(textId))
            return this.texts[this.language][textId]
        else
            return textId
    }

    static texts = {
        pl: {
            name: 'Nazwa',
            performer: 'Wykonawca',
            genre: 'Gatunek',
            year: 'Rok',
            genres: 'Gatunki',
            lesser: 'Mniejsza',
            higher: 'Większa',
            equal: 'Równa',
            favourite: 'Ulubione',
            yearSince: 'Rok od',
            to: 'do',
            songs: 'Piosenki',
            albums: 'Albumy',
            login: 'Zaloguj',
            register: 'Zarejestruj',
            nameOfSongOrPerformer: 'Nazwa piosenki lub wykonawcy',
            username: 'Nazwa użytkownika',
            password: 'Hasło',
            albumName: 'Nazwa albumu',
            albumNameOrPerformer: 'Nazwa albumu lub wykonawcy',
            loadMore: 'Załaduj kolejne',
            allSongsLoaded: 'Załadowano wszystkie piosenki spełniające warunki wyszukiwania',
            allAlbumsLoaded: 'Załadowano wszystkie albumy spełniające warunki wyszukiwania',
            invites: 'Zaproszenia',
            comments: 'Komentarze',
            inviteToAlbum: 'Zaproś do albumu',
            invite: 'Zaproś',
            title: 'Tytuł',
            send: 'Wyślij',
            public: 'Publiczny',
            changePassword: 'Zmień hasło',
            changeData: 'Zmień dane',
            changeEmail: 'Zmień adres e-mail',
            change: 'Zmień',
            email: 'E-mail',
            firstName: 'Imię',
            lastName: 'Nazwisko',
            newPassword: 'Nowe hasło',
            repeatNewPassword: 'Powtórz nowe hasło',
            wrongPassword: 'Podano błędne hasło',
            givePassword: 'Podaj hasło',
            addToAlbum: 'Dodaj do albumu',
            loginToMark: 'Zaloguj się, żeby ocenić',
            loginToComment: 'Zaloguj się, żeby dodać komentarz',
            loadMoreComments: 'Załaduj więcej komentarzy',
            allCommentsLoaded: 'Załadowano wszystkie komentarze',
            mark: 'Ocena',
            yourMark: 'Twoja ocena',
            logout: 'Wyloguj',
            myAlbums: 'Moje albumy',
            addSong: 'Dodaj piosenkę',
            addAlbum: 'Dodaj album',
            albumAdded: 'Dodano album',
            songAdded: 'Dodano piosenkę',
            inviteSent: 'Wysłano zaproszenie',
            error401: 'Błąd 401',
            authRequired: 'Wymagana autoryzacja, zaloguj się i spróbuj ponownie.',
            error403: 'Błąd 403',
            noPermission: 'Nie masz uprawnień, aby wyświetlić tą stronę.',
            noMarks: 'Brak ocen',
            error404: 'Błąd 404',
            pageNotFound: 'Nie znaleziono strony.',
            passwordsAreDifferent: 'Hasła różnią się',
            userRegistered: 'Zarejestrowano użytkownika',
            addedToAlbum: 'Dodano do albumu',
            passwordChanged: 'Zmieniono hasło',
            userDataChanged: 'Zmieniono dane',
            emailChanged: 'Zmieniono adres e-mail',
            repeatPassword: 'Powtórz hasło',
            loginError: 'Błąd logowania',
            addComment: 'Dodaj komentarz',
            imageUrl: 'Adres url obrazka',
            pageTitle: 'Archiwum albumów muzycznych'
        },
        en: {
            name: 'Name',
            performer: 'Performer',
            genre: 'Genre',
            year: 'Year',
            genres: 'Genres',
            lesser: 'Lesser',
            higher: 'Higher',
            equal: 'Equal',
            favourite: 'Favourite',
            yearSince: 'Year since',
            to: 'to',
            songs: 'Songs',
            albums: 'Albums',
            login: 'Login',
            register: 'Register',
            nameOfSongOrPerformer: 'Name of song or performer',
            username: 'Username',
            password: 'Password',
            albumName: 'Album name or performer',
            loadMore: 'Load more',
            allSongsLoaded: 'All songs meeting requirements are loaded',
            allAlbumsLoaded: 'All albums meeting requirements are loaded',
            invites: 'Invitations',
            comments: 'Comments',
            inviteToAlbum: 'Invite to album',
            invite: 'Invite',
            title: 'Title',
            send: 'Send',
            public: 'Public',
            changePassword: 'Change password',
            changeData: 'Change user data',
            changeEmail: 'Change e-mail address',
            change: 'Change',
            email: 'E-mail',
            firstName: 'First name',
            lastName: 'Last name',
            newPassword: 'New password',
            repeatNewPassword: 'Repeat new password',
            wrongPassword: 'Wrong password',
            givePassword: 'Enter password',
            addToAlbum: 'Add to album',
            loginToMark: 'Log in to be able to rate',
            loginToComment: 'Log in to be able to comment',
            loadMoreComments: 'Load more comments',
            allCommentsLoaded: 'All comments loaded',
            mark: 'Rating',
            yourMark: 'Your rating',
            logout: 'Logout',
            myAlbums: 'My albums',
            addSong: 'Add song',
            addAlbum: 'Add album',
            songAdded: 'Song added',
            albumAdded: 'Album added',
            inviteSent: 'Invite sent',
            error401: 'Error 401',
            authRequired: 'Authorization required, log in and try again.',
            error403: 'Error 403',
            noPermission: "You don't have permissions to see this page.",
            noMarks: 'No rating',
            error404: 'Error 404',
            pageNotFound: 'Page not found.',
            passwordsAreDifferent: 'Passwords are different',
            userRegistered: 'User registered',
            addedToAlbum: 'Song added to album',
            passwordChanged: 'Password changed',
            dataChanged: 'User data changed',
            emailChanged: 'E-mail address changed',
            repeatPassword: 'Repeat password',
            loginError: 'Login error',
            addComment: 'Add comment',
            userDataChanged: 'User data changed',
            albumNameOrPerformer: 'Album name or performer',
            imageUrl: 'Image url address',
            pageTitle: 'Archive of music albums'
        }
    }
}

export default Translations