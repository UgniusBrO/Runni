import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Arrows = ({ up, ...props }) => {
    const iconName = up ? 'arrow-circle-o-up' : 'arrow-circle-o-down'
    const iconColor = up ? '#000' : '#900'
    return (
        <Icon name={iconName} color={iconColor} size={30} {...props} />
    )
}

export default Arrows