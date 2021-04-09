import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorSelector, {SHADE} from "../../utils/ColorSelector";
import { Group } from '@vx/group';
import { Pie } from '@vx/shape';

const getDataValue = d => d.value;;

/**
 * Draws PieChart. Uses vx as charting library.Vx is collection of reusable low-level visualization components.
 * vx packages - https://www.npmjs.com/~vx
 * vx home - https://vx-demo.now.sh/
 * vx sources - https://github.com/hshoff/vx
 */

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.colorSelector = new ColorSelector(SHADE.S600, 7);
    }

    render() {
        const { data, width, height } = this.props;
        const margin = 0;

        const white = '#ffffff';
        // const black = '#000000';

        const radius = Math.min(width, height) / 2;
        const centerY = height / 2;
        const centerX = width / 2;
        const colorSelector = this.colorSelector;
        return (
            <svg id={this.props.id} width={width} height={height}>
                {/* <GradientDarkgreenGreen id="pie-gradients" />
                <rect rx={14} width={width} height={height} fill="url('#pie-gradients')" /> */}
                {/* <rect rx={14} width={width} height={height} fill="white" /> */}
                <Group top={centerY - margin} left={centerX}>
                    <Pie
                        data={data}
                        pieValue={getDataValue}
                        outerRadius={radius - 5}
                        innerRadius={radius - 80}
                        cornerRadius={3}
                        padAngle={0}>
                        {pie => {
                            return pie.arcs.map((arc, i) => {
                                const opacity = 1;
                                const [centroidX, centroidY] = pie.path.centroid(arc);
                                const { startAngle, endAngle } = arc;
                                const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                                return (
                                    <g key={`value-${arc.data.label}-${i}`}>
                                        <path d={pie.path(arc)} fill={colorSelector.getColorByIndex(i)} fillOpacity={opacity} />
                                        {hasSpaceForLabel && (
                                            <text
                                                fill={white}
                                                x={centroidX}
                                                y={centroidY}
                                                dy=".33em"
                                                fontSize={15}
                                                fontFamily='Roboto", "Helvetica", "Arial", sans-serif;'
                                                textAnchor="middle">
                                                {arc.data.label}
                                            </text>
                                            // <div x={centroidX} y={centroidY}>
                                            //     <Typography variant="caption"></Typography>
                                            // </div>
                                        )}
                                    </g>
                                );
                            });
                        }}
                    </Pie>
                </Group>
            </svg>
        );
    }
}

PieChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape(
        {
            label: PropTypes.string,
            value: PropTypes.number
        }
    )),
    width: PropTypes.number,
    height: PropTypes.number,
    classes: PropTypes.object,
};

export default PieChart;