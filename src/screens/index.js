import { Navigation } from "react-native-navigation";
import registerScreens from "../registerScreens"
import unAuthenthicatedScreens from "./config";
import SplashScreen from 'react-native-splash-screen'
registerScreens()

Navigation.events().registerAppLaunchedListener(handleAppLaunch);

async function handleAppLaunch(){
    await Navigation.setRoot({
        root: unAuthenthicatedScreens
    })      
    SplashScreen.hide();

}
