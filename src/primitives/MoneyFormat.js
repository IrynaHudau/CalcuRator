import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export class MoneyFormat extends Component {
    constructor(props) {
        super(props)
        this.onValueChange = this.onValueChange.bind(this);
    }

    render() {
        const { onChange, value, prefix, ...other } = this.props;
        return (
            <NumberFormat
                {...other}
                value={value}
                onValueChange={this.onValueChange}
                thousandSeparator
                prefix={prefix != null ? prefix : "$"}
                decimalScale={2}
                displayType='text'
            />
        );
    }

    onValueChange(values) {
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    value: values.value,
                },
            });
        }
    }
}

MoneyFormat.propTypes = {
    id: PropTypes.string,
    value: PropTypes.number,
    prefix: PropTypes.string,
    onChange: PropTypes.func
};

export default MoneyFormat;