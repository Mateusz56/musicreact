import Cookies from "./Cookies";
import FetchFunctions from "./FetchFunctions";

class GlobalSettings {
    static skinMode = ''
    static language = ''

    static objectToChangeOnSkinModeChange = []

    static InitializeSkinMode() {
        this.ChangeSkinMode(Cookies.getCookie('skinMode'), false)
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

    static ChangeSkinMode(value, saveData) {
        GlobalSettings.skinMode = value
        GlobalSettings.objectToChangeOnSkinModeChange.forEach(x => x.setState({
            skinMode: value
        }))

        document.querySelector('html').classList = [value]
        if(Cookies.cookieExists('skinMode') || value !== '')
            Cookies.setCookie('skinMode', value)

        if(saveData) {
            FetchFunctions.Put('user_skin_mode', {skin_mode: value}, () => {})
        }
    }
}

export default GlobalSettings