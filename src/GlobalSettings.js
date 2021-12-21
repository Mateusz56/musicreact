import Cookies from "./Cookies";

class GlobalSettings {
    static skinMode = ''
    static language = ''

    static objectToChangeOnSkinModeChange = []

    static InitializeSkinMode() {
        this.ChangeSkinMode(Cookies.getCookie('skinMode'))
    }

    static SubscribeSkinModeChange(object) {
        this.objectToChangeOnSkinModeChange.push(object)
    }

    static UnsubscribeSkinModeChange(object) {
        for(let i = 0; i < this.objectToChangeOnSkinModeChange.length; i++){
            if (this.objectToChangeOnSkinModeChange[i] === object) {
                this.objectToChangeOnSkinModeChange.splice(i, 1);
            }
        }
    }

    static ChangeSkinMode(value) {
        GlobalSettings.skinMode = value
        GlobalSettings.objectToChangeOnSkinModeChange.forEach(x => x.setState({
            skinMode: value
        }))

        document.querySelector('html').classList = [value]
        Cookies.setCookie('skinMode', value)
    }
}

export default GlobalSettings