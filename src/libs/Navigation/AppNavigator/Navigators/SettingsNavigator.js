import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import useThemeStyles from '@styles/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import getRootNavigatorScreenOptions from '@libs/Navigation/AppNavigator/getRootNavigatorScreenOptions';
import createCustomStackNavigator from '@libs/Navigation/AppNavigator/createCustomStackNavigator';
import SCREENS from '@src/SCREENS';
import * as ModalStackNavigators from '@libs/Navigation/AppNavigator/ModalStackNavigators';

const loadSidebarScreen = () => require('../../../../pages/home/sidebar/SidebarScreen').default;
const loadPage = () => require('../../../../pages/ErrorPage/NotFoundPage').default;

const propTypes = {
    /* Navigation functions provided by React Navigation */
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};

const RootStack = createCustomStackNavigator();

function SettingsNavigator({navigation}) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    const screenOptions = getRootNavigatorScreenOptions(isSmallScreenWidth);

    console.log('navigation state', navigation.getState());

    console.log('loadSidebarScreen', loadSidebarScreen, 'not found page', loadPage)

    return (
        <View style={styles.rootNavigatorContainerStyles(isSmallScreenWidth)}>
            <RootStack.Navigator
                isSmallScreenWidth={isSmallScreenWidth}
                mode="modal"
                initialRouteName={SCREENS.SETTINGS_HOME}
                centralRoute='SettingsCentralPane'
            >
                <RootStack.Screen
                    name={SCREENS.SETTINGS_HOME}
                    options={screenOptions.homeScreen}
                    getComponent={loadPage}
                />
                <RootStack.Screen
                    name='SettingsCentralPane'
                    options={screenOptions.centralPaneNavigator}
                    component={ModalStackNavigators.SettingsModalStackNavigator}
                />
            </RootStack.Navigator>
        </View>
    );
}

SettingsNavigator.propTypes = propTypes;
SettingsNavigator.displayName = 'SettingsNavigator';

export default SettingsNavigator;
