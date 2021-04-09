import React, { Component } from 'react';
import { SvgIcon } from '@material-ui/core';

const IconPropTypes = SvgIcon.propTypes;

export class HomeIcon extends Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M9,19V13H11L13,13H15V19H18V10.91L12,4.91L6,10.91V19H9M12,2.09L21.91,12H20V21H13V15H11V21H4V12H2.09L12,2.09Z" />
            </SvgIcon>
        );
    }
}
HomeIcon.propTypes = IconPropTypes;

export class AboutIcon extends Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
            </SvgIcon>
        );
    }
}

AboutIcon.propTypes = IconPropTypes;

export class CalculatorCarIcon extends Component {
    render() {
        return (
            <SvgIcon width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...this.props}>
                    <g transform="matrix(2.781 0 0 2.7249 .1969 -786.15)" stroke="#6E4358">
                        <path transform="rotate(.0002411)" d="m1.0594 291.18h4.2334v5.5562h-4.2334z" fill="none" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                        <path d="m2.141 292.29h2.0656v0.21176h-2.0656z" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                        <g strokeDashoffset="3.7795" strokeWidth=".70009">
                            <path transform="scale(-1,1)" d="m-2.1276 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-3.1859 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2442 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-2.1276 294.61h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1)" d="m-3.175-294.62h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2333 294.61h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-2.1167 295.67h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-3.175 295.67h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2333 295.67h0.010894v0.0109h-0.010894z"/>
                        </g>
                    </g>
                    <path d="m13.01 0.32326c-0.3438 0-0.63025 0.23017-0.73964 0.55369l-1.0835 3.2847v2.6207h4.0523v1.2177h3.7613v0.54834c0 0.30159 0.23441 0.54834 0.5209 0.54834h0.52091c0.2865 0 0.5209-0.24675 0.5209-0.54834v-4.3867l-1.0835-3.2847c-0.10418-0.32352-0.39585-0.55369-0.73964-0.55369zm0 0.82251h5.73l0.78136 2.4675h-7.2927zm0 3.5642c0.43235 0 0.78136 0.36739 0.78136 0.82251s-0.34901 0.82251-0.78136 0.82251-0.78136-0.36739-0.78136-0.82251 0.34901-0.82251 0.78136-0.82251zm5.73 0c0.43235 0 0.78136 0.36739 0.78136 0.82251s-0.349 0.82251-0.78136 0.82251c-0.43235 0-0.78136-0.36739-0.78136-0.82251s0.34901-0.82251 0.78136-0.82251z" strokeWidth=".53445" fill="#6E4358"/>
            </SvgIcon>
        );
    }
}

CalculatorCarIcon.propTypes = IconPropTypes;

export class CalculatorHomeIcon extends Component {
    render() {
        return (
            <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...this.props}>
                <g transform="matrix(2.781 0 0 2.7249 .1969 -786.15)" stroke="#6E4358">
                    <path transform="rotate(.0002411)" d="m1.0594 291.18h4.2334v5.5562h-4.2334z" fill="none" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                    <g>
                        <path d="m2.141 292.29h2.0656v0.21176h-2.0656z" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                        <g strokeDashoffset="3.7795" strokeWidth=".70009">
                            <path transform="scale(-1,1)" d="m-2.1276 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-3.1859 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2442 293.63h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-2.1276 294.61h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1)" d="m-3.175-294.62h0.010894v0.0108h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2333 294.61h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-2.1167 295.67h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-3.175 295.67h0.010894v0.0109h-0.010894z"/>
                            <path transform="scale(-1,1)" d="m-4.2333 295.67h0.010894v0.0109h-0.010894z"/>
                        </g>
                    </g>
                </g>
                <path d="m18 1c-0.14265 0-0.2855 0.045594-0.39844 0.13867l-4.9688 4.123c-0.20209 0.16425-0.07615 0.47656 0.19727 0.47656h1.0098v1.3457h1.6191v3.0332h0.75781c0.32691 0 0.5957-0.24574 0.5957-0.54688v-2.7383h2.377v2.7383c0 0.30113 0.26684 0.54688 0.59375 0.54688h1.7832c0.32691 0 0.5957-0.24574 0.5957-0.54688v-3.832h1.0098c0.27342 0 0.40335-0.31231 0.19531-0.47656l-4.9688-4.123c-0.11293-0.093078-0.25579-0.13867-0.39844-0.13867z" strokeWidth=".57047" fill="#6E4358"/>   
            </SvgIcon>
        );
    }
}

CalculatorHomeIcon.propTypes = IconPropTypes;

export class CalculatorBankHomeIcon extends Component {
    render() {
        return (
            <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...this.props}>
                    <g transform="matrix(2.781 0 0 2.7249 .1969 -786.15)" stroke="#6E4358">
                        <path transform="rotate(.0002411)" d="m1.0594 291.18h4.2334v5.5562h-4.2334z" fill="none" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                        <g>
                            <path d="m2.141 292.29h2.0656v0.21176h-2.0656z" strokeLinejoin="round" strokeMiterlimit="4.1" strokeWidth=".7"/>
                            <g strokeDashoffset="3.7795" strokeWidth=".70009">
                                <path transform="scale(-1,1)" d="m-2.1276 293.63h0.010894v0.0108h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-3.1859 293.63h0.010894v0.0108h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-4.2442 293.63h0.010894v0.0108h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-2.1276 294.61h0.010894v0.0109h-0.010894z"/>
                                <path transform="scale(-1)" d="m-3.175-294.62h0.010894v0.0108h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-4.2333 294.61h0.010894v0.0109h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-2.1167 295.67h0.010894v0.0109h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-3.175 295.67h0.010894v0.0109h-0.010894z"/>
                                <path transform="scale(-1,1)" d="m-4.2333 295.67h0.010894v0.0109h-0.010894z"/>
                            </g>
                        </g>
                    </g>
                    <g transform="matrix(.4564 0 0 .43344 13.392 -.52974)">
                        <path d="m0 0h24v24h-24z" fill="none"/>
                        <g fill="#6E4358">
                        <path d="m3.6949 12.11v4c0 0.83 0.67 1.5 1.5 1.5s1.5-0.67 1.5-1.5v-4c0-0.83-0.67-1.5-1.5-1.5s-1.5 0.67-1.5 1.5z"/>
                        <path d="m3.1949 22.61h16c0.83 0 1.5-0.67 1.5-1.5s-0.67-1.5-1.5-1.5h-16c-0.83 0-1.5 0.67-1.5 1.5s0.67 1.5 1.5 1.5z"/>
                        <path d="m15.695 12.11v4c0 0.83 0.67 1.5 1.5 1.5s1.5-0.67 1.5-1.5v-4c0-0.83-0.67-1.5-1.5-1.5s-1.5 0.67-1.5 1.5z"/>
                        <path d="m10.265 2.1002-7.9 4.16c-0.41 0.21-0.67 0.64-0.67 1.1 0 0.69 0.56 1.25 1.25 1.25h16.51c0.68 0 1.24-0.56 1.24-1.25 0-0.46-0.26-0.89-0.67-1.1l-7.9-4.16c-0.58-0.31-1.28-0.31-1.86 0z"/>
                        <path d="m11.515 13.128c-1.462-0.27667-1.9322-0.56271-1.9322-1.0082 0-0.51113 0.65051-0.86752 1.739-0.86752 0.91458 0 1.3719 0.25322 1.5393 0.6565 0.07728 0.18757 0.28983 0.32825 0.56034 0.32825h0.19322c0.42509 0 0.7278-0.3048 0.57966-0.59554-0.27051-0.55334-0.9017-1.0129-1.9064-1.1911v-0.32356c0-0.38921-0.43152-0.70339-0.9661-0.70339-0.53458 0-0.9661 0.31418-0.9661 0.70339v0.30949c-1.2495 0.19695-2.2542 0.7878-2.2542 1.6928 0 1.0832 1.2302 1.6225 3.0271 1.9367 1.6102 0.28136 1.9322 0.69401 1.9322 1.1301 0 0.32356-0.31559 0.83938-1.739 0.83938-1.0627 0-1.6102-0.27667-1.8227-0.67057-0.0966-0.18288-0.31559-0.31418-0.57966-0.31418h-0.18034c-0.43152 0-0.73424 0.31887-0.57322 0.6096 0.36712 0.65181 1.2237 1.0363 2.1898 1.1864v0.31418c0 0.38921 0.43153 0.70339 0.9661 0.70339 0.53458 0 0.9661-0.31418 0.9661-0.70339v-0.3048c1.2559-0.1735 2.2542-0.70339 2.2542-1.6647 0-1.3318-1.5651-1.7866-3.0271-2.0633z" strokeWidth=".11108"/>
                        </g>
                    </g>
            </SvgIcon>
        );
    }
}

CalculatorBankHomeIcon.propTypes = IconPropTypes;


