import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    warning: {
        ...theme.typography.body2,
        background: 'linear-gradient(45deg, #CD5618 30%, #E7814C 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 10px',
        boxShadow: '0 3px 3px 2px rgba(255, 105, 135, .3)',
    },
    positive: {
        ...theme.typography.body2,
        background: 'linear-gradient(45deg, #18CD7C 30%, #4CE76D 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 10px',
        boxShadow: '0 3px 3px 2px rgba(105, 255, 135, .3)',
    },
});

class HighlightBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { id, paragraph } = this.props;
        return (
            <Typography id={id} className={this.getClassNameByType()} paragraph={paragraph}>
                {this.props.children}
            </Typography>
        );
    }

    getClassNameByType() {
        switch (this.props.type) {
            case "warning":
                return this.props.classes.warning;
            default:
                return this.props.classes.positive;
        }
    }
}

HighlightBlock.propTypes = {
    id: PropTypes.string,
    children: PropTypes.array,
    type: PropTypes.string,
    paragraph: PropTypes.bool
};

export default withStyles(styles)(HighlightBlock);