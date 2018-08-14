import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {styles} from './styles';


class IconButton extends Component {
    render() {
        return (
            <div style={this.props.style}>
                <div style={styles.icon}>
                    <img style={styles.img} src={this.props.src}/>
                </div>
                <div style={styles.text}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}


IconButton.propTypes = {
    src: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.object
};


export default IconButton;