import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../theme';
const Header = ({ title, goBack, backBtn, addBtn, goAdd, flexRow }) => {
    return (
        <View
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexDirection: flexRow ? 'row' : 'column',
                alignItems: flexRow ? 'center' : 'flex-start',
                backgroundColor: Theme.colors.WHITE,
                alignContent: 'center',
                alignItems: 'center'
            }}>
            {backBtn && (
                <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => goBack()}>
                    <FontAwesome5 name="chevron-left" color="#000" size={18} />
                </TouchableOpacity>
            )}
            <Text
                style={{
                    fontSize: 26,
                    color: '#0D2531',
                    paddingLeft: 4,
                    fontWeight: 'bold'
                }}>
                {title}
            </Text>

            {addBtn && (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}>
                    <TouchableOpacity
                        onPress={() => goAdd()}
                        style={{
                            backgroundColor: Theme.colors.COLOR_INPUT_BACKGROUND,
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            width: 30,
                            height: 30
                        }}>
                        <FontAwesome5 name="plus" color="#000" size={18} />
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
};
export default Header;