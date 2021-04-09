import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import {floatOrZero} from "../math/Helpers";

const DEFAULT_SCALE_FACTOR = 100;

function PercentFormat(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            suffix="%"
            decimalScale={5}
        />
    );
}

PercentFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export class PercentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let { onChange, value, validation, scaleFactor, ...other } = this.props;
        const { ...inputProps } = this.props.InputProps ? this.props.InputProps : {};
        let { helperText, error } = this.props;
        
        if (validation) {
            error = !validation.isValid();
            helperText = error ? validation.getErrorText() : helperText;
        }

        if (!scaleFactor) {
            scaleFactor = DEFAULT_SCALE_FACTOR;
        }

        value = floatOrZero(value) * scaleFactor;
        return (
            <TextField
                {...other}
                onChange={this.handleChange}
                value={value ? value : ""}
                error={error}
                helperText={helperText}
                InputProps={{
                    readOnly: inputProps.readOnly,
                    inputComponent: PercentFormat
                }}
            />
        );
    }

    handleChange(ev) {
        const scaleFactor = this.props.scaleFactor ? this.props.scaleFactor : DEFAULT_SCALE_FACTOR;
        ev.target.value = floatOrZero(ev.target.value) / scaleFactor;
        if (this.props.onChange) {
            this.props.onChange(ev);
        }
    }
}

PercentInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    scaleFactor: PropTypes.number,
    disabled: PropTypes.bool
};

export default PercentInput;