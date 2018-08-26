import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import Search from '@material-ui/icons/Search';


class SearchBar extends Component {
    handleSearch = () => {
        this.props.onClickSearch(this.props.value);
    };


    render() {
        return (
            <div style={this.props.style}>
                <Input
                    startAdornment={
                        <IconButton style={{color: this.props.color}} onClick={this.handleSearch}>
                            <Search/>
                        </IconButton>
                    }
                    disableUnderline
                    placeholder="Search for snippets"
                    style={{color: this.props.color}}
                    fullWidth={this.props.fullWidth}
                    value={this.props.value}
                    onChange={this.props.onChange}
                >

                </Input>
            </div>
        );
    }
}


SearchBar.propTypes = {
    color: PropTypes.string,
    onClickSearch: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.object,
    fullWidth: PropTypes.bool,
    value: PropTypes.string
};

SearchBar.defaultProps = {
    color: 'white',
    fullWidth: true
};


export default SearchBar;